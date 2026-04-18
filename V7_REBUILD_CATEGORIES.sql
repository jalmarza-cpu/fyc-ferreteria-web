-- Desactivar temporalmente constraints si es necesario
BEGIN;

-- 1. Limpiar tabla (usando TRUNCATE para reiniciar los IDs, asumiendo CASCADE si los productos tienen constraints)
-- ATENCION: si `public.productos` tiene un foreign key a `categorias.id`, TRUNCATE CASCADE borrará los productos.
-- Pero recordemos que `productos` tiene `categoria_ppal` (text) y `subcategoria` (text) y NO un FK a `categorias.id`. 
-- El único uso de categorias es como un diccionario de opciones para el UI.
TRUNCATE TABLE public.categorias RESTART IDENTITY CASCADE;

-- 2. Insertar Categorias PADRE
INSERT INTO public.categorias (nombre, parent_id) VALUES
  ('Basurero', NULL),
  ('Canalización', NULL),
  ('Cielo falso', NULL),
  ('Cintas', NULL),
  ('Electricidad', NULL),
  ('Extractores de Aire', NULL),
  ('Grifería', NULL),
  ('Herramientas', NULL),
  ('Iluminación LED', NULL),
  ('Maquinaria', NULL),
  ('Selladora', NULL);

-- 3. Insertar SUB-CATEGORIAS
-- Para Canalización
WITH p AS (SELECT id FROM public.categorias WHERE nombre = 'Canalización' LIMIT 1)
INSERT INTO public.categorias (nombre, parent_id) VALUES
  ('Canaletas', (SELECT id FROM p)),
  ('Tubería Conduit', (SELECT id FROM p)),
  ('Tubería EMT', (SELECT id FROM p));

-- Para Electricidad
WITH p AS (SELECT id FROM public.categorias WHERE nombre = 'Electricidad' LIMIT 1)
INSERT INTO public.categorias (nombre, parent_id) VALUES
  ('Alargador', (SELECT id FROM p)),
  ('Cables', (SELECT id FROM p)),
  ('Cajas', (SELECT id FROM p)),
  ('Campana Timbre', (SELECT id FROM p)),
  ('Enchufes', (SELECT id FROM p)),
  ('Gabinete', (SELECT id FROM p)),
  ('Interruptores', (SELECT id FROM p)),
  ('Tableros', (SELECT id FROM p));

-- Para Herramientas
WITH p AS (SELECT id FROM public.categorias WHERE nombre = 'Herramientas' LIMIT 1)
INSERT INTO public.categorias (nombre, parent_id) VALUES
  ('Alicate', (SELECT id FROM p)),
  ('Amarra', (SELECT id FROM p)),
  ('Broca', (SELECT id FROM p)),
  ('Brocha', (SELECT id FROM p)),
  ('Cortadora', (SELECT id FROM p)),
  ('Destornillador', (SELECT id FROM p)),
  ('Discos', (SELECT id FROM p)),
  ('Escuadra', (SELECT id FROM p)),
  ('Espátula', (SELECT id FROM p)),
  ('Extractor de poleas', (SELECT id FROM p)),
  ('Formón', (SELECT id FROM p)),
  ('Guantes', (SELECT id FROM p)),
  ('Jardín', (SELECT id FROM p)),
  ('Llaves', (SELECT id FROM p)),
  ('Martillo', (SELECT id FROM p)),
  ('Napoleón', (SELECT id FROM p)),
  ('Nivel', (SELECT id FROM p)),
  ('Pasadores', (SELECT id FROM p)),
  ('Planas', (SELECT id FROM p)),
  ('Prensa', (SELECT id FROM p)),
  ('Regla', (SELECT id FROM p)),
  ('Rodillos', (SELECT id FROM p)),
  ('Sacaclavos', (SELECT id FROM p)),
  ('Serrucho', (SELECT id FROM p));

-- Para Iluminación LED
WITH p AS (SELECT id FROM public.categorias WHERE nombre = 'Iluminación LED' LIMIT 1)
INSERT INTO public.categorias (nombre, parent_id) VALUES
  ('Alta eficiencia', (SELECT id FROM p)),
  ('Ampolleta', (SELECT id FROM p)),
  ('Campana', (SELECT id FROM p)),
  ('Canoa', (SELECT id FROM p)),
  ('Focos LED', (SELECT id FROM p)),
  ('Lámpara de emergencia', (SELECT id FROM p)),
  ('Lámpara estanco', (SELECT id FROM p)),
  ('Paneles LED', (SELECT id FROM p)),
  ('Proyectores Led', (SELECT id FROM p));

-- Para Maquinaria
WITH p AS (SELECT id FROM public.categorias WHERE nombre = 'Maquinaria' LIMIT 1)
INSERT INTO public.categorias (nombre, parent_id) VALUES
  ('Bomba piscina', (SELECT id FROM p)),
  ('Compresor de Aire', (SELECT id FROM p)),
  ('Gatas', (SELECT id FROM p)),
  ('Máquina de madera', (SELECT id FROM p)),
  ('Máquina para moler', (SELECT id FROM p)),
  ('Prensa hidráulica', (SELECT id FROM p)),
  ('Tecle pluma', (SELECT id FROM p)),
  ('Tornos', (SELECT id FROM p)),
  ('Transpaleta', (SELECT id FROM p));

COMMIT;
