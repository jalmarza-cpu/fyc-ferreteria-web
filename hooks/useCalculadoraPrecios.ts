/**
 * useCalculadoraPrecios.ts
 * ------------------------
 * Hook centralizado para la lógica de los 3 niveles de precio de FYC Ferretería.
 *
 * REGLA: La UI solo "pide" el precio → el hook lo entrega ya calculado.
 * Ningún componente debe calcular descuentos, formatos o cantidades mínimas por su cuenta.
 *
 * Niveles de precio:
 *   1. Detalle   → 1 unidad, precio de catálogo (priceRetail)
 *   2. Mayorista → Pack mínimo de 6 unidades (priceWholesale)
 *   3. Maestro   → [FUTURO] Precio negociado para clientes con convenio (priceMaestro)
 */

import { useMemo } from 'react';

// --- Constantes del negocio ---
export const CANTIDAD_MINIMA_MAYOREO = 6;
export const UMBRAL_ENVIO_GRATIS = 100_000; // CLP

// --- Tipos ---
export type ModoPrecios = 'detalle' | 'mayorista' | 'maestro';

export interface ProductoPrecio {
  priceRetail: number;
  priceWholesale: number;
  priceMaestro?: number; // Opcional: precio para clientes con convenio (fase futura)
}

export interface ResultadoPrecios {
  /** Precio unitario según el modo activo */
  precioUnitario: number;
  /** Cantidad a agregar al carro según el modo activo */
  cantidadAAgregar: number;
  /** Precio total del lote (precioUnitario × cantidadAAgregar) */
  precioTotal: number;
  /** Monto ahorrado respecto al precio de detalle (para 1 unidad) */
  ahorroUnitario: number;
  /** Porcentaje de descuento respecto al precio de detalle */
  porcentajeDescuento: number;
  /** Monto ahorrado en el pack completo */
  ahorroPack: number;
  /** Texto formateado del precio unitario en pesos chilenos */
  precioUnitarioFormateado: string;
  /** Texto formateado del precio total del lote */
  precioTotalFormateado: string;
  /** ¿El carrito actual alcanza el umbral de envío gratis? */
  tieneEnvioGratis: boolean;
  /** Monto restante para alcanzar el umbral de envío gratis */
  montoParaEnvioGratis: number;
}

// --- Formateador CLP (reutilizable) ---
export const formatearCLP = (valor: number): string =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(valor);

// --- Hook Principal ---
/**
 * @param producto  Objeto con los 3 precios del producto
 * @param modo      Modo de precio activo: 'detalle' | 'mayorista' | 'maestro'
 * @param totalCarro Total acumulado del carro (para calcular envío gratis)
 */
export function useCalculadoraPrecios(
  producto: ProductoPrecio,
  modo: ModoPrecios = 'mayorista',
  totalCarro: number = 0
): ResultadoPrecios {
  return useMemo(() => {
    const { priceRetail, priceWholesale, priceMaestro } = producto;

    // --- Resolver precio y cantidad según modo activo ---
    let precioUnitario: number;
    let cantidadAAgregar: number;

    switch (modo) {
      case 'detalle':
        precioUnitario = priceRetail;
        cantidadAAgregar = 1;
        break;
      case 'maestro':
        // Si no hay precio maestro configurado, se usa mayorista como fallback
        precioUnitario = priceMaestro ?? priceWholesale;
        cantidadAAgregar = CANTIDAD_MINIMA_MAYOREO;
        break;
      case 'mayorista':
      default:
        precioUnitario = priceWholesale;
        cantidadAAgregar = CANTIDAD_MINIMA_MAYOREO;
        break;
    }

    const precioTotal = precioUnitario * cantidadAAgregar;

    // --- Calcular ahorro y descuento respecto al precio de detalle ---
    const ahorroUnitario = Math.max(0, priceRetail - precioUnitario);
    const porcentajeDescuento =
      priceRetail > 0 ? Math.round((ahorroUnitario / priceRetail) * 100) : 0;
    const ahorroPack = ahorroUnitario * cantidadAAgregar;

    // --- Envío gratis ---
    const nuevaTotalConEsteProducto = totalCarro + precioTotal;
    const tieneEnvioGratis = nuevaTotalConEsteProducto >= UMBRAL_ENVIO_GRATIS;
    const montoParaEnvioGratis = Math.max(0, UMBRAL_ENVIO_GRATIS - nuevaTotalConEsteProducto);

    return {
      precioUnitario,
      cantidadAAgregar,
      precioTotal,
      ahorroUnitario,
      porcentajeDescuento,
      ahorroPack,
      precioUnitarioFormateado: formatearCLP(precioUnitario),
      precioTotalFormateado: formatearCLP(precioTotal),
      tieneEnvioGratis,
      montoParaEnvioGratis,
    };
  }, [producto, modo, totalCarro]);
}
