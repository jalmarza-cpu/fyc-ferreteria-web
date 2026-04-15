# 🗺️ MAPA DEL PROYECTO — Portal FYC Ferretería

> **Versión:** 2.0 · **Fecha:** Abril 2025 · **Estándar:** INNOBATE

---

## 📁 Jerarquía de Carpetas

```
f-y-c-portal-2026/
│
├── 📂 components/          ← PRODUCCIÓN (V1) — No modificar sin aprobación
│   ├── About.tsx           ← Sección "Quiénes somos"
│   ├── AdminDashboard.tsx  ← Panel de administración (carga diferida)
│   ├── Footer.tsx          ← Pie de página con links legales
│   ├── Header.tsx          ← Barra de navegación con buscador
│   ├── Hero.tsx            ← Portada animada con llamada a la acción
│   ├── LegalPages.tsx      ← Despachos, Devoluciones, Términos
│   ├── Maestros.tsx        ← Sección testimonios (datos locales JSON)
│   ├── ProductCard.tsx     ← Tarjeta de producto con 3 niveles de precio
│   ├── Sidebar.tsx         ← Filtros de categorías y precio
│   └── 📂 v2/             ← ⚗️ LABORATORIO (V2) — Alta Gama (aislado)
│       └── README.md       ← Instrucciones del sandbox
│
├── 📂 data/                ← Datos locales (sin dependencia de Supabase)
│   └── testimonios.json    ← Testimonios de clientes Maestros
│
├── 📂 hooks/               ← Lógica de negocio reutilizable
│   └── useCalculadoraPrecios.ts ← Los 3 niveles de precio centralizados
│
├── 📂 public/              ← Activos estáticos (servidos directamente)
│   ├── logo-fyc.png        ← Logo oficial en fondo oscuro
│   ├── placeholder-fyc.png ← Imagen de reemplazo cuando falta foto de producto
│   └── (favicon, etc.)
│
├── 📂 utils/               ← Utilidades técnicas
│   └── supabase.ts         ← Cliente Supabase + funciones de URL de imágenes
│
├── App.tsx                 ← Raíz de la aplicación. Orquesta rutas y estado global
├── constants.tsx           ← Catálogo de productos en datos locales (fallback)
├── store.ts                ← Estado global del carrito (Zustand)
├── types.ts                ← Definiciones de TypeScript
├── index.tsx               ← Punto de entrada del bundle Vite
│
├── CHANGELOG.md            ← 📖 Manual de Rescate — historial de versiones
├── GUIA_ESTILO.md          ← 🎨 ADN Visual — colores, tipografía, espaciado
├── HISTORIAL_DE_ERRORES.md ← 🐛 Bitácora de fallos y soluciones
└── MAPA_PROYECTO.md        ← 🗺️ Este archivo — plano maestro
```

---

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                      USUARIO (Navegador)                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Cloudflare CDN  →  fycferreteria.cl  (DNS + Cache + SSL)       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  EasyPanel / DigitalOcean  →  Docker Container (nginx)          │
│  RAM: 4 GB · Build: Vite/React                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx                                 │
│   ┌─────────────────────────────────────────────────────┐       │
│   │  Estado Global: category, searchTerm, maxPrice      │       │
│   │  liveProducts (desde Supabase o constants.tsx)      │       │
│   └──────┬──────────────────────────┬───────────────────┘       │
│          │                          │                           │
│          ▼                          ▼                           │
│    ┌──────────┐              ┌────────────┐                     │
│    │ Sidebar  │              │    Home    │                     │
│    │ (Filtros)│◄────────────►│ (Catálogo) │                     │
│    └──────────┘              └─────┬──────┘                     │
│                                   │                            │
│                                   ▼                            │
│                          ┌─────────────────┐                   │
│                          │  ProductCard    │                   │
│                          │  (por producto) │                   │
│                          └────────┬────────┘                   │
└───────────────────────────────────┼────────────────────────────┘
                                    │
                   ┌────────────────┴───────────────┐
                   ▼                                ▼
     ┌─────────────────────────┐     ┌──────────────────────────┐
     │  useCalculadoraPrecios  │     │  store.ts (Carrito)       │
     │  (Lógica de 3 precios)  │     │  (Estado Zustand)         │
     └─────────────┬───────────┘     └──────────────────────────┘
                   │
       ┌───────────┴──────────────┐
       ▼                          ▼
┌────────────┐           ┌────────────────────┐
│ Precio     │           │ Precio Mayorista    │
│ Detalle    │           │ (Pack Mínimo x6)    │
│ (1 unidad) │           └────────────────────┘
└────────────┘
       │
       ▼
┌───────────────────────────────────────────┐
│           SUPABASE (Backend)              │
│  Tabla: productos   (catálogo principal)  │
│  Storage: /productos (imágenes)           │
│  Storage: /maestros  (testimonios)        │
│  Realtime: suscripción de cambios en vivo│
└───────────────────────────────────────────┘
```

---

## 🧩 Componentes Críticos — V1 vs V2

| Componente | Versión | Ruta | Estado | Dependencias Clave |
|---|---|---|---|---|
| `ProductCard` | V1 ✅ | `components/ProductCard.tsx` | En producción | `useCalculadoraPrecios`, `store.ts`, `supabase.ts` |
| `Sidebar` | V1 ✅ | `components/Sidebar.tsx` | En producción | `constants.tsx` (allProducts) |
| `Header` | V1 ✅ | `components/Header.tsx` | En producción | `store.ts` (contador carrito) |
| `Maestros` | V1 ✅ | `components/Maestros.tsx` | En producción | `data/testimonios.json` (**sin Supabase**) |
| `AdminDashboard` | V1 ✅ | `components/AdminDashboard.tsx` | Lazy-load `/admin` | `supabase.ts` (supabaseAdmin) |
| `ProductCardV2` | V2 🔴 | `components/v2/` | Por diseñar | — |
| `AsistenteIA` | V2 🔴 | `components/v2/AsistenteIA.tsx` | Punto reservado en `App.tsx` | `VITE_AI_API_KEY` |

---

## 🔐 Variables de Entorno Requeridas

| Variable | Descripción | Dónde configurar |
|---|---|---|
| `VITE_SUPABASE_URL` | URL de la instancia Supabase | EasyPanel → Env Vars |
| `VITE_SUPABASE_ANON_KEY` | Clave pública (anon) de Supabase | EasyPanel → Env Vars |
| `VITE_SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio (solo Admin Dashboard) | EasyPanel → Env Vars |
| `VITE_Maps_API_KEY` | Google Maps API Key | EasyPanel → Env Vars |
| `VITE_AI_API_KEY` | IA (reservado para V2) | EasyPanel → Env Vars |

> ⚠️ **Ninguna de estas variables debe aparecer en el código fuente ni en el repositorio de GitHub.**
