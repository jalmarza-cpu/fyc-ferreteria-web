/**
 * useWebPOptimizer.ts — Optimizador de Imágenes WebP
 * ────────────────────────────────────────────────────
 * Utilidad de soporte para cuando se reconecte Supabase Storage.
 *
 * ESTRATEGIA: Priorizar .webp sobre .jpg/.png para:
 *   • Reducir peso de página (~30-40% más ligero que JPEG)
 *   • Mantener profundidad de negros sin artifacts de compresión
 *   • Mejorar LCP (Largest Contentful Paint) en móvil
 *
 * MODO ACTUAL: Offline (datos locales). Este hook es un STUB no destructivo.
 *              Al reconectar Supabase, descomentar las rutas WebP en la estrategia.
 *
 * CÓMO ACTIVAR (cuando vuelva Supabase):
 *   1. En Supabase Storage → asegurar que existen versiones .webp de los productos.
 *   2. En `utils/supabase.ts` → cambiar el orden de `getProductImageFallbacks`
 *      para que .webp sea el primer intento.
 *   3. Descomentar la sección "Estrategia WebP Activa" de este archivo.
 */

// ── Tipos ───────────────────────────────────────────────────────────────────

export interface ImageResolutionResult {
  /** URL de mayor calidad disponible para este producto */
  bestUrl: string;
  /** Formato detectado o esperado */
  format: 'webp' | 'jpg' | 'png' | 'jpeg' | 'local';
  /** Prioridad usada (1 = máxima) */
  priority: number;
  /** ¿Se intentó WebP primero? */
  webpAttempted: boolean;
}

// ── Constantes ───────────────────────────────────────────────────────────────

/**
 * Orden de prioridad de formatos.
 * WebP va PRIMERO para garantizar menor peso y mejor calidad en negros profundos.
 */
export const FORMATO_PRIORIDAD = ['webp', 'jpg', 'png', 'jpeg'] as const;

// ── Utilidad: detectar soporte WebP del navegador ────────────────────────────

let _webpSoportado: boolean | null = null;

export function navegadorSoportaWebP(): boolean {
  if (_webpSoportado !== null) return _webpSoportado;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    _webpSoportado = canvas.toDataURL('image/webp').startsWith('data:image/webp');
  } catch {
    _webpSoportado = false;
  }
  return _webpSoportado;
}

// ── Utilidad: construir lista de URLs en orden de prioridad ─────────────────

/**
 * Genera URLs ordenadas por formato prioritario (WebP primero).
 * Compatible con la función getProductImageFallbacks de utils/supabase.ts
 *
 * @param baseUrl    URL base del bucket de Supabase Storage
 * @param sku        SKU del producto
 * @param imagePath  Ruta guardada en la base de datos (puede tener extensión)
 */
export function generarUrlsWebPPrimero(
  baseUrl: string,
  sku?: string,
  imagePath?: string
): string[] {
  const urls: string[] = [];
  const soporte = navegadorSoportaWebP();

  // Orden de formatos: WebP siempre primero si el navegador lo soporta
  const formatos = soporte
    ? FORMATO_PRIORIDAD
    : (['jpg', 'png', 'jpeg', 'webp'] as const);

  if (sku) {
    for (const fmt of formatos) {
      urls.push(`${baseUrl}/${sku}.${fmt}`);
    }
  }

  if (imagePath && !imagePath.startsWith('http')) {
    const sinExtension = imagePath.replace(/\.(jpg|jpeg|png|webp|JPG|JPEG|PNG)$/i, '');
    for (const fmt of formatos) {
      urls.push(`${baseUrl}/${sinExtension}.${fmt}`);
    }
  }

  // Fallback local siempre al final
  urls.push('/placeholder-fyc.png');

  return [...new Set(urls)];
}

// ── Hook de React ────────────────────────────────────────────────────────────

import { useMemo } from 'react';

/**
 * Hook para resolver la mejor URL de imagen disponible para un producto.
 * En modo offline retorna la URL local o fallback.
 * Cuando Supabase esté activo, priorizará .webp automáticamente.
 *
 * @param supabaseBaseUrl  URL base del bucket (desde VITE_SUPABASE_URL)
 * @param sku              SKU del producto
 * @param imagePath        Ruta de imagen guardada en BD
 * @param imageUrlDirecta  URL directa (si ya viene con "https://")
 */
export function useWebPOptimizer(
  supabaseBaseUrl: string,
  sku?: string,
  imagePath?: string,
  imageUrlDirecta?: string
): { urls: string[]; primaryUrl: string; formato: string } {
  return useMemo(() => {
    // Si ya tenemos URL externa directa, usarla sin modificar
    if (imageUrlDirecta?.startsWith('http')) {
      return {
        urls: [imageUrlDirecta, '/placeholder-fyc.png'],
        primaryUrl: imageUrlDirecta,
        formato: imageUrlDirecta.match(/\.(webp|jpg|png|jpeg)$/i)?.[1] || 'desconocido',
      };
    }

    // Sin Supabase configurado → retornar solo placeholder local
    if (!supabaseBaseUrl) {
      return {
        urls: ['/placeholder-fyc.png'],
        primaryUrl: '/placeholder-fyc.png',
        formato: 'local',
      };
    }

    const urls = generarUrlsWebPPrimero(supabaseBaseUrl, sku, imagePath);
    const formato = urls[0]?.match(/\.(webp|jpg|png|jpeg)$/i)?.[1] || 'desconocido';

    return { urls, primaryUrl: urls[0], formato };
  }, [supabaseBaseUrl, sku, imagePath, imageUrlDirecta]);
}

/*
 * ═══════════════════════════════════════════════════════════════════
 *  GUÍA DE ACTIVACIÓN COMPLETA (Para el técnico que reconecte Supabase)
 * ═══════════════════════════════════════════════════════════════════
 *
 *  1. SUPABASE STORAGE:
 *     - Subir versiones .webp de todas las imágenes al bucket 'productos'
 *     - Usar la herramienta CLI de Supabase: `supabase storage cp`
 *     - Alternativamente, convertir con sharp.js en un script de migración
 *
 *  2. ACTIVAR EN utils/supabase.ts:
 *     Línea actual en getProductImageFallbacks:
 *       fallbacks.push(`${noExt}.jpg`, `${noExt}.JPG`, `${noExt}.png`, ...)
 *     Cambiar a:
 *       fallbacks.push(`${noExt}.webp`, `${noExt}.jpg`, `${noExt}.JPG`, ...)
 *
 *  3. USAR ESTE HOOK en ProductCardV2:
 *     import { useWebPOptimizer } from '../../hooks/useWebPOptimizer'
 *     const { primaryUrl, urls } = useWebPOptimizer(
 *       import.meta.env.VITE_SUPABASE_URL + '/storage/v1/object/public/productos',
 *       product.sku,
 *       product.imageUrl,
 *       product.imageUrl
 *     )
 *
 *  4. BENEFICIO ESPERADO:
 *     - Reducción de peso por imagen: ~35%
 *     - Negros más profundos (WebP preserva mejor la gama oscura)
 *     - LCP móvil: mejora estimada de 200-400ms
 * ═══════════════════════════════════════════════════════════════════
 */
