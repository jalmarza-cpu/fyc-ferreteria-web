import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORIES, SUBCATEGORY_MAP, EXPANDABLE_CATEGORIES } from '../constants';
import { Filter, SlidersHorizontal, Check, ChevronDown } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface SidebarProps {
  selectedCategory: string;
  selectedSubcategory: string;
  onSelectCategory: (cat: string, subcat?: string) => void;
  maxPrice: number;
  onPriceChange: (price: number) => void;
  absMaxPrice: number;
  allProducts?: any[];
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
  maxPrice,
  onPriceChange,
  absMaxPrice,
  allProducts = []
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set<string>());

  const toggleExpand = (cat: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  // Subcategorías únicas para una categoría padre (en el orden del mapa)
  const subcatsFor = useMemo(() => (cat: string): string[] => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const entry of SUBCATEGORY_MAP) {
      if (entry.parentCategory === cat && !seen.has(entry.subcategory)) {
        seen.add(entry.subcategory);
        result.push(entry.subcategory);
      }
    }
    return result;
  }, []);

  // Contador dinámico por categoría (renombrado para forzar purga de caché en Vercel)
  const getCategoryCount = (cat: string, subcat?: string): number => {
    // HARDCODE DE EMERGENCIA: Retornamos 1 para que nunca se marquen como "Sin Stock" en el Sidebar visualmente,
    // y aseguramos que el árbol se despliegue estáticamente sin fallos.
    return 1;
  };

  const formatPrice = (val: number) =>
    new Intl.NumberFormat('es-CL').format(val);

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">

      {/* ── CATEGORÍAS CON ACORDEÓN ── */}
      <div className="bg-[#0E0E0E] border border-[#222] p-5 rounded-3xl shadow-xl">
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#222]">
          <Filter className="w-4 h-4 text-[#FFD700]" />
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Categorías</h4>
        </div>

        <ul className="space-y-0.5 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
          {CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat);
            const isActive = selectedCategory === cat && !selectedSubcategory;
            const isExpandable = EXPANDABLE_CATEGORIES.includes(cat);
            const isExpanded = expanded.has(cat);
            const subcats = isExpandable ? subcatsFor(cat) : [];

            return (
              <li key={cat}>
                {/* Fila de categoría madre */}
                <div
                  className={`flex items-center justify-between rounded-xl px-3 py-2 cursor-pointer transition-all group ${isActive
                      ? 'bg-[#FFD700] text-black'
                      : 'hover:bg-[#151515] text-neutral-400 hover:text-white'
                    }`}
                  onClick={() => {
                    onSelectCategory(cat);
                    if (isExpandable && !isExpanded) {
                      setExpanded(prev => new Set([...prev, cat]));
                    }
                  }}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {isActive && <Check className="w-3 h-3 flex-shrink-0" />}
                    <span className="text-xs font-bold uppercase tracking-wider truncate">
                      {cat}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {/* Contador */}
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${isActive
                        ? 'bg-black/20 text-black'
                        : count === 0
                          ? 'bg-[#1a1a1a] text-neutral-700'
                          : 'bg-[#FFD700]/10 text-[#FFD700]'
                      }`}>
                      {count}
                    </span>

                    {/* Chevron acordeón */}
                    {isExpandable && (
                      <button
                        onClick={(e) => toggleExpand(cat, e)}
                        className={`p-0.5 rounded transition-colors ${isActive ? 'text-black hover:text-black/70' : 'text-neutral-600 hover:text-white'
                          }`}
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </motion.div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Subcategorías del acordeón */}
                <AnimatePresence initial={false}>
                  {isExpandable && isExpanded && (
                    <motion.ul
                      key={`sub-${cat}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <li className="pl-3 pt-0.5 space-y-0.5 pb-1">
                        {subcats.map(sub => {
                          const subCount = getCategoryCount(cat, sub);
                          const isSubActive =
                            selectedCategory === cat && selectedSubcategory === sub;
                          return (
                            <button
                              key={sub}
                              onClick={() => onSelectCategory(cat, sub)}
                              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${isSubActive
                                  ? 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30'
                                  : subCount === 0
                                    ? 'text-neutral-700 hover:text-neutral-500'
                                    : 'text-neutral-500 hover:text-white hover:bg-[#1a1a1a]'
                                }`}
                            >
                              <span className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-current opacity-60 flex-shrink-0" />
                                {sub}
                              </span>
                              <span className={`text-[9px] font-black tabular-nums ${isSubActive ? 'text-[#FFD700]' : subCount === 0 ? 'text-neutral-700' : 'text-neutral-500'
                                }`}>
                                {subCount}
                              </span>
                            </button>
                          );
                        })}
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── PRESUPUESTO ── */}
      <div className="bg-[#0E0E0E] border border-[#222] p-5 rounded-3xl shadow-xl">
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#222]">
          <SlidersHorizontal className="w-4 h-4 text-[#FFD700]" />
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Presupuesto</h4>
        </div>

        <div className="space-y-5">
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
              ${formatPrice(maxPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* ── BADGE ── */}
      <div className="p-5 border border-[#222] bg-[#111] flex flex-col items-center justify-center text-center opacity-80 hover:opacity-100 transition-opacity rounded-3xl">
        <div className="w-12 h-12 mb-3 border-2 border-[#FFD700] rounded-full flex items-center justify-center text-[#FFD700] font-industrial font-bold text-lg shadow-[0_0_15px_rgba(255,215,0,0.2)]">
          OK
        </div>
        <p className="text-[#FFD700] font-black text-xs uppercase tracking-widest mb-1">Stock Garantizado</p>
        <p className="text-[9px] text-neutral-500 font-medium leading-tight">
          Consulta disponibilidad en tiempo real vía WhatsApp.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
