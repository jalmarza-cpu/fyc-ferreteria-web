/**
 * ProductCardV2.tsx — Diseño "Industrial Élite" (Sandbox V2)
 * ───────────────────────────────────────────────────────────
 * ⚠️  COMPONENTE EXPERIMENTAL — NO está conectado al flujo productivo (V1).
 *
 * FILOSOFÍA: "El sitio de FYC no es solo una ferretería.
 *             Es un catálogo de soluciones técnicas de alta gama."
 *
 * Estándar Visual INNOBATE Industrial Élite:
 *   • Fondo canvas:     #121212 — Profundidad OLED, elimina fatiga visual
 *   • Borde tarjeta:    1px solid #2D3748 — Estructura de ingeniería
 *   • Nombre producto:  #FFFFFF — Legibilidad máxima         → clase: product-title-v2
 *   • Datos técnicos:   #A0AEC0 — Autoridad técnica neutral  → var: --tech-specs / clase: .tech-specs
 *   • Metadatos:        #64748B — Atenuado, no compite
 *   • Único CTA dorado: bg #FFFFFF, texto #000000 — Foco absoluto en conversión
 *   • Sin fondos amarillos en badges ni precios
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ZoomIn, Star, TrendingDown, Package, Check, Eye } from 'lucide-react';
import { useCalculadoraPrecios, ModoPrecios, formatearCLP } from '../../hooks/useCalculadoraPrecios';
import { getProductImageUrl, getProductImageFallbacks } from '../../utils/supabase';
import { Product } from '../../types';
import { useCartStore } from '../../store';

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

// ── Paleta V2 Centralizada ──────────────────────────────────────────────────
const V2 = {
  canvasBg:      'var(--bg-canvas)',  // Canvas principal (Azul cobalto)
  cardBg:        'var(--card-bg)',  // Fondo de tarjeta (Negro)
  cardBorder:    'var(--card-border)',  // Borde fino acero (Azul neón)
  cardHover:     'var(--card-border)',  // Borde hover (Azul neón)
  textWhite:     '#FFFFFF',  // Nombre del producto
  textPlatino:   '#94A3B8',  // Specs, labels, metadatos
  textDim:       '#64748B',  // Texto muy atenuado (SKU, etc.)
  accentGold:    'var(--accent-gold)',  // Color de acento
  accentGoldHov: '#F59E0B',  // Hover del botón ámbar
  badgeGreen:    '#10B981',  // Ahorro / stock
  badgeRed:      '#EF4444',  // Sin stock / oferta
  divider:       '#1E293B',  // Separadores internos
} as const;

// ── Componente de imagen resiliente (SIN TIMEOUTS AGRESIVOS NI LAZY LOAD) ──
const DynamicImageV2 = ({ product, className, onClick, style }: { product: Product, className?: string, onClick?: (e: React.MouseEvent) => void, style?: React.CSSProperties }) => {
  const urls = getProductImageFallbacks(product.imageUrl, product.sku);
  const [index, setIndex] = useState(0);
  const currentSrc = urls[index] || '/logo-fyc.png';

  useEffect(() => {
    if (currentSrc === '/logo-fyc.png') return;
    
    let isMounted = true;
    const img = new window.Image();
    
    img.onload = () => { /* Carga natural completa */ };
    img.onerror = () => {
      if (!isMounted) return;
      setIndex(i => Math.min(i + 1, urls.length - 1));
    };
    img.src = currentSrc;

    return () => {
      isMounted = false;
    };
  }, [currentSrc, urls]);

  return (
    <img 
      src={currentSrc} 
      alt={`${product.name} · SKU ${product.sku}`} 
      className={className} 
      onClick={onClick}
      style={style}
      // Forzamos carga ansiosa (quita el efecto tapón del Network request)
    />
  );
};

// ── Props ───────────────────────────────────────────────────────────────────
interface ProductCardV2Props {
  product: Product;
  totalCarro?: number;
}

