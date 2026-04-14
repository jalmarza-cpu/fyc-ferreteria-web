const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://tkqcbpizxsrffhygwxcg.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runCleanup() {
  console.log("Iniciando auditoria y soft-delete de productos...");

  let allProducts = [];
  let page = 0;
  const pageSize = 1000;
  while(true) {
    const { data, error } = await supabase
      .from('productos')
      .select('id, nombre, sku, url_imagen, estado_visibilidad')
      .range(page * pageSize, (page + 1) * pageSize - 1);
    
    if (error) {
      console.error("Error fetching", error);
      break;
    }
    if (!data || data.length === 0) break;
    allProducts.push(...data);
    page++;
    if (data.length < pageSize) break;
  }
  
  console.log(`Encontrados ${allProducts.length} registros en la BD.`);

  const grouped = {};
  for (const p of allProducts) {
    if (p.estado_visibilidad === false) continue;
    
    // Agrupar por nombre exacto (case-insensitive) y normalizado
    const nameKey = (p.nombre || "").trim().toLowerCase();
    
    if (!grouped[nameKey]) {
      grouped[nameKey] = [];
    }
    grouped[nameKey].push(p);
  }

  const idsToSoftDelete = [];

  for (const [name, productsGroup] of Object.entries(grouped)) {
    if (productsGroup.length > 1) {
      // 1) Asegúrate de que los productos de PANEL CIELO PVC permanezcan...
      if (name.includes("panel cielo pvc")) {
        // Ignoramos estos completamente (salvaguardados)
        continue;
      }

      const hasImage = productsGroup.filter(p => p.url_imagen && p.url_imagen.trim() !== "");
      const noImage = productsGroup.filter(p => !p.url_imagen || p.url_imagen.trim() === "");

      // 2) Objetivo directo: DUCHA TELEFONO, CERRADURA SOBREPONER y CODO PVC
      const especialTargets = ["ducha telefono", "cerradura sobreponer", "codo pvc"];
      const isEspecial = especialTargets.some(t => name.includes(t.toLowerCase()));

      if (hasImage.length > 0 && noImage.length > 0) {
        // Encontramos un grupo con y sin imagen
        for (const withoutImage of noImage) {
          // Si el nombre cumple "el mismo nombre y SKU" (la versión por defecto) o es especial (que podemos solo borrar por nombre por ser pedido manual)
          const matchingSkuWithImage = hasImage.find(p => (p.sku || "") === (withoutImage.sku || ""));
          
          if (matchingSkuWithImage || isEspecial) {
            if (!idsToSoftDelete.includes(withoutImage.id)) {
              idsToSoftDelete.push(withoutImage.id);
              console.log(`- Marcado para soft-delete: "${withoutImage.nombre}" (SKU: ${withoutImage.sku}) | ID: ${withoutImage.id}`);
            }
          }
        }
      }
    }
  }

  if (idsToSoftDelete.length === 0) {
    console.log("-> No se encontraron duplicados sin foto que requieran eliminación.");
  } else {
    console.log(`-> Ejecutando Soft Delete (estado_visibilidad = false) para ${idsToSoftDelete.length} productos...`);
    for (const id of idsToSoftDelete) {
      const { data, error } = await supabase
        .from('productos')
        .update({ estado_visibilidad: false })
        .eq('id', id);
        
      if (error) {
        console.error(`X Error actualizando ID ${id}:`, error);
      } else {
        console.log(`✓ ID ${id} actualizado (estado_visibilidad = false).`);
      }
    }
    console.log("Limpieza quirúrgica terminada con éxito.");
  }
}

runCleanup();
