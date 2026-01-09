
import React from 'react';
import { CATEGORIES } from '../constants';
import { Filter, SlidersHorizontal, Check } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  maxPrice: number;
  onPriceChange: (price: number) => void;
  absMaxPrice: number;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedCategory, 
  onSelectCategory, 
  maxPrice, 
  onPriceChange,
  absMaxPrice 
}) => {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
      
      {/* Categories */}
      <div className="bg-[#0E0E0E] border border-[#222] p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#222]">
           <Filter className="w-4 h-4 text-[#FFD700]" />
           <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Categorías</h4>
        </div>
        
        <ul className="space-y-2">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onSelectCategory(cat)}
                className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between group rounded-full ${
                  selectedCategory === cat 
                    ? 'text-black bg-[#FFD700] shadow-lg transform scale-105' 
                    : 'text-neutral-500 hover:text-white hover:bg-[#151515] border border-transparent'
                }`}
              >
                {cat}
                {selectedCategory === cat && <Check className="w-3 h-3" />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div className="bg-[#0E0E0E] border border-[#222] p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#222]">
           <SlidersHorizontal className="w-4 h-4 text-[#FFD700]" />
           <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Presupuesto</h4>
        </div>
        
        <div className="space-y-6">
          <div className="relative pt-6 pb-2">
            <input
              type="range"
              min="0"
              max={absMaxPrice}
              step="1000"
              value={maxPrice}
              onChange={(e) => onPriceChange(parseInt(e.target.value))}
              className="w-full h-1 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#FFD700] relative z-20"
            />
            <div className="absolute top-0 left-0 w-full flex justify-between text-[9px] font-bold text-neutral-600 uppercase">
               <span>Min</span>
               <span>Max</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-[#151515] p-3 border border-[#222] rounded-xl">
            <span className="text-[10px] font-black uppercase text-neutral-500">Hasta</span>
            <span className="text-lg font-industrial font-bold text-[#FFD700]">
              ${new Intl.NumberFormat('es-CL').format(maxPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Industrial Badge */}
      <div className="p-6 border border-[#222] bg-[#111] flex flex-col items-center justify-center text-center opacity-80 hover:opacity-100 transition-opacity rounded-3xl shadow-lg">
        <div className="w-12 h-12 mb-3 border-2 border-[#FFD700] rounded-full flex items-center justify-center text-[#FFD700] font-industrial font-bold text-lg shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            OK
        </div>
        <p className="text-[#FFD700] font-black text-xs uppercase tracking-widest mb-1">Stock Garantizado</p>
        <p className="text-[9px] text-neutral-500 font-medium leading-tight">Consulta disponibilidad en tiempo real vía WhatsApp.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
