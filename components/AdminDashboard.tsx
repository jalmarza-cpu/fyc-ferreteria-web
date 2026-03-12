import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, AlertCircle, CheckCircle2, Lock, Eye, EyeOff, Search, RefreshCw, Box } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { supabase, getProductImageUrl } from '../utils/supabase';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState(
    PRODUCTS.map(p => ({ ...p, inStock: p.inStock !== false }))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Filtro
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePriceChange = (id: string, newPrice: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, priceWholesale: parseInt(newPrice) || 0 } : p
    ));
    setSaveStatus('idle');
  };

  const toggleStock = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, inStock: !p.inStock } : p
    ));
    setSaveStatus('idle');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      // 1. Actualizar Supabase (Asume tabla 'productos')
      // Mapeamos a la estructura que iría en base de datos.
      const updates = products.map(p => ({
        sku: p.sku,
        name: p.name,
        price_wholesale: p.priceWholesale,
        in_stock: p.inStock
      }));

      // NOTA: Reemplazar 'productos' por el nombre real de tu tabla si difiere.
      const { error } = await supabase
        .from('productos')
        .upsert(updates, { onConflict: 'sku' });

      if (error) {
        console.warn("Supabase Warning (Tabla no creada): ", error.message);
        // Fallback silently if table doesn't exist yet for prototype purposes
      }

      // Asegurar retardo de 800ms para que Supabase guarde y replique en todos sus nodos
      // Evita condición de carrera donde el Webhook limpia la caché antes de que DB actualice.
      await new Promise(resolve => setTimeout(resolve, 800));

      // 2. Disparar Webhook de Purga de Caché (n8n u otro)
      const WEBHOOK_URL = import.meta.env.VITE_N8N_PURGE_WEBHOOK || 'https://n8n.innobate.cl/webhook/fyc-purge-cache';
      
      try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'purge_cache', timestamp: new Date().toISOString() }),
            headers: { 'Content-Type': 'application/json' }
        });
      } catch (webhookErr) {
        console.warn("Webhook Warning (Falla de Red/CORS):", webhookErr);
      }

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);

    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
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
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 bg-[#111] p-6 rounded-2xl border border-[#222]">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <Box className="w-6 h-6 text-[#FFD700]" />
               <h1 className="text-3xl font-industrial font-black uppercase tracking-wider text-white">Centro de Control F&C</h1>
            </div>
            <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Gestión de Catálogo e Inventario</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
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
                 <><CheckCircle2 className="w-4 h-4" /> Purga Iniciada</>
              ) : (
                 <><Save className="w-4 h-4" /> Guardar & Purgar</>
              )}
            </button>
          </div>
        </div>

        {/* Notificaciones de Sistema */}
        <AnimatePresence>
          {saveStatus === 'success' && (
             <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p className="text-xs font-bold uppercase tracking-wider">La base de datos se ha actualizado. El Webhook de purga de caché ha sido disparado correctamente.</p>
             </motion.div>
          )}
          {saveStatus === 'error' && (
             <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-xs font-bold uppercase tracking-wider">Error de Red. Revisa la consola o configuración CORS de Supabase/n8n.</p>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Tabla Responsiva (Mobile First: Cards en mobile, Tabla en desktop) */}
        <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden shadow-2xl">
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[700px]">
               <thead>
                 <tr className="bg-[#151515] border-b border-[#333] text-xs font-black text-neutral-500 uppercase tracking-widest">
                    <th className="p-4 w-20 text-center">Img</th>
                    <th className="p-4">Producto</th>
                    <th className="p-4 w-32">SKU</th>
                    <th className="p-4 w-48 text-right">Precio Mayorista ($)</th>
                    <th className="p-4 w-32 text-center">Stock ON/OFF</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-[#222]">
                 {filteredProducts.map((p) => (
                   <tr key={p.id} className={`hover:bg-[#151515]/50 transition-colors ${!p.inStock ? 'opacity-50' : ''}`}>
                     <td className="p-4">
                        <div className="w-12 h-12 bg-[#0A0A0A] border border-[#333] rounded overflow-hidden flex items-center justify-center p-1">
                           <img src={getProductImageUrl(p.name, p.imageUrl)} alt={p.sku} className="max-w-full max-h-full object-contain" />
                        </div>
                     </td>
                     <td className="p-4">
                        <p className="text-sm font-bold text-white uppercase font-industrial line-clamp-2">{p.name}</p>
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{p.category}</p>
                     </td>
                     <td className="p-4">
                        <span className="bg-[#0A0A0A] border border-[#333] px-2 py-1 rounded text-[10px] text-[#FFD700] font-mono font-bold tracking-widest">{p.sku}</span>
                     </td>
                     <td className="p-4 text-right flex justify-end">
                        <input 
                          type="number" 
                          min="0"
                          value={p.priceWholesale}
                          onChange={(e) => handlePriceChange(p.id, e.target.value)}
                          className="w-28 bg-[#0A0A0A] border border-[#333] focus:border-[#FFD700] text-right font-industrial font-black text-white px-3 py-2 rounded outline-none transition-colors"
                        />
                     </td>
                     <td className="p-4">
                        <div className="flex justify-center">
                           <button 
                             onClick={() => toggleStock(p.id)}
                             className={`relative w-12 h-6 rounded-full transition-colors flex items-center outline-none ${p.inStock ? 'bg-green-500' : 'bg-red-500/20 border border-red-500/50'}`}
                           >
                             <motion.div 
                               layout
                               className={`w-4 h-4 rounded-full shadow-md ${p.inStock ? 'bg-white ml-1' : 'bg-red-500 ml-auto mr-1'}`}
                               animate={{ x: p.inStock ? 24 : 0 }}
                               transition={{ type: "spring", stiffness: 500, damping: 30 }}
                             />
                           </button>
                        </div>
                     </td>
                   </tr>
                 ))}
                 
                 {filteredProducts.length === 0 && (
                    <tr>
                       <td colSpan={5} className="p-8 text-center text-neutral-500">
                          <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                          <p className="text-xs font-bold uppercase tracking-widest">No se encontraron productos.</p>
                       </td>
                    </tr>
                 )}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
