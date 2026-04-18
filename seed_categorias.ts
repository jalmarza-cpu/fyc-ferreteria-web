import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envPath = '.env.local';
let envs: any = {};
if (fs.existsSync(envPath)) {
  const file = fs.readFileSync(envPath, 'utf8');
  file.split('\n').forEach(line => {
    if(line.includes('=')) {
      const [k,...v] = line.split('=');
      envs[k.trim()] = v.join('=').trim();
    }
  });
}

const supabaseUrl = envs['VITE_SUPABASE_URL'] || '';
const serviceRoleKey = envs['VITE_SUPABASE_SERVICE_ROLE_KEY'] || '';

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

// Categories
const CATEGORIES: string[] = [
  'Maquinaria',
  'Herramientas',
  'Electricidad',
  'Iluminación LED',
  'Gasfitería',
  'Automotriz',
  'Químicos y Pegamentos',
  'Fijaciones',
  'Elementos de Protección Personal (EPP)'
];

const SUBCATEGORY_MAP: { parentCategory: string; subcategory: string; keywords: string[] }[] = [
  // Iluminación LED
  { parentCategory: 'Iluminación LED', subcategory: 'Alta eficiencia', keywords: [] },
  { parentCategory: 'Iluminación LED', subcategory: 'Ampolleta', keywords: [] },
  { parentCategory: 'Iluminación LED', subcategory: 'Campana', keywords: [] },
  { parentCategory: 'Iluminación LED', subcategory: 'Canoa', keywords: [] },
  { parentCategory: 'Iluminación LED', subcategory: 'Focos LED', keywords: ['FOCO', 'REFLECTOR'] },
  { parentCategory: 'Iluminación LED', subcategory: 'Lámpara de emergencia', keywords: [] },
  { parentCategory: 'Iluminación LED', subcategory: 'Lámpara estanco', keywords: [] },
  { parentCategory: 'Iluminación LED', subcategory: 'Paneles LED', keywords: [] },
  { parentCategory: 'Iluminación LED', subcategory: 'Proyectores Led', keywords: [] },

  // Electricidad
  { parentCategory: 'Electricidad', subcategory: 'Alargador', keywords: [] },
  { parentCategory: 'Electricidad', subcategory: 'Cables', keywords: ['CABLE'] },
  { parentCategory: 'Electricidad', subcategory: 'Cajas', keywords: ['CAJA'] },
  { parentCategory: 'Electricidad', subcategory: 'Campana Timbre', keywords: [] },
  { parentCategory: 'Electricidad', subcategory: 'Enchufes', keywords: ['ENCHUFE'] },
  { parentCategory: 'Electricidad', subcategory: 'Gabinete', keywords: ['GABINETE'] },
  { parentCategory: 'Electricidad', subcategory: 'Interruptores', keywords: ['INTERRUPTOR'] },
  { parentCategory: 'Electricidad', subcategory: 'Tableros', keywords: ['TABLERO'] },

  // Herramientas
  { parentCategory: 'Herramientas', subcategory: 'Alicate', keywords: ['ALICATE'] },
  { parentCategory: 'Herramientas', subcategory: 'Amarra', keywords: ['AMARRA'] },
  { parentCategory: 'Herramientas', subcategory: 'Broca', keywords: ['BROCA', 'CINCEL'] },
  { parentCategory: 'Herramientas', subcategory: 'Brocha', keywords: ['BROCHA', 'RODILLO'] },
  { parentCategory: 'Herramientas', subcategory: 'Cortadora', keywords: ['CORTA'] },
  { parentCategory: 'Herramientas', subcategory: 'Destornillador', keywords: ['DESTORNILLADOR', 'ATORNILLADOR'] },
  { parentCategory: 'Herramientas', subcategory: 'Discos', keywords: ['DISCO'] },
  { parentCategory: 'Herramientas', subcategory: 'Escuadra', keywords: ['ESCUADRA'] },
  { parentCategory: 'Herramientas', subcategory: 'Espátula', keywords: ['ESPATULA', 'LLANA'] },
  { parentCategory: 'Herramientas', subcategory: 'Extractor de poleas', keywords: [] },
  { parentCategory: 'Herramientas', subcategory: 'Formón', keywords: [] },
  { parentCategory: 'Herramientas', subcategory: 'Guantes', keywords: ['GUANTE'] },
  { parentCategory: 'Herramientas', subcategory: 'Jardín', keywords: ['TIJERA PODA', 'MANGUERA'] },
  { parentCategory: 'Herramientas', subcategory: 'Llaves', keywords: ['LLAVE', 'DADO'] },
  { parentCategory: 'Herramientas', subcategory: 'Martillo', keywords: ['MARTILLO', 'COMBA', 'MAZO'] },
  { parentCategory: 'Herramientas', subcategory: 'Napoleón', keywords: ['NAPOLEON'] },
  { parentCategory: 'Herramientas', subcategory: 'Nivel', keywords: ['NIVEL'] },
  { parentCategory: 'Herramientas', subcategory: 'Pasadores', keywords: [] },
  { parentCategory: 'Herramientas', subcategory: 'Planas', keywords: [] },
  { parentCategory: 'Herramientas', subcategory: 'Prensa', keywords: ['PRENSA'] },
  { parentCategory: 'Herramientas', subcategory: 'Regla', keywords: [] },
  { parentCategory: 'Herramientas', subcategory: 'Rodillos', keywords: [] },
  { parentCategory: 'Herramientas', subcategory: 'Sacaclavos', keywords: ['DIABLO'] },
  { parentCategory: 'Herramientas', subcategory: 'Serrucho', keywords: ['SERRUCHO', 'SIERRA'] },
  { parentCategory: 'Herramientas', subcategory: 'Tarugo', keywords: ['TARUGO'] },

  // Maquinaria
  { parentCategory: 'Maquinaria', subcategory: 'Bomba piscina', keywords: ['BOMBA'] },
  { parentCategory: 'Maquinaria', subcategory: 'Compresor de Aire', keywords: ['COMPRESOR'] },
  { parentCategory: 'Maquinaria', subcategory: 'Gatas', keywords: ['GATA'] },
  { parentCategory: 'Maquinaria', subcategory: 'Máquina de madera', keywords: [] },
  { parentCategory: 'Maquinaria', subcategory: 'Máquina para moler', keywords: [] },
  { parentCategory: 'Maquinaria', subcategory: 'Prensa hidráulica', keywords: [] },
  { parentCategory: 'Maquinaria', subcategory: 'Tecle pluma', keywords: ['TECLE'] },
  { parentCategory: 'Maquinaria', subcategory: 'Tornos', keywords: ['TORNO'] },
  { parentCategory: 'Maquinaria', subcategory: 'Transpaleta', keywords: ['TRANSPALETA'] }
];

