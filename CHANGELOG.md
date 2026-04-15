# Registro de Cambios (Changelog) - F y C Soluciones Ferreteras

Todo cambio técnico y de arquitectura en la plataforma se registra en este documento con fecha, descripción y los archivos involucrados, garantizando trazabilidad y control de versiones por orden de Dirección.


## [1.2.3] - 2026-04-14 (Seguridad Maps API Key + Diagnóstico Infraestructura)

### 📌 Descripción de Cambios
- **Migración Maps API Key**: La variable `GOOGLE_API_KEY` encontrada en el historial de git (`Recursos catalogo/Api`, commit `bc32fe9`) fue recuperada y migrada como variable de entorno segura con nombre `VITE_Maps_API_KEY` en `.env.local`. Pendiente configurar en Vercel Dashboard y EasyPanel.
- **Diagnóstico Infraestructura fycferreteria.cl**: Se confirmó que el dominio `.cl` apunta a un contenedor Docker en **EasyPanel** (no a Vercel directamente). DNS gestionado vía Cloudflare con nameservers `adel.ns.cloudflare.com` / `cameron.ns.cloudflare.com`.
- **Arquitectura confirmada**: `fycferreteria.cl → Cloudflare (proxy) → EasyPanel Docker (nginx)`. La URL `fyc-ferreteria-web.vercel.app` es la versión más actualizada.
- **Cuenta Cloudflare activa**: `jalmarza@kirisinmobiliaria.com` (gestiona solo `kirisinmobiliaria.cl`). La cuenta que gestiona `fycferreteria.cl` es independiente — pendiente identificar.
- **Webhook redeploy EasyPanel**: `servicios-n8n-n8n.9barxf.easypanel.host/webhook/easypanel-deploy-fyc` — redeploy tarda ~8-12 min por build Docker en Alpine Linux.

### 📁 Archivos Modificados
- `.env.local` (agregado `VITE_Maps_API_KEY`)

### ⚠️ Pendientes
- Configurar `VITE_Maps_API_KEY` en Vercel Dashboard (Settings → Environment Variables)
- Configurar `VITE_Maps_API_KEY` en EasyPanel (Entorno del servicio `fyc-portal-web`)
- Identificar y registrar cuenta Cloudflare que gestiona `fycferreteria.cl`

## [1.2.2] - 2026-04-14 (Incidencia de Seguridad &amp; Securización de API Keys)

### 📌 Descripción de Cambios
- **Alerta de Secretos Expuestos**: GitHub y Google Cloud reportaron API Keys públicas en el código.
- **Acción Inmediata (Google)**: Eliminación permanente del archivo `Recursos catalogo/Api` del entorno de local/github. Las API Keys fueron declaradas comprometidas. Las nuevas llaves deberán almacenarse en Variables de Entorno (`.env`) en Vercel/Easypanel.
- **Acción Preventiva (Supabase)**: Extirpadas las llaves crudas (`VITE_SUPABASE_SERVICE_ROLE_KEY` y `VITE_SUPABASE_ANON_KEY`) dentro de `utils/supabase.ts` para depender 100% de `import.meta.env`, impidiendo futuros vectores de vulnerabilidad.
- **Rotación de Claves**: El administrador ha sido notificado para llevar a cabo la rotación/invaliadación manual en Google Cloud y rotación de claves maestras si procede, restaurando la seguridad total.

### 📁 Archivos Modificados
- `Recursos catalogo/Api` (borrado)
- `utils/supabase.ts`

## [1.2.1] - 2026-04-14 (Hotfix de Estabilidad)
- **Hotfix:** Limpiados 18 productos fantasmas reales (duplicados de BD).
- **Hotfix:** Corregido el conteo de AdminDashboard para excluir productos eliminados lógicamente.
- **Hotfix:** Forzadas las subcategorías en Dashboard Admin (Fallback a constants correcto).
- **Hotfix:** Purgado Cloudflare vía ping manual POST en n8n.

## [1.2.0] - 2026-04-14 (Nueva Arquitectura de Categorías)

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
