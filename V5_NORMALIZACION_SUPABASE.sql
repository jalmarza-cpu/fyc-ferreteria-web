-- ARQUITECTURA SAAS V5: Normalización de Base de Datos
-- Ejecute el siguiente código íntegro en el SQL Editor de su dashboard de Supabase (fyc-ferreteria-web)

-- 1. CREACIÓN DE COLUMNA NATIVA
-- Procedimiento estándar para garantizar limpieza. Fallará si ya se ejecutó, protegiendo los datos insertados.
ALTER TABLE public.productos 
ADD COLUMN IF NOT EXISTS subcategoria TEXT;

-- 2. RECARGA DE CACHÉ REST
-- Fuerce la purga de los mapeos de esquema anteriores para que Admin pueda comunicarse mediante su API de inmediato.
NOTIFY pgrst, 'reload schema';
