const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://tkqcbpizxsrffhygwxcg.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runCleanup() {
  console.log("Iniciando auditoria de productos...");

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
  
  console.log(`Encontrados ${allProducts.length} productos en la BD.`);

  const grouped = {};
  for (const p of allProducts) {
    if (p.estado_visibilidad === false) continue;
    
    // Group by exact name
    const nameKey = (p.nombre || "").trim().toLowerCase();
    
    if (!grouped[nameKey]) {
      grouped[nameKey] = [];
    }
    grouped[nameKey].push(p);
  }

  const idsToSoftDelete = [];

  for (const [name, productsGroup] of Object.entries(grouped)) {
    if (productsGroup.length > 1) {
      if (name.includes("panel cielo pvc")) {
        console.log(`Saltando (no eliminar): ${name}`);
        continue;
      }

      const hasImage = productsGroup.filter(p => p.url_imagen && p.url_imagen.trim() !== "");
      const noImage = productsGroup.filter(p => !p.url_imagen || p.url_imagen.trim() === "");

      // Condición: Nombre idéntico / O también la regla pide de SKU:
      // "Si encuentras cualquier otro producto con el mismo nombre y SKU donde uno tenga image_url y el otro no, elimina el que está vacío."
      // Para los de la lista (DUCHA, CERRADURA, CODO) solo importa el duplicado, lo chequearemos luego,
      // pero si agrupamos usando solo "nombre", podemos revisar si tienen el mismo SKU.
      // Wait, let's group by name AND sku for general items, but target strings specifically? 
      // The prompt says "Si encuentras con el mismo nombre y SKU... elimina el que esta vacio".
      
      // We will perform soft-delete if they share the SAME SKU, OR if their name literally has one of the 3 specified keywords
      const especialTargets = ["ducha telefono", "cerradura sobreponer", "codo pvc"];
      const isEspecial = especialTargets.some(t => name.includes(t.toLowerCase()));

      if (hasImage.length > 0 && noImage.length > 0) {
        // There is at least one image version and one empty version.
        // Match them!
        for (const withoutImage of noImage) {
          // Find if there's a hasImage that matches SKU
          const matchingSkuWithImage = hasImage.find(p => (p.sku || "") === (withoutImage.sku || ""));
          
          if (matchingSkuWithImage || isEspecial) {
            if (!idsToSoftDelete.includes(withoutImage.id)) {
              idsToSoftDelete.push(withoutImage.id);
              console.log(`Marcando para soft-delete: ${withoutImage.nombre} (SKU: ${withoutImage.sku}) ID: ${withoutImage.id}`);
            }
          }
        }
      }
    }
  }

  if (idsToSoftDelete.length === 0) {
    console.log("No hay duplicados sin foto para eliminar.");
  } else {
    console.log(`Ejecutando Soft Delete (estado_visibilidad = false) para ${idsToSoftDelete.length} productos...`);
    for (const id of idsToSoftDelete) {
      const { data, error } = await supabase
        .from('productos')
        .update({ estado_visibilidad: false })
        .eq('id', id);
        
      if (error) {
        console.error(`Error actualizando ID ${id}:`, error);
      } else {
        console.log(`ID ${id} actualizado a false.`);
      }
    }
    console.log("Limpieza terminada con éxito.");
  }
}

runCleanup();
