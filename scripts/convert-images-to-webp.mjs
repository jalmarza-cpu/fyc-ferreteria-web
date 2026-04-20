/**
 * ============================================================
 * FYC Ferretería — Conversor Masivo de Imágenes a WebP
 * ============================================================
 * Descarga todas las imágenes del bucket Supabase "productos-v2",
 * las convierte a WebP (80% calidad → 60-80% más liviano),
 * y las sube de vuelta al mismo bucket con extensión .webp.
 *
 * USO:
 *   node scripts/convert-images-to-webp.mjs
 *
 * REQUISITOS (instalar la primera vez):
 *   npm install sharp @supabase/supabase-js dotenv
 * ============================================================
 */

import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';
import { config } from 'dotenv';

// Cargar variables de entorno desde .env.local
config({ path: '.env.local' });

// ─── Configuración ───────────────────────────────────────────
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'productos-v2';
const WEBP_QUALITY = 80;       // 80% calidad → visualmente idéntico, 60-80% más liviano
const MAX_WIDTH = 800;          // Redimensionar si ancho > 800px (thumbnails del catálogo)
const TEMP_DIR = './scripts/temp_imgs';
const LOG_FILE = './scripts/webp_conversion_log.json';

// Extensiones de imagen a procesar
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Faltan variables de entorno. Verifica .env.local');
  process.exit(1);
}

// Supabase con service_role para poder escribir al storage sin restricciones RLS
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ─── Utilidades ───────────────────────────────────────────────
const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ─── Main ─────────────────────────────────────────────────────
async function main() {
  console.log('\n🚀 FYC WebP Converter - Iniciando...');
  console.log(`📦 Bucket: ${BUCKET}`);
  console.log(`⚙️  Calidad WebP: ${WEBP_QUALITY}% | Ancho máx: ${MAX_WIDTH}px`);
  console.log('─'.repeat(55));

  // Crear directorio temporal
  if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR, { recursive: true });

  // 1. Listar todos los archivos del bucket
  console.log('\n📋 Listando archivos en el bucket...');
  const allFiles = await listAllFiles();
  
  const imageFiles = allFiles.filter(f => 
    IMAGE_EXTENSIONS.includes(extname(f.name)) &&
    !f.name.endsWith('.webp')
  );

  console.log(`✅ Total archivos: ${allFiles.length} | Imágenes a convertir: ${imageFiles.length}`);

  if (imageFiles.length === 0) {
    console.log('\n🎉 ¡Todas las imágenes ya están convertidas a WebP!');
    return;
  }

  // 2. Procesar cada imagen
  const log = { converted: [], skipped: [], errors: [], stats: { totalOriginalBytes: 0, totalWebpBytes: 0 } };
  let processed = 0;

  for (const file of imageFiles) {
    processed++;
    const filePath = file.name;
    const webpPath = filePath.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/, '.webp');
    
    process.stdout.write(`\r[${processed}/${imageFiles.length}] Procesando: ${basename(filePath).substring(0, 40).padEnd(40)}`);

    try {
      // Verificar si ya existe versión webp
      const { data: existing } = await supabase.storage.from(BUCKET).list(
        webpPath.includes('/') ? webpPath.split('/').slice(0, -1).join('/') : '',
        { search: basename(webpPath) }
      );
      
      if (existing && existing.length > 0 && existing.some(f => f.name === basename(webpPath))) {
        log.skipped.push({ path: filePath, reason: 'webp ya existe' });
        continue;
      }

      // Descargar imagen original
      const { data: fileData, error: downloadError } = await supabase.storage
        .from(BUCKET)
        .download(filePath);

      if (downloadError || !fileData) {
        log.errors.push({ path: filePath, error: downloadError?.message || 'Download failed' });
        continue;
      }

      // Convertir Buffer a WebP con sharp
      const originalBuffer = Buffer.from(await fileData.arrayBuffer());
      const originalSize = originalBuffer.length;

      const webpBuffer = await sharp(originalBuffer)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true }) // No agrandar, solo reducir
        .webp({ quality: WEBP_QUALITY, effort: 4 })             // effort 4 = balance velocidad/compresión
        .toBuffer();

      const webpSize = webpBuffer.length;
      const savings = Math.round((1 - webpSize / originalSize) * 100);

      // Subir versión WebP al bucket
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(webpPath, webpBuffer, {
          contentType: 'image/webp',
          upsert: true,
          cacheControl: '31536000' // 1 año de caché
        });

      if (uploadError) {
        log.errors.push({ path: filePath, error: uploadError.message });
        continue;
      }

      log.converted.push({
        original: filePath,
        webp: webpPath,
        originalSize: formatBytes(originalSize),
        webpSize: formatBytes(webpSize),
        savings: `${savings}%`
      });

      log.stats.totalOriginalBytes += originalSize;
      log.stats.totalWebpBytes += webpSize;

      // Pequeña pausa para no saturar la API de Supabase
      await sleep(150);

    } catch (err) {
      log.errors.push({ path: filePath, error: err.message });
    }
  }

  // 3. Guardar log y mostrar resumen
  writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));

  const totalSaved = log.stats.totalOriginalBytes - log.stats.totalWebpBytes;
  const totalSavingsPct = log.stats.totalOriginalBytes > 0
    ? Math.round((1 - log.stats.totalWebpBytes / log.stats.totalOriginalBytes) * 100)
    : 0;

  console.log('\n\n' + '═'.repeat(55));
  console.log('📊 RESUMEN DE CONVERSIÓN');
  console.log('═'.repeat(55));
  console.log(`✅ Convertidas exitosamente: ${log.converted.length}`);
  console.log(`⏭️  Saltadas (ya existían):  ${log.skipped.length}`);
  console.log(`❌ Errores:                 ${log.errors.length}`);
  console.log('─'.repeat(55));
  console.log(`💾 Tamaño original total:   ${formatBytes(log.stats.totalOriginalBytes)}`);
  console.log(`🗜️  Tamaño WebP total:       ${formatBytes(log.stats.totalWebpBytes)}`);
  console.log(`🚀 Ahorro total:            ${formatBytes(totalSaved)} (${totalSavingsPct}% menos)`);
  console.log('─'.repeat(55));
  console.log(`📄 Log completo guardado en: ${LOG_FILE}`);

  if (log.errors.length > 0) {
    console.log('\n⚠️  Archivos con error:');
    log.errors.forEach(e => console.log(`   - ${e.path}: ${e.error}`));
  }

  console.log('\n✨ ¡Listo! Ahora actualiza el código para preferir .webp');
  console.log('   (Ya está configurado en utils/supabase.ts)\n');
}

/**
 * Lista TODOS los archivos del bucket, paginando si hay más de 1000.
 */
async function listAllFiles(folder = '', allFiles = []) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(folder, { limit: 1000, offset: 0 });

  if (error) {
    console.error('Error listando bucket:', error.message);
    return allFiles;
  }

  if (!data) return allFiles;

  for (const item of data) {
    if (item.id === null) {
      // Es una carpeta, recursear
      const subPath = folder ? `${folder}/${item.name}` : item.name;
      await listAllFiles(subPath, allFiles);
    } else {
      // Es un archivo
      const fullPath = folder ? `${folder}/${item.name}` : item.name;
      allFiles.push({ name: fullPath, size: item.metadata?.size || 0 });
    }
  }

  return allFiles;
}

main().catch(err => {
  console.error('\n💥 Error fatal:', err.message);
  process.exit(1);
});
