
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useCartStore } from '../store';
import { Eye, ShoppingCart, ZoomIn, X, Check, Package, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);
  const [viewers] = useState(() => Math.floor(Math.random() * (15 - 4 + 1)) + 4);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  // Pricing State Logic
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isZoomOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isZoomOpen]);

  return (
    <>
      <div className="group relative bg-[#0a0a0a] border border-[#222] transition-all duration-300 hover:border-[#FFD700] hover:-translate-y-1 flex flex-col overflow-hidden shadow-md hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] rounded-xl h-full">
        
        {/* Etiqueta de Ahorro */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start pointer-events-none">
           <span className="bg-[#FFD700] text-black px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-md rounded flex items-center gap-1">
             <Tag className="w-3 h-3" />
             Ahorra {savingPercent}%
           </span>
        </div>

        {/* Imagen */}
        <div 
          className="relative h-48 bg-white flex items-center justify-center overflow-hidden p-4 cursor-zoom-in"
          onClick={() => setIsZoomOpen(true)}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
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

        {/* Cuerpo */}
        <div className="p-3 flex-grow flex flex-col bg-[#111] relative border-t border-[#222]">
          
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-1">
               <span className="w-1 h-1 bg-[#FFD700] rounded-full"></span>
               <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest truncate">{product.category}</p>
            </div>
            
            <h3 className="text-sm font-bold text-white uppercase font-industrial leading-none mb-3 group-hover:text-[#FFD700] transition-colors line-clamp-2 h-[2.5em]">
              {product.name}
            </h3>

            {/* Selector de Precio */}
            <div className="flex flex-col gap-2">
              
              {/* Opción 1: Unidad (Retail) */}
              <div 
                onClick={() => setPricingMode('retail')}
                className={`relative flex items-center justify-between p-2 rounded border cursor-pointer transition-all ${
                  pricingMode === 'retail' 
                    ? 'bg-[#1a1a1a] border-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.1)]' 
                    : 'bg-[#080808] border-[#333] hover:border-neutral-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${pricingMode === 'retail' ? 'border-[#FFD700]' : 'border-neutral-600'}`}>
                    {pricingMode === 'retail' && <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />}
                  </div>
                  <span className={`text-[10px] font-bold uppercase ${pricingMode === 'retail' ? 'text-white' : 'text-neutral-500'}`}>
                    Unidad
                  </span>
                </div>
                <span className={`text-xs font-bold ${pricingMode === 'retail' ? 'text-white' : 'text-neutral-500'}`}>
                  {formatCLP(product.priceRetail)}
                </span>
              </div>

              {/* Opción 2: Mayorista */}
              <div 
                onClick={() => setPricingMode('wholesale')}
                className={`relative flex flex-col p-2 rounded border cursor-pointer transition-all ${
                  pricingMode === 'wholesale' 
                    ? 'bg-[#1a1a1a] border-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.1)]' 
                    : 'bg-[#080808] border-[#333] hover:border-neutral-500'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${pricingMode === 'wholesale' ? 'border-[#FFD700]' : 'border-neutral-600'}`}>
                      {pricingMode === 'wholesale' && <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />}
                    </div>
                    <span className={`text-[10px] font-black uppercase ${pricingMode === 'wholesale' ? 'text-[#FFD700]' : 'text-neutral-500'}`}>
                      Mayorista
                    </span>
                  </div>
                  <span className={`text-sm font-black font-industrial ${pricingMode === 'wholesale' ? 'text-[#FFD700]' : 'text-neutral-500'}`}>
                    {formatCLP(product.priceWholesale)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-[9px] pl-5">
                   <span className="text-neutral-400">Min. {MIN_WHOLESALE_QTY} unidades</span>
                   <span className="text-green-500 font-bold">Ahorras {formatCLP(savingAmount)} c/u</span>
                </div>
              </div>

            </div>
          </div>

          {/* Botón de Acción Único */}
          <div className="mt-auto pt-2">
            <motion.button 
              onClick={handleAddToCart}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-4 font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded shadow-lg group/btn ${
                 isAdded 
                 ? 'bg-green-500 text-white' 
                 : 'bg-[#FFD700] hover:bg-[#FFED4D] text-black hover:shadow-[0_0_15px_rgba(255,215,0,0.4)]'
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
                    <span className="text-xs">¡Agregado!</span>
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
                       {pricingMode === 'wholesale' ? `Agregar Pack (${MIN_WHOLESALE_QTY})` : 'Agregar al Carro'}
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
              className="relative max-w-4xl w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white p-4 md:p-8 rounded-2xl overflow-hidden shadow-2xl w-full max-w-[600px]">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-contain max-h-[60vh] mix-blend-multiply"
                />
              </div>
              <div className="mt-6 text-center">
                 <h3 className="text-xl font-industrial font-bold text-white uppercase mb-2">{product.name}</h3>
                 <p className="text-neutral-400 max-w-md mx-auto mb-4">{product.description}</p>
                 
                 <div className="flex items-center justify-center gap-8 mt-4 bg-[#111] p-4 rounded-xl border border-[#333] inline-flex">
                   <div className="flex flex-col items-center">
                     <span className="text-xs text-neutral-400 font-bold uppercase">Precio Unidad</span>
                     <p className="text-white font-bold text-xl">{formatCLP(product.priceRetail)}</p>
                   </div>
                   <div className="w-[1px] h-10 bg-[#333]"></div>
                   <div className="flex flex-col items-center">
                     <span className="text-xs text-[#FFD700] font-bold uppercase">Precio Mayorista</span>
                     <p className="text-[#FFD700] font-bold text-2xl font-industrial">{formatCLP(product.priceWholesale)}</p>
                     <span className="text-[10px] text-neutral-500 font-bold uppercase">Desde {MIN_WHOLESALE_QTY} u.</span>
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
