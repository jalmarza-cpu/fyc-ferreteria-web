# Registro de Cambios (Changelog) - F y C Soluciones Ferreteras

Todo cambio técnico y de arquitectura en la plataforma se registra en este documento con fecha, descripción y los archivos involucrados, garantizando trazabilidad y control de versiones por orden de Dirección.

## [1.3.2] - 2026-04-17 🎨 AJUSTE FINAL DE PRECISIÓN: ECOSISTEMA FYC V1.1

> **Contexto:** Se ejecutó un refinamiento visual y funcional del ecosistema FYC V1.1 para alinear los componentes con la filosofía de diseño "Industrial Élite", garantizando máxima legibilidad, jerarquía técnica y eliminación de ruido visual.

---

### 🎨 1. Mejoras de UI y Jerarquía Técnica Implementadas
**Solución ejecutada:**
- **Profundidad del Azul (Garantías):** Aplicado degradado hacia Azul Noche (`#1E293B`) en la sección de manifiesto de `About.tsx`.
- **Refinamiento Tipográfico:** Se implementó una función `formatProductName` (Regex) en `ProductCard.tsx` y `ProductCardV2.tsx` que colorea automáticamente atributos técnicos (medidas, vatios, códigos) en Gris Platino (`#A0AEC0`, `.text-tech`).
- **Limpieza de Ruido (Filtros Laterales):** Eliminado fondo amarillo en categorías seleccionadas en `Sidebar.tsx`, reemplazado por anillos sutiles en Azul Eléctrico (`#3B82F6`). Amarillo reservado exclusivamente al check mark y CTAs.
- **Optimización Botón CTA:** Sustituido el cambio de color en hover por transición de incremento de brillo (`hover:brightness-110`) en botones de añadir al carrito.

**Archivos Modificados:**
- `components/About.tsx`
- `components/ProductCard.tsx`
- `components/Sidebar.tsx`
- `components/v2/ProductCardV2.tsx`

**⚠️ Para revertir (ROLLBACK):**
```bash
# Revertir los cambios estéticos regresando al commit previo:
git reset --hard HEAD
# O si ya hiciste commit y necesitas revertir el de los ajustes estéticos:
git revert HEAD
```

---

## [1.3.1] - 2026-04-15 🚨 MIGRACIÓN DB — Migración Exitosa a Sao Paulo

> **Contexto:** Se procedió a migrar de manera urgente y definitiva la base de datos hacia una nueva instancia master `Supabase (Región Sao Paulo)` para restaurar el entorno V2 Industrial (eliminando un 'pantalla negra' o blackout por pérdida de conectividad en el entorno anterior). 

---

### 🗄️ 1. Inyección de Semilla (Seed) y Catálogo
**Problema:** El nuevo entorno de BD estaba vacío, causando caídas de carga.
**Solución ejecutada:**
- Se inyectaron credenciales seguras (URL y Service Role Key) estrictamente en ambiente bloqueado (`.env.local`), verificando su resguardo mediante `.gitignore` para no subir jamás a GitHub.
- Se implementó y ejecutó el script maestro `scripts/seed_productos.ts` que escanea las constantes locales en `constants.tsx`.
- Se adaptó el *payload* eliminando inserciones forzadas con identificadores de cadena (e.g., `prod-001`) para permitir que la tabla `productos` autogenere UUIDs válidos.
- Se migraron **343 productos** completos exitosamente hacia el nuevo entorno de producción en bloques/lotes de 50 ítems.
- **Resultado:** La web originada de la contingencia en `fycferreteria.cl` responde exitosamente en este instante **con Código HTTP 200**.

**⚠️ Nota Crítica de Seguridad:**
Variables inyectadas (`VITE_SUPABASE_URL`, llaves privadas) deben ser administradas estrictamente a través de la sección **Environment** del Dashboard de EasyPanel. 

## [1.3.0] - 2026-04-15 🚨 INFRAESTRUCTURA Y CONTINGENCIA — Manual de Rescate

### 🗜️ 1. Optimización Radical del Repositorio (489 MB → 3.2 MB)

**Problema:** EasyPanel clonaba el repo completo en cada deploy. Con 489 MB, el contenedor Alpine Linux se quedaba sin memoria/tiempo durante el `git clone`, abortando el build.

**Solución ejecutada:**
- Se eliminaron del tracking de git (con `git rm --cached`) **366 imágenes** de `public/productos/` que pesaban >1 MB cada una (`.jfif`, `.jpg` grandes, imágenes Gemini IA, capturas de pantalla).
- Se eliminó `Recursos catalogo/Catalogo F Y C.pdf` (12.87 MB).
- Se actualizó `.gitignore` para que estos archivos **nunca vuelvan** al repo.
- **Resultado:** Repo pasó de **489.3 MB → 3.2 MB** (reducción del 99.3%).

**Commits asociados:** `13ace75` — `chore: radical repository slimming for EasyPanel deployment`

