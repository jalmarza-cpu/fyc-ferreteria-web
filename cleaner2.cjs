const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://tkqcbpizxsrffhygwxcg.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac';
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function clean() {
  const { data } = await supabase.from('productos').select('*');
  const d = data.filter(x => x.estado_visibilidad !== false);

  const groups = {};
  d.forEach(p => {
    let name = (p.nombre||'').toLowerCase().trim();
    if (!groups[name]) groups[name] = [];
    groups[name].push(p);
  });
  
  let count = 0;
  for (const name in groups) {
    if (groups[name].length > 1) {
      if (name.includes('panel cielo pvc')) continue; // "Asegúrate de que los productos de PANEL CIELO PVC permanezcan..."
      
      const wImg = groups[name].filter(x => x.url_imagen && x.url_imagen.trim());
      const woImg = groups[name].filter(x => !x.url_imagen || !x.url_imagen.trim());
      
      if (wImg.length > 0 && woImg.length > 0) {
        console.log('Cleaning duplicates without images for:', name);
        for (const item of woImg) {
          console.log(' -> Soft deleting', item.id, item.sku);
          await supabase.from('productos').update({ estado_visibilidad: false }).eq('id', item.id);
          count++;
        }
      }
    }
  }
  console.log('Cleaned total empty-image duplicates:', count);
}
clean();
