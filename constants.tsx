
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
    imageUrl: "/011387-brocha-forceman-4.png",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-002',
    name: "Brocha de calidad forceman 3″.",
    sku: "011386",
    description: "Brocha 3″.",
    priceRetail: 1500,
    priceWholesale: 1300,
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-003',
    name: "Brocha de calidad forceman 2 1/2″.",
    sku: "011385",
    description: "Brocha 2 1/2″.",
    priceRetail: 1450,
    priceWholesale: 1150,
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=800",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-004',
    name: "Brocha de calidad forceman 2″.",
    sku: "011384",
    description: "Brocha 2″.",
    priceRetail: 1260,
    priceWholesale: 960,
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=800",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-005',
    name: "Brocha de calidad forceman 1 1/2″.",
    sku: "011383",
    description: "Brocha 1 1/2″.",
    priceRetail: 990,
    priceWholesale: 720,
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=800",
    category: "Brocha, Herramientas"
  },
  {
    id: 'bh-006',
    name: "Brocha de calidad forceman 1″.",
    sku: "011382",
    description: "Brocha 1″.", // <--- AQUÍ estaba el error, ya lo arreglé con el símbolo ″
    priceRetail: 680,
    priceWholesale: 480,
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=800",
    category: "Brocha, Herramientas"
  },

  // --- GASFITERÍA (FONTANERÍA) ---
  {
    id: 'ga-001',
    name: "Llave Stilson 12\" Uso Pesado",
    sku: "STI-012-HEAVY",
    description: "Cuerpo de hierro fundido, mordazas de acero forjado. Indispensable para cañerías.",
    priceRetail: 12900,
    priceWholesale: 9900,
    imageUrl: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800",
    category: "Gasfitería"
  },
  {
    id: 'ga-002',
    name: "Pack 10 Codos PVC Hidráulico 20mm",
    sku: "PVC-COD-20",
    description: "Codos de 90 grados cementar, clase 10. Certificados.",
    priceRetail: 2500,
    priceWholesale: 1800,
    imageUrl: "https://images.unsplash.com/photo-1610515152203-d6c29219602f?auto=format&fit=crop&q=80&w=800",
    category: "Gasfitería"
  },
  {
    id: 'ga-003',
    name: "Llave de Paso Gas 1/2\" HE-HE",
    sku: "VALV-GAS-12",
    description: "Válvula de bola con manilla amarilla, certificada SEC para gas licuado/natural.",
    priceRetail: 4500,
    priceWholesale: 3500,
    imageUrl: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800",
    category: "Gasfitería"
  },

  // --- PINTURAS ---
  {
    id: 'pi-001',
    name: "Tineta Esmalte al Agua Blanco",
    sku: "PIN-ESM-TIN",
    description: "Esmalte semibrillo lavable, alto poder cubritivo. Interior y Exterior.",
    priceRetail: 42900,
    priceWholesale: 38500,
    imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800",
    category: "Pinturas y Terminaciones"
  },
  {
    id: 'pi-002',
    name: "Rodillo Chiporro Natural 18cm",
    sku: "ROD-CHI-18",
    description: "Ideal para superficies rugosas y estuco. Incluye mango ergonómico.",
    priceRetail: 3500,
    priceWholesale: 2800,
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
    category: "Pinturas y Terminaciones"
  },
  {
    id: 'pi-003',
    name: "Pasta Muro Interior 1 Galón",
    sku: "PAS-MUR-GAL",
    description: "Para alisar superficies de hormigón, yeso y ladrillo. Secado rápido.",
    priceRetail: 8500,
    priceWholesale: 6900,
    imageUrl: "https://images.unsplash.com/photo-1595414440701-da000c40cf0c?auto=format&fit=crop&q=80&w=800",
    category: "Pinturas y Terminaciones"
  },

  // --- CONSTRUCCIÓN ---
  {
    id: 'co-001',
    name: "Martillo Carpintero 20oz",
    sku: "MAR-20-FIB",
    description: "Mango de fibra de vidrio absorbe impactos. Cabeza pulida acero carbono.",
    priceRetail: 8900,
    priceWholesale: 6990,
    imageUrl: "https://images.unsplash.com/photo-1586864387789-628af9de87e3?auto=format&fit=crop&q=80&w=800",
    category: "Construcción y Obra Gruesa"
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
