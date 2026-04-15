import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { PRODUCTS } from '../constants'; // Usa los 380+ productos reales

// Carga las variables de .env o .env.local
const envPath = '.env.local';
let envs: any = {};
if (fs.existsSync(envPath)) {
  const file = fs.readFileSync(envPath, 'utf8');
  file.split('\n').forEach(line => {
    if(line.includes('=')) {
      const [k,...v] = line.split('=');
      envs[k.trim()] = v.join('=').trim();
    }
  });
}

// Inicializa Supabase
const supabaseUrl = envs['VITE_SUPABASE_URL'] || '';
const serviceRoleKey = envs['VITE_SUPABASE_SERVICE_ROLE_KEY'] || envs['VITE_SUPABASE_ANON_KEY'] || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ ERROR FATAL: No se econtró URL o Llave de Supabase en el .env.local');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

async function seedProductos() {
    console.log(`🚀 Iniciando Inyección de Datos: ${PRODUCTS.length} productos detectados en el esquema local.`);

    // Preparar el formato exacto requerido por la tabla 'productos' en Supabase
    const payload = PRODUCTS.map((prod: any) => ({
        id_unico: prod.id,                 // O asume 'id' si la BD usa UUID generado automático, puedes quitar esta línea para auto-generación
        sku: prod.sku || '',
        nombre: prod.name || '',
        descripcion: prod.description || '',
        precio_retail: prod.priceRetail || 0,
        precio_mayorista: prod.priceWholesale || 0,
        categoria_ppal: prod.category || '',
        imagen_url: prod.imageUrl || '',
        stock: 100,                        // Stock base por defecto para levantar operación
        estado_visibilidad: true
    }));

    console.log(`📡 Conectando a Supabase: ${supabaseUrl}`);

    // Insertar productos por Lotes (Batch) para no saturar la red
    const BATCH_SIZE = 50;
    for (let i = 0; i < payload.length; i += BATCH_SIZE) {
        const batch = payload.slice(i, i + BATCH_SIZE);
        console.log(`📦 Insertando lote ${i} - ${i + batch.length} ...`);
        
        const { error } = await supabaseAdmin.from('productos').upsert(batch, { onConflict: 'sku' });
        
        if (error) {
            console.error(`💥 Error en bloque ${i}:`, error.message);
        } else {
            console.log(`✅ Lote inyectado con éxito`);
        }
    }

    console.log("🔥 Restauración de Datos COMPLETADA. Tablas pobladas online.");
}

seedProductos();
