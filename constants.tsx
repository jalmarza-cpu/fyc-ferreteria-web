
import { Product, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Nosotros', href: '#nosotros' },
];

export const CONTACT_PHONE = "56920648577";
export const CONTACT_PHONE_DISPLAY = "+56 9 2064 8577";
export const CONTACT_EMAIL = "ventas@fycferreteria.cl";
export const CONTACT_ADDRESS = "Av. Independencia 1253, Puente Alto, Santiago, Región Metropolitana";
export const CONTACT_MAP_URL = "https://goo.gl/maps/Q3uBZYgN6e73mX1K6";
export const BUSINESS_HOURS = [
  { day: "Lunes a Viernes", hours: "09:30 - 18:30" },
  { day: "Sábado", hours: "10:00 - 14:00" },
  { day: "Domingo", hours: "Cerrado" }
];

// CATEGORÍAS (Terminología Chilena)
export const CATEGORIES = [
  "Todas",
  "Herramientas Eléctricas",
  "Gasfitería", // Antes Fontanería
  "Pinturas y Terminaciones",
  "Construcción y Obra Gruesa"
];

// ==========================================
// BASE DE DATOS DE PRODUCTOS
// ==========================================
export const PRODUCTS: Product[] = [
  // --- ALICATES ---
  {
    id: 'prod-001',
    name: "Alicate Ford 8\"",
    sku: "070323",
    description: "Alicate tipo Ford de 8 pulgadas, alta resistencia y agarre.",
    priceRetail: 9500,
    priceWholesale: 7200,
    imageUrl: "Alicates/070323-Alicate-Ford-8.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: 'prod-002',
    name: "Alicate Universal 7\"",
    sku: "070340",
    description: "Alicate universal de acero forjado Cromo Vanadio ideal para múltiples tareas.",
    priceRetail: 2900,
    priceWholesale: 2100,
    imageUrl: "Alicates/070340-Alicate-Universal-6.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: 'prod-003',
    name: "Alicate Cortante 8\"",
    sku: "070346",
    description: "Alicate de corte diagonal reforzado para cortes precisos en obra.",
    priceRetail: 9900,
    priceWholesale: 7800,
    imageUrl: "Alicates/070346-Alicate Cortante-8.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: 'prod-004',
    name: "Alicate Multiuso HS-7004",
    sku: "070360",
    description: "Alicate pelacables multifuncional crimpeador profesional.",
    priceRetail: 12500,
    priceWholesale: 9900,
    imageUrl: "Alicates/070360-Alicate-Multiuso-HS7004.jpg",
    category: "Herramientas Manuales"
  },

  // --- AMARRAS ---
  {
    id: 'prod-005',
    name: "Amarra Plástica 150×3.6mm Blancas (Bolsa 100u)",
    sku: "120300",
    description: "Pack de 100 amarras de nylon de alta resistencia a la tensión.",
    priceRetail: 1500,
    priceWholesale: 990,
    imageUrl: "Amarras/120300-Amarra-150x3.6mm-blancas-bolsas-100u.jpg",
    category: "Fijaciones"
  },

  // --- BROCHAS ---
  {
    id: 'prod-006',
    name: "Brocha Café 1/2\"",
    sku: "011310",
    description: "Brocha de cerdas mixtas, tamaño media pulgada. Ideal para detalles.",
    priceRetail: 340,
    priceWholesale: 250,
    imageUrl: "Brochas/011310-Brocha-cafe-de-media.jpg",
    category: "Pinturas y Terminaciones"
  },
  {
    id: 'prod-006b',
    name: "Brocha Café 2.5\"",
    sku: "011315",
    description: "Brocha de cerdas mixtas, 2.5 pulgadas. Mayor cobertura.",
    priceRetail: 990,
    priceWholesale: 790,
    imageUrl: "Brochas/011315-Brocha-cafe-de-2.5.jpg",
    category: "Pinturas y Terminaciones"
  },
  {
    id: 'prod-006c',
    name: "Brocha Café 3\"",
    sku: "011316",
    description: "Brocha de cerdas mixtas, 3 pulgadas. Ideal superficies medianas.",
    priceRetail: 990,
    priceWholesale: 790,
    imageUrl: "Brochas/011316-Brocha-cafe-de-3.jpg",
    category: "Pinturas y Terminaciones"
  },
  {
    id: 'prod-006d',
    name: "Brocha Café 4\"",
    sku: "011317",
    description: "Brocha de cerdas mixtas, 4 pulgadas. Máximo rendimiento.",
    priceRetail: 990,
    priceWholesale: 790,
    imageUrl: "Brochas/011317-Brocha-cafe-de-4.jpg",
    category: "Pinturas y Terminaciones"
  },
  {
    id: 'prod-007',
    name: "Brocha Forceman 3\"",
    sku: "011386",
    description: "Brocha calidad profesional Forceman. Especial pintura de precisión.",
    priceRetail: 1500,
    priceWholesale: 1200,
    imageUrl: "Brochas/011386-Brocha-de-calidad-forceman-3.jpg",
    category: "Pinturas y Terminaciones"
  },
  {
    id: 'prod-008',
    name: "Brocha Forceman 4\" V2",
    sku: "011387",
    description: "Brocha ultra ancha de 4 pulgadas para alto rendimiento y cobertura.",
    priceRetail: 1900,
    priceWholesale: 1500,
    imageUrl: "Brochas/011387-brocha-forceman-4-v2.jpg",
    category: "Pinturas y Terminaciones"
  },

  // --- MARTILLOS ---
  {
    id: 'prod-009',
    name: "Martillo Fibra Forjado 25mm",
    sku: "070112",
    description: "Martillo carpintero con mango de fibra de vidrio y cabeza forjada.",
    priceRetail: 6900,
    priceWholesale: 5500,
    imageUrl: "Martillos/070112-Martillo-con-mango-de-fibra-forjado-25mm.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: 'prod-010',
    name: "Martillo Mecánico 300g",
    sku: "070122",
    description: "Martillo tipo mecánico de 300 gramos, balance y durabilidad garantizados.",
    priceRetail: 4500,
    priceWholesale: 3200,
    imageUrl: "Martillos/070122-Martillo-mecanico-300g.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: 'prod-011',
    name: "Martillo Peña Forjado 1.5 LB",
    sku: "070129",
    description: "Martillo de peña 24oz americano, forjado en acero de alto impacto.",
    priceRetail: 7500,
    priceWholesale: 5900,
    imageUrl: "Martillos/070129-Martillo-Pena-forjado-1ymedialb.jpg",
    category: "Herramientas Manuales"
  },

  // --- RODILLOS ---
  {
    id: 'prod-012',
    name: "Rodillo Chiporro Natural 20cm",
    sku: "011181",
    description: "Rodillo de alto poder cubritivo natural para superficies rugosas y estucos.",
    priceRetail: 3900,
    priceWholesale: 2800,
    imageUrl: "Rodillos/011181-Rodillo-Chiporro-20cm.jpg",
    category: "Pinturas y Terminaciones"
  }
];
