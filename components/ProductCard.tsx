
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useCartStore } from '../store';
import { Eye, ShoppingCart, ZoomIn, X, Check, Star, Zap, TrendingDown, Package } from 'lucide-react';
import { CONTACT_PHONE } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductImageUrl, getProductImageFallbacks } from '../utils/supabase';

const formatProductName = (name: string) => {
  const regex = /(\b\d+(?:[\.,]\d+)?(?:x\d+(?:[\.,]\d+)?)?\s*(?:mm|cm|m|w|v|g|kg|l|hp|ton|módulos|unid\w*|pulg\w*)\b|\b\d+\s*\/\s*\d+"\b|\b\d+"\b|\b[A-Z]+-\d+\w*\b)/gi;
  const parts = name.split(regex);
  return parts.map((part, i) => {
    if (part.match(regex)) {
      return <span key={i} className="tech-specs">{part}</span>;
    }
    return part;
  });
};

const DynamicImage = ({ product, className, onClick, style }: { product: Product, className?: string, onClick?: (e: React.MouseEvent) => void, style?: React.CSSProperties }) => {
  const urls = getProductImageFallbacks(product.imageUrl, product.sku);
  const [index, setIndex] = useState(0);
  const currentSrc = urls[index] || '/logo-fyc.png';

  useEffect(() => {
    if (currentSrc === '/logo-fyc.png') return;
    
    let isMounted = true;
    const img = new window.Image();
    
    img.onload = () => { /* Carga exitosa en background */ };
    img.onerror = () => {
      if (!isMounted) return;
      setIndex(i => Math.min(i + 1, urls.length - 1));
    };
    img.src = currentSrc;

    return () => {
      isMounted = false;
      // img.src = ''; // Dejar que el GC limpie
    };
  }, [currentSrc, urls]);

  return (
    <img 
      src={currentSrc} 
      alt={`${product.name} - SKU: ${product.sku}`} 
      className={className} 
      onClick={onClick}
      style={style}
      loading="lazy"
    />
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);
  const [viewers] = useState(() => Math.floor(Math.random() * (15 - 4 + 1)) + 4);
  const [rating] = useState(() => (Math.random() * (5 - 4.5) + 4.5).toFixed(1)); // Random rating 4.5 - 5.0
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Real-time Stock State
  const [liveStock, setLiveStock] = useState<boolean>(product.inStock !== false);
  const [checkingStock, setCheckingStock] = useState(false);

  useEffect(() => {
    // 1. Sync from prop (Default value)
    setLiveStock(product.inStock !== false);

    // DISABLED FOR EMERGENCY: The extra REST fetch to the database and realtime subscription
    // were causing 400 Bad Request which breaks the delivery presentation.
  }, [product.sku, product.inStock]);

  // Pricing State Logic
  const [pricingMode, setPricingMode] = useState<'retail' | 'wholesale'>('wholesale');
  const MIN_WHOLESALE_QTY = 6;

  const savingAmount = product.priceRetail - product.priceWholesale;
  const savingPercent = Math.round((savingAmount / product.priceRetail) * 100);

  const formatCLP = (val: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(val);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    // DISABLED FOR EMERGENCY: Just-In-Time Stock checking
    // setCheckingStock(true);
    // try {
    //   const { data, error } = await supabase.from('productos').select('in_stock').eq('sku', product.sku).single();
    //   if (!error && data && data.in_stock === false) {
    //     setLiveStock(false);
    //     setCheckingStock(false);
    //     return;
    //   }
    // } catch (err) { }
    // setCheckingStock(false);

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
      <div className="group relative card-container transition-all duration-300 hover:border-[#3B82F6] hover:-translate-y-1 flex flex-col overflow-hidden shadow-[var(--card-shadow)] rounded-xl h-full p-4 gap-4">

        {/* BADGE SYSTEM: Floating Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start pointer-events-none">
          {savingPercent > 0 && (
            <>
              {/* Red Sale Badge */}
              <span className="bg-[#D32F2F] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-md rounded-sm flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current" /> OFERTA
              </span>
              {/* Yellow Discount Badge */}
              <span className="bg-[#FFFFFF] text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-md rounded-sm">
                -{savingPercent}% OFF
              </span>
            </>
          )}
        </div>

        {/* Imagen - Updated for Better Visibility on Dark Mode */}
        <div
          className="relative aspect-square w-full bg-[#000000] border border-[var(--card-border)] rounded-lg flex items-center justify-center overflow-hidden p-4 cursor-zoom-in group-hover:border-[#3B82F6]/50 transition-colors"
          onClick={() => setIsZoomOpen(true)}
        >
          <DynamicImage
            product={product}
            className="w-full h-full object-contain group-hover:scale-105 brightness-110 contrast-125 group-hover:brightness-125 transition-transform duration-500 ease-out drop-shadow-md"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-black/80 text-white p-2 rounded-full backdrop-blur-sm shadow-xl">
              <ZoomIn className="w-5 h-5 text-[#FFFFFF]" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#333] rounded px-2 py-0.5 flex items-center gap-1 shadow-sm">
            <Eye className="w-3 h-3 text-[#FFFFFF]" />
            <span className="text-[9px] text-white font-bold">{viewers}</span>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="flex-grow flex flex-col relative">

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-[var(--accent-gold)] rounded-full"></span>
                <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest truncate">{product.category}</p>
              </div>
              <span className="text-[9px] text-[var(--tech-specs)] font-mono font-bold tracking-widest px-1.5 py-0.5 border border-[var(--card-border)] rounded uppercase">SKU: {product.sku}</span>
            </div>

            <h3 className="product-title-v2 text-sm font-bold text-[var(--text-white)] uppercase font-industrial leading-none mb-1 group-hover:text-[#3B82F6] transition-colors line-clamp-2 h-[2.5em]">
              {formatProductName(product.name)}
            </h3>

            {/* SOCIAL RATING: 5 Stars */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#FFFFFF] text-[#FFFFFF]" />
                ))}
              </div>
              <span className="text-[10px] text-neutral-500 font-medium">({rating})</span>
            </div>

            {/* --- PRICING DISPLAY (CLEAN) --- */}
            <div className="flex flex-col gap-0.5 mt-2">
              <span className="text-2xl font-black font-industrial leading-none price-discount">
                {formatCLP(product.priceWholesale)}
              </span>
              <span className="text-[10px] text-[var(--tech-specs)] font-bold uppercase tracking-widest mt-1">Precio Mayorista (Desde {MIN_WHOLESALE_QTY} un.)</span>
            </div>
          </div>

          {/* Botón de Acción */}
          <div className="mt-auto pt-2">
            {!liveStock ? (
              <div className="w-full py-3 px-4 font-black uppercase tracking-wider bg-[#151515] text-neutral-500 border border-[#333] flex items-center justify-center gap-2 rounded shadow-inner">
                <X className="w-4 h-4 text-red-500/50" />
                <span className="text-xs md:text-xs lg:text-[11px] xl:text-xs">SIN STOCK TEMPORAL</span>
              </div>
            ) : (
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: checkingStock ? 1 : 0.98 }}
                disabled={checkingStock}
                className={`w-full py-3 px-4 font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded group/btn border border-transparent btn-add-to-cart
                   ${checkingStock
                    ? 'bg-neutral-800 text-neutral-500 cursor-wait !important'
                    : isAdded
                      ? 'bg-green-600 text-white !important'
                      : 'hover:brightness-110 transition-all duration-300 shadow-[var(--card-shadow)]'
                  }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {checkingStock ? (
                    <motion.div
                      key="checking"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4 animate-pulse" />
                      <span className="text-xs md:text-xs lg:text-[11px] xl:text-xs">VERIFICANDO...</span>
                    </motion.div>
                  ) : isAdded ? (
                    <motion.div
                      key="added"
                      initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span className="text-xs">¡Listo!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="normal"
                      initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="text-xs md:text-xs lg:text-[11px] xl:text-xs">
                        {pricingMode === 'wholesale' ? 'AGREGAR PACK' : 'AGREGAR'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox / Modal de Zoom - Updated with Logic */}
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
              className="absolute top-4 right-4 md:top-8 md:right-8 bg-[#1A1A1A] text-white p-3 rounded-full hover:bg-[#FFFFFF] hover:text-black transition-colors z-20 border border-[#333]"
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
              {/* Modal Image Container - Dark Mode */}
              <div
                className="group/img bg-[#151515] p-2 md:p-4 rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl w-full max-w-[600px] border border-[#333] mb-4 md:mb-6 flex justify-center items-center h-[35vh] max-h-[35vh] relative cursor-zoom-in"
                onClick={() => setIsImageFullscreen(true)}
              >
                <DynamicImage
                  product={product}
                  className="w-full h-full object-contain group-hover/img:scale-105 brightness-110 contrast-125 transition-transform duration-500 ease-out drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-[rgba(0,0,0,0.4)] transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                  <div className="bg-black/90 text-white py-2 px-4 rounded-full backdrop-blur-md shadow-2xl flex items-center gap-2 border border-[#333]">
                    <ZoomIn className="w-5 h-5 text-[#FFFFFF]" />
                    <span className="text-[10px] font-black tracking-[0.2em]">PANTALLA COMPLETA</span>
                  </div>
                </div>
              </div>

              {/* Contenedor de Información con Scroll Opcional */}
              <div className="w-full max-w-[600px] bg-[#0A0A0A] md:bg-transparent rounded-b-2xl md:rounded-none px-4 pb-4 md:px-0 md:pb-0 text-center flex-1 overflow-y-auto custom-scrollbar">
                <h1 className="text-xl md:text-2xl font-industrial font-bold text-white uppercase mb-2">{formatProductName(product.name)}</h1>

                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFFFFF] text-[#FFFFFF]" />
                  ))}
                  <span className="text-xs text-neutral-400 ml-2">({rating}/5.0)</span>
                </div>

                <p className="text-sm text-[#A0AEC0] max-w-md mx-auto mb-4">{product.description}</p>

                <h2 className="sr-only">Precios y Opciones de Compra</h2>

                {/* Visualización de Precios en Modal */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto mb-6">
                  {/* Retail Modal */}
                  <div
                    onClick={() => setPricingMode('retail')}
                    className={`p-3 rounded-xl border flex flex-col items-center cursor-pointer transition-colors ${pricingMode === 'retail' ? 'border-white bg-[#1a1a1a]' : 'border-[#333] bg-[#111] hover:border-[#555]'}`}
                  >
                    <h3 className="text-[10px] text-[#A0AEC0] font-bold uppercase mb-1">1 Unidad</h3>
                    <p className={`font-bold text-lg md:text-xl font-industrial ${pricingMode === 'retail' ? 'text-white' : 'text-neutral-300'}`}>{formatCLP(product.priceRetail)}</p>
                    <span className="text-[9px] text-[#A0AEC0] font-semibold mt-1">(IVA incluido)</span>
                  </div>

                  {/* Wholesale Modal */}
                  <div
                    onClick={() => setPricingMode('wholesale')}
                    className={`p-3 rounded-xl border flex flex-col items-center relative overflow-hidden cursor-pointer transition-colors ${pricingMode === 'wholesale' ? 'border-[#FFFFFF] bg-[#FFFFFF]/10 shadow-[0_0_15px_rgba(255,215,0,0.15)]' : 'border-[#333] bg-[#111] hover:border-[#FFFFFF]/50'}`}
                  >
                    <div className="absolute top-0 right-0 bg-[#FFFFFF] text-black text-[8px] font-black px-1.5 py-0.5 uppercase">
                      Recomendado
                    </div>
                    <h3 className="text-[10px] text-[#A0AEC0] font-bold uppercase mb-1">Lleva {MIN_WHOLESALE_QTY} x</h3>
                    <p className={`font-bold text-xl md:text-2xl font-industrial ${pricingMode === 'wholesale' ? 'text-[#FFFFFF]' : 'text-[#FFFFFF]/80'}`}>{formatCLP(product.priceWholesale)}</p>
                    <span className="text-[9px] text-[#A0AEC0]">c/u + IVA</span>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex flex-col gap-3 w-full max-w-md mx-auto mt-auto pb-4">
                  {!liveStock ? (
                    <div className="w-full py-3.5 px-4 font-black uppercase tracking-wider bg-[#151515] text-[#A0AEC0] border border-[#333] flex items-center justify-center gap-2 rounded shadow-inner">
                      <X className="w-5 h-5 text-red-500/50" />
                      <span>SIN STOCK TEMPORAL</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      disabled={checkingStock}
                      className={`w-full py-3.5 px-4 font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded shadow-lg 
                          ${checkingStock ? 'bg-neutral-800 text-[#A0AEC0] cursor-wait' :
                          isAdded ? 'bg-green-600 text-white' : 'bg-[#FFD700] hover:brightness-110 transition-all duration-300 text-black font-bold shadow-md hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]'}`}
                    >
                      {checkingStock ? (
                        <><Zap className="w-5 h-5 animate-pulse" /> Verificando Stock</>
                      ) : isAdded ? (
                        <><Check className="w-5 h-5" /> ¡Agregado al Pack!</>
                      ) : (
                        <><ShoppingCart className="w-5 h-5" /> Agregar al Carro</>
                      )}
                    </button>
                  )}

                  <a
                    href={`https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(`¡Hola FYC! Me interesa el [${product.name}] (SKU: ${product.sku}). ¿Tienen stock? Mi pedido es por [${pricingMode === 'wholesale' ? MIN_WHOLESALE_QTY : 1}] unidades.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 font-bold uppercase text-[11px] tracking-wider transition-all flex items-center justify-center gap-2 rounded border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
                  >
                    WHATSAPP RÁPIDO
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- VISOR DE ALTA RESOLUCIÓN PANTALLA COMPLETA --- */}
      <AnimatePresence>
        {isImageFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center overflow-auto"
            onClick={() => setIsImageFullscreen(false)}
          >
            <button
              className="absolute top-4 right-4 md:top-8 md:right-8 bg-[#111] text-white p-3 rounded-full hover:bg-[#D32F2F] hover:text-white transition-colors z-[210] border border-[#333] shadow-lg"
              onClick={(e) => { e.stopPropagation(); setIsImageFullscreen(false); }}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full h-full flex items-center justify-center p-2 md:p-12 cursor-zoom-out"
            >
              <DynamicImage
                product={product}
                className="max-w-full max-h-full object-contain pointer-events-auto brightness-110 contrast-110"
                style={{ touchAction: 'pinch-zoom' }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
