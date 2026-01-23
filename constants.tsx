import { Product, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Nosotros', href: '#nosotros' },
];

// --- DATOS DE CONTACTO ---
export const CONTACT_PHONE = "56920648577";
export const CONTACT_PHONE_DISPLAY = "+56 9 2064 8577";
export const CONTACT_EMAIL = "ventas@fycferreteria.cl";
export const CONTACT_ADDRESS = "Av. Independencia 1253, Puente Alto";
export const CONTACT_MAP_URL = "https://maps.google.com/?q=Av.+Independencia+1253,+Puente+Alto";

// --- HORARIOS ---
export const BUSINESS_HOURS = [
  { day: "Lunes a Viernes", hours: "08:30 - 20:00 hrs" },
  { day: "Sábados", hours: "09:00 - 18:00 hrs" },
  { day: "Domingos", hours: "10:00 - 14:00 hrs" }
];

// CATEGORÍAS
export const CATEGORIES = [
  "Todas",
  "Brocha, Herramientas",
  "Gasfitería",
  "Pinturas y Terminaciones",
  "Construcción y Obra Gruesa"
];

// ==========================================
// BASE DE DATOS DE PRODUCTOS
// ==========================================
export const PRODUCTS: Product[] = [
  // --- BROCHA FORCEMAN (CALIDAD PREMIUM = 5.0 / 4.9) ---
  {
    id: 'bh-001',
    name: "Brocha de calidad forceman 4″.",
    sku: "011387",
    description: "Brocha 4″.",
    priceRetail: 1900,
    priceWholesale: 1620,
    imageUrl: "/productos/011387-brocha-forceman-4-v2.jpg",
    category: "Brocha, Herramientas",
    rating: 5.0
  },
  {
    id: 'bh-002',
    name: "Brocha de calidad forceman 3″.",
    sku: "011386",
    description: "Brocha 3″.",
    priceRetail: 1500,
    priceWholesale: 1300,
    imageUrl: "/productos/011386-Brocha-de-calidad-forceman-3.jpg",
    category: "Brocha, Herramientas",
    rating: 4.9
  },
  {
    id: 'bh-003',
    name: "Brocha de calidad forceman 2 1/2″.",
    sku: "011385",
    description: "Brocha 2 1/2″.",
    priceRetail: 1450,
    priceWholesale: 1150,
    imageUrl: "/productos/011385-Brocha-de-calidad-forceman-2-medio.jpg",
    category: "Brocha, Herramientas",
    rating: 4.8
  },
  {
    id: 'bh-004',
    name: "Brocha de calidad forceman 2″.",
    sku: "011384",
    description: "Brocha 2″.",
    priceRetail: 1260,
    priceWholesale: 960,
    imageUrl: "/productos/011384-Brocha-de-calidad-forceman-2.jpg",
    category: "Brocha, Herramientas",
    rating: 5.0
  },
  {
    id: 'bh-005',
    name: "Brocha de calidad forceman 1 1/2″.",
    sku: "011383",
    description: "Brocha 1 1/2″.",
    priceRetail: 990,
    priceWholesale: 720,
    imageUrl: "/productos/011383-Brocha-de-calidad-forceman-1-medio.jpg",
    category: "Brocha, Herramientas",
    rating: 4.7
  },
  {
    id: 'bh-006',
    name: "Brocha de calidad forceman 1″.",
    sku: "011382",
    description: "Brocha 1″.",
    priceRetail: 680,
    priceWholesale: 480,
    imageUrl: "/productos/011382-Brocha-de-calidad-Forceman-1.jpg",
    category: "Brocha, Herramientas",
    rating: 4.9
  },
  {
    id: 'bh-007',
    name: "Brocha de calidad Forceman 3/4″",
    sku: "011381",
    description: "Brocha 3/4″.",
    priceRetail: 730,
    priceWholesale: 430,
    imageUrl: "/productos/011381-Brocha-de-calidad-Forceman-3-cuarto.jpg",
    category: "Brocha, Herramientas",
    rating: 4.8
  },
  {
    id: 'bh-008',
    name: "Brocha de calidad Forceman 1/2″",
    sku: "011380",
    description: "Brocha de 1/2″.",
    priceRetail: 500,
    priceWholesale: 300,
    imageUrl: "/productos/011380-Brocha-de-calidad-Forceman-media.jpg",
    category: "Brocha, Herramientas",
    rating: 5.0
  },

  // --- BROCHAS CAFÉ (ECONÓMICA = 4.4 / 4.5) ---
  {
    id: 'bh-009',
    name: "Brocha cafe de 4″.",
    sku: "011317",
    description: "Brocha cafe de 4″.",
    priceRetail: 990,
    priceWholesale: 780,
    imageUrl: "/productos/011317-Brocha-cafe-de-4.jpg",
    category: "Brocha, Herramientas",
    rating: 4.4 // ⭐ Aquí se notará el cambio
  },
  {
    id: 'bh-010',
    name: "Brocha cafe de 3″",
    sku: "011316",
    description: "Brocha cafe de 3″.",
    priceRetail: 990,
    priceWholesale: 700,
    imageUrl: "/productos/011316-Brocha-cafe-de-3.jpg",
    category: "Brocha, Herramientas",
    rating: 4.5
  },
  {
    id: 'bh-011',
    name: "Brocha cafe de 2.5″",
    sku: "011315",
    description: "Brocha cafe de 2.5″.",
    priceRetail: 990,
    priceWholesale: 600,
    imageUrl: "/productos/011315-Brocha-cafe-de-2.5.jpg",
    category: "Brocha, Herramientas",
    rating: 4.3
  },
  {
    id: 'bh-012',
    name: "Brocha cafe de 1/2",
    sku: "011310",
    description: "Brocha cafe de 1/2.",
    priceRetail: 340,
    priceWholesale: 140,
    imageUrl: "/productos/011310-Brocha-cafe-de-media.jpg",
    category: "Brocha, Herramientas",
    rating: 4.2
  },

  // --- RODILLO - HERRAMIENTAS
    {
    id: 'rh-001',
    name: "Rodillo Chiporro 20cm",
    sku: "011181",
    description: "Rodillo Chiporro 20cm.",
    priceRetail: 2000,
    priceWholesale: 1860,
    imageUrl: "/productos/011181-Rodillo-Chiporro-20cm.jpg",
    category: "Rodillo, Herramientas",
    rating: 4.7
  },

  // --- MARTILLOS - HERRAMIENTAS  
  {
    id: 'mh-001',
    name: "Martillo Peña forjado 1lb",
    sku: "070131",
    description: "Martillo Peña forjado 1lb.",
    priceRetail: 2100,
    priceWholesale: 1500,
    imageUrl: "/productos/070131-Martillo-Peña-forjado-1lb.jpg",
    category: "Martillo, Herramientas",
    rating: 4.9
  },
  {
    id: 'mh-002',
    name: "Martillo Peña forjado 1.5lb",
    sku: "070129",
    description: "Martillo Peña forjado 1.5lb.",
    priceRetail: 4000,
    priceWholesale: 3750,
    imageUrl: "/productos/070129-Martillo-Peña-forjado-1.5lb.jpg",
    category: "Martillo, Herramientas",
    rating: 5.0
  },
  {
    id: 'mh-003',
    name: "Martillo mecanico 300g",
    sku: "070122",
    description: "Martillo mecanico 300g.",
    priceRetail: 1990,
    priceWholesale: 1760,
    imageUrl: "/productos/070122-Martillo-mecanico-300g.jpg",
    category: "Martillo, Herramientas",
    rating: 4.8
  },
  {
    id: 'mh-004',
    name: "Martillo mecanico 200g",
    sku: "070121",
    description: "Martillo mecanico 200g.",
    priceRetail: 1500,
    priceWholesale: 1350,
    imageUrl: "/productos/070121-Martillo-mecanico-200g.jpg",
    category: "Martillo, Herramientas",
    rating: 4.8
  },
  {
    id: 'mh-005',
    name: "Martillo mecanico 100g",
    sku: "070120",
    description: "Martillo mecanico 100g.",
    priceRetail: 1490,
    priceWholesale: 1190,
    imageUrl: "/productos/070120-Martillo-mecanico-100g.jpg",
    category: "Martillo, Herramientas",
    rating: 4.8
  },
  {
    id: 'mh-006',
    name: "Martillo con mango de fibra forjado 25mm",
    sku: "070112",
    description: "Martillo con mango de fibra forjado 25mm.",
    priceRetail: 3500,
    priceWholesale: 3300,
    imageUrl: "/productos/070112-Martillo-con-mango-de-fibra-forjado-25mm.jpg",
    category: "Martillo, Herramientas",
    rating: 4.8
  },
];

// --- OTROS PRODUCTOS ---
