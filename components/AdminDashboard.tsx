import { useState, useEffect } from 'react';
import { supabase, supabaseAdmin } from '../utils/supabase';
import { Search, AlertTriangle, Plus, Package, Save, CheckCircle, X, Image as ImageIcon } from 'lucide-react';

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State for New Product
  const [newProduct, setNewProduct] = useState({
    sku: '',
    nombre: '',
    descripcion: '',
    categoria: 'Herramientas Manuales',
    precio_mayorista: 0,
    precio_detalle: 0,
    url_imagen: ''
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

  const updateProducto = async (id, campo, valor) => {
    setUpdatingId(id + campo);
    const { error } = await supabaseAdmin
      .from('productos')
      .update({ [campo]: valor })
      .eq('id', id);

    if (error) {
      alert('Error al actualizar: ' + error.message);
    } else {
      setProductos(productos.map(p => p.id === id ? { ...p, [campo]: valor } : p));
    }
    setUpdatingId(null);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const { data, error } = await supabaseAdmin
      .from('productos')
      .insert([newProduct])
      .select();

    if (error) {
      alert('Error: ' + error.message);
    } else {
      if (data && data.length > 0) {
        setProductos([data[0], ...productos]);
      }
      setIsModalOpen(false);
      setNewProduct({
        sku: '', nombre: '', descripcion: '', categoria: 'Herramientas Manuales',
        precio_mayorista: 0, precio_detalle: 0, url_imagen: ''
      });
    }
    setIsSaving(false);
  };

  const filtered = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="p-8 bg-black min-h-screen text-white flex flex-col items-center justify-center">
      <Package className="w-12 h-12 text-yellow-500 animate-bounce mb-4" />
      <p className="font-bold tracking-widest uppercase">Cargando inventario de F&C...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-[#050505] text-white min-h-screen font-sans relative">

      {/* MODAL NUEVO PRODUCTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-[#0A0A0A] border border-[#222] w-full max-w-lg rounded-2xl p-6 relative z-10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase text-yellow-500">Nuevo Producto</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white"><X /></button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">SKU *</label>
                  <input required value={newProduct.sku} onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })} className="w-full bg-[#111] border border-[#333] rounded-lg p-2 text-sm outline-none focus:border-yellow-500 text-white" placeholder="Ej: 011387" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Nombre *</label>
                  <input required value={newProduct.nombre} onChange={e => setNewProduct({ ...newProduct, nombre: e.target.value })} className="w-full bg-[#111] border border-[#333] rounded-lg p-2 text-sm outline-none focus:border-yellow-500 text-white" placeholder='Brocha 4"' />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">URL Imagen</label>
                <div className="flex gap-2">
                  <input value={newProduct.url_imagen} onChange={e => setNewProduct({ ...newProduct, url_imagen: e.target.value })} className="flex-1 bg-[#111] border border-[#333] rounded-lg p-2 text-sm outline-none focus:border-yellow-500 text-white" placeholder="Ej: taladro.jpg" />
                  <div className="w-10 h-10 bg-[#111] border border-[#333] rounded flex items-center justify-center text-neutral-600">
                    <ImageIcon size={20} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Precio Mayorista</label>
                  <input type="number" required value={newProduct.precio_mayorista} onChange={e => setNewProduct({ ...newProduct, precio_mayorista: parseInt(e.target.value) })} className="w-full bg-[#111] border border-[#333] rounded-lg p-2 text-sm outline-none focus:border-yellow-500 text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Precio Detalle</label>
                  <input type="number" required value={newProduct.precio_detalle} onChange={e => setNewProduct({ ...newProduct, precio_detalle: parseInt(e.target.value) })} className="w-full bg-[#111] border border-[#333] rounded-lg p-2 text-sm outline-none focus:border-yellow-500 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Categoría</label>
                <select value={newProduct.categoria} onChange={e => setNewProduct({ ...newProduct, categoria: e.target.value })} className="w-full bg-[#111] border border-[#333] rounded-lg p-2 text-sm outline-none focus:border-yellow-500 text-white">
                  <option>Herramientas Manuales</option>
                  <option>Revestimientos</option>
                  <option>Fijaciones</option>
                  <option>Electricidad</option>
                  <option>Pinturas</option>
                </select>
              </div>

              <button disabled={isSaving} type="submit" className="w-full bg-yellow-500 text-black py-3 rounded-xl font-black uppercase tracking-widest hover:bg-yellow-400 transition flex items-center justify-center gap-2">
                {isSaving ? <Save className="animate-spin" /> : <Plus />}
                {isSaving ? 'Guardando...' : 'Crear Producto'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-[#0A0A0A] p-6 rounded-2xl border border-[#222]">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-1">
            Centro de <span className="text-yellow-500">Control</span>
          </h1>
          <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Gestión de Inventario en Tiempo Real</p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="BUSCAR POR SKU O NOMBRE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-[#333] focus:border-yellow-500 rounded-lg py-2.5 pl-10 pr-4 text-xs font-bold uppercase transition-all outline-none"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-500 text-black px-6 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition shadow-[0_0_15px_rgba(234,179,8,0.3)] flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Nuevo Producto
          </button>
        </div>
      </div>

      {/* STATS MINI BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0A0A0A] border border-[#222] p-4 rounded-xl">
          <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Total SKU</p>
          <p className="text-2xl font-black text-white">{productos.length}</p>
        </div>
        <div className="bg-[#0A0A0A] border border-[#222] p-4 rounded-xl border-l-4 border-l-red-600">
          <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Sin Stock</p>
          <p className="text-2xl font-black text-red-500">{productos.filter(p => !p.en_stock).length}</p>
        </div>
        <div className="bg-[#0A0A0A] border border-[#222] p-4 rounded-xl">
          <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Categorías</p>
          <p className="text-2xl font-black text-yellow-500">{new Set(productos.map(p => p.categoria)).size}</p>
        </div>
        <div className="bg-[#0A0A0A] border border-[#222] p-4 rounded-xl">
          <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">En Stock</p>
          <p className="text-2xl font-black text-green-500">{productos.filter(p => p.en_stock).length}</p>
        </div>
      </div>

      <div className="bg-[#0A0A0A] rounded-2xl border border-[#222] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#111] text-neutral-400 uppercase text-[10px] font-black tracking-[0.2em] border-b border-[#222]">
                <th className="p-6">Información del Producto</th>
                <th className="p-6 text-center">Precio Mayorista</th>
                <th className="p-6 text-center">Precio Detalle</th>
                <th className="p-6 text-center">Estado Crítico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {filtered.map((p) => (
                <tr key={p.id} className={`transition group ${!p.en_stock ? 'bg-red-900/5' : 'hover:bg-zinc-900/50'}`}>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-10 rounded-full ${!p.en_stock ? 'bg-red-600 animate-pulse' : 'bg-zinc-800'}`} />
                      <div>
                        <div className={`font-black uppercase text-sm ${!p.en_stock ? 'text-red-400' : 'text-white'}`}>
                          {p.nombre}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono text-yellow-500/80 bg-yellow-500/5 px-2 py-0.5 rounded border border-yellow-500/20">SKU: {p.sku}</span>
                          <span className="text-[10px] font-bold text-neutral-500 uppercase">{p.categoria}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="inline-flex items-center bg-[#111] border border-[#333] rounded-lg px-3 py-1.5 focus-within:border-yellow-500 transition-all">
                      <span className="text-neutral-500 font-bold mr-1">$</span>
                      <input
                        type="number"
                        className="bg-transparent w-24 text-center font-black text-sm outline-none"
                        defaultValue={p.precio_mayorista}
                        onBlur={(e) => updateProducto(p.id, 'precio_mayorista', parseInt(e.target.value))}
                      />
                      {updatingId === p.id + 'precio_mayorista' && <Save className="w-3 h-3 text-yellow-500 animate-spin ml-2" />}
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="inline-flex items-center bg-[#111] border border-[#333] rounded-lg px-3 py-1.5 focus-within:border-yellow-500 transition-all">
                      <span className="text-neutral-500 font-bold mr-1">$</span>
                      <input
                        type="number"
                        className="bg-transparent w-24 text-center font-black text-sm outline-none"
                        defaultValue={p.precio_detalle}
                        onBlur={(e) => updateProducto(p.id, 'precio_detalle', parseInt(e.target.value))}
                      />
                      {updatingId === p.id + 'precio_detalle' && <Save className="w-3 h-3 text-yellow-500 animate-spin ml-2" />}
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <button
                      onClick={() => updateProducto(p.id, 'en_stock', !p.en_stock)}
                      className={`min-w-[140px] py-2.5 rounded-full text-[10px] font-black tracking-widest transition flex items-center justify-center gap-2 border-2 
                        ${p.en_stock
                          ? 'bg-green-600/10 border-green-600 text-green-500 hover:bg-green-600 hover:text-white'
                          : 'bg-red-600/10 border-red-600 text-red-500 hover:bg-red-600 hover:text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] animate-pulse'
                        }`}
                    >
                      {p.en_stock ? (
                        <><CheckCircle className="w-3 h-3" /> DISPONIBLE</>
                      ) : (
                        <><AlertTriangle className="w-3 h-3" /> AGOTADO</>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center">
              <Search className="w-12 h-12 text-zinc-700 mb-4" />
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">No se encontraron productos para "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;