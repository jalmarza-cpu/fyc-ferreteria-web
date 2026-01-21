import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useCartStore } from '../store';
import { Eye, ShoppingCart, ZoomIn, X, Check, Star, Zap, TrendingDown, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);
  
  // 1. Espectadores aleatorios (Marketing visual)
  const [viewers] = useState(() => Math.floor(Math.random() * (15 - 4 + 1)) + 4);

  // 2. RATING REAL: Usa la nota de la base de datos o 5.0 si no tiene
  const rating = product.rating || 5.0;

  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  // Lógica de Precios
  const [pricingMode, setPricingMode] = useState<'retail' | 'wholesale'>('wholesale');
  const MIN_WHOLESALE_QTY = 6;

  const savingAmount = product.priceRetail - product.priceWholesale;
  const savingPercent = Math.round((savingAmount / product.priceRetail) * 100);

  const formatCLP = (val: number) => 
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(val);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const quantityToAdd = pricingMode === 'wholesale' ? MIN_WHOLESALE_QTY : 1;
    const priceToUse = pricingMode === 'wholesale' ? product.priceWholesale : product.priceRetail;

    addItem(product, quantityToAdd, priceToUse);
    setIsAdded(true);
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // Bloquear scroll al abrir zoom
  useEffect(() => {
    if (isZoomOpen) { document.body.style.overflow = 'hidden'; } 
    else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [isZoomOpen]);

  return (
    <>
      <div className="group relative bg-[#0a0a0a] border border-[#222] transition-all duration-300 hover:border-[#FFD700] hover:-translate-y-1 flex flex-col overflow-hidden shadow-md hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] rounded-xl h-full">
        
        {/* ETIQUETAS DE OFERTA */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start pointer-events-none">
           {savingPercent > 0 && (
             <>
                <span className="bg-[#D32F2F] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-md rounded-sm flex items-center gap-1">
                   <Zap className="w-3 h-3 fill-current" /> OFERTA
                </span>
                <span className="bg-[#FFD700] text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-md rounded-sm">
                   -{savingPercent}% OFF
                </span>
             </>
           )}
        </div>

        {/* IMAGEN */}
        <div 
          className="relative h-48 bg-[#151515] border-b border-[#222] flex items-center justify-center overflow-hidden p-4 cursor-zoom-in"
          onClick={() => setIsZoomOpen(true)}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 group-hover:brightness-110 transition-all duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
             <div className="bg-black/80 text-white p-2 rounded-full backdrop-blur-sm shadow-xl">
               <ZoomIn className="w-5 h-5 text-[#FFD700]" />
             </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#333] rounded px-2 py-0.5 flex items-center gap-1 shadow-sm">
             <Eye className="w-3 h-3 text-[#FFD700]" />
             <span className="text-[9px] text-white font-bold">{viewers}</span>
          </div>
        </div>

        {/* CUERPO */}
        <div className="p-3 flex-grow flex flex-col bg-[#111] relative border-t border-[#222]">
          
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-1">
               <span className="w-1 h-1 bg-[#FFD700] rounded-full"></span>
               <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest truncate">{product.category}</p>
            </div>
            
            <h3 className="text-sm font-bold text-white uppercase font-industrial leading-none mb-2 group-hover:text-[#FFD700] transition-colors line-clamp-2 h-[2.5em]">
              {product.name}
            </h3>

            {/* SKU VISIBLE */}
            <div className="mb-2">
                <span className="text-[9px] font-mono text-neutral-500 bg-[#1A1A1A] px-1.5 py-0.5 rounded border border-[#333]">
                    SKU: {product.sku}
                </span>
            </div>

            {/* ESTRELLAS REALES */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < Math.round(rating) ? 'fill-[#FFD700] text-[#FFD700]' : 'fill-neutral-800 text-neutral-800'}`} 
                  />
                ))}
              </div>
              <span className="text-[10px] text-neutral-500 font-medium">({rating})</span>
            </div>

            {/* PRECIOS */}
            <div className="flex flex-col gap-2 mt-2">
              <div 
                onClick={() => setPricingMode('retail')}
                className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition-all border ${
                  pricingMode === 'retail' 
                    ? 'border-neutral-500 bg-[#1a1a1a]' 
                    : 'border-transparent hover:bg-[#1a1a1a]'
                }`}
              >
                <div className="flex items-center gap-2">
                   <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${pricingMode === 'retail' ? 'border-white' : 'border-neutral-600'}`}>
                      {pricingMode === 'retail' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                   </div>
                   <span className="text-[10px] text-neutral-400 uppercase font-medium">1 Unidad</span>
                </div>
                <div className="text-right flex flex-col items-end">
                   <span className="text-base font-bold text-white font-industrial">{formatCLP(product.priceRetail)}</span>
                   <span className="text-xs text-green-400 font-semibold tracking-wide">(IVA incluido)</span>
                </div>
              </div>

              <div 
                onClick={() => setPricingMode('wholesale')}
                className={`relative flex flex-col px-3 py-2 rounded-lg cursor-pointer transition-all border-2 ${
                  pricingMode === 'wholesale' 
                    ? 'border-[#FFD700] bg-[#FFD700]/5 shadow-[0_0_15px_rgba(255,215,0,0.1)]' 
                    : 'border-[#333] bg-[#0E0E0E] hover:border-[#FFD700]/50'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                   <div className="flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${pricingMode === 'wholesale' ? 'border-[#FFD700]' : 'border-neutral-600'}`}>
                        {pricingMode === 'wholesale' && <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />}
                      </div>
                      <span className="text-[10px] font-black uppercase text-[#FFD700] tracking-wider">Pack Maestro</span>
                   </div>
                   <div className="bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-1 border border-green-500/30">
                      <TrendingDown className="w-3 h-3" />
                      Ahorra {formatCLP(savingAmount * MIN_WHOLESALE_QTY)}
                   </div>
                </div>

                <div className="flex items-baseline justify-between pl-4">
                   <div className="flex items-center gap-1 text-xs text-neutral-400">
                      <Package className="w-3 h-3" />
                      <span>Lleva <strong className="text-white">{MIN_WHOLESALE_QTY}</strong> x</span>
                   </div>
                   <div className="text-right">
                      <span className="text-xl font-black font-industrial text-[#FFD700] leading-none">
                        {formatCLP(product.priceWholesale)}
                      </span>
                      <span className="text-[9px] text-neutral-500 font-bold ml-1">c/u</span>
                   </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-auto pt-2">
            <motion.button 
              onClick={handleAddToCart}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-4 font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded shadow-lg group/btn border border-transparent
                 ${isAdded 
                   ? 'bg-green-600 text-white' 
                   : 'bg-[#FFD700] group-hover:bg-[#FFED4D] text-black shadow-md group-hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]'
                 }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isAdded ? (
                  <motion.div
                    key="added"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span className="text-xs">¡Listo!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="normal"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-xs md:text-xs lg:text-[11px] xl:text-xs">
                        {pricingMode === 'wholesale' 
                          ? 'AGREGAR PACK' 
                          : 'AGREGAR'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal de Zoom */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsZoomOpen(false)}
          >
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 bg-[#1A1A1A] text-white p-3 rounded-full hover:bg-[#FFD700] hover:text-black transition-colors z-20 border border-[#333]"
              onClick={() => setIsZoomOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-[600px] flex flex-col bg-[#111] max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl border border-[#333] my-4"
                onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#151515] p-4 md:p-8 rounded-2xl overflow-hidden shadow-2xl w-full max-w-[600px] border border-[#333] shrink-0">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-64 md:h-96 object-contain bg-transparent"
                />
              </div>
              <div className="mt-6 text-center">
                 <h3 className="text-xl font-industrial font-bold text-white uppercase mb-2">{product.name}</h3>
                 
                 <p className="text-xs font-mono text-neutral-500 mb-2">SKU: {product.sku}</p>

                 <div className="flex items-center justify-center gap-1 mb-4">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-[#FFD700] text-[#FFD700]' : 'fill-neutral-800 text-neutral-800'}`} />
                   ))}
                   <span className="text-xs text-neutral-400 ml-2">({rating}/5.0)</span>
                 </div>

                 <p className="text-neutral-400 max-w-md mx-auto mb-6">{product.description}</p>
                 
                 <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
                    <div className="bg-[#111] p-4 rounded-xl border border-[#333] flex flex-col items-center">
                       <span className="text-[10px] text-neutral-400 font-bold uppercase mb-1">Unidad</span>
                       <p className="text-white font-bold text-xl">{formatCLP(product.priceRetail)}</p>
                       <span className="text-[10px] text-green-400 font-semibold mt-1">(IVA incluido)</span>
                    </div>
                    <div className="bg-[#111] p-4 rounded-xl border border-[#FFD700] bg-[#FFD700]/5 flex flex-col items-center relative overflow-hidden">
                       <div className="absolute top-0 right-0 bg-[#FFD700] text-black text-[8px] font-black px-2 py-0.5 uppercase">
                         Recomendado
                       </div>
                       <span className="text-[10px] text-[#FFD700] font-bold uppercase mb-1">Lleva {MIN_WHOLESALE_QTY} x</span>
                       <p className="text-[#FFD700] font-bold text-2xl font-industrial">{formatCLP(product.priceWholesale)}</p>
                       <span className="text-[9px] text-neutral-500">c/u + IVA</span>
                    </div>
                 </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
