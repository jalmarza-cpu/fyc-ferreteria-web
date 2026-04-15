# 📋 HISTORIAL DE ERRORES — Portal FYC Ferretería

> **Propósito:** Registro oficial de fallos detectados en producción, staging o compilación.
> **Idioma:** Español. **Formato:** Tabla cronológica.
> **Responsable:** Equipo de Desarrollo Innobate / Director de Proyecto.

---

## 📌 Instrucciones de Uso

Cada vez que se detecte un error, agregar una fila nueva al inicio de la tabla (orden descendente: más reciente primero).

| Campo | Descripción |
|---|---|
| **Fecha** | DD/MM/AAAA |
| **Entorno** | `Producción` / `Staging` / `Local` |
| **Error Detectado** | Descripción clara del problema en español |
| **Causa Raíz** | Por qué ocurrió |
| **Solución Aplicada** | Qué se hizo para resolverlo |
| **Estado** | ✅ Resuelto / ⚠️ En progreso / ❌ Sin resolver |

---

## 🗂️ Registro de Errores

| Fecha | Entorno | Error Detectado | Causa Raíz | Solución Aplicada | Estado |
|---|---|---|---|---|---|
| 15/04/2025 | V2 Sandbox | Optimización de jerarquía visual técnica completada — Datos de Voltaje, Watts, Kelvin y Dimensiones sin clase semántica diferenciada | Los datos técnicos usaban el mismo color que el texto de soporte, sin autoridad visual propia | Implementada variable `--text-tech: #A0AEC0` en `:root` global (`index.html`). Clase `.text-tech` aplicada en `ProductCardV2`. Tokens V2 actualizados con filosofía Industrial Élite | ✅ Resuelto |
| 15/04/2025 | Producción | Brecha de seguridad: credenciales de Supabase hardcodeadas como fallback en `utils/supabase.ts` y en scripts de utilidad (`.cjs`, `.js`) | Durante la fase de emergencia se usaron valores reales como respaldo en el código fuente | Eliminados todos los valores hardcodeados. `supabase.ts` ahora falla explícitamente si las variables de entorno no están configuradas. Scripts de utilidad agregados al `.gitignore` | ✅ Resuelto |
| 15/04/2025 | Repositorio | Scripts de diagnóstico con credenciales reales rastreados por Git | Archivos `*.cjs`, `test_supabase.js`, `upload.js` y otros no estaban excluidos | Agregados todos los scripts al `.gitignore`. Se eliminaron del tracking de futuros commits | ✅ Resuelto |
| 14/04/2025 | Producción | Build de Docker falla por tiempo de espera agotado en EasyPanel | Repositorio pesaba 489 MB (366 imágenes + PDF catálogo en historial Git) | Purga radical con `git filter-repo --strip-blobs-bigger-than 1M`. Repo reducido a 3.2 MB | ✅ Resuelto |
| 14/04/2025 | Producción | Error 404 en consola: tabla `testimonios` no existe en Supabase | La tabla nunca fue creada en la base de datos del proyecto | Migración a datos locales en `data/testimonios.json`. Se eliminó llamada a Supabase | ✅ Resuelto |
| 14/04/2025 | Producción | Contadores de categorías mostraban siempre `1` en el Sidebar | Función `getCategoryCount` retornaba valor fijo (hardcodeado) | Reescritura con `useMemo` + `countMap` calculado desde `allProducts` | ✅ Resuelto |
| 14/04/2025 | Producción | Error de compilación OOM (sin memoria) en EasyPanel durante build | RAM limitada a 2 GB en el servicio Docker | Escalado del servicio `fyc-portal-web` a 4 GB de RAM en panel DigitalOcean | ✅ Resuelto |
| 14/04/2025 | Producción | `GOOGLE_API_KEY` expuesta en historial del repositorio | Credenciales comiteadas directamente en código fuente | Key regenerada en Google Cloud. Migrada a variable de entorno `VITE_Maps_API_KEY` | ✅ Resuelto |

---

## 📝 Notas para el Director

- Los errores marcados como **✅ Resuelto** están documentados con mayor detalle en el `CHANGELOG.md` (sección "Manual de Rescate").
- Si un error regresa, cambiar el estado a **⚠️ En progreso** y agregar una nueva fila con la fecha actual.
- Ante cualquier duda sobre cómo revertir un cambio, consultar primero el `CHANGELOG.md`.
