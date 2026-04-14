const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://tkqcbpizxsrffhygwxcg.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runCleanup() {
  let allProducts = [];
  let page = 0;
  const pageSize = 1000;
  while(true) {
    const { data, error } = await supabase
      .from('productos')
      .select('id, nombre, sku, url_imagen, estado_visibilidad')
      .range(page * pageSize, (page + 1) * pageSize - 1);
    if (!data || data.length === 0) break;
    allProducts.push(...data);
    page++;
    if (data.length < pageSize) break;
  }
  
  const especialTargets = ["ducha telefono", "cerradura sobreponer", "codo pvc", "panel cielo pvc"];
  
  console.log("=== DEBUG ESPECIALES ===");
  const targets = allProducts.filter(p => especialTargets.some(t => (p.nombre||"").toLowerCase().includes(t)));
  targets.forEach(t => {
     console.log(`[${t.estado_visibilidad ? 'VIS' : 'HID'}] ID: ${t.id} - ${t.nombre} (SKU: ${t.sku}) - IMG: ${t.url_imagen}`);
  });
}

runCleanup();
