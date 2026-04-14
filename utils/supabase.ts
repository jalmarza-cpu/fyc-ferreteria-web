/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL || "https://tkqcbpizxsrffhygwxcg.supabase.co"}/storage/v1/object/public`;
export const BASE_IMAGE_URL = `${import.meta.env.VITE_SUPABASE_URL || "https://tkqcbpizxsrffhygwxcg.supabase.co"}/storage/v1/object/public/productos`;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tkqcbpizxsrffhygwxcg.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_2ne2YbHvV04Hvi-d96LJqg_sgHJ87CI';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  }
});

// Administrador dedicado para el Dashboard (Usa Service Role para saltarse RLS)
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac';
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

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
 * Genera URL de Supabase "Carga Inteligente"
 * Si el `imagePath` de la BB.DD ya tiene 'http', la usa.
 * Si no, usa el `imagePath` crudo (ej: "taladro.jpg").
 * Mapeo por SKU (Ley de Hierro): [SKU]-[Nombre].jpg 
 */
export const getProductImageUrl = (productName: string, imagePath?: string, sku?: string) => {
  // 1. URLs Externas Directas (Mandan sobre todo)
  if (imagePath?.startsWith('http')) {
    return imagePath;
  }

  // 2. Ruta con prefijo uploads/ (subidas desde el Dashboard)
  if (imagePath?.startsWith('uploads/')) {
    return `${BASE_IMAGE_URL}/${imagePath}`;
  }

  // 3. Cualquier otra ruta relativa guardada en BD
  if (imagePath && imagePath.trim() !== '') {
    return `${BASE_IMAGE_URL}/${imagePath}`;
  }

  // 4. Búsqueda por SKU: primera extensión a probar
  if (sku) {
    return `${BASE_IMAGE_URL}/${sku}.jpg`;
  }

  // 5. Sin datos suficientes, usar logo de fallback
  return '/logo-fyc.png';
};

/**
 * Genera array ordenado de URLs alternativas para el fallback de imagen.
 * Usar en onError del <img>: iterar hasta encontrar una que cargue.
 */
export const getProductImageFallbacks = (imagePath?: string, sku?: string): string[] => {
  const fallbacks: string[] = [];

  // Si tenemos ruta base, intentar otras extensiones
  if (imagePath && !imagePath.startsWith('http')) {
    const base = `${BASE_IMAGE_URL}/${imagePath}`;
    const noExt = base.replace(/\.(jpg|jpeg|png|webp|JPG|JPEG|PNG)$/i, '');
    fallbacks.push(`${noExt}.jpg`, `${noExt}.JPG`, `${noExt}.png`, `${noExt}.jpeg`, `${noExt}.webp`);
  }

  // Si tenemos SKU, probar múltiples extensiones
  if (sku) {
    fallbacks.push(
      `${BASE_IMAGE_URL}/${sku}.jpg`,
      `${BASE_IMAGE_URL}/${sku}.JPG`,
      `${BASE_IMAGE_URL}/${sku}.png`,
      `${BASE_IMAGE_URL}/${sku}.jpeg`,
    );
  }

  // Último recurso: logo local
  fallbacks.push('/logo-fyc.png');

  // Eliminar duplicados manteniendo el orden
  return [...new Set(fallbacks)];
};

/**
 * Equivalente de Maestros para la sección Testimonios (Efecto Neón)
 * Busca estricto dentro del bucket maestros/Testimonios/
 */
export const getMaestroImageUrl = (maestroName: string, imagePath?: string) => {
  if (imagePath && imagePath.startsWith('http')) return imagePath;

  // Archivo directo desde constantes (Ej: Cliente-1-Matias-Canto.jpg)
  if (imagePath) {
    // Romper cache forzadamente
    // En supabase el bucket es 'maestros' y la carpeta es 'Testimonios'
    return `${SUPABASE_BASE_URL}/maestros/Testimonios/${imagePath}?v=innobate3`;
  }

  // Respaldo neutro si no hay imagen
  const encodedName = encodeURIComponent(maestroName || 'M');
  return `https://ui-avatars.com/api/?name=${encodedName}&background=FFD700&color=0A0A0A&size=200&bold=true`;
};
