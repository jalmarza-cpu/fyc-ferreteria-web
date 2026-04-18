-- ==============================================================================
-- SAAS V7: JERARQUÍA NATIVA DE CATEGORÍAS
-- ==============================================================================

-- 1. AGREGA COLUMNA parent_id SI NO EXISTE
-- Se permite referencias a la misma tabla para jerarquía padre-hijo.
ALTER TABLE public.categorias
ADD COLUMN IF NOT EXISTS parent_id int8 REFERENCES public.categorias(id) ON DELETE CASCADE;

-- 2. POBLAR SUB-CATEGORÍAS DE ACUERDO A LA ESTRUCTURA COMERCIAL
-- Se asume que las categorías principales (Herramientas, Electricidad, etc.) 
-- ya están insertadas por la migración V6.
DO $$
DECLARE
    v_herramientas_id int8;
    v_maquinaria_id int8;
    v_canalizacion_id int8;
    v_iluminacion_id int8;
    v_electricidad_id int8;
    v_griferia_id int8;
BEGIN
    SELECT id INTO v_herramientas_id FROM public.categorias WHERE nombre = 'Herramientas';
    SELECT id INTO v_maquinaria_id FROM public.categorias WHERE nombre = 'Maquinaria';
    SELECT id INTO v_canalizacion_id FROM public.categorias WHERE nombre = 'Canalización';
    SELECT id INTO v_iluminacion_id FROM public.categorias WHERE nombre = 'Iluminación LED';
    SELECT id INTO v_electricidad_id FROM public.categorias WHERE nombre = 'Electricidad';
    SELECT id INTO v_griferia_id FROM public.categorias WHERE nombre = 'Grifería';

    -- Herramientas
    IF v_herramientas_id IS NOT NULL THEN
        INSERT INTO public.categorias (nombre, parent_id) VALUES 
        ('Destornillador', v_herramientas_id),
        ('Discos', v_herramientas_id),
        ('Escuadra', v_herramientas_id),
        ('Espátula', v_herramientas_id),
        ('Extractor de poleas', v_herramientas_id),
        ('Formón', v_herramientas_id),
        ('Guantes', v_herramientas_id),
        ('Jardín', v_herramientas_id),
        ('Llaves', v_herramientas_id),
        ('Martillo', v_herramientas_id),
        ('Napoleón', v_herramientas_id),
        ('Nivel', v_herramientas_id),
        ('Pasadores', v_herramientas_id),
        ('Planas', v_herramientas_id),
        ('Prensa', v_herramientas_id),
        ('Regla', v_herramientas_id),
        ('Rodillos', v_herramientas_id),
        ('Sacaclavos', v_herramientas_id),
        ('Serrucho', v_herramientas_id),
        ('Tarugo', v_herramientas_id)
        ON CONFLICT DO NOTHING;
    END IF;

    -- Maquinaria
    IF v_maquinaria_id IS NOT NULL THEN
        INSERT INTO public.categorias (nombre, parent_id) VALUES 
        ('Bomba piscina', v_maquinaria_id),
        ('Compresor de Aire', v_maquinaria_id),
        ('Gatas', v_maquinaria_id),
        ('Máquina de madera', v_maquinaria_id),
        ('Máquina para moler', v_maquinaria_id),
        ('Prensa hidráulica', v_maquinaria_id),
        ('Tecle pluma', v_maquinaria_id),
        ('Tornos', v_maquinaria_id),
        ('Transpaleta', v_maquinaria_id)
        ON CONFLICT DO NOTHING;
    END IF;

    -- Canalización
    IF v_canalizacion_id IS NOT NULL THEN
        INSERT INTO public.categorias (nombre, parent_id) VALUES 
        ('Canaletas', v_canalizacion_id),
        ('Tubería Conduit', v_canalizacion_id),
        ('Tubería EMT', v_canalizacion_id)
        ON CONFLICT DO NOTHING;
    END IF;

    -- Iluminación LED
    IF v_iluminacion_id IS NOT NULL THEN
        INSERT INTO public.categorias (nombre, parent_id) VALUES 
        ('Alta eficiencia', v_iluminacion_id),
        ('Ampolleta', v_iluminacion_id),
        ('Campana', v_iluminacion_id),
        ('Canoa', v_iluminacion_id),
        ('Focos LED', v_iluminacion_id),
        ('Lámpara de emergencia', v_iluminacion_id),
        ('Lámpara estanco', v_iluminacion_id),
        ('Panel', v_iluminacion_id),
        ('Tubo', v_iluminacion_id)
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Electricidad
    IF v_electricidad_id IS NOT NULL THEN
        INSERT INTO public.categorias (nombre, parent_id) VALUES 
        ('Enchufes', v_electricidad_id),
        ('Accesorios', v_electricidad_id),
        ('Automáticos', v_electricidad_id),
        ('Cable THHN', v_electricidad_id),
        ('Cargador de auto', v_electricidad_id),
        ('Enchufe industrial', v_electricidad_id),
        ('Generadores', v_electricidad_id),
        ('Multiplicador de enchufe', v_electricidad_id),
        ('Tableros eléctricos', v_electricidad_id)
        ON CONFLICT DO NOTHING;
    END IF;

    -- Grifería
    IF v_griferia_id IS NOT NULL THEN
        INSERT INTO public.categorias (nombre, parent_id) VALUES 
        ('Accesorios', v_griferia_id),
        ('Lavamanos', v_griferia_id),
        ('Monomando lavaplatos', v_griferia_id)
        ON CONFLICT DO NOTHING;
    END IF;

END $$;

-- 3. RECARGA DE CACHÉ REST
-- Fuerce la purga de los mapeos para que Admin pueda utilizar parent_id.
NOTIFY pgrst, 'reload schema';
