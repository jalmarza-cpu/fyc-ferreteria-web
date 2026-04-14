const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://tkqcbpizxsrffhygwxcg.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function check() {
  const { data, error } = await supabase
    .from('productos')
    .select('id, nombre, sku, url_imagen, estado_visibilidad')
    .ilike('nombre', '%');

  if (error) {
    console.error(error);
    return;
  }

  const k = ["ducha", "cerradura", "codo", "panel"];
  
  const filtered = data.filter(d => {
    const n = d.nombre ? d.nombre.toLowerCase() : "";
    return k.some(keyword => n.includes(keyword)) && d.estado_visibilidad === true;
  });

  console.log(JSON.stringify(filtered, null, 2));
}

check();
