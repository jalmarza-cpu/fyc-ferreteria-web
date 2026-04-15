# 🎨 GUÍA DE ESTILO — Portal FYC Ferretería

> **Versión:** 2.1 · **Fecha:** Abril 2025 · **Estándar:** INNOBATE Industrial Élite
>
> ### 💡 El Reporte del Arquitecto
> *"El azul no será un bloque de color, sino un detalle de ingeniería que hará que el
> sitio de FYC no parezca solo una ferretería, sino un catálogo de soluciones de
> iluminación de alta gama."*
>
> Esta frase es el **corazón** de la GUIA_ESTILO. Le da al equipo una dirección clara:
> **el diseño está al servicio de la técnica.** Cada color, cada tamaño de fuente y
> cada margen existe para hacer los datos del producto más legibles, no para decorar.
>
> **V2 (Industrial Élite):** Los colores V2 son **definitivos y aprobados por el Director**.
> No alterar sin consulta previa.

---

## 🆕 PALETA V2 — "Industrial Élite" (Canvas Obsidiana)

> **Regla de oro V2:** El amarillo `#FFD700` aparece en **UN solo elemento por tarjeta**: el botón CTA.
> Ningún badge, precio ni fondo puede ser amarillo sólido en V2.

### 🎯 Tabla Maestra de Variables V2

| Elemento | Variable CSS | Hexadecimal | Función Psicológica |
|---|---|---|---|
| Fondo Canvas | `--canvas-v2` | `#121212` | Profundidad OLED — elimina fatiga visual |
| Texto Títulos | `--text-white` | `#FFFFFF` | Legibilidad máxima en entorno oscuro |
| **Datos Técnicos** | **`--text-tech`** | **`#A0AEC0`** | **Autoridad técnica — separa el nombre de la especificación** |
| Bordes/Divisores | `--border-v2` | `#2D3748` | Estructura de ingeniería sin "cerrar" el diseño |
| Metadatos dim | `--text-dim` | `#64748B` | Información de soporte — no compite |
| Acento Acción | `--accent-action` | `#FFD700` | Foco absoluto en la conversión (Venta) |

### Fondos V2

| Nombre | Hexadecimal | RGB | Uso |
|---|---|---|---|
| **Negro Obsidiana (Canvas)** | `#121212` | (18, 18, 18) | Fondo global del canvas V2 — aprobado |
| **Negro Tarjeta** | `#181818` | (24, 24, 24) | Fondo de tarjetas de producto V2 |
| **Negro Imagen** | `#0F0F0F` | (15, 15, 15) | Contenedor de imagen en tarjeta V2 |
| **Negro Input** | `#1A1A1A` | (26, 26, 26) | Inputs, selects, fondos de controles |

### Bordes V2

| Nombre | Hexadecimal | Uso |
|---|---|---|
| **Acero Oscuro (borde)** | `#2D3748` | Borde fino 1px de tarjetas V2 — estándar |
| **Acero Hover** | `#1E2533` | Borde al hacer hover sobre tarjeta |
| **Divisor Interno** | `#1E293B` | Separadores entre secciones dentro de tarjeta |

### Texto V2 — Jerarquía de 3 Niveles

| Nivel | Nombre | Hexadecimal | Variable CSS | Clase CSS | Aplicar en... |
|---|---|---|---|---|---|
| 1 · Primario | **Blanco Puro** | `#FFFFFF` | `--text-white` | `.product-title-v2` | Nombre del producto |
| 2 · Técnico | **Gris Platino Técnico** | `#A0AEC0` | `--text-tech` | `.text-tech` | Voltaje, Watts, Kelvin, Dimensiones, modo de precio, IVA |
| 3 · Atenuado | **Gris Acero** | `#64748B` | `--text-dim` | _(inline)_ | SKU, categoría, viewers, metadatos |

> **Cómo usar `.text-tech`:** Envolver cualquier dato de especificación técnica en esta clase.
> Los valores numéricos dentro de `<strong>` resaltan automáticamente en blanco.
> ```html
> <span class="text-tech">Voltaje: <strong>220V</strong> · Potencia: <strong>50W</strong></span>
> <span class="text-tech">Temp. Color: <strong>3000K</strong> · Dimensiones: <strong>120×60mm</strong></span>
> ```

### Acento V2 — Dorado Restringido

| Nombre | Hexadecimal | Regla de uso |
|---|---|---|
| **Dorado Marca** | `#FFD700` | **SOLO** fondo del botón "Añadir al Carrito" / "Agregar Pack" |
| **Dorado Hover** | `#FFF176` | Hover del botón dorado |
| **Negro CTA** | `#000000` | Texto DENTRO del botón dorado (contraste máximo) |

### Estados V2

| Estado | Hexadecimal | Uso |
|---|---|---|
| **Verde Éxito** | `#10B981` | Ahorro, confirmación de carrito, stock activo |
| **Rojo Error** | `#EF4444` | Badge de oferta (sin fondo), sin stock |
| **Ámbar Aviso** | `#F59E0B` | Advertencias de stock bajo |

---

## 💡 Optimización de Imágenes V2 — Estrategia WebP

> **Objetivo:** Mantener la profundidad de negros con el menor peso posible.

```
Orden de prioridad de formatos (V2 activo):
  1. .webp   ← Primero siempre. ~35% más liviano que JPEG, negros más ricos
  2. .jpg    ← Fallback para buckets sin versión WebP
  3. .png    ← Solo si no hay .jpg
  4. placeholder-fyc.png  ← Último recurso local
```

**Estado actual:** Stub listo en `hooks/useWebPOptimizer.ts`.
**Activación:** Ver guía detallada en el mismo archivo.

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
