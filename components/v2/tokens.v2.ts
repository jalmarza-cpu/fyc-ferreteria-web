/**
 * tokens.v2.ts — Tokens de Diseño V2 "Industrial Élite"
 * ────────────────────────────────────────────────────────
 * Fuente de verdad para los valores de diseño del sandbox V2.
 * Importar desde aquí en TODOS los componentes V2.
 * Si cambia un color, solo se cambia aquí.
 *
 * FILOSOFÍA: "El sitio de FYC no es solo una ferretería.
 *             Es un catálogo de soluciones técnicas de alta gama."
 *             → El diseño está al servicio de la técnica.
 */

export const coloresV2 = {
  // ── Fondos ──────────────────────────────────────────────────────────
  /** Fondo global canvas — Profundidad OLED, elimina fatiga visual */
  canvasBg:        '#121212',
  /** Fondo de tarjetas de producto */
  cardBg:          '#181818',
  /** Fondo mínimo para contenedores de imagen */
  imageBg:         '#0F0F0F',
  /** Fondo para inputs, controls, selector de modo */
  inputBg:         '#1A1A1A',

  // ── Bordes y Divisores ───────────────────────────────────────────────
  /** Borde principal de tarjetas — Estructura de ingeniería sin "cerrar" el diseño */
  cardBorder:      '#2D3748',
  /** Borde hover — Azul acero oscuro */
  cardHoverBorder: '#1E2533',
  /** Divisores internos de secciones */
  divider:         '#1E293B',

  // ── Texto — Jerarquía de 3 niveles ──────────────────────────────────
  /** NIVEL 1: Nombre del producto — Legibilidad máxima en entorno oscuro */
  textWhite:       '#FFFFFF',
  /** NIVEL 2: Datos Técnicos (Voltaje, Watts, Kelvin, Dimensiones) — Autoridad neutral */
  textTech:        '#A0AEC0',
  /** NIVEL 3: Metadatos atenuados (SKU, categoría, timestamp) */
  textDim:         '#64748B',

  // ── Acento — Foco de Conversión (ÚNICO uso de dorado) ────────────────
  /** SOLO en el botón "Añadir al Carrito" / CTA de venta */
  accentGold:      '#FFD700',
  /** Hover del botón dorado */
  accentGoldHov:   '#FFF176',
  /** Texto dentro del botón dorado — contraste máximo */
  accentGoldText:  '#000000',

  // ── Estados de Sistema ───────────────────────────────────────────────
  /** Verde: ahorro, confirmación de carrito, stock disponible */
  success:         '#10B981',
  /** Rojo: sin stock, badge de oferta */
  error:           '#EF4444',
  /** Ámbar: advertencia, stock bajo */
  warning:         '#F59E0B',
} as const;

export const tipografiaV2 = {
  /** Tamaño para nombre de producto */
  nombreProducto:  '0.875rem',   // 14px
  /** Tamaño para datos técnicos (.text-tech) */
  datosTecnicos:   '0.6875rem',  // 11px
  /** Precio principal */
  precioGrande:    '1.5rem',     // 24px
  /** Peso para CTAs y precios */
  pesoCTA:         '900',
  /** Peso para datos técnicos */
  pesoTech:        '600',
  /** Tracking para títulos de producto */
  trackingTitulo:  '-0.01em',
  /** Tracking para datos técnicos */
  trackingTech:    '0.04em',
  /** Tracking para CTAs */
  trackingCTA:     '0.08em',
} as const;

export const espaciadoV2 = {
  paddingTarjeta:  '1rem',       // 16px
  radiusTarjeta:   '12px',
  radiusBoton:     '8px',
  radiusBadge:     '4px',
  gapGrid:         '1rem',
} as const;

/** Tipo exportado para uso seguro en componentes */
export type ColorV2 = keyof typeof coloresV2;

/**
 * Referencia semántica de clases CSS aplicadas en V2:
 *
 *  .text-tech        → color: #A0AEC0 — Para Voltaje, Watts, Kelvin, Dimensiones, Peso, SKU
 *  .product-title-v2 → color: #FFFFFF — Para el nombre principal del producto
 *
 * Ambas clases están definidas globalmente en index.html → :root → <style>
 */
export const CLASES_SEMANTICAS_V2 = {
  datosTecnicos: 'text-tech',       // Voltaje, Watts, Kelvin, Dimensiones
  tituloProd:    'product-title-v2', // Nombre del producto
} as const;
