/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// ─────────────────────────────────────────────────────────────────────────────
// SEGURIDAD: Las credenciales SOLO se leen desde variables de entorno.
// NUNCA escribir valores reales aquí. Si faltan, la app muestra un error claro.
// Configurar en EasyPanel → Variables de Entorno (o en .env.local para desarrollo).
// ─────────────────────────────────────────────────────────────────────────────

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

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

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  }
});

// Cliente administrativo — Solo para el Dashboard interno (usa Service Role para saltarse RLS)
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey || supabaseKey);

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
export const getProductImageUrl = (productName: string, imagePath?: string, sku?: string) => {
  if (imagePath?.startsWith('http')) return imagePath;

  if (sku) {
    return `https://ppijxgxmqhblgssrjdky.supabase.co/storage/v1/object/public/productos-v2/${sku}.jpg`;
  }

  return '/logo-fyc.png';
};

export const getProductImageFallbacks = (imagePath?: string, sku?: string): string[] => {
  if (sku) {
    return [
      `https://ppijxgxmqhblgssrjdky.supabase.co/storage/v1/object/public/productos-v2/${sku}.webp`,
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
