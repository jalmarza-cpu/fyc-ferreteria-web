# Registro de Cambios (Changelog) - F y C Soluciones Ferreteras

Todo cambio técnico y de arquitectura en la plataforma se registra en este documento con fecha, descripción y los archivos involucrados, garantizando trazabilidad y control de versiones por orden de Dirección.


## [1.2.1] - 2026-04-14\n- **Hotfix:** Limpiados 18 productos fantasmas reales (duplicados de BD).\n- **Hotfix:** Corregido el conteo de AdminDashboard para excluir productos eliminados lógicamente.\n- **Hotfix:** Forzadas las subcategorías en Dashboard Admin (Fallback a constants correcto).\n- **Hotfix:** Purgado Cloudflare vía ping manual POST en n8n.\n\n## [1.2.0] - 2026-04-14 (Nueva Arquitectura de Categorías)

### 📌 Descripción de Cambios
- **Ampliación de Árbol Dinámico de Categorías**: Se configuró y expandió el mapa de subcategorías (`SUBCATEGORY_MAP`) y se estableció el nuevo comportamiento de menús desplegables (`EXPANDABLE_CATEGORIES`).
- **Nuevas Secciones Implementadas**:
  - **Iluminación LED**: Alta eficiencia, Ampolleta, Campana, Canoa, Focos LED, Lámpara de emergencia, Lámpara estanco, Paneles LED, Proyectores Led.
  - **Electricidad**: Alargador, Cables, Cajas, Campana Timbre, Enchufes, Gabinete, Interruptores, Tableros.
  - **Herramientas**: Alicate, Amarra, Broca, Brocha, Cortadora, Destornillador, Discos, Escuadra, Espátula, Extractor de poleas, Formón, Guantes, Jardín, Llaves, Martillo, Napoleón, Nivel, Pasadores, Planas, Prensa, Regla, Rodillos, Sacaclavos, Serrucho, Tarugo.
  - **Maquinaria**: Bomba piscina, Compresor de Aire, Gatas, Máquina de madera, Máquina para moler, Prensa hidráulica, Tecle pluma, Tornos, Transpaleta.
- **Sincronización Previa a Base de Datos**: Como preparación, los keywords de cada subcategoría están seteados para poder extraerlos de base de datos automáticamente si provienen de facturas o inventarios brutos.
- **Unificación de UI (Web vs Admin Dashboard)**: Se reemplazaron las dependencias estáticas (*hardcoded*) en las pestañas de filtros y dropdowns de edición en `AdminDashboard.tsx`, programando una estructura asíncrona preparada para consumir la tabla `categorias` desde Supabase como fuente de la verdad, con *fallback* seguro a `constants.tsx` en caso de latencia o re-creación de tablas.

### 📁 Archivos Modificados
- `constants.tsx`
- `components/AdminDashboard.tsx`

## [1.1.0] - 2026-04-14 (Fase de Estabilización de Inventario)

### 📌 Descripción de Cambios
- **Soft Delete & Dashboard de Rescate**: Eliminación de registros manuales en la vista principal y creación de vista especial "Papelera" para recuperar o auditar elementos ocultos (`estado_visibilidad: false`).
- **Autopurga de Caché CDN**: Se conectó mediante `triggerCloudflarePurge()` el panel administrativo al webhook de n8n para purgar automáticamente la memoria caché de Cloudflare frente a eliminación o modificación de productos, erradicando desincronizaciones frente al público.
- **Single Source of Truth**: Se purgaron librerías obsoletas (como el `staticFallback` cargado en `constants.tsx`) dentro del frontend, unificando que *Supabase es 100% el único controlador absoluto* sobre qué productos son visibles publicamente. Sincronización exitosa entre conteos Admin (383) y Web (383).

### 📁 Archivos Modificados
- `components/AdminDashboard.tsx`
- `App.tsx`
