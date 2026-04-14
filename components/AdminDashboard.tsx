import { useState, useEffect, useRef } from 'react';
import { supabase, supabaseAdmin, getProductImageUrl } from '../utils/supabase';
import { Search, AlertTriangle, Plus, Package, Save, CheckCircle, X, Image as ImageIcon, CameraOff, Edit, Upload, Trash2, FilterX } from 'lucide-react';
import { CATEGORIES, SUBCATEGORY_MAP } from '../constants';

const AdminDashboard = ({ searchTerm = '', onSearchChange }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm); // Sync initial state
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'out_of_stock', 'in_stock', 'no_image', 'trash'
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [updatingId, setUpdatingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [dbCategorias, setDbCategorias] = useState(CATEGORIES);
  const [dbSubcategorias, setDbSubcategorias] = useState(SUBCATEGORY_MAP);

  const fetchCategorias = async () => {
    try {
      const { data, error } = await supabaseAdmin.from('categorias').select('*');
      if (!error && data && data.length > 0) {
        const principales = data.filter(c => !c.es_subcategoria && !c.categoria_padre).map(c => c.nombre);
        if (principales.length > 0) setDbCategorias(principales);
        
        const subs = data.filter(c => c.es_subcategoria || c.categoria_padre).map(c => ({
          parentCategory: c.categoria_padre || c.padre || 'Herramientas',
          subcategory: c.nombre
        }));
        if (subs.length > 0) setDbSubcategorias(subs);
      }
    } catch (e) {
      console.warn('Usando constants.tsx como fallback para categorías (tabla categorias no encontrada)');
    }
  };

  const triggerCloudflarePurge = async () => {
    try {
      await fetch('https://servicios-n8n-n8n.9barxf.easypanel.host/webhook/easypanel-deploy-fyc', {
        method: 'POST',
        mode: 'no-cors'
      });
      console.log('Cloudflare purge triggered');
    } catch (e) {
      console.error('Error triggering Cloudflare purge:', e);
    }
  };

  // Sync with global searchTerm when it changes
  useEffect(() => {
    if (searchTerm !== undefined) {
      setLocalSearchTerm(searchTerm);
    }
  }, [searchTerm]);

  // Form State
  const [formData, setFormData] = useState({
    id: null,
    sku: '',
    nombre: '',
    descripcion: '',
    categoria: 'Herramientas',
    precio_mayorista: 0,
    precio_detalle: 0,
    url_imagen: '',
    en_stock: true
  });

  useEffect(() => {
    const authStatus = sessionStorage.getItem('fyc_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchProductos();
      fetchCategorias();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'fyc2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('fyc_admin_auth', 'true');
      fetchProductos();
    } else {
      alert('Clave incorrecta');
    }
  };

  const fetchProductos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) console.error('Error cargando productos:', error);
    else setProductos(data || []);
    setLoading(false);
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setFormData({
      id: null, sku: '', nombre: '', descripcion: '', categoria: 'Herramientas Manuales',
      precio_mayorista: 0, precio_detalle: 0, url_imagen: '', en_stock: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (producto) => {
    setIsEditing(true);
    setFormData({
      id: producto.id,
      sku: String(producto.sku || ''),
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      categoria: producto.categoria,
      precio_mayorista: producto.precio_mayorista,
      precio_detalle: producto.precio_detalle,
      url_imagen: producto.url_imagen || '',
      en_stock: producto.en_stock
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${String(formData.sku || 'prod')}-${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    try {
      const { error: uploadError } = await supabaseAdmin.storage
        .from('productos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      setFormData({ ...formData, url_imagen: filePath });
    } catch (error) {
      alert('Error subiendo imagen: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Aseguramos SKU como String explícitamente en el envío
    const payload = {
      sku: String(formData.sku).trim(),
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      categoria: formData.categoria,
      precio_mayorista: formData.precio_mayorista,
      precio_detalle: formData.precio_detalle,
      url_imagen: formData.url_imagen,
      en_stock: formData.en_stock
    };

    try {
      if (isEditing) {
        const { error } = await supabaseAdmin
          .from('productos')
          .update(payload)
          .eq('id', formData.id);

        if (error) throw error;
        setProductos(productos.map(p => p.id === formData.id ? { ...p, ...payload } : p));
      } else {
        const { data, error } = await supabaseAdmin
          .from('productos')
          .insert([payload])
          .select();

        if (error) throw error;
        if (data) setProductos([data[0], ...productos]);
      }
      setIsModalOpen(false);
      triggerCloudflarePurge(); // Trigger cache purge on save
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // 1. Eliminar la imagen del storage si existe y pertenece a uploads/
      if (formData.url_imagen && formData.url_imagen.startsWith('uploads/')) {
        const { error: storageError } = await supabaseAdmin.storage
          .from('productos')
          .remove([formData.url_imagen]);
        
        if (storageError) {
          console.error('Error eliminando imagen del storage:', storageError);
        }
      }

      // 2. Eliminar el registro lógicamente (para sobreescribir fallback de constants)
      let updateError = null;
      
      if (formData.id && !String(formData.id).startsWith('constants-')) {
        // Actualizar registro existente
        const { error } = await supabaseAdmin
          .from('productos')
          .update({ estado_visibilidad: false, en_stock: false })
          .eq('id', formData.id);
        updateError = error;
      } else {
        // Es un producto de constants, crear un tombstone en Supabase
        const payload = {
          sku: formData.sku,
          nombre: formData.nombre,
          precio_detalle: formData.priceRetail || 0,
          precio_mayorista: formData.priceWholesale || 0,
          url_imagen: formData.url_imagen || '',
          categoria: formData.category || 'Herramientas',
          en_stock: false,
          estado_visibilidad: false
        };
        const { error } = await supabaseAdmin.from('productos').insert([payload]);
        updateError = error;
      }

      if (updateError) throw updateError;
      
      // 3. Actualizar estado local
      setProductos(productos.filter(p => p.id !== formData.id));
      setIsDeleteModalOpen(false);
      setIsModalOpen(false);
      triggerCloudflarePurge(); // Trigger cache purge on logic delete
    } catch (error) {
      alert('Error eliminando producto: ' + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const updateQuickStock = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    setUpdatingId(id + 'stock');

    try {
      const { error } = await supabaseAdmin
        .from('productos')
        .update({ en_stock: newStatus })
        .eq('id', id);

      if (error) throw error;
      setProductos(productos.map(p => p.id === id ? { ...p, en_stock: newStatus } : p));
      triggerCloudflarePurge(); // Trigger cache purge on stock change
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const isNoImage = (url) => {
    if (!url) return true;
    const lower = url.toLowerCase();
    // Es una imagen válida si tiene SKU (contiene números), empieza con http, uploads/ o tiene extensión
    if (lower.startsWith('http') || lower.startsWith('uploads/') || url.includes('.') || /\d+/.test(url)) return false;
    return true;
  };

  const filtered = productos.filter(p => {
    // Si está eliminado y no estamos en la vista de papelera, ocultarlo.
    // Si estamos en la vista de papelera, solo mostrar los eliminados.
    if (activeFilter !== 'trash' && p.estado_visibilidad === false) return false;
    if (activeFilter === 'trash' && p.estado_visibilidad !== false) return false;

    // FILTRO DE BÚSQUEDA (SKU o Nombre) - Usar localSearchTerm
    const search = (localSearchTerm || '').toLowerCase().trim();
    const productName = (p.nombre || '').toLowerCase();
    const productSku = String(p.sku || '').toLowerCase();

    const matchesSearch = productSku.includes(search) || productName.includes(search);

    // FILTROS DE ESTADO (Stock, Sin imagen, etc.)
    let matchesFilter = true;
    if (activeFilter === 'out_of_stock') matchesFilter = p.en_stock === false;
    if (activeFilter === 'in_stock') matchesFilter = p.en_stock === true;
    if (activeFilter === 'no_image') matchesFilter = !p.url_imagen;

    // FILTRO DE CATEGORÍA
    const matchesCategory = selectedCategory === 'Todas' || p.categoria === selectedCategory;

    return matchesSearch && matchesFilter && matchesCategory;
  });

  if (!isAuthenticated && !loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-[#222] rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
            <Package size={40} className="text-black" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Acceso Restringido</h2>
          <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mt-2">Panel Administrativo F&C</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-2">Contraseña del Sistema</label>
            <input
              autoFocus
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-[#333] focus:border-yellow-500 rounded-xl py-4 px-4 text-center text-xl font-black tracking-[0.5em] outline-none transition-all text-white"
              placeholder="••••••"
            />
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            ENTRAR AL SISTEMA
          </button>
        </form>
      </div>
    </div>
  );

  if (loading) return (
    <div className="p-8 bg-black min-h-screen text-white flex flex-col items-center justify-center">
      <Package className="w-12 h-12 text-yellow-500 animate-bounce mb-4" />
      <p className="font-bold tracking-widest uppercase text-xs">Cargando inventario de F&C...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-[#050505] text-white min-h-screen font-sans relative">
      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => !isDeleting && setIsDeleteModalOpen(false)} />
          <div className="bg-[#0A0A0A] border border-red-500/50 w-full max-w-md rounded-2xl p-6 relative z-10 shadow-[0_0_50px_rgba(220,38,38,0.3)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase text-red-500 flex items-center gap-2">
                <AlertTriangle size={24} /> Eliminar Producto
              </h2>
            </div>
            
            <p className="text-white text-sm mb-6 leading-relaxed">
              ¿Estás seguro de eliminar permanentemente el producto <strong className="text-yellow-500">"{formData.nombre}"</strong>? 
              <br/><br/>
              <span className="text-red-400 font-bold block bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                Esta acción no se puede deshacer y eliminará también las imágenes asociadas.
              </span>
            </p>
            
            <div className="flex gap-3">
              <button 
                disabled={isDeleting} 
                onClick={() => setIsDeleteModalOpen(false)} 
                className="flex-1 bg-[#111] text-white py-3 rounded-xl font-bold uppercase text-[11px] hover:bg-[#222] transition border border-[#333]"
              >
                Cancelar
              </button>
              <button 
                disabled={isDeleting} 
                onClick={handleDelete} 
                className="flex-1 bg-red-600/10 text-red-500 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-red-600 hover:text-white transition flex items-center justify-center gap-2 border border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? <Save className="animate-spin" size={16} /> : <Trash2 size={16} />}
                {isDeleting ? 'Eliminando...' : 'Sí, Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-[#0A0A0A] border border-[#222] w-full max-w-2xl rounded-2xl p-6 relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase text-yellow-500">
                {isEditing ? 'Editar Ficha Producto' : 'Nuevo Producto'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white p-2 bg-neutral-900 rounded-full"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-[#111] p-4 rounded-xl border border-dashed border-[#333]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-40 h-40 bg-black rounded-lg border border-[#222] overflow-hidden flex items-center justify-center relative group">
                    {formData.url_imagen ? (
                      <img
                        src={getProductImageUrl(formData.nombre, formData.url_imagen, formData.sku)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/111/yellow?text=Formato+Inválido'; }}
                      />
                    ) : (
                      <ImageIcon className="text-zinc-800" size={48} />
                    )}
                    {uploading && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><Save className="animate-spin text-yellow-500" /></div>}
                  </div>

                  <div className="flex-1 space-y-4">
                    <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest">Previsualización e Imagen</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.url_imagen || ''}
                        onChange={e => setFormData({ ...formData, url_imagen: e.target.value })}
                        className="flex-1 bg-black border border-[#333] rounded-lg p-2.5 text-sm outline-none focus:border-yellow-500 text-white font-mono"
                        placeholder="Path o URL de imagen..."
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#222] hover:bg-[#333] text-white p-2.5 rounded-lg transition border border-[#444]"
                      >
                        <Upload size={20} />
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-500 italic">Rutas de Supabase (uploads/xxx) o URLs externas.</p>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-neutral-500 uppercase ml-1">SKU Requerido</label>
                  <input required value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} className="w-full bg-[#111] border border-[#333] rounded-lg p-2.5 text-sm outline-none focus:border-yellow-500 text-white font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-neutral-500 uppercase ml-1">Nombre Comercial</label>
                  <input required value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} className="w-full bg-[#111] border border-[#333] rounded-lg p-2.5 text-sm outline-none focus:border-yellow-500 text-white font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-yellow-500/5 p-4 rounded-xl border border-yellow-500/10">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-yellow-600 uppercase ml-1">Precio Mayorista ($)</label>
                  <input type="number" required value={formData.precio_mayorista} onChange={e => setFormData({ ...formData, precio_mayorista: parseInt(e.target.value) })} className="w-full bg-black border border-yellow-500/20 rounded-lg p-2.5 text-sm outline-none focus:border-yellow-500 text-white font-black" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-yellow-600 uppercase ml-1">Precio Detalle ($)</label>
                  <input type="number" required value={formData.precio_detalle} onChange={e => setFormData({ ...formData, precio_detalle: parseInt(e.target.value) })} className="w-full bg-black border border-yellow-500/20 rounded-lg p-2.5 text-sm outline-none focus:border-yellow-500 text-white font-black" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-neutral-500 uppercase ml-1">Categoría de Catálogo</label>
                  <select value={formData.categoria} onChange={e => setFormData({ ...formData, categoria: e.target.value })} className="w-full bg-[#111] border border-[#333] rounded-lg p-2.5 text-sm outline-none focus:border-yellow-500 text-white font-bold">
                    <option value="">Selecciona Categoría...</option>
                    {dbCategorias.map(cat => (
                      <optgroup label={cat} key={cat}>
                        <option value={cat}>{cat}</option>
                        {dbSubcategorias.filter(s => s.parentCategory === cat).map(sub => (
                          <option value={sub.subcategory} key={sub.subcategory}>-- {sub.subcategory}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, en_stock: !formData.en_stock })}
                    className={`w-full py-2.5 rounded-lg font-black text-xs transition border-2 flex items-center justify-center gap-2 ${formData.en_stock ? 'bg-green-600/10 border-green-600 text-green-500' : 'bg-red-600/10 border-red-600 text-red-500'}`}
                  >
                    {formData.en_stock ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                    {formData.en_stock ? ' PRODUCTO EN STOCK' : 'PRODUCTO AGOTADO'}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#222]">
                {isEditing && (
                  <button 
                    type="button" 
                    onClick={() => setIsDeleteModalOpen(true)} 
                    className="bg-red-600/10 border border-red-600/50 text-red-500 px-4 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-red-600 hover:text-white transition flex items-center justify-center gap-2"
                    title="Eliminar producto permanentemente"
                  >
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">Eliminar</span>
                  </button>
                )}
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-[#111] text-white py-3 rounded-xl font-bold uppercase text-[11px] hover:bg-[#222] transition border border-[#333]">Cancelar</button>
                <button disabled={isSaving} type="submit" className="flex-[2] bg-yellow-500 text-black py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-yellow-400 transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                  {isSaving ? <Save className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                  {isSaving ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Crear Producto')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-[#0A0A0A] p-6 rounded-2xl border border-[#222]">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-1 flex items-center gap-3 text-balance">
            <Package className="text-yellow-500 hidden sm:block" /> Centro de <span className="text-yellow-500">Control</span>
          </h1>
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em]">Inventario Maestro | F&C Soluciones Ferreteras</p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="BUSCAR SKU O NOMBRE..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-[#333] focus:border-yellow-500 rounded-lg py-3 pl-10 pr-4 text-[10px] font-black uppercase transition-all outline-none"
            />
            {localSearchTerm && (
              <button onClick={() => setLocalSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          <button
            onClick={openCreateModal}
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 transition shadow-[0_0_15px_rgba(234,179,8,0.3)] flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Nuevo SKU
          </button>
        </div>
      </div>

      {/* STATS MINI BAR - INTERACTIVE FILTERS */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-8">
        <button onClick={() => setActiveFilter('all')} className={`bg-[#0A0A0A] border p-4 rounded-xl flex items-center gap-4 transition text-left group ${activeFilter === 'all' ? 'border-zinc-100 ring-1 ring-zinc-500' : 'border-[#222] hover:border-zinc-700'}`}>
          <div className={`p-3 rounded-lg transition ${activeFilter === 'all' ? 'bg-zinc-100 text-black' : 'bg-zinc-900 text-zinc-400'}`}><Package size={18} /></div>
          <div>
            <p className="text-[9px] text-neutral-500 font-black uppercase">Total SKU</p>
            <p className="text-xl font-black text-white leading-none mt-1">{productos.filter(p => p.estado_visibilidad !== false).length}</p>
          </div>
        </button>

        <button onClick={() => setActiveFilter('out_of_stock')} className={`bg-[#0A0A0A] border p-4 rounded-xl border-l-4 flex items-center gap-4 transition text-left ${activeFilter === 'out_of_stock' ? 'border-red-600 ring-1 ring-red-900/50' : 'border-[#222] border-l-red-600/50 hover:border-red-900'}`}>
          <div className={`p-3 rounded-lg transition ${activeFilter === 'out_of_stock' ? 'bg-red-600 text-white' : 'bg-red-950/20 text-red-500'}`}><AlertTriangle size={18} /></div>
          <div>
            <p className="text-[9px] text-neutral-500 font-black uppercase">Agotados</p>
            <p className="text-xl font-black text-red-500 leading-none mt-1">{productos.filter(p => !p.en_stock && p.estado_visibilidad !== false).length}</p>
          </div>
        </button>

        <button onClick={() => setActiveFilter('no_image')} className={`bg-[#0A0A0A] border p-4 rounded-xl border-l-4 flex items-center gap-4 transition text-left ${activeFilter === 'no_image' ? 'border-yellow-600 ring-1 ring-yellow-900/50' : 'border-[#222] border-l-yellow-600/50 hover:border-yellow-900'}`}>
          <div className={`p-3 rounded-lg transition ${activeFilter === 'no_image' ? 'bg-yellow-600 text-black' : 'bg-yellow-950/20 text-yellow-500'}`}><CameraOff size={18} /></div>
          <div>
            <p className="text-[9px] text-neutral-500 font-black uppercase">Sin Foto</p>
            <p className="text-xl font-black text-yellow-500 leading-none mt-1">{productos.filter(p => isNoImage(p.url_imagen) && p.estado_visibilidad !== false).length}</p>
          </div>
        </button>

        <button onClick={() => setActiveFilter('in_stock')} className={`bg-[#0A0A0A] border p-4 rounded-xl border-l-4 flex items-center gap-4 transition text-left ${activeFilter === 'in_stock' ? 'border-green-600 ring-1 ring-green-900/50' : 'border-[#222] border-l-green-600/50 hover:border-green-900'}`}>
          <div className={`p-3 rounded-lg transition ${activeFilter === 'in_stock' ? 'bg-green-600 text-white' : 'bg-green-950/20 text-green-500'}`}><CheckCircle size={18} /></div>
          <div>
            <p className="text-[9px] text-neutral-500 font-black uppercase">En Stock</p>
            <p className="text-xl font-black text-green-500 leading-none mt-1">{productos.filter(p => p.en_stock && p.estado_visibilidad !== false).length}</p>
          </div>
        </button>

        <button onClick={() => setActiveFilter('trash')} className={`bg-[#0A0A0A] border p-4 rounded-xl border-l-4 flex items-center gap-4 transition text-left ${activeFilter === 'trash' ? 'border-zinc-500 ring-1 ring-zinc-500/50' : 'border-[#222] border-l-zinc-600/50 hover:border-zinc-500'}`}>
          <div className={`p-3 rounded-lg transition ${activeFilter === 'trash' ? 'bg-zinc-600 text-white' : 'bg-zinc-950/20 text-zinc-500'}`}><Trash2 size={18} /></div>
          <div>
            <p className="text-[9px] text-neutral-500 font-black uppercase">Papelera</p>
            <p className="text-xl font-black text-zinc-500 leading-none mt-1">{productos.filter(p => p.estado_visibilidad === false).length}</p>
          </div>
        </button>

        <button onClick={() => { setActiveFilter('all'); setLocalSearchTerm(''); setSelectedCategory('Todas'); }} className="bg-zinc-900 hover:bg-zinc-800 p-4 rounded-xl flex items-center justify-center gap-3 transition group col-span-2 lg:col-span-1">
          <FilterX className="text-zinc-500 group-hover:text-white transition" size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">Limpiar</span>
        </button>
      </div>

      {/* FILTER ACTIVE BADGE & CATEGORY SELECTOR */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-1 flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {['Todas', ...dbCategorias].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all border
                ${selectedCategory === cat
                  ? 'bg-yellow-500 text-black border-yellow-500'
                  : 'bg-[#111] text-neutral-500 border-[#222] hover:border-neutral-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {(activeFilter !== 'all' || selectedCategory !== 'Todas') && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-[10px] font-black uppercase text-neutral-500">Filtrando:</span>
          <div className="bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full flex items-center gap-2">
            <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">
              {activeFilter === 'out_of_stock' && 'Agotados'}
              {activeFilter === 'in_stock' && 'En Stock'}
              {activeFilter === 'no_image' && 'Sin Imagen'}
              {activeFilter === 'trash' && 'Papelera'}
              {selectedCategory !== 'Todas' && ` | ${selectedCategory}`}
            </span>
            <button onClick={() => { setActiveFilter('all'); setSelectedCategory('Todas'); }} className="text-yellow-500 hover:text-white"><X size={12} /></button>
          </div>
        </div>
      )}

      <div className="bg-[#0A0A0A] rounded-2xl border border-[#222] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#111] text-neutral-500 uppercase text-[9px] font-black tracking-[0.25em] border-b border-[#222]">
                <th className="p-6">Maestro de Producto</th>
                <th className="p-6 text-center">M. Mayorista</th>
                <th className="p-6 text-center">M. Detalle</th>
                <th className="p-6 text-center w-40">Acciones / Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {filtered.map((p) => (
                <tr key={p.id} className={`transition group ${!p.en_stock ? 'bg-red-900/[0.03]' : 'hover:bg-zinc-900/40'}`}>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-zinc-950 rounded-lg border border-[#222] overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                        {!isNoImage(p.url_imagen) ? (
                          <img src={getProductImageUrl(p.nombre, p.url_imagen, p.sku)} alt={p.nombre} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center gap-1 opacity-40">
                            <CameraOff size={14} className="text-neutral-500" />
                            <span className="text-[7px] font-black uppercase tracking-tighter text-neutral-500">Sin Imagen</span>
                          </div>
                        )}
                        {isNoImage(p.url_imagen) && <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-yellow-500/80 rounded-full border border-black animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.4)]"></div>}
                      </div>
                      <div>
                        <div className={`font-black uppercase text-xs leading-tight max-w-sm truncate ${!p.en_stock ? 'text-red-400' : 'text-zinc-100'}`}>
                          {p.nombre}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[9px] font-black text-yellow-500/80 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 tracking-widest">SKU: {p.sku}</span>
                          <button onClick={() => setSelectedCategory(p.categoria)} className="text-[9px] font-black text-neutral-500 hover:text-yellow-500 uppercase tracking-tighter bg-transparent border-none p-0 transition-colors">
                            {p.categoria}
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="inline-flex items-center bg-[#111] border border-[#333] rounded-lg px-3 py-2 group-hover:border-yellow-500/30 transition-all">
                      <span className="text-neutral-600 font-black text-xs mr-1">$</span>
                      <input
                        type="number"
                        className="bg-transparent w-20 text-center font-black text-sm outline-none text-zinc-300"
                        defaultValue={p.precio_mayorista}
                        onBlur={async (e) => {
                          const val = parseInt(e.target.value);
                          if (val !== p.precio_mayorista) {
                            setUpdatingId(p.id + 'mayorista');
                            await supabaseAdmin.from('productos').update({ precio_mayorista: val }).eq('id', p.id);
                            setProductos(productos.map(prod => prod.id === p.id ? { ...prod, precio_mayorista: val } : prod));
                            setUpdatingId(null);
                          }
                        }}
                      />
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="inline-flex items-center bg-[#111] border border-[#333] rounded-lg px-3 py-2 group-hover:border-yellow-500/30 transition-all">
                      <span className="text-neutral-600 font-black text-xs mr-1">$</span>
                      <input
                        type="number"
                        className="bg-transparent w-20 text-center font-black text-sm outline-none text-zinc-300"
                        defaultValue={p.precio_detalle}
                        onBlur={async (e) => {
                          const val = parseInt(e.target.value);
                          if (val !== p.precio_detalle) {
                            setUpdatingId(p.id + 'detalle');
                            await supabaseAdmin.from('productos').update({ precio_detalle: val }).eq('id', p.id);
                            setProductos(productos.map(prod => prod.id === p.id ? { ...prod, precio_detalle: val } : prod));
                            setUpdatingId(null);
                          }
                        }}
                      />
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-2">
                      <button onClick={() => openEditModal(p)} className="w-full bg-[#111] hover:bg-[#222] border border-[#333] text-white py-2 rounded-lg text-[8px] font-black tracking-[0.2em] flex items-center justify-center gap-2 transition">
                        <Edit size={10} /> EDITAR
                      </button>
                      <button
                        onClick={() => updateQuickStock(p.id, p.en_stock)}
                        className={`w-full py-2 rounded-lg text-[8px] font-black tracking-[0.2em] transition flex items-center justify-center gap-2 border 
                          ${p.en_stock
                            ? 'bg-green-600/5 border-green-600/30 text-green-500 hover:bg-green-600 hover:text-white'
                            : 'bg-red-600/10 border-red-600 text-red-500 animate-pulse'
                          }`}
                      >
                        {updatingId === p.id + 'stock' ? <Save className="animate-spin" size={10} /> : (p.en_stock ? <CheckCircle size={10} /> : <AlertTriangle size={10} />)}
                        {p.en_stock ? 'EN STOCK' : 'AGOTADO'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center">
              <Search className="w-16 h-16 text-zinc-900 mb-4" />
              <p className="text-neutral-600 font-black uppercase tracking-[0.3em] text-xs">Sin coincidencias</p>
              <button onClick={() => { setActiveFilter('all'); setLocalSearchTerm(''); setSelectedCategory('Todas'); }} className="mt-4 text-yellow-500 hover:text-white text-[10px] font-black uppercase underline tracking-widest">Reiniciar filtros</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;