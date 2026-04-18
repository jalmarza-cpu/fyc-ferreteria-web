import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const targetSku = '159984'; // ADAPTADOR SIMPLE 10A from screenshot
  
  // 1. Fetch current
  const { data: currData, error: currErr } = await supabase.from('productos').select('sku, nombre, categoria').eq('sku', targetSku);
  console.log("CURRENT:", currData, currErr);

}
test();
