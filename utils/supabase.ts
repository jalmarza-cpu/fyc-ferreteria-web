import { createClient } from '@supabase/supabase-js';

export const SUPABASE_BASE_URL = "https://tkqcbpizxsrffhygwxcg.supabase.co/storage/v1/object/public";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://tkqcbpizxsrffhygwxcg.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

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
export const getProductImageUrl = (productName: string, imagePath?: string) => {
  if (imagePath && imagePath.startsWith('http')) {
    // Fallback de seguridad para imágenes crudas sin hosting de base
    return imagePath;
  }
  
  // Mapeo Estricto desde Constants (Ej: Brochas/011310-Brocha-cafe-de-media.jpg)
  if (imagePath && imagePath.includes('.')) {
    return `${SUPABASE_BASE_URL}/productos/${imagePath}?v=innobate1`;
  }

  // Auto-Mapeo mágico de caída libre
  const firstWord = productName.split(' ')[0];
  const autoFile = `${slugify(firstWord)}.jpg`;
  return `${SUPABASE_BASE_URL}/productos/${autoFile}?v=innobate1`;
};

/**
 * Equivalente de Maestros para la sección Testimonios (Efecto Neón)
 * Busca estricto dentro del bucket video-webp/maestros/
 */
export const getMaestroImageUrl = (maestroName: string, imagePath?: string) => {
  if (imagePath && imagePath.startsWith('http')) return imagePath;

  // Archivo directo desde constantes (Ej: Cliente-1-Matias-Canto.jpg)
  if (imagePath) {
    // Romper cache forzadamente
    return `${SUPABASE_BASE_URL}/video-webp/maestros/${imagePath}?v=innobate2`;
  }

  // Respaldo neutro si no hay imagen
  const encodedName = encodeURIComponent(maestroName || 'M');
  return `https://ui-avatars.com/api/?name=${encodedName}&background=FFD700&color=0A0A0A&size=200&bold=true`;
};
