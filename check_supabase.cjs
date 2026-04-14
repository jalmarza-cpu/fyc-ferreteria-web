const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://tkqcbpizxsrffhygwxcg.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkTables() {
  console.log("Checking categories table...");
  const cat1 = await supabase.from('categories').select('*').limit(1);
  console.log('categories error:', cat1.error ? cat1.error.message : 'no error', 'data:', cat1.data);
  
  const cat2 = await supabase.from('categorias').select('*').limit(1);
  console.log('categorias error:', cat2.error ? cat2.error.message : 'no error', 'data:', cat2.data);
}

checkTables();
