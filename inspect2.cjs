const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://tkqcbpizxsrffhygwxcg.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function findDups() {
  let allProducts = [];
  let page = 0;
  const pageSize = 1000;
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
  
  const bySku = {};
  for (const p of allProducts) {
     if (p.estado_visibilidad === false) continue; // Skip already deleted
     const sku = (p.sku || "").trim().toLowerCase();
     if (!bySku[sku]) bySku[sku] = [];
     bySku[sku].push(p);
  }
  
  console.log("=== DUPLICADOS POR SKU ===");
  for (const [sku, items] of Object.entries(bySku)) {
     if (items.length > 1) {
         console.log(`SKU: ${sku} tiene ${items.length} items`);
         for (const i of items) {
            console.log(`  ID: ${i.id} | Name: ${i.nombre} | img: ${i.url_imagen}`);
         }
     }
  }

  const byName = {};
  for (const p of allProducts) {
     if (p.estado_visibilidad === false) continue;
     const n = (p.nombre || "").trim().toLowerCase();
     if (!byName[n]) byName[n] = [];
     byName[n].push(p);
  }

  console.log("=== DUPLICADOS POR NOMBRE EXACTO ===");
  for (const [n, items] of Object.entries(byName)) {
     if (items.length > 1) {
         // check if sku's are different or what
         const skus = items.map(i => i.sku);
         if (new Set(skus).size > 1) {
            console.log(`NOMBRE: ${n} (Multiple SKUs) tiene ${items.length} items`);
            for (const i of items) {
               console.log(`  ID: ${i.id} | SKU: ${i.sku} | img: ${i.url_imagen}`);
            }
         }
     }
  }
}

findDups();
