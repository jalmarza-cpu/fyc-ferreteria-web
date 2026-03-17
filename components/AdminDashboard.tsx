import { useState, useEffect, useRef } from 'react';
import { supabase, supabaseAdmin, getProductImageUrl } from '../utils/supabase';
import { Search, AlertTriangle, Plus, Package, Save, CheckCircle, X, Image as ImageIcon, Edit, Upload, Trash2, ExternalLink, FilterX } from 'lucide-react';

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'out_of_stock', 'in_stock', 'no_image'
  const [updatingId, setUpdatingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    id: null,
    sku: '',
    nombre: '',
    descripcion: '',
    categoria: 'Herramientas Manuales',
    precio_mayorista: 0,
    precio_detalle: 0,
    url_imagen: '',
    en_stock: true
  });

  useEffect(() => {
    fetchProductos();
  }, []);

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
      sku: producto.sku,
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
    const fileName = `${formData.sku || 'prod'}-${Date.now()}.${fileExt}`;
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

    // Preparation for Supabase
    const payload = {
      sku: formData.sku,
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
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsSaving(false);
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
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Improved Logic for "Sin Foto"
  const isNoImage = (url) => {
    if (!url) return true;
    const lower = url.toLowerCase();

    // Si es una URL completa o un path de uploads, es válida
    if (lower.startsWith('http') || lower.startsWith('uploads/')) {
      return false;
    }

    // Cualquier otra cosa (como rutas locales, placeholders o texto suelto) se considera "Sin Foto"
    return true;
  };

  const filtered = productos.filter(p => {
    const matchesSearch = (p.nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku || '').toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (activeFilter === 'out_of_stock') matchesFilter = !p.en_stock;
    if (activeFilter === 'in_stock') matchesFilter = p.en_stock;
    if (activeFilter === 'no_image') matchesFilter = isNoImage(p.url_imagen);

    return matchesSearch && matchesFilter;
  });

  if (loading) return (
    <div className="p-8 bg-black min-h-screen text-white flex flex-col items-center justify-center">
      <Package className="w-12 h-12 text-yellow-500 animate-bounce mb-4" />
      <p className="font-bold tracking-widest uppercase text-xs">Cargando inventario de F&C...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-[#050505] text-white min-h-screen font-sans relative">

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
              {/* IMAGE SECTION - PROMINENT */}
              <div className="bg-[#111] p-4 rounded-xl border border-dashed border-[#333]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-40 h-40 bg-black rounded-lg border border-[#222] overflow-hidden flex items-center justify-center relative group">
                    {formData.url_imagen ? (
                      <img
                        src={getProductImageUrl(formData.nombre, formData.url_imagen)}
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
                        title="Subir desde mi PC"
                      >
                        <Upload size={20} />
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-500 italic">Puedes pegar un path de Supabase (uploads/xxx), una URL de proveedor, o subir una nueva.</p>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-neutral-500 uppercase ml-1">SKU Requerido</label>
                  <input required value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} className="w-full bg-[#111] border border-[#333] rounded-lg p-2.5 text-sm outline-none focus:border-yellow-500 text-white font-bold" placeholder="011387" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-neutral-500 uppercase ml-1">Nombre Comercial</label>
                  <input required value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} className="w-full bg-[#111] border border-[#333] rounded-lg p-2.5 text-sm outline-none focus:border-yellow-500 text-white font-bold" placeholder='Brocha Profesional 4"' />
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
                  <select value={formData.categoria} onChange={e => setFormData({ ...formData, categoria: e.target.value })} className="w-full bg-[#111] border border-[#333] rounded-lg p-2.5 text-sm outline-none focus:border-yellow-500 text-white">
                    <option>Herramientas Manuales</option>
                    <option>Revestimientos</option>
                    <option>Fijaciones</option>
                    <option>Electricidad</option>
                    <option>Pinturas</option>
                    <option>Soldadura</option>
                    <option>Gasfitería</option>
                    <option>Seguridad</option>
                    <option>Adhesivos</option>
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
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-[#111] text-white py-3 rounded-xl font-bold uppercase text-[11px] hover:bg-[#222] transition">Cancelar</button>
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
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em]">Inventario Real Time | F&C Soluciones Ferreteras</p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="BUSCAR POR SKU O NOMBRE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-[#333] focus:border-yellow-500 rounded-lg py-3 pl-10 pr-4 text-[10px] font-black uppercase transition-all outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
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
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        <button
          onClick={() => setActiveFilter('all')}
          className={`bg-[#0A0A0A] border p-4 rounded-xl flex items-center gap-4 transition text-left group ${activeFilter === 'all' ? 'border-zinc-100 ring-1 ring-zinc-500' : 'border-[#222] hover:border-zinc-700'}`}
        >
          <div className={`p-3 rounded-lg transition ${activeFilter === 'all' ? 'bg-zinc-100 text-black' : 'bg-zinc-900 text-zinc-400'}`}><Package size={18} /></div>
          <div>
            <p className="text-[9px] text-neutral-500 font-black uppercase">Total SKU</p>
            <p className="text-xl font-black text-white leading-none mt-1">{productos.length}</p>
          </div>
        </button>

        <button
          onClick={() => setActiveFilter('out_of_stock')}
          className={`bg-[#0A0A0A] border p-4 rounded-xl border-l-4 flex items-center gap-4 transition text-left ${activeFilter === 'out_of_stock' ? 'border-red-600 ring-1 ring-red-900/50' : 'border-[#222] border-l-red-600/50 hover:border-red-900'}`}
        >
          <div className={`p-3 rounded-lg transition ${activeFilter === 'out_of_stock' ? 'bg-red-600 text-white' : 'bg-red-950/20 text-red-500'}`}><AlertTriangle size={18} /></div>
          <div>
            <p className="text-[9px] text-neutral-500 font-black uppercase">Agotados</p>
            <p className="text-xl font-black text-red-500 leading-none mt-1">{productos.filter(p => !p.en_stock).length}</p>
          </div>
        </button>

        <button
          onClick={() => setActiveFilter('no_image')}
          className={`bg-[#0A0A0A] border p-4 rounded-xl border-l-4 flex items-center gap-4 transition text-left ${activeFilter === 'no_image' ? 'border-yellow-600 ring-1 ring-yellow-900/50' : 'border-[#222] border-l-yellow-600/50 hover:border-yellow-900'}`}
        >
          <div className={`p-3 rounded-lg transition ${activeFilter === 'no_image' ? 'bg-yellow-600 text-black' : 'bg-yellow-950/20 text-yellow-500'}`}><ImageIcon size={18} /></div>
          <div>
            <p className="text-[9px] text-neutral-500 font-black uppercase">Sin Foto</p>
            <p className="text-xl font-black text-yellow-500 leading-none mt-1">{productos.filter(p => isNoImage(p.url_imagen)).length}</p>
          </div>
        </button>

        <button
          onClick={() => setActiveFilter('in_stock')}
          className={`bg-[#0A0A0A] border p-4 rounded-xl border-l-4 flex items-center gap-4 transition text-left ${activeFilter === 'in_stock' ? 'border-green-600 ring-1 ring-green-900/50' : 'border-[#222] border-l-green-600/50 hover:border-green-900'}`}
        >
          <div className={`p-3 rounded-lg transition ${activeFilter === 'in_stock' ? 'bg-green-600 text-white' : 'bg-green-950/20 text-green-500'}`}><CheckCircle size={18} /></div>
          <div>
            <p className="text-[9px] text-neutral-500 font-black uppercase">En Stock</p>
            <p className="text-xl font-black text-green-500 leading-none mt-1">{productos.filter(p => p.en_stock).length}</p>
          </div>
        </button>

        <button
          onClick={() => { setActiveFilter('all'); setSearchTerm(''); }}
          className="bg-zinc-900 hover:bg-zinc-800 p-4 rounded-xl flex items-center justify-center gap-3 transition group col-span-2 lg:col-span-1"
        >
          <FilterX className="text-zinc-500 group-hover:text-white transition" size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">Ver Todos</span>
        </button>
      </div>

      {/* FILTER ACTIVE BADGE */}
      {activeFilter !== 'all' && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-[10px] font-black uppercase text-neutral-500">Filtrando por:</span>
          <div className="bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full flex items-center gap-2">
            <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">
              {activeFilter === 'out_of_stock' && 'Productos Agotados'}
              {activeFilter === 'in_stock' && 'Productos Disponibles'}
              {activeFilter === 'no_image' && 'Productos sin Imagen'}
            </span>
            <button onClick={() => setActiveFilter('all')} className="text-yellow-500 hover:text-white"><X size={12} /></button>
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
                      <div className="w-14 h-14 bg-black rounded-lg border border-[#222] overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                        {p.url_imagen ? (
                          <img src={getProductImageUrl(p.nombre, p.url_imagen)} alt={p.nombre} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={18} className="text-zinc-800" />
                        )}
                        {!p.url_imagen && <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-500 rounded-full border border-black animate-pulse" title="Sin Foto"></div>}
                      </div>
                      <div>
                        <div className={`font-black uppercase text-xs leading-tight max-w-sm truncate ${!p.en_stock ? 'text-red-400' : 'text-zinc-100'}`}>
                          {p.nombre}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[9px] font-black text-yellow-500/80 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 tracking-widest">SKU: {p.sku}</span>
                          <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-tighter">{p.categoria}</span>
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
                            const { error } = await supabaseAdmin.from('productos').update({ precio_mayorista: val }).eq('id', p.id);
                            if (!error) setProductos(productos.map(prod => prod.id === p.id ? { ...prod, precio_mayorista: val } : prod));
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
                            const { error } = await supabaseAdmin.from('productos').update({ precio_detalle: val }).eq('id', p.id);
                            if (!error) setProductos(productos.map(prod => prod.id === p.id ? { ...prod, precio_detalle: val } : prod));
                            setUpdatingId(null);
                          }
                        }}
                      />
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="w-full bg-[#111] hover:bg-[#222] border border-[#333] text-white py-2 rounded-lg text-[8px] font-black tracking-[0.2em] flex items-center justify-center gap-2 transition"
                      >
                        <Edit size={10} /> EDITAR FICHA
                      </button>
                      <button
                        onClick={() => updateQuickStock(p.id, p.en_stock)}
                        className={`w-full py-2 rounded-lg text-[8px] font-black tracking-[0.2em] transition flex items-center justify-center gap-2 border 
                          ${p.en_stock
                            ? 'bg-green-600/5 border-green-600/30 text-green-500 hover:bg-green-600 hover:text-white'
                            : 'bg-red-600/10 border-red-600 text-red-500 animate-pulse'
                          }`}
                      >
                        {updatingId === p.id + 'stock' ? <Save className="animate-spin" size={12} /> : (p.en_stock ? <CheckCircle size={10} /> : <AlertTriangle size={10} />)}
                        {p.en_stock ? 'DISPONIBLE' : 'AGOTADO'}
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
              <p className="text-neutral-600 font-black uppercase tracking-[0.3em] text-xs">Sin coincidencias para los filtros aplicados</p>
              <button onClick={() => { setActiveFilter('all'); setSearchTerm(''); }} className="mt-4 text-yellow-500 hover:text-white text-[10px] font-black uppercase underline tracking-widest">Reiniciar búsqueda</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;