import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkCategories() {
  const { data, error } = await supabase.from('categorias').select('*');
  if (error) {
    console.error('Error fetching categories:', error);
    return;
  }
  console.log('--- CATEGORIAS EN LA BASE DE DATOS ---');
  data.forEach(c => {
    console.log(`ID: ${c.id} | NOMBRE: ${c.nombre} | PARENT_ID: ${c.parent_id}`);
  });
}

checkCategories();
