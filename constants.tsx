
import { Product, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Nosotros', href: '#nosotros' },
];

export const CONTACT_PHONE = "56920648577";
export const CONTACT_PHONE_DISPLAY = "+56 9 2064 8577";
export const CONTACT_EMAIL = "ventas@fycferreteria.cl";

// CATEGORÍAS (Terminología Chilena)
export const CATEGORIES = [
  "Todas",
  "Brocha, Herramientas",
  "Gasfitería", // Antes Fontanería
  "Pinturas y Terminaciones",
  "Construcción y Obra Gruesa"
];

// ==========================================
// BASE DE DATOS DE PRODUCTOS
// ==========================================
export const PRODUCTS: Product[] = [
  // --- BROCHA Y HERRAMIENTAS ---
  {
    id: 'bh-001',
    name: "Brocha de calidad forceman 4″.",
    sku: "011387",
    description: "Brocha 4″.",
    priceRetail: 1900,
    priceWholesale: 1620,
    imageUrl: "/productos/011387-brocha-forceman-4-v2.jpg",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-002',
    name: "Brocha de calidad forceman 3″.",
    sku: "011386",
    description: "Brocha 3″.",
    priceRetail: 1500,
    priceWholesale: 1300,
    imageUrl: "/productos/011386-Brocha-de-calidad-forceman-3.jpg",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-003',
    name: "Brocha de calidad forceman 2 1/2″.",
    sku: "011385",
    description: "Brocha 2 1/2″.",
    priceRetail: 1450,
    priceWholesale: 1150,
    imageUrl: "/productos/011385-Brocha-de-calidad-forceman-2-medio.jpg",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-004',
    name: "Brocha de calidad forceman 2″.",
    sku: "011384",
    description: "Brocha 2″.",
    priceRetail: 1260,
    priceWholesale: 960,
    imageUrl: "/productos/011384-Brocha-de-calidad-forceman-2.jpg",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-005',
    name: "Brocha de calidad forceman 1 1/2″.",
    sku: "011383",
    description: "Brocha 1 1/2″.",
    priceRetail: 990,
    priceWholesale: 720,
    imageUrl: "/productos/011383-Brocha-de-calidad-forceman-1-medio.jpg",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-006',
    name: "Brocha de calidad forceman 1″.",
    sku: "011382",
    description: "Brocha 1″.", // <--- AQUÍ estaba el error, ya lo arreglé con el símbolo ″
    priceRetail: 680,
    priceWholesale: 480,
    imageUrl: "/productos/011382-Brocha-de-calidad-Forceman-1.jpg",
    category: "Brocha, Herramientas"
  },

    {
    id: 'bh-007',
    name: "Brocha de calidad Forceman 3/4″",
    sku: "011381",
    description: "Brocha 3/4″.",
    priceRetail: 730,
    priceWholesale: 430,
    imageUrl: "/productos/011381-Brocha-de-calidad-Forceman-3-cuarto.jpg",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-008',
    name: "Brocha de calidad Forceman 1/2″",
    sku: "011380",
    description: "Brocha de 1/2″.",
    priceRetail: 500,
    priceWholesale: 300,
    imageUrl: "/productos/011380-Brocha-de-calidad-Forceman-media,jpg",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-009',
    name: "Brocha cafe de 4″.",
    sku: "011317",
    description: "Brocha cafe de 4″.",
    priceRetail: 990,
    priceWholesale: 780,
    imageUrl: "/productos/011317-Brocha-cafe-de-4.jpg",
    category: "Brocha, Herramientas"
  },

    {
    id: 'bh-010',
    name: "Brocha cafe de 3″",
    sku: "011316",
    description: "Brocha cafe de 3″.",
    priceRetail: 990,
    priceWholesale: 700,
    imageUrl: "/productos/011316-Brocha-cafe-de-3.jpg",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-011',
    name: "Brocha cafe de 2.5″",
    sku: "011315",
    description: "Brocha cafe de 2.5″.",
    priceRetail: 990,
    priceWholesale: 600,
    imageUrl: "/productos/011315-Brocha-cafe-de-2.5.jpg",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-012',
    name: "Brocha cafe de 1/2",
    sku: "011310",
    description: "Brocha cafe de 1/2.",
    priceRetail: 340,
    priceWholesale: 140,
    imageUrl: "/productos/011310-Brocha-cafe de-media.jpg",
    category: "Brocha, Herramientas"
  },

  // --- RODILLO Y HERRAMIENTAS ---
    {
    id: 'ro-001',
    name: "Rodillo Chiporro 20cm",
    sku: "011181",
    description: "Rodillo Chiporro 20cm.",
    priceRetail: 2000,
    priceWholesale: 1860,
    imageUrl: "https://images.unsplash.com/photo-1586864387789-628af9de87e3?auto=format&fit=crop&q=80&w=800",
    category: "Rodillo, Herramientas"
  },
  {
    id: 'co-002',
    name: "Huincha de Medir 5m Profesional",
    sku: "HUI-005-PRO",
    description: "Cinta ancha con revestimiento de nylon, punta magnética y freno automático.",
    priceRetail: 4500,
    priceWholesale: 2990,
    imageUrl: "https://images.unsplash.com/photo-1566937169390-7be4c63b8a0e?auto=format&fit=crop&q=80&w=800",
    category: "Construcción y Obra Gruesa"
  },
  {
    id: 'co-003',
    name: "Casco Seguridad Amarillo Tipo I",
    sku: "CAS-SEG-AMA",
    description: "Suspensión rachet 4 puntas. Certificación ANSI/ISEA Z89.1.",
    priceRetail: 5900,
    priceWholesale: 4500,
    imageUrl: "https://images.unsplash.com/photo-1547477341-35b8cb46c05d?auto=format&fit=crop&q=80&w=800",
    category: "Construcción y Obra Gruesa"
  },
    {
    id: 'co-004',
    name: "Juego de Llaves Combinadas",
    sku: "SET-LLAVES-10",
    description: "Acero Cromo Vanadio. Set de 10 piezas milimétricas.",
    priceRetail: 18500,
    priceWholesale: 15990,
    imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=800",
    category: "Construcción y Obra Gruesa"
  }
];

// --- CONSTRUCCIÓN ---