// ── Componente ──────────────────────────────────────────────────────────────
const ProductCardV2: React.FC<ProductCardV2Props> = ({ product, totalCarro = 0 }) => {
  const addItem = useCartStore(state => state.addItem);
  const [modo, setModo] = useState<ModoPrecios>('mayorista');
  const [isAdded, setIsAdded] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [viewers] = useState(() => Math.floor(Math.random() * 12) + 3);
  const [rating] = useState(() => (Math.random() * 0.5 + 4.5).toFixed(1));

  const {
    precioUnitario,
    cantidadAAgregar,
    ahorroUnitario,
    porcentajeDescuento,
    ahorroPack,
    precioUnitarioFormateado,
  } = useCalculadoraPrecios(product, modo, totalCarro);

  const inStock = product.inStock !== false;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inStock) return;
    addItem(product, cantidadAAgregar, precioUnitario);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const imgSrc = getProductImageUrl(product.name, product.imageUrl, product.sku);

  return (
    <>
      {/* ── Tarjeta principal ── */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative flex flex-col overflow-hidden transition-all duration-300 group card-container product-card rounded-xl"
      >

        {/* ── Badge de descuento (sin amarillo) ── */}
        {porcentajeDescuento > 0 && (
          <div className="absolute top-3 left-3 z-[50] flex flex-col gap-1">
            <span
              className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-sm text-white"
              style={{ background: V2.badgeRed }}
            >
              -{porcentajeDescuento}% OFF
            </span>
          </div>
        )}

        {/* ── Imagen ── */}
        <div
          className="relative aspect-square w-full flex items-center justify-center overflow-hidden cursor-zoom-in p-4 group"
          style={{ background: '#0F0F0F', borderBottom: `1px solid ${V2.divider}` }}
          onClick={() => setIsZoomOpen(true)}
        >
          <DynamicImageV2
            product={product}
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 brightness-110 contrast-125"
          />
          {/* Overlay zoom */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-2 rounded-full" style={{ background: 'rgba(0,0,0,0.7)' }}>
              <ZoomIn className="w-5 h-5" style={{ color: V2.accentGold }} />
            </div>
          </div>
          {/* Visor en vivo */}
          <div
            className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded"
            style={{ background: 'rgba(15,15,15,0.85)', border: `1px solid ${V2.divider}` }}
          >
            <Eye className="w-3 h-3" style={{ color: V2.textDim }} />
            <span className="text-[9px] font-bold" style={{ color: V2.textPlatino }}>{viewers}</span>
          </div>
        </div>

        {/* ── Cuerpo ── */}
        <div className="flex flex-col flex-1 p-4 gap-3">

          {/* Categoría + SKU — Datos técnicos con --tech-specs */}
          <div className="flex items-center justify-between">
            <span className="tech-specs uppercase tracking-widest">
              {product.category}
            </span>
            <span className="tech-specs font-mono px-1.5 py-0.5 rounded" style={{ border: `1px solid ${V2.divider}` }}>
              SKU {product.sku}
            </span>
          </div>

          {/* Nombre — product-title-v2: blanco puro, sin amarillo, máxima legibilidad */}
          <h3 className="product-title-v2 text-sm font-black uppercase leading-tight line-clamp-2">
            {formatProductName(product.name)}
          </h3>

          {/* Rating — Gris Platino */}
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3" fill={V2.accentGold} style={{ color: V2.accentGold }} />
              ))}
            </div>
            <span className="text-[10px]" style={{ color: V2.textPlatino }}>({rating})</span>
          </div>

          {/* ── Selector de Modo de Precio ── */}
          <div
            className="flex rounded-lg overflow-hidden"
            style={{ border: `1px solid ${V2.divider}`, background: '#0F0F0F' }}
          >
            {(['detalle', 'mayorista'] as ModoPrecios[]).map(m => (
              <button
                key={m}
                onClick={() => setModo(m)}
                className="flex-1 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all"
                style={{
                  background: modo === m ? V2.divider : 'transparent',
                  color: modo === m ? V2.textWhite : V2.textDim,
                }}
              >
                {m === 'detalle' ? '1 Unidad' : 'Pack x6'}
              </button>
            ))}
          </div>

          {/* ── Bloque de precio — Datos técnicos con .tech-specs, precio en blanco ── */}
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              {/* Etiqueta de modo: dato técnico */}
              <span className="tech-specs">
                {modo === 'mayorista' ? 'Pack de 6 · c/u' : '1 unidad'}
              </span>
              {modo === 'mayorista' && ahorroUnitario > 0 && (
                <div className="flex items-center gap-1" style={{ color: V2.success }}>
                  <TrendingDown className="w-3 h-3" />
                  <span className="text-[9px] font-bold">Ahorra {formatearCLP(ahorroPack)}</span>
                </div>
              )}
            </div>
            {/* Precio principal: blanco puro — máximo contraste */}
            <div className="flex items-end justify-between">
              <span
                className={`text-2xl font-black ${porcentajeDescuento > 0 ? 'price-discount' : 'text-white'}`}
                style={{ letterSpacing: '-0.02em' }}
              >
                {precioUnitarioFormateado}
              </span>
              {/* IVA: dato técnico */}
              <span className="tech-specs">IVA incluido</span>
            </div>
            {modo === 'mayorista' && (
              <div className="flex items-center gap-1.5">
                <Package className="w-3 h-3" style={{ color: V2.textDim }} />
                {/* Specs de pack: dato técnico con valor en blanco */}
                <span className="tech-specs">
                  Mínimo <strong>6 unidades</strong> · Despacho hoy
                </span>
              </div>
            )}
          </div>

          {/* ── Botón CTA — ÚNICO elemento dorado sólido ── */}
          <div className="mt-auto pt-1">
            {!inStock ? (
              <div
                className="w-full py-3 text-center text-xs font-black uppercase tracking-wider rounded-lg"
                style={{ background: '#1A1A1A', color: V2.textDim, border: `1px solid ${V2.divider}` }}
              >
                Sin Stock Temporal
              </div>
            ) : (
              <motion.button
                onClick={handleAdd}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 hover:brightness-110 ${!isAdded ? 'btn-add-to-cart' : ''}`}
                style={{
                  background: isAdded ? V2.badgeGreen : 'transparent'
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isAdded ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                      style={{ color: '#fff' }}
                    >
                      <Check className="w-4 h-4" /> ¡Listo!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="normal"
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {modo === 'mayorista' ? 'Agregar Pack' : 'Agregar'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Modal de Zoom ── */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background: 'rgba(0,0,0,0.96)' }}
            onClick={() => setIsZoomOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="max-w-lg w-full flex flex-col items-center gap-4"
              onClick={e => e.stopPropagation()}
            >
              <div
                className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center p-6"
                style={{ background: '#0F0F0F', border: `1px solid ${V2.cardBorder}` }}
              >
                <DynamicImageV2
                  product={product}
                  className="w-full h-full object-contain brightness-110 contrast-125"
                />
              </div>
              <h2 className="text-lg font-black uppercase text-center" style={{ color: V2.textWhite }}>
                {formatProductName(product.name)}
              </h2>
              <p className="text-sm text-center" style={{ color: V2.textPlatino }}>
                {product.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCardV2;
