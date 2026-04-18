-- 1. CREAR LA COLUMNA MAESTRA
ALTER TABLE public.productos ADD COLUMN IF NOT EXISTS categoria TEXT;

-- 2. TRASPASAR LA DATA
-- Prioriza la subcategoría si existe (ej. "Canaletas"), si no, usa la principal.
UPDATE public.productos SET categoria = COALESCE(subcategoria, categoria_ppal);

-- 3. SANITIZAR LA DATA PARA QUE COINCIDA CON LA NUEVA TABLA `categorias`
UPDATE public.productos SET categoria = 'Herramientas' WHERE categoria ILIKE '%Herramientas Manuales%';
UPDATE public.productos SET categoria = 'Herramientas' WHERE categoria ILIKE '%Herramientas Eléctricas%';
UPDATE public.productos SET categoria = 'Iluminación LED' WHERE categoria ILIKE '%Iluminación%';
UPDATE public.productos SET categoria = 'Selladora' WHERE categoria ILIKE '%Selladoras%';
UPDATE public.productos SET categoria = 'Electricidad' WHERE categoria ILIKE '%Material Eléctrico%';

-- 4. ELIMINAR LAS COLUMNAS OBSOLETAS
-- Ejecutar esto sellará la unificación de forma permanente
ALTER TABLE public.productos DROP COLUMN IF EXISTS categoria_ppal;
ALTER TABLE public.productos DROP COLUMN IF EXISTS subcategoria;
