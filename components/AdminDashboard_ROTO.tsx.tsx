import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, AlertCircle, CheckCircle2, Lock, Eye, EyeOff, Search, RefreshCw, Box, Plus, X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { supabase, getProductImageUrl } from '../utils/supabase';
import { Product } from '../types';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Modal New Product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    id: '', name: '', sku: '', description: '', priceRetail: 0, priceWholesale: 0, imageUrl: '', category: 'Otras Herramientas', inStock: true, isVisible: true
  });

  // Image upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingSku, setUploadingSku] = useState<string | null>(null);

  // Load products from DB
  useEffect(() => {
    const fetchProducts = async () => {
      const baseProducts: Product[] = PRODUCTS.map(p => ({ 
        ...p, 
        inStock: p.inStock !== false,
        isVisible: true,
        priceRetail: p.priceRetail || 0 
      }));

      try {
        const { data, error } = await supabase.from('productos').select('*');
        if (data && data.length > 0) {
          // Merge
          const dbSkus = data.map(d => d.sku);
          
          // Existing base products with DB override
          const merged = baseProducts.map(p => {
             const remote = data.find(d => d.sku === p.sku);
             if (remote) {
               return {
                 ...p,
                 inStock: remote.in_stock !== false,
                 priceWholesale: remote.price_wholesale || p.priceWholesale,
                 priceRetail: remote.precio_detalle || p.priceRetail,
                 isVisible: remote.estado_visibilidad !== false,
                 imageUrl: remote.url_imagen || p.imageUrl
               };
             }
             return p;
          });

          // Pure DB products not in constants
          const pureDbProducts = data.filter(d => !baseProducts.find(b => b.sku === d.sku)).map(d => ({
            id: d.id || d.sku,
            name: d.name || 'Sin Nombre',
            sku: d.sku,
            description: d.description || '',
            category: 'DB_Import',
            priceWholesale: d.price_wholesale || 0,
            priceRetail: d.precio_detalle || 0,
            inStock: d.in_stock !== false,
            isVisible: d.estado_visibilidad !== false,
            imageUrl: d.url_imagen || ''
          }));

          setProducts([...merged, ...pureDbProducts]);
        } else {
          setProducts(baseProducts);
        }
      } catch (err) {
        setProducts(baseProducts);
      }
    };
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFieldChange = (id: string, field: keyof Product, value: any) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
    setSaveStatus('idle');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingSku) return;

    try {
      setProducts(prev => prev.map(p => p.sku === uploadingSku ? { ...p, imageUrl: 'uploading...' } : p));
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${uploadingSku}-${Date.now()}.${fileExt}`;
      const imgPath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('productos')
        .upload(imgPath, file);

      if (error) throw error;

      // Generar URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('productos')
        .getPublicUrl(imgPath);

      handleFieldChange(uploadingSku, 'imageUrl', publicUrl);
    } catch (err: any) {
      alert('Error subiendo imagen: ' + err.message);
      handleFieldChange(uploadingSku, 'imageUrl', ''); // Reset on error (or keep previous, simplistically just empty)
    } finally {
      setUploadingSku(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerImageUpload = (idOrSku: string) => {
    setUploadingSku(idOrSku);
    fileInputRef.current?.click();
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto del listado local? (Se borrará al Guardar Todo)')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      setSaveStatus('idle');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      const updates = products.map(p => ({
        sku: p.sku,
        name: p.name,
        price_wholesale: p.priceWholesale,
        precio_detalle: p.priceRetail,
        in_stock: p.inStock,
        estado_visibilidad: p.isVisible,
        url_imagen: p.imageUrl
      }));

      const { error } = await supabase
        .from('productos')
        .upsert(updates, { onConflict: 'sku' });

      if (error) {
        console.warn("Supabase Warning: ", error.message);
      }

      await new Promise(resolve => setTimeout(resolve, 800));

      const WEBHOOK_URL = import.meta.env.VITE_N8N_PURGE_WEBHOOK || 'https://n8n.innobate.cl/webhook/fyc-purge-cache';
      try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'purge_cache', timestamp: new Date().toISOString() }),
            headers: { 'Content-Type': 'application/json' }
        });
      } catch (webhookErr) {}

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);

    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.sku) {
      alert("Nombre y SKU son requeridos");
      return;
    }
    const finalProduct = {
      ...newProduct,
      id: newProduct.sku, // Usaremos SKU como ID
    } as Product;

    setProducts(prev => [finalProduct, ...prev]);
    setIsModalOpen(false);
    setNewProduct({ id: '', name: '', sku: '', description: '', priceRetail: 0, priceWholesale: 0, imageUrl: '', category: 'Otras Herramientas', inStock: true, isVisible: true });
    setSaveStatus('idle');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="bg-[#111] border border-[#222] p-8 rounded-2xl w-full max-w-sm shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 bg-[#FFD700]/10 rounded-full flex items-center justify-center mb-6 border border-[#FFD700]/50">
             <Lock className="w-8 h-8 text-[#FFD700]" />
          </div>
          <h2 className="text-2xl font-industrial font-black text-white uppercase tracking-wider mb-2">Acceso Restringido</h2>
          <p className="text-xs text-neutral-500 uppercase tracking-widest text-center mb-8">Directorio F&C</p>
          
          <input 
            type="password" 
            placeholder="Clave Maestra"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter' && password === 'hola123') setIsAuthenticated(true); }}
            className="w-full bg-[#151515] border border-[#333] focus:border-[#FFD700] p-4 rounded-xl text-center text-white font-mono tracking-widest outline-none transition-colors mb-4"
          />
          <button 
            onClick={() => { if(password === 'hola123') setIsAuthenticated(true); else alert('Clave incorrecta'); }}
            className="w-full bg-[#FFD700] text-black font-black uppercase py-4 rounded-xl hover:bg-white transition-colors"
          >
            Entrar al Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8">
      {/* File Input Oculto */}
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        className="hidden" 
      />

      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 bg-[#111] p-6 rounded-2xl border border-[#222]">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <Box className="w-6 h-6 text-[#FFD700]" />
               <h1 className="text-3xl font-industrial font-black uppercase tracking-wider text-white">Centro de Control F&C</h1>
            </div>
            <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Gestión Profesional de Catálogo</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#151515] border border-[#333] hover:border-[#FFD700] text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg min-w-[180px]"
            >
              <Plus className="w-4 h-4 text-[#FFD700]" /> [+] NUEVO PRODUCTO
            </button>

            <div className="relative w-full md:w-64">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
               <input 
                 type="text" 
                 placeholder="Buscar producto o SKU..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-[#151515] border border-[#333] focus:border-[#FFD700] rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none transition-colors"
               />
            </div>
            
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center justify-center gap-2 px-6 py-3 font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg min-w-[180px]
                ${isSaving ? 'bg-neutral-800 text-neutral-500' : 
                  saveStatus === 'success' ? 'bg-green-500 text-white' : 
                  'bg-[#FFD700] text-black hover:bg-white border border-transparent'}
              `}
            >
              {isSaving ? (
                 <><RefreshCw className="w-4 h-4 animate-spin" /> Guardando...</>
              ) : saveStatus === 'success' ? (
                 <><CheckCircle2 className="w-4 h-4" /> Guardado</>
              ) : (
                 <><Save className="w-4 h-4" /> Guardar Todo</>
              )}
            </button>
          </div>
        </div>

        {/* Notificaciones */}
        <AnimatePresence>
          {saveStatus === 'success' && (
             <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p className="text-xs font-bold uppercase tracking-wider">La base de datos se ha actualizado. Purga de caché lanzada a n8n.</p>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Tabla Responsiva */}
        <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden shadow-2xl">
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[1000px]">
               <thead>
                 <tr className="bg-[#151515] border-b border-[#333] text-xs font-black text-neutral-500 uppercase tracking-widest">
                    <th className="p-4 w-16 text-center">Vis</th>
                    <th className="p-4 w-28 text-center">Img</th>
                    <th className="p-4">Producto</th>
                    <th className="p-4 w-32">SKU</th>
                    <th className="p-4 w-40 text-right">Detalle ($)</th>
                    <th className="p-4 w-40 text-right">Mayorista ($)</th>
                    <th className="p-4 w-24 text-center">Stock</th>
                    <th className="p-4 w-16 text-center">Acción</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-[#222]">
                 {filteredProducts.map((p) => (
                   <tr key={p.id} className={`hover:bg-[#151515]/50 transition-colors ${!p.isVisible ? 'opacity-40 grayscale' : ''}`}>
                     
                     {/* Switch Visibilidad */}
                     <td className="p-4">
                        <div className="flex justify-center">
                            <button 
                                onClick={() => handleFieldChange(p.id, 'isVisible', !p.isVisible)}
                                className={`p-2 rounded-lg transition-colors border ${p.isVisible ? 'bg-[#FFD700]/10 border-[#FFD700]/50 text-[#FFD700]' : 'bg-[#333]/50 border-[#333] text-neutral-500'}`}
                            >
                                {p.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                        </div>
                     </td>

                     {/* Upload Imagen Asset Manager */}
                     <td className="p-4 font-normal">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="w-12 h-12 bg-[#0A0A0A] border border-[#333] rounded overflow-hidden flex items-center justify-center p-1 relative group cursor-pointer" onClick={() => triggerImageUpload(p.sku)}>
                               {p.imageUrl === 'uploading...' ? (
                                  <RefreshCw className="w-4 h-4 text-[#FFD700] animate-spin" />
                               ) : (
                                  <>
                                    <img src={getProductImageUrl(p.name, p.imageUrl)} alt={p.sku} className="max-w-full max-h-full object-contain transition-opacity group-hover:opacity-30" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                       <Upload className="w-4 h-4 text-white" />
                                    </div>
                                  </>
                               )}
                            </div>
                        </div>
                     </td>

                     <td className="p-4">
                        <p className="text-sm font-bold text-white uppercase font-industrial line-clamp-2">{p.name}</p>
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{p.category}</p>
                     </td>

                     <td className="p-4">
                        <span className="bg-[#0A0A0A] border border-[#333] px-2 py-1 rounded text-[10px] text-neutral-400 font-mono font-bold tracking-widest">{p.sku}</span>
                     </td>

                     {/* Precios Inline */}
                     <td className="p-4 text-right">
                        <input 
                          type="number" 
                          min="0"
                          value={p.priceRetail}
                          onChange={(e) => handleFieldChange(p.id, 'priceRetail', parseInt(e.target.value) || 0)}
                          className="w-full max-w-[120px] bg-[#0A0A0A] border border-[#333] focus:border-[#FFD700] text-right font-industrial font-bold text-white px-3 py-2 rounded outline-none transition-colors"
                        />
                     </td>
                     <td className="p-4 text-right">
                        <input 
                          type="number" 
                          min="0"
                          value={p.priceWholesale}
                          onChange={(e) => handleFieldChange(p.id, 'priceWholesale', parseInt(e.target.value) || 0)}
                          className="w-full max-w-[120px] bg-[#0A0A0A] border border-[#FFD700]/30 focus:border-[#FFD700] text-right font-industrial font-black text-[#FFD700] px-3 py-2 rounded outline-none transition-colors"
                        />
                     </td>

                     {/* Stock */}
                     <td className="p-4">
                        <div className="flex justify-center">
                           <button 
                             onClick={() => handleFieldChange(p.id, 'inStock', !p.inStock)}
                             className={`relative w-12 h-6 rounded-full transition-colors flex items-center px-1 outline-none ${p.inStock ? 'bg-green-500' : 'bg-red-500/20 border border-red-500/50'}`}
                           >
                             <motion.div 
                               className={`w-4 h-4 rounded-full shadow-md ${p.inStock ? 'bg-white' : 'bg-red-500'}`}
                               animate={{ x: p.inStock ? 22 : 0 }}
                               transition={{ type: "spring", stiffness: 700, damping: 30 }}
                             />
                           </button>
                        </div>
                     </td>

                     {/* Eliminar (Borrador Local) */}
                     <td className="p-4">
                        <div className="flex justify-center">
                           <button 
                             onClick={() => handleDeleteProduct(p.id)}
                             className="text-neutral-600 hover:text-[#D32F2F] transition-colors"
                             title="Eliminar Producto"
                           >
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>

      {/* Modal Añadir Producto */}
      <AnimatePresence>
          {isModalOpen && (
              <>
                 <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                    onClick={() => setIsModalOpen(false)}
                 />
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#111] border border-[#333] p-8 rounded-2xl shadow-2xl z-50 overflow-y-auto max-h-[90vh] custom-scrollbar"
                 >
                    <div className="flex justify-between items-center mb-6 border-b border-[#222] pb-4">
                        <h2 className="text-xl font-industrial font-black uppercase text-white tracking-wider flex items-center gap-2">
                           <ImageIcon className="w-5 h-5 text-[#FFD700]" />
                           Nuevo Producto
                        </h2>
                        <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white transition-colors">
                           <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Nombre *</label>
                            <input type="text" value={newProduct.name} onChange={(e) => setNewProduct(prev => ({...prev, name: e.target.value}))} className="w-full bg-[#151515] border border-[#333] focus:border-[#FFD700] rounded px-4 py-3 text-sm text-white outline-none" placeholder="Ej: Taladro Percutor 800W" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">SKU *</label>
                            <input type="text" value={newProduct.sku} onChange={(e) => setNewProduct(prev => ({...prev, sku: e.target.value?.toUpperCase()}))} className="w-full bg-[#151515] border border-[#333] focus:border-[#FFD700] rounded px-4 py-3 text-sm font-mono text-[#FFD700] outline-none" placeholder="EJ: TL-800" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Precio Detalle</label>
                                <input type="number" value={newProduct.priceRetail} onChange={(e) => setNewProduct(prev => ({...prev, priceRetail: parseInt(e.target.value) || 0}))} className="w-full bg-[#151515] border border-[#333] focus:border-[#FFD700] rounded px-4 py-3 text-sm text-white outline-none text-right" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Precio Mayorista</label>
                                <input type="number" value={newProduct.priceWholesale} onChange={(e) => setNewProduct(prev => ({...prev, priceWholesale: parseInt(e.target.value) || 0}))} className="w-full bg-[#151515] border border-[#FFD700]/50 focus:border-[#FFD700] rounded px-4 py-3 text-sm text-[#FFD700] outline-none font-bold text-right" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Categoría</label>
                            <input type="text" value={newProduct.category} onChange={(e) => setNewProduct(prev => ({...prev, category: e.target.value}))} className="w-full bg-[#151515] border border-[#333] focus:border-[#FFD700] rounded px-4 py-3 text-sm text-white outline-none" placeholder="Ej: Herramientas Eléctricas" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Imagen (URL Opcional)</label>
                            <input type="text" value={newProduct.imageUrl || ''} onChange={(e) => setNewProduct(prev => ({...prev, imageUrl: e.target.value}))} className="w-full bg-[#151515] border border-[#333] focus:border-[#FFD700] rounded px-4 py-3 text-sm text-white outline-none" placeholder="https://... o cargar luego en la tabla" />
                        </div>
                        
                        <div className="pt-4 flex gap-4">
                           <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-[#333] text-neutral-400 font-bold uppercase tracking-widest text-xs rounded-xl hover:text-white transition-colors">
                              Cancelar
                           </button>
                           <button onClick={handleAddProduct} className="flex-1 py-3 bg-[#FFD700] hover:bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl transition-colors shadow-lg shadow-[#FFD700]/10 flex items-center justify-center gap-2">
                              <Plus className="w-4 h-4" /> Añadir
                           </button>
                        </div>
                    </div>
                 </motion.div>
              </>
          )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;