async function syncCategorias() {
    console.log("Comprobando tabla categories...");
    const { data: mainCats, error } = await supabaseAdmin.from('categories').select('*');
    if (error) {
        console.error("No se pudo conectar a categories o la tabla no existe:", error);
        return;
    }
    
    if (mainCats && mainCats.length > 0) {
        console.log("Ya hay categories, no las voy a borrar. Cantidad: ", mainCats.length);
        return;
    }

    console.log("Tabla categories esta vacia. Llenando estructura...");
    for(const cat of CATEGORIES) {
        const { error: err } = await supabaseAdmin.from('categories').insert([{
            nombre: cat,
            padre: null,
            categoria_padre: null,
            es_subcategoria: false,
            visibilidad: true
        }]);
        if(err) console.error("Error insertando cat:", cat, err);
         else console.log("Insertado:" , cat);
    }

    for(const sub of SUBCATEGORY_MAP) {
        const { error: err2 } = await supabaseAdmin.from('categories').insert([{
            nombre: sub.subcategory,
            categoria_padre: sub.parentCategory,
            es_subcategoria: true,
            visibilidad: true
        }]);
        if(err2) console.error("Error insert sub:", sub.subcategory, err2);
         else console.log("Insertado sub:", sub.subcategory);
    }
    console.log("Proceso terminado.");
}

syncCategorias();
