# 🎨 Entorno V2 — Rediseño "Alta Gama" FYC Ferretería

> **⚠️ ZONA DE DESARROLLO AISLADA**
> Los componentes de esta carpeta son experimentales y **NO están conectados** al flujo productivo (V1).
> La página en `fycferreteria.cl` usa exclusivamente los componentes de `components/` (raíz).

---

## 🎯 Propósito

Esta carpeta es el **laboratorio visual de alta gama** para la próxima versión del portal.
Se puede iterar libremente sin riesgo de romper la versión que ya está online.

## 📂 Estructura Planificada

```
components/v2/
├── README.md              ← Este archivo
├── ProductCardV2.tsx      ← Tarjeta de producto rediseñada
├── SidebarV2.tsx          ← Sidebar con filtros avanzados
├── HeroV2.tsx             ← Hero de alta gama (vídeo + parallax)
├── HeaderV2.tsx           ← Header con diseño "Premium Dark"
└── index.ts               ← Barrel export (cuando estén listos)
```

## 🚀 Cómo Activar V2 en Producción

Cuando el Director apruebe el nuevo diseño:
1. Reemplazar los imports en `App.tsx` apuntando a `./components/v2/ComponenteV2`.
2. Eliminar los componentes V1 obsoletos.
3. Hacer commit con el mensaje: `feat: activar rediseño alta gama V2`.

## 📋 Estado de Componentes V2

| Componente | Estado | Responsable |
|---|---|---|
| ProductCardV2 | 🔴 Por diseñar | — |
| SidebarV2 | 🔴 Por diseñar | — |
| HeroV2 | 🔴 Por diseñar | — |
| HeaderV2 | 🔴 Por diseñar | — |
