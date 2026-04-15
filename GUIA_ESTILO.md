# 🎨 GUÍA DE ESTILO — Portal FYC Ferretería

> **Versión:** 1.0 · **Fecha:** Abril 2025 · **Estándar:** INNOBATE Alta Gama
>
> Este documento es el **ADN Visual** del portal. Cualquier cambio en V1 o V2
> debe respetar estos valores. Si se aprueba un cambio de estilo, actualizar
> este archivo primero y luego aplicarlo — nunca al revés.

---

## 🎨 Paleta de Colores Oficial

### Colores Primarios

| Nombre | Hexadecimal | RGB | Uso |
|---|---|---|---|
| **Negro Profundo** | `#050505` | (5, 5, 5) | Fondo global de la aplicación |
| **Negro Grafito** | `#0A0A0A` | (10, 10, 10) | Fondo de tarjetas, sidebars |
| **Negro Carbón** | `#111111` | (17, 17, 17) | Fondos de sección secundaria |
| **Negro Acero** | `#1A1A1A` | (26, 26, 26) | Botones secundarios, inputs |
| **Amarillo Acento** | `#FFD700` | (255, 215, 0) | Color de marca, CTAs principales, precios mayoristas |
| **Amarillo Claro** | `#FFED4D` | (255, 237, 77) | Hover del Amarillo Acento |

### Colores de Estado

| Nombre | Hexadecimal | Uso |
|---|---|---|
| **Verde Éxito** | `#22C55E` | Confirmaciones, stock disponible |
| **Verde WhatsApp** | `#25D366` | Botones de WhatsApp |
| **Rojo Alerta** | `#D32F2F` | Errores, sin stock, badges de oferta |
| **Verde Ahorro** | `#4ADE80` / `text-green-400` | Indicadores de ahorro en precios |

### Colores de Borde y Separadores

| Nombre | Hexadecimal | Uso |
|---|---|---|
| **Borde Sutil** | `#222222` | Bordes estándar entre secciones |
| **Borde Medio** | `#333333` | Bordes de inputs y tarjetas |
| **Amarillo Tenue** | `#FFD700/10` | Fondos activos de precio mayorista |

---

## 🔤 Tipografía

### Fuentes en Uso

| Fuente | Clase CSS | Uso | Características |
|---|---|---|---|
| **Font Industrial** | `font-industrial` | Títulos, precios, UI principal | Bold, uppercase, tracking ajustado |
| **Sistema / Sans** | `font-sans` | Cuerpo de texto, labels | Regular a medium |
| **Mono** | `font-mono` | SKUs, códigos de producto | Monoespaciado |

### Escala de Texto

| Tamaño | Clase Tailwind | Uso Típico |
|---|---|---|
| `9px` | `text-[9px]` | Microlabels, notas de SKU |
| `10px` | `text-[10px]` | Labels de formulario, badges |
| `12px (xs)` | `text-xs` | Texto de botón, descripción corta |
| `14px (sm)` | `text-sm` | Precio retail, texto de carrito |
| `22px` | `text-[22px]` | Precio mayorista en tarjeta |
| `24px (2xl)` | `text-2xl` | Precio en modal |
| `36px (4xl)` | `text-4xl` | Títulos de sección |

### Reglas de Tipografía

- **Títulos:** Siempre `uppercase` + `tracking-tighter` o `tracking-wider`
- **Precios:** Siempre `font-industrial font-black`
- **Labels de formulario:** Siempre `uppercase font-bold text-neutral-500`
- **CTAs (botones):** Siempre `font-black uppercase tracking-wider`

---

## 📐 Espaciado y Layout

### Grid del Catálogo

| Pantalla | Columnas | Clase |
|---|---|---|
| Móvil | 1 | `grid-cols-1` |
| Tablet | 2 | `sm:grid-cols-2` |
| Desktop | 3 | `lg:grid-cols-3` |
| Wide | 4 | `xl:grid-cols-4` |

### Espaciado Base

| Uso | Valor | Clase Tailwind |
|---|---|---|
| Gap entre tarjetas | 16px | `gap-4` |
| Padding de sección | 24px–96px | `px-6 py-16 md:py-24` |
| Padding de tarjeta | 12px | `p-3` |
| Sidebar fija (desktop) | 288px | `w-72` |
| Ancho máximo de contenido | 1600px | `max-w-[1600px]` |

### Bordes y Radios

| Elemento | Radio | Clase Tailwind |
|---|---|---|
| Tarjetas de producto | 12px | `rounded-xl` |
| Botones principales | 999px (pildora) | `rounded-full` |
| Botones de acción (carrito) | 8px | `rounded` |
| Modales y drawers | 16px | `rounded-2xl` |
| Badges | 2px | `rounded-sm` |

---

## ✨ Micro-Animaciones y Efectos

### Hover en Tarjetas

```css
/* Efecto Premium: elevación + borde dorado + glow sutil */
hover:-translate-y-1
hover:border-[#FFD700]/50
hover:shadow-[0_8px_30px_rgba(255,215,0,0.1)]
```

### Botones CTA Dorados

```css
/* Glow dinámico al pasar el cursor */
hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]
```

### Transiciones

- **Estándar:** `transition-all duration-300`
- **Imágenes (zoom):** `transition-transform duration-500 ease-out`
- **Modales/Drawers:** Spring animation — `damping: 25, stiffness: 200`

---

## 🧱 Componentes Base — Reglas de Alta Gama

### Botón Primario (CTA Amarillo)
```
bg-[#FFD700] text-black font-black uppercase tracking-wider
hover:bg-[#FFED4D] shadow-md hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]
rounded transition-all
```

### Botón Secundario (Outline)
```
bg-transparent border border-[#333]
hover:border-[#FFD700] text-neutral-300 hover:text-white
font-bold uppercase tracking-wider rounded transition-colors
```

### Input de Formulario
```
bg-[#151515] border border-[#333]
focus:border-[#FFD700] rounded px-3 py-2
text-xs text-white outline-none transition-colors
```

### Badge de Descuento
```
bg-[#D32F2F] text-white px-2 py-0.5
text-[10px] font-black uppercase tracking-wider
shadow-md rounded-sm
```

---

## 🚫 Reglas de lo Que NO Hacer

1. **No usar blanco puro** (`#FFFFFF`) como fondo — rompe el modo oscuro de alta gama.
2. **No usar azul** a menos que sea un link externo (regla de marca).
3. **No reducir el peso tipográfico** de los CTAs — siempre `font-black`.
4. **No agregar componentes con fondo blanco** en V2 sin aprobación del Director.
5. **No cambiar `#FFD700`** por otro amarillo sin actualizar este archivo primero.
