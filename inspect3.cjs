const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://tkqcbpizxsrffhygwxcg.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac";

const supabase = createClient(supabaseUrl, serviceRoleKey);

const normalize = (str) => {
    if (!str) return "";
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
};

async function checkAll() {
  let page = 0;
  const pageSize = 1000;
  let allProducts = [];
  while(true) {
    const { data } = await supabase
      .from('productos')
      .select('*')
      .range(page * pageSize, (page + 1) * pageSize - 1);
    if (!data || data.length === 0) break;
    allProducts.push(...data);
    page++;
    if (data.length < pageSize) break;
  }

  const specialKeywords = ["ducha telefono", "cerradura sobreponer", "codo pvc", "panel cielo pvc"];
  
  console.log("=== TODOS LOS MATCHES (Visibles y Ocultos) ===");
  allProducts.forEach(p => {
     const normName = normalize(p.nombre);
     if (specialKeywords.some(k => normName.includes(k))) {
         console.log(`[Vis: ${p.estado_visibilidad}] ID: ${p.id} | Name: ${p.nombre} | SKU: ${p.sku} | IMG: ${p.url_imagen}`);
     }
  });

  // Además vamos a revisar TODAS las repetidas agrupadas por nombre + sku (ya que el usuario mencionó: "cualquier otro producto con el mismo nombre y SKU")
  // Puede que el SKU contenga espacios que no tomamos en cuenta, asi que imprimamos agrupando.
  
  // Agrupemos por sku limpiado.
  const bySku = {};
  for(const p of allProducts){
      const s = normalize(p.sku);
      if(!s) continue;
      if(!bySku[s]) bySku[s] = [];
      bySku[s].push(p);
  }

  console.log("\n=== REVISIÓN DE TODOS LOS DUPLICADOS (Nombre o SKU) ===");
  let hasDups = false;
  for (const [s, items] of Object.entries(bySku)) {
      if(items.length > 1) {
          hasDups = true;
          console.log(`SKU repetido [${s}]: ${items.map(i=>i.nombre).join(" || ")}`);
      }
  }
}
checkAll();
