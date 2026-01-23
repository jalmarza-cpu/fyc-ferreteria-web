import React from 'react';
import { motion } from 'framer-motion';
// Usamos iconos seguros que ya tenías y agregamos Zap (Rayo) para electricidad
import { Hammer, Droplets, PaintRoller, Zap, ArrowRight } from 'lucide-react';

interface CategoryBentoProps {
  onSelectCategory: (category: string) => void;
}

const CategoryBento: React.FC<CategoryBentoProps> = ({ onSelectCategory }) => {
  
  // CONFIGURACIÓN DE LAS 4 CAJAS PRINCIPALES
  const categories = [
    {
      id: 'maquinaria',
      name: 'Maquinaria',
      icon: Hammer, 
      color: 'bg-yellow-600',
      // NUEVA IMAGEN: Transpaleta Manual (Ideal para ferretería)
      image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=800',
      className: 'md:col-span-2 md:row-span-2',
      filterKey: 'Maquinaria'
    },
    {
      id: 'griferia',
      name: 'Grifería',
      icon: Droplets,
      color: 'bg-blue-600',
      // IMAGEN ACTUAL: Llave/Grifo moderno
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
      className: 'md:col-span-1 md:row-span-1',
      filterKey: 'Grifería'
    },
    {
      id: 'herramientas',
      name: 'Herramientas',
      icon: PaintRoller,
      color: 'bg-purple-600',
      // IMAGEN ACTUAL: Brochas y rodillos
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=600',
      className: 'md:col-span-1 md:row-span-1',
      filterKey: 'Herramientas'
    },
    {
      id: 'electricidad',
      name: 'Electricidad',
      icon: Zap,
      color: 'bg-orange-600',
      // IMAGEN ACTUAL: Instalación eléctrica en obra
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800',
      className: 'md:col-span-2 md:row-span-1',
      filterKey: 'Electricidad'
    }
  ];

  return (
    <section className="py-16 px-6 md:px-12 bg-[#0A0A0A]">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-10 flex items-end justify-between border-b border-[#222] pb-6">
          <div>
            <span className="text-[#FFD700] font-black uppercase tracking-widest text-xs">Catálogo Destacado</span>
            <h2 className="text-3xl md:text-4xl font-industrial font-black text-white uppercase mt-2">
              Categorías Principales
            </h2>
          </div>
        </div>

        {/* CONTENEDOR GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[500px]">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onSelectCategory(cat.filterKey)}
              className={`relative group overflow-hidden border border-[#222] cursor-pointer h-64 md:h-full ${cat.className}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded bg-[#FFD700] text-black`}>
                         <cat.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-industrial font-bold text-white uppercase">{cat.name}</h3>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-[#FFD700] text-xs font-bold uppercase tracking-widest mt-2">
                    Ver Productos <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBento;
