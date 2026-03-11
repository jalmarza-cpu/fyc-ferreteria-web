import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://tkqcbpizxsrffhygwxcg.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcWNicGl6eHNyZmZoeWd3eGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU5NzAyMCwiZXhwIjoyMDg0MTczMDIwfQ.nPj_9tDFp1sGmqcalo_xPfgBwXz_NRTN4et0w_XpWac';
const supabase = createClient(supabaseUrl, supabaseKey);
async function upload() {
  const fileContent = fs.readFileSync('./public/productos/120300-Amarra-150x3.6mm-blancas-bolsas-100u.jpg');
  const { data, error } = await supabase.storage.from('productos').upload('Amarras/120300-Amarra-150x3.6mm-blancas-bolsas-100u.jpg', fileContent, {
    contentType: 'image/jpeg',
    upsert: true
  });
  if (error) console.error('Error uploading:', error);
  else console.log('Upload success:', data);
}
upload();
