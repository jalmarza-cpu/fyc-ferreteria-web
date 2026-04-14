const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://tkqcbpizxsrffhygwxcg.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac";

const supabase = createClient(supabaseUrl, serviceRoleKey);

const normalize = (str) => {
    if (!str) return "";
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
};

async function runCleanup() {
  console.log("Iniciando auditoria y soft-delete avanzado...");

  let allProducts = [];
  let page = 0;
  const pageSize = 1000;
  while(true) {
    const { data } = await supabase
      .from('productos')
      .select('id, nombre, sku, url_imagen, estado_visibilidad')
      .range(page * pageSize, (page + 1) * pageSize - 1);
    if (!data || data.length === 0) break;
    allProducts.push(...data);
    page++;
    if (data.length < pageSize) break;
  }
  
  // Imprimir los que contengan 'ducha', 'cerradura', 'codo'
  console.log("--- DEBUGGING ESPECIALES ---");
  const specialKeywords = ["ducha telefono", "cerradura sobreponer", "codo pvc"];
  allProducts.forEach(p => {
     if (p.estado_visibilidad === false) return;
     const normName = normalize(p.nombre);
     if (specialKeywords.some(k => normName.includes(k))) {
         console.log(`Especial Encontrado: [${p.id}] ${p.nombre} (SKU: ${p.sku}) IMG: ${p.url_imagen}`);
     }
  });

  const idsToSoftDelete = new Set();

  // 1) REGLA ESPECIAL (Por nombre exacto normalizado sin importar el SKU):
  // "duplicado sin foto de DUCHA TELEFONO, CERRADURA SOBREPONER y CODO PVC"
  // Agrupar por nombre normalizado solo para detectar duplicados
  const groupByNameMap = {};
  for (const p of allProducts) {
    if (p.estado_visibilidad === false) continue;
    const n = normalize(p.nombre);
    if (!groupByNameMap[n]) groupByNameMap[n] = [];
    groupByNameMap[n].push(p);
  }

  for (const [normName, items] of Object.entries(groupByNameMap)) {
      if (items.length > 1) {
          // Si es panel cielo, saltar.
          if (normName.includes("panel cielo pvc")) continue;

          const isSpecial = specialKeywords.some(k => normName.includes(k));
          
          const hasImg = items.filter(i => i.url_imagen && i.url_imagen.trim() !== "");
          const noImg = items.filter(i => !i.url_imagen || i.url_imagen.trim() === "");

          if (hasImg.length > 0 && noImg.length > 0) {
              if (isSpecial) {
                  // Si es especial y tiene multiple items, borramos los de sin foto
                  for (const n of noImg) {
                      idsToSoftDelete.add(n.id);
                      console.log(`Target especial: Eliminar ${n.nombre} SIN FOTO, ya que hay variante con foto.`);
                  }
              } else {
                  // "Si encuentras cualquier otro producto con el MISMO NOMBRE Y SKU"
                  // Revisamos items con el mismo SKU
                  const groupBySkuAndName = {};
                  for (const subItem of items) {
                      const k = normalize(subItem.nombre) + "___" + normalize(subItem.sku);
                      if (!groupBySkuAndName[k]) groupBySkuAndName[k] = [];
                      groupBySkuAndName[k].push(subItem);
                  }

                  // Si para el mismo nombre+sku hay foto y sin foto, se borra el de sin foto
                  for (const [skuKey, subItems] of Object.entries(groupBySkuAndName)) {
                      if (subItems.length > 1) {
                          const subHasImg = subItems.filter(x => x.url_imagen && x.url_imagen.trim() !== "");
                          const subNoImg = subItems.filter(x => !x.url_imagen || x.url_imagen.trim() === "");
                          if (subHasImg.length > 0 && subNoImg.length > 0) {
                              for (const x of subNoImg) {
                                  idsToSoftDelete.add(x.id);
                                  console.log(`Mismo Nombre+SKU: Eliminar ${x.nombre} (SKU: ${x.sku}) SIN FOTO, ya que hay variante con foto.`);
                              }
                          }
                      }
                  }
              }
          }
      }
  }

  // Ahora busquemos duplicados si la regla "mismo nombre y SKU" se refería a los de *diferente SKU pero mismo nombre*
  // El usuario dice textualmente: "Si encuentras cualquier otro producto con el mismo nombre y SKU... elimina el que está vacío".
  // Ya lo hicimos arriba. No se detectaron duplicados de SKU exacto.

  // Pero, ¿qué pasa si los duplicados especiales (ducha, cerradura, codo) tienen el nombre ligerisimamente distinto?
  // Ej: "Ducha de Telefono" vs "Ducha Telefono".
  // Evaluemos manualmente para "ducha", "codo", "cerradura" arriba en el log.
  
  if (idsToSoftDelete.size === 0) {
    console.log("No hay duplicados para eliminar según las reglas estrictas.");
  } else {
     for(const id of Array.from(idsToSoftDelete)) {
         console.log(`Soft delete id ${id}`);
         // const { error } = await supabase.from('productos').update({estado_visibilidad: false}).eq('id', id);
         // if (!error) console.log(`✓ Borrado ${id}`);
     }
  }
}

runCleanup();