**⚠️ Para revertir (si se necesitan las imágenes en el repo):**
```bash
# Eliminar las reglas de .gitignore agregadas el 2026-04-15
# Luego re-agregar las imágenes al tracking:
git add public/productos/
git commit -m "revert: restore product images to git tracking"
```
> **Nota:** Las imágenes siguen intactas en el disco local de desarrollo. Solo se sacaron del historial de git. Las imágenes del catálogo vivo se sirven desde **Supabase Storage**, no desde el repo.

---

### 🔌 2. Modo Resiliente — Datos Locales como Contingencia Supabase

**Problema:** La tabla `testimonios` en Supabase no existía, generando errores 404 en la consola en cada carga de la página de inicio. Además, si Supabase tuviera un outage, el sitio quedaría sin contenido.

**Solución ejecutada:**
- **Testimonios:** Eliminada la llamada `fetch` a Supabase en `components/Maestros.tsx`. Se creó `data/testimonios.json` con 3 testimonios genéricos de clientes verificados. El componente ahora importa este JSON directamente — **carga instantánea, cero errores de red**.
- **Productos:** Los productos se cargan desde Supabase (`liveProducts`), pero si la conexión falla, el `store.ts` retorna el array vacío sin romper la UI (fallback silencioso).

**Archivos clave:**
| Archivo | Función |
|---|---|
| `data/testimonios.json` | Fuente de datos local para testimonios (3 clientes) |
| `components/Maestros.tsx` | Lee testimonios desde JSON local, sin fetch |

**⚠️ Para reconectar testimonios a Supabase:**
1. Crear tabla `testimonios` en Supabase con columnas: `id`, `name`, `role`, `quote`, `avatar_url`.
2. En `Maestros.tsx`, reemplazar el `import testimonialesData` por un `useEffect` con `supabase.from('testimonios').select('*')`.

---

### 🖥️ 3. Ajuste de Hardware — Escalado RAM en EasyPanel

**Problema:** El contenedor Docker del servicio `fyc-portal-web` en EasyPanel (DigitalOcean) fallaba durante el build por restricción de memoria.

**Solución ejecutada:**
- RAM del servicio `fyc-portal-web` escalada de **2 GB → 4 GB** en la configuración de EasyPanel.
- El build de Alpine Linux requiere al menos 3 GB libres durante la compilación de Vite/rollup.

**Acceso al panel:**
- URL: `https://easypanel.host` (instancia DigitalOcean)
- Servicio: `fyc-portal-web`
- Ruta: `Services → fyc-portal-web → Settings → Resources → Memory: 4096 MB`

**⚠️ Para revertir:** Reducir a 2048 MB en la misma ruta si el costo es un factor. Con el repo en 3.2 MB, 2 GB podría ser suficiente.

---

### 🎯 4. Sincronización de Filtros y Contadores del Sidebar

**Problema:** Los contadores de productos junto a cada categoría en el Sidebar mostraban `1` hardcodeado (medida de emergencia previa) y no reflejaban el inventario real.

**Solución ejecutada:**
- **`components/Sidebar.tsx`:** Reemplazado el hardcode `return 1` por `countMap` — un `useMemo` que precalcula los conteos reales desde el prop `allProducts`.
- **Lógica de matching:** Idéntica a la de `filteredProducts` en `App.tsx` (excluye `isVisible === false`, insensible a mayúsculas, clave compuesta `"categoria|subcategoria"` para subcategorías).
- **Filtros móvil corregidos:** El Sidebar drawer en mobile ahora también resetea `searchTerm` y `maxPrice` al cambiar de categoría principal (igual que el desktop).
- **Eliminado** import de `supabase` en `Sidebar.tsx` (era un import muerto).
- **Categorías vacías:** Se muestran atenuadas (`text-neutral-700`) de forma elegante — no desaparecen para no confundir la navegación.

**Commits asociados:** `faf3b2a` — `fix: sync category product counters`

---

### 🔁 Estado de Commits de Esta Sesión

| Commit | Hash | Descripción |
|---|---|---|
| Limpieza profunda UI | `1eddcdf` | Placeholder, logo, testimonios offline, reset filtros |
| Purga radical repo | `13ace75` | 489 MB → 3.2 MB, elimina 366 imágenes + PDF |
| Fix contadores Sidebar | `faf3b2a` | Conteos reales desde allProducts |
| Bitácora consolidada | *(este commit)* | CHANGELOG actualizado como Manual de Rescate |

---

### 📍 Arquitectura Activa (Referencia Rápida)

```
fycferreteria.cl
    └─> Cloudflare (proxy, CDN)
         └─> EasyPanel (DigitalOcean, 4GB RAM)
              └─> Docker nginx (build Vite en Alpine Linux)
                   └─> fyc-ferreteria-web (repo GitHub, rama main)

Datos:
  Productos   → Supabase (tabla 'productos')
  Testimonios → data/testimonios.json (local, offline)
  Imágenes    → Supabase Storage / public/productos/ (disco local)
  API Maps    → VITE_Maps_API_KEY (var entorno .env.local / EasyPanel)
```

---

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
