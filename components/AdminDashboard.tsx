import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const { error } = await supabase
      .from('productos')
      .update({ [campo]: valor })
      .eq('id', id);

    if (error) alert('Error al actualizar');
    else {
      setProductos(productos.map(p => p.id === id ? { ...p, [campo]: valor } : p));
    }
  };

  if (loading) return <div className="p-8 text-white">Cargando inventario de F&C...</div>;

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-500">Centro de Control F&C</h1>
        <button
          onClick={() => alert('Próximamente: Formulario Nuevo Producto')}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition"
        >
          + Nuevo Producto
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900 text-zinc-400 uppercase text-xs tracking-wider">
              <th className="p-4">Producto / SKU</th>
              <th className="p-4 text-center">Precio Mayorista</th>
              <th className="p-4 text-center">Precio Detalle</th>
              <th className="p-4 text-center">Estado Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {productos.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-950 transition">
                <td className="p-4">
                  <div className="font-bold">{p.nombre}</div>
                  <div className="text-xs text-zinc-500">{p.sku}</div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-zinc-500">$</span>
                    <input
                      type="number"
                      className="bg-zinc-800 w-24 p-1 rounded text-center focus:ring-1 focus:ring-yellow-500 outline-none"
                      defaultValue={p.precio_mayorista}
                      onBlur={(e) => updateProducto(p.id, 'precio_mayorista', parseInt(e.target.value))}
                    />
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-zinc-500">$</span>
                    <input
                      type="number"
                      className="bg-zinc-800 w-24 p-1 rounded text-center focus:ring-1 focus:ring-yellow-500 outline-none border border-zinc-700"
                      defaultValue={p.precio_detalle}
                      onBlur={(e) => updateProducto(p.id, 'precio_detalle', parseInt(e.target.value))}
                    />
                  </div>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => updateProducto(p.id, 'en_stock', !p.en_stock)}
                    className={`px-4 py-1 rounded-full text-xs font-bold transition ${p.en_stock ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                  >
                    {p.en_stock ? 'EN STOCK' : 'AGOTADO'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;