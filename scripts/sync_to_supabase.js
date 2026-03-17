
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://tkqcbpizxsrffhygwxcg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac';
const supabase = createClient(supabaseUrl, supabaseKey);

async function syncProducts() {
    console.log('--- Iniciando sincronización de productos ---');

    // Leemos el archivo constants.tsx
    const content = fs.readFileSync('./constants.tsx', 'utf8');

    // Regex para extraer el array PRODUCTS
    // Intentaremos extraer el contenido entre export const PRODUCTS: Product[] = [ y ];
    const match = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);
    if (!match) {
        console.error('No se pudo encontrar el array PRODUCTS en constants.tsx');
        return;
    }

    let productsArrayString = match[1];

    // Limpieza básica para intentar parsear esto como JSON o un array de JS
    // Como es TSX, tiene tipos y comentarios. Vamos a usar un enfoque más "sucio" pero efectivo:
    // Extraer cada objeto { ... } individualmente.
    const productObjects = [];
    const objRegex = /\{[\s\S]*?id:[\s\S]*?name:[\s\S]*?sku:[\s\S]*?\}/g;
    let m;
    while ((m = objRegex.exec(productsArrayString)) !== null) {
        const rawObj = m[0];

        // Extraer campos usando regex simples
        const id = (rawObj.match(/id:\s*['"](.*?)['"]/) || [])[1];
        const name = (rawObj.match(/name:\s*['"](.*?)['"]/) || [])[1];
        const sku = (rawObj.match(/sku:\s*['"](.*?)['"]/) || [])[1];
        const description = (rawObj.match(/description:\s*['"](.*?)['"]/) || [])[1];
        const priceRetail = parseInt((rawObj.match(/priceRetail:\s*(\d+)/) || [])[1] || '0');
        const priceWholesale = parseInt((rawObj.match(/priceWholesale:\s*(\d+)/) || [])[1] || '0');
        const imageUrl = (rawObj.match(/imageUrl:\s*['"](.*?)['"]/) || [])[1];
        const category = (rawObj.match(/category:\s*['"](.*?)['"]/) || [])[1];

        if (sku && name) {
            productObjects.push({
                sku,
                nombre: name.replace(/\\"/g, '"'),
                descripcion: description ? description.replace(/\\"/g, '"') : '',
                categoria: category,
                precio_mayorista: priceWholesale,
                precio_detalle: priceRetail,
                url_imagen: imageUrl,
                en_stock: true,
                estado_visibilidad: true
            });
        }
    }

    console.log(`Detectados ${productObjects.length} productos en constants.tsx`);

    // Eliminar duplicados de SKU en el array local antes de enviar a Supabase
    const uniqueProducts = Array.from(
        productObjects.reduce((map, obj) => map.set(obj.sku, obj), new Map()).values()
    );

    console.log(`Productos únicos a procesar: ${uniqueProducts.length}`);

    // Insertar en Supabase usando upsert por SKU
    const { data, error } = await supabase
        .from('productos')
        .upsert(uniqueProducts, { onConflict: 'sku' });

    if (error) {
        console.error('Error al sincronizar con Supabase:', error);
    } else {
        console.log('Sincronización completada exitosamente.');
    }
}

syncProducts();
