/**
 * tokens.v2.ts — Tokens de Diseño V2 "Alta Gama"
 * ─────────────────────────────────────────────────
 * Fuente de verdad para los valores de diseño del sandbox V2.
 * Importar desde aquí en TODOS los componentes V2.
 * Si cambia un color, solo se cambia aquí.
 */

export const coloresV2 = {
  // ── Fondos ──────────────────────────────────────────────────────────
  /** Fondo global del canvas V2 */
  canvasBg:     '#121212',
  /** Fondo de las tarjetas de producto */
  cardBg:       '#181818',
  /** Fondo mínimo para imágenes */
  imageBg:      '#0F0F0F',
  /** Fondo de inputs y selects */
  inputBg:      '#1A1A1A',

  // ── Bordes y Divisores ───────────────────────────────────────────────
  /** Borde principal de tarjetas — Acero oscuro */
  cardBorder:   '#2D3748',
  /** Borde de hover — Azul acero oscuro */
  cardHoverBorder: '#1E2533',
  /** Divisores internos de secciones */
  divider:      '#1E293B',

  // ── Texto ────────────────────────────────────────────────────────────
  /** Nombre del producto y textos principales */
  textWhite:    '#FFFFFF',
  /** Specs, precios secundarios, labels — Gris Platino */
  textPlatino:  '#94A3B8',
  /** Texto muy atenuado: SKU, metadatos */
  textDim:      '#64748B',

  // ── Acento — Solo el botón CTA ───────────────────────────────────────
  /** ÚNICO uso de dorado sólido: botón "Añadir al Carrito" */
  accentGold:   '#FFD700',
  /** Hover del botón dorado */
  accentGoldHov: '#FFF176',
  /** Texto del botón dorado */
  accentGoldText: '#000000',

  // ── Estados ──────────────────────────────────────────────────────────
  /** Verde para ahorro, confirmaciones, stock */
  success:      '#10B981',
  /** Rojo para errores, sin stock */
  error:        '#EF4444',
  /** Ambar / advertencia */
  warning:      '#F59E0B',
} as const;

export const tipografiaV2 = {
  /** Tamaño base para nombres de producto */
  nombreProducto: '0.875rem',   // 14px
  /** Tamaño para specs y labels */
  specs:          '0.625rem',   // 10px
  /** Precio principal */
  precioGrande:   '1.5rem',     // 24px
  /** Peso para CTAs y precios */
  pesoCTA:        '900',        // font-black
  /** Peso para specs */
  pesoSpecs:      '600',        // font-semibold
  /** Tracking para títulos */
  trackingTitulo: '-0.01em',
  /** Tracking para botones */
  trackingCTA:    '0.08em',
} as const;

export const espaciadoV2 = {
  paddingTarjeta: '1rem',       // 16px
  radiusTarjeta:  '12px',
  radiusBoton:    '8px',
  radiusBadge:    '4px',
  gapGrid:        '1rem',       // 16px entre tarjetas
} as const;

// ── Tipo exportado para uso en componentes ───────────────────────────────────
export type ColorV2 = keyof typeof coloresV2;
