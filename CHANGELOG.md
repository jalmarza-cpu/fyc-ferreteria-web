# Registro de Cambios (Changelog) - F y C Soluciones Ferreteras

Todo cambio técnico y de arquitectura en la plataforma se registra en este documento con fecha, descripción y los archivos involucrados, garantizando trazabilidad y control de versiones por orden de Dirección.

## [1.1.0] - 2026-04-14 (Fase de Estabilización de Inventario)

### 📌 Descripción de Cambios
- **Soft Delete & Dashboard de Rescate**: Eliminación de registros manuales en la vista principal y creación de vista especial "Papelera" para recuperar o auditar elementos ocultos (`estado_visibilidad: false`).
- **Autopurga de Caché CDN**: Se conectó mediante `triggerCloudflarePurge()` el panel administrativo al webhook de n8n para purgar automáticamente la memoria caché de Cloudflare frente a eliminación o modificación de productos, erradicando desincronizaciones frente al público.
- **Single Source of Truth**: Se purgaron librerías obsoletas (como el `staticFallback` cargado en `constants.tsx`) dentro del frontend, unificando que *Supabase es 100% el único controlador absoluto* sobre qué productos son visibles publicamente. Sincronización exitosa entre conteos Admin (383) y Web (383).

### 📁 Archivos Modificados
- `components/AdminDashboard.tsx`
- `App.tsx`
