import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://tkqcbpizxsrffhygwxcg.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac';
const supabase = createClient(supabaseUrl, supabaseKey);

async function listFiles() {
  const { data, error } = await supabase.storage.from('productos').list('', { limit: 100 });
  if (error) { console.error('Error:', error); return; }
  
  for (let folder of data) {
      if (!folder.id) { // it's a folder
          const { data: b } = await supabase.storage.from('productos').list(folder.name, { limit: 100 });
          const fileNames = b ? b.map(x => x.name).join(', ') : 'none';
          console.log(folder.name, '->', fileNames);
      } else {
          console.log('root file ->', folder.name);
      }
  }
}
listFiles();
