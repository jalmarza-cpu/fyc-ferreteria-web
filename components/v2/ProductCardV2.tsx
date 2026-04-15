/**
 * ProductCardV2.tsx — Diseño "Alta Gama" (Sandbox V2)
 * ─────────────────────────────────────────────────────
 * ⚠️  COMPONENTE EXPERIMENTAL — NO está conectado al flujo productivo (V1).
 *
 * Estándar Visual INNOBATE:
 *   • Fondo canvas:     #121212 (Negro Obsidiana)
 *   • Borde tarjeta:    1px solid #2D3748
 *   • Nombre producto:  #FFFFFF (Blanco puro)
 *   • Specs / textos:   #94A3B8 (Gris Platino)
 *   • Único CTA dorado: bg #FFD700, texto #000000 (Solo el botón principal)
 *   • Sin fondos amarillos en badges ni precios
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ZoomIn, Star, TrendingDown, Package, Check, Eye } from 'lucide-react';
import { useCalculadoraPrecios, ModoPrecios, formatearCLP } from '../../hooks/useCalculadoraPrecios';
import { getProductImageUrl, getProductImageFallbacks } from '../../utils/supabase';
import { Product } from '../../types';
import { useCartStore } from '../../store';

// ── Paleta V2 Centralizada ──────────────────────────────────────────────────
const V2 = {
  canvasBg:      '#121212',  // Canvas principal
  cardBg:        '#181818',  // Fondo de tarjeta
  cardBorder:    '#2D3748',  // Borde fino acero
  cardHover:     '#1E2533',  // Borde hover (azul acero oscuro)
  textWhite:     '#FFFFFF',  // Nombre del producto
  textPlatino:   '#94A3B8',  // Specs, labels, metadatos
  textDim:       '#64748B',  // Texto muy atenuado (SKU, etc.)
  accentGold:    '#FFD700',  // ÚNICO uso de dorado: botón CTA
  accentGoldHov: '#FFF176',  // Hover del botón dorado
  badgeGreen:    '#10B981',  // Ahorro / stock
  badgeRed:      '#EF4444',  // Sin stock / oferta
  divider:       '#1E293B',  // Separadores internos
} as const;

// ── Fallback de imágenes ────────────────────────────────────────────────────
const makeErrorHandler = (imagePath?: string, sku?: string) => {
  let idx = 0;
  const fallbacks = getProductImageFallbacks(imagePath, sku);
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    while (idx < fallbacks.length) {
      const next = fallbacks[idx++];
      if (next !== target.src) { target.src = next; return; }
    }
    target.src = '/placeholder-fyc.png';
  };
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
        className="relative flex flex-col overflow-hidden transition-all duration-300 group"
        style={{
          background: V2.cardBg,
          border: `1px solid ${V2.cardBorder}`,
          borderRadius: '12px',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = V2.cardHover)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = V2.cardBorder)}
      >

        {/* ── Badge de descuento (sin amarillo) ── */}
        {porcentajeDescuento > 0 && (
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
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
          <img
            loading="lazy"
            src={imgSrc}
            alt={`${product.name} · SKU ${product.sku}`}
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            onError={makeErrorHandler(product.imageUrl, product.sku)}
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

          {/* Categoría + SKU */}
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: V2.textDim }}>
              {product.category}
            </span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded" style={{ color: V2.textDim, border: `1px solid ${V2.divider}` }}>
              SKU {product.sku}
            </span>
          </div>

          {/* Nombre — Blanco puro, sin amarillo */}
          <h3
            className="text-sm font-black uppercase leading-tight line-clamp-2"
            style={{ color: V2.textWhite, fontFamily: 'inherit', letterSpacing: '-0.01em' }}
          >
            {product.name}
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

          {/* ── Bloque de precio — SIN fondos amarillos ── */}
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px]" style={{ color: V2.textPlatino }}>
                {modo === 'mayorista' ? 'Pack de 6 · c/u' : '1 unidad'}
              </span>
              {modo === 'mayorista' && ahorroUnitario > 0 && (
                <div className="flex items-center gap-1" style={{ color: V2.badgeGreen }}>
                  <TrendingDown className="w-3 h-3" />
                  <span className="text-[9px] font-bold">Ahorra {formatearCLP(ahorroPack)}</span>
                </div>
              )}
            </div>
            <div className="flex items-end justify-between">
              <span
                className="text-2xl font-black"
                style={{ color: V2.textWhite, letterSpacing: '-0.02em' }}
              >
                {precioUnitarioFormateado}
              </span>
              <span className="text-[9px]" style={{ color: V2.textPlatino }}>
                IVA incluido
              </span>
            </div>
            {modo === 'mayorista' && (
              <div className="flex items-center gap-1.5">
                <Package className="w-3 h-3" style={{ color: V2.textDim }} />
                <span className="text-[9px]" style={{ color: V2.textPlatino }}>
                  Mínimo <strong style={{ color: V2.textWhite }}>6 unidades</strong> · Despacho hoy
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
                className="w-full py-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2"
                style={{
                  background: isAdded ? V2.badgeGreen : V2.accentGold,
                  color: '#000000',
                }}
                onMouseEnter={e => {
                  if (!isAdded) (e.currentTarget as HTMLElement).style.background = V2.accentGoldHov;
                }}
                onMouseLeave={e => {
                  if (!isAdded) (e.currentTarget as HTMLElement).style.background = V2.accentGold;
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
                <img
                  src={imgSrc}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={makeErrorHandler(product.imageUrl, product.sku)}
                />
              </div>
              <h2 className="text-lg font-black uppercase text-center" style={{ color: V2.textWhite }}>
                {product.name}
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
