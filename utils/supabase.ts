/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// ─────────────────────────────────────────────────────────────────────────────
// SEGURIDAD: Las credenciales SOLO se leen desde variables de entorno.
// NUNCA escribir valores reales aquí. Si faltan, la app muestra un error claro.
// Configurar en EasyPanel → Variables de Entorno (o en .env.local para desarrollo).
// ─────────────────────────────────────────────────────────────────────────────

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

if (import.meta.env.VITE_SUPABASE_URL === undefined) {
  console.error(
    '[FYC] ⚠️ Variables de entorno de Supabase no configuradas. ' +
    'Definir VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el archivo .env.local ' +
    'o en las variables de entorno de EasyPanel.'
  );
}

export const SUPABASE_BASE_URL = supabaseUrl
  ? `${supabaseUrl}/storage/v1/object/public`
  : '';

export const BASE_IMAGE_URL = supabaseUrl
  ? `${supabaseUrl}/storage/v1/object/public/productos-v2`
  : '';

// ─────────────────────────────────────────────────────────────────────────────
// Cliente PÚBLICO: usa anon_key con caché habilitada (CDN Cloudflare activo).
// Las peticiones de datos del catálogo usarán la caché de borde de Cloudflare.
// ─────────────────────────────────────────────────────────────────────────────
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});

/**
 * Normaliza textos quitando tildes y caracteres especiales
 */
export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

/**
 * Genera URL de imagen desde Supabase Storage.
 * Estrategia de resolución:
 *   1. URL externa directa (ya contiene "http")
 *   2. Ruta relativa con prefijo uploads/ (subidas desde el Dashboard)
 *   3. Cualquier otra ruta relativa guardada en BD
 *   4. Búsqueda por SKU (primera extensión .jpg)
 *   5. Fallback: logo local
 */
// ─────────────────────────────────────────────────────────────────────────────
// OPTIMIZACIÓN DE IMÁGENES: Supabase Image Transformation API
// Solicita WebP (60% más liviano) con ancho máximo 480px para thumbnails.
// Cloudflare cachea estas URLs transformadas durante 7 días en sus nodos de borde.
// Documentación: https://supabase.com/docs/guides/storage/serving/image-transformations
// ─────────────────────────────────────────────────────────────────────────────

// URL base para transformaciones de imagen (render endpoint)
const IMAGE_RENDER_URL = `${supabaseUrl}/storage/v1/render/image/public/productos-v2`;

/**
 * Genera URL de imagen optimizada (WebP, 480px) para thumbnails del catálogo.
 * Si la URL es externa (http), la retorna tal cual sin transformar.
 */
export const getProductImageUrl = (productName: string, imagePath?: string, sku?: string) => {
  if (imagePath?.startsWith('http')) return imagePath;

  if (sku) {
    // Solicitar WebP optimizado vía Supabase Image Transformation
    return `${IMAGE_RENDER_URL}/${sku}.jpg?width=480&format=webp&quality=80`;
  }

  return '/logo-fyc.png';
};

/**
 * Genera lista de URLs candidatas en orden de preferencia.
 * 1. WebP optimizado 480px (thumbnail rápido)
 * 2. WebP optimizado 800px (fallback calidad media)
 * 3. JPG original sin transformar
 * 4. Logo de fallback local
 */
export const getProductImageFallbacks = (imagePath?: string, sku?: string): string[] => {
  if (sku) {
    return [
      `${IMAGE_RENDER_URL}/${sku}.jpg?width=480&format=webp&quality=80`,
      `${IMAGE_RENDER_URL}/${sku}.JPG?width=480&format=webp&quality=80`,
      `https://ppijxgxmqhblgssrjdky.supabase.co/storage/v1/object/public/productos-v2/${sku}.jpg`,
      `https://ppijxgxmqhblgssrjdky.supabase.co/storage/v1/object/public/productos-v2/${sku}.JPG`,
      '/logo-fyc.png'
    ];
  }
  return ['/logo-fyc.png'];
};

/**
 * Genera URL de imagen para la sección Maestros (testimonios).
 * Busca dentro del bucket: maestros/Testimonios/
 */
export const getMaestroImageUrl = (maestroName: string, imagePath?: string) => {
  if (imagePath && imagePath.startsWith('http')) return imagePath;
  if (imagePath) {
    return `${SUPABASE_BASE_URL}/maestros/Testimonios/${imagePath}?v=innobate3`;
  }
  const encodedName = encodeURIComponent(maestroName || 'M');
  return `https://ui-avatars.com/api/?name=${encodedName}&background=FBBF24&color=0A0A0A&size=200&bold=true`;
};
