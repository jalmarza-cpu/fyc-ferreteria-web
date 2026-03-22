
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

// CATEGORÍAS (Estándar del Proveedor — sincronizadas con Supabase y Admin)
export const CATEGORIES = [
  "Todas",
  "Basurero",
  "Canalización",
  "Cielo falso",
  "Cintas",
  "Electricidad",
  "Extractores de Aire",
  "Grifería",
  "Herramientas",
  "Iluminación LED",
  "Maquinaria",
  "Selladora",
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
    priceRetail: 2500,
    priceWholesale: 2170,
    imageUrl: "Alicates/070323-Alicate-Ford-8.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: 'prod-002',
    name: "Alicate Universal 7\"",
    sku: "070340",
    description: "Alicate universal de acero forjado Cromo Vanadio ideal para múltiples tareas.",
    priceRetail: 2000,
    priceWholesale: 1800,
    imageUrl: "Alicates/070340-Alicate-Universal-6.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: 'prod-003',
    name: "Alicate Cortante 8\"",
    sku: "070346",
    description: "Alicate de corte diagonal reforzado para cortes precisos en obra.",
    priceRetail: 2500,
    priceWholesale: 2250,
    imageUrl: "Alicates/070346-Alicate Cortante-8.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: 'prod-004',
    name: "Alicate Multiuso HS-7004",
    sku: "070360",
    description: "Alicate pelacables multifuncional crimpeador profesional.",
    priceRetail: 3000,
    priceWholesale: 2700,
    imageUrl: "Alicates/070360-Alicate-Multiuso-HS7004.jpg",
    category: "Herramientas Manuales"
  },

  // --- AMARRAS ---
  {
    id: 'prod-005',
    name: "Amarra Plástica 150×3.6mm Blancas (Bolsa 100u)",
    sku: "120300",
    description: "Pack de 100 amarras de nylon de alta resistencia a la tensión.",
    priceRetail: 1190,
    priceWholesale: 900,
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
    priceWholesale: 140,
    imageUrl: "Brochas/011310-Brocha-cafe-de-media.jpg",
    category: "Revestimientos"
  },
  {
    id: 'prod-006b',
    name: "Brocha Café 2.5\"",
    sku: "011315",
    description: "Brocha de cerdas mixtas, 2.5 pulgadas. Mayor cobertura.",
    priceRetail: 990,
    priceWholesale: 600,
    imageUrl: "Brochas/011315-Brocha-cafe-de-2.5.jpg",
    category: "Revestimientos"
  },
  {
    id: 'prod-006c',
    name: "Brocha Café 3\"",
    sku: "011316",
    description: "Brocha de cerdas mixtas, 3 pulgadas. Ideal superficies medianas.",
    priceRetail: 990,
    priceWholesale: 700,
    imageUrl: "Brochas/011316-Brocha-cafe-de-3.jpg",
    category: "Revestimientos"
  },
  {
    id: 'prod-006d',
    name: "Brocha Café 4\"",
    sku: "011317",
    description: "Brocha de cerdas mixtas, 4 pulgadas. Máximo rendimiento.",
    priceRetail: 990,
    priceWholesale: 780,
    imageUrl: "Brochas/011317-Brocha-cafe-de-4.jpg",
    category: "Revestimientos"
  },
  {
    id: 'prod-007',
    name: "Brocha Forceman 3\"",
    sku: "011386",
    description: "Brocha calidad profesional Forceman. Especial pintura de precisión.",
    priceRetail: 1500,
    priceWholesale: 1300,
    imageUrl: "Brochas/011386-Brocha-de-calidad-forceman-3.jpg",
    category: "Revestimientos"
  },
  {
    id: 'prod-008',
    name: "Brocha Forceman 4\" V2",
    sku: "011387",
    description: "Brocha ultra ancha de 4 pulgadas para alto rendimiento y cobertura.",
    priceRetail: 1900,
    priceWholesale: 1300,
    imageUrl: "Brochas/011387-brocha-forceman-4-v2.jpg",
    category: "Revestimientos"
  },

  {
    id: "prod-126",
    name: "Martillo mecánico 100g",
    sku: "070120",
    description: "Martillo mecánico 100g para uso profesional.",
    priceRetail: 1490,
    priceWholesale: 1190,
    imageUrl: "Martillos/070120.jpg",
    category: "Herramientas Manuales"
  },

  // --- MARTILLOS ---
  {
    id: 'prod-009',
    name: "Martillo Fibra Forjado 25mm",
    sku: "070112",
    description: "Martillo carpintero con mango de fibra de vidrio y cabeza forjada.",
    priceRetail: 3500,
    priceWholesale: 3300,
    imageUrl: "Martillos/070112-Martillo-con-mango-de-fibra-forjado-25mm.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: 'prod-010',
    name: "Martillo Mecánico 300g",
    sku: "070122",
    description: "Martillo tipo mecánico de 300 gramos, balance y durabilidad garantizados.",
    priceRetail: 1990,
    priceWholesale: 1760,
    imageUrl: "Martillos/070122-Martillo-mecanico-300g.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: 'prod-011',
    name: "Martillo Peña Forjado 1.5 LB",
    sku: "070129",
    description: "Martillo de peña 24oz americano, forjado en acero de alto impacto.",
    priceRetail: 4000,
    priceWholesale: 3750,
    imageUrl: "Martillos/070129-Martillo-Pena-forjado-1ymedialb.jpg",
    category: "Herramientas Manuales"
  },

  // --- RODILLOS ---
  {
    id: 'prod-012',
    name: "Rodillo Chiporro Natural 20cm",
    sku: "011181",
    description: "Rodillo de alto poder cubritivo natural para superficies rugosas y estucos.",
    priceRetail: 2000,
    priceWholesale: 1860,
    imageUrl: "Rodillos/011181-Rodillo-Chiporro-20cm.jpg",
    category: "Revestimientos"
  },

  // --- ILUMINACIÓN ---
  // Ampolletas de Alta Potencia
  {
    id: 'prod-013',
    name: "Ampolleta de Alta Potencia 150w",
    sku: "160027",
    description: "Ampolleta LED de alta potencia 150W para máxima iluminación en exteriores y obras.",
    priceRetail: 32170,
    priceWholesale: 31870,
    imageUrl: "Iluminacion/160027.jpg",
    category: "Electricidad"
  },
  {
    id: 'prod-013b',
    name: "Ampolleta de Alta Potencia 100w",
    sku: "160026",
    description: "Ampolleta LED de alta potencia 100W, eficiente y duradera.",
    priceRetail: 16500,
    priceWholesale: 15500,
    imageUrl: "Iluminacion/160026.jpg",
    category: "Electricidad"
  },
  {
    id: 'prod-013c',
    name: "Ampolleta de Alta Potencia 80w",
    sku: "160025",
    description: "Ampolleta LED de 80W, excelente relación consumo e iluminación.",
    priceRetail: 11500,
    priceWholesale: 10500,
    imageUrl: "Iluminacion/160025.jpg",
    category: "Electricidad"
  },

  // Iluminación Industrial (UFO)
  {
    id: 'prod-014',
    name: "Foco UFO LED Industrial 100w",
    sku: "120482",
    description: "Foco UFO 100W, alta eficiencia lumínica para galpones e industria.",
    priceRetail: 30000,
    priceWholesale: 28500,
    imageUrl: "Iluminacion/120482.jpg",
    category: "Electricidad"
  },
  {
    id: 'prod-014b',
    name: "Foco UFO LED Industrial 200w",
    sku: "120483",
    description: "Foco UFO 200W, máxima potencia para iluminación de grandes superficies.",
    priceRetail: 45000,
    priceWholesale: 42000,
    imageUrl: "Iluminacion/120483.jpg",
    category: "Electricidad"
  },

  // Proyectores LED
  {
    id: 'prod-015',
    name: "Proyector LED 100w c/sensor",
    sku: "160100",
    description: "Proyector de 100W con sensor de movimiento, ideal para seguridad y exteriores.",
    priceRetail: 13500,
    priceWholesale: 12500,
    imageUrl: "Iluminacion/160100.jpg",
    category: "Electricidad"
  },
  {
    id: 'prod-015b',
    name: "Proyector LED 50w c/sensor",
    sku: "160098",
    description: "Proyector de 50W con sensor de movimiento automático, compacto y eficiente.",
    priceRetail: 9500,
    priceWholesale: 8500,
    imageUrl: "Iluminacion/160098.jpg",
    category: "Electricidad"
  },

  // --- MEDICIÓN ---
  {
    id: 'prod-016',
    name: "Nivel de Aluminio 48 Pulgadas",
    sku: "040156",
    description: "Nivel de aluminio profesional de 48\" con burbujas de alta visibilidad.",
    priceRetail: 12500,
    priceWholesale: 8500,
    imageUrl: "Medicion/040156.jpg",
    category: "Medición"
  },
  {
    id: 'prod-016b',
    name: "Nivel Aluminio 48\" Profesional",
    sku: "011081",
    description: "Nivel de aluminio profesional de 48 pulgadas, alta exactitud para obras.",
    priceRetail: 5550,
    priceWholesale: 5250,
    imageUrl: "Medicion/011081.jpg",
    category: "Medición"
  },
  {
    id: 'prod-017',
    name: "Nivel de Aluminio 24 Pulgadas",
    sku: "040153",
    description: "Nivel de aluminio compacto de 24\", resistente y preciso para trabajos rápidos.",
    priceRetail: 8900,
    priceWholesale: 5900,
    imageUrl: "Medicion/040153.jpg",
    category: "Medición"
  },

  // --- HERRAMIENTAS ADICIONALES ---
  {
    id: 'prod-027',
    name: "Prensa F 80x500mm Reforzada",
    sku: "010834",
    description: "Prensa tipo F reforzada tamaño 80x500mm. Ideal para carpintería pesada.",
    priceRetail: 18500,
    priceWholesale: 18000,
    imageUrl: "Herramientas/010834.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: 'prod-028',
    name: "Plana Punta Cuadrada 8\"",
    sku: "011733",
    description: "Plana albañil de punta cuadrada 8 pulgadas para terminaciones perfectas.",
    priceRetail: 2000,
    priceWholesale: 1880,
    imageUrl: "Herramientas/011733.jpg",
    category: "Herramientas Manuales"
  },

  // --- REVESTIMIENTO Y TERMINACIONES ---
  {
    id: 'prod-018',
    name: "Piso Flotante Serie LH Alto Tráfico",
    sku: "LH7020",
    description: "Piso flotante resistente al desgaste, Serie LH, ideal para proyectos habitacionales y comerciales.",
    priceRetail: 23000,
    priceWholesale: 20890,
    imageUrl: "Revestimiento/LH7020.jpg",
    category: "Revestimientos"
  },
  {
    id: 'prod-019',
    name: "Plancha UV Tipo Mármol",
    sku: "1671",
    description: "Plancha con recubrimiento UV decorativa, elegante y fácil de instalar.",
    priceRetail: 25000,
    priceWholesale: 17990,
    imageUrl: "Revestimiento/1671.jpg",
    category: "Revestimientos"
  },
  {
    id: 'prod-020',
    name: "Planchas OSB 11.1mm",
    sku: "OSB-11.1",
    description: "Planchas OSB estructurales de 11.1mm para ampliaciones y tabiquería general.",
    priceRetail: 17890,
    priceWholesale: 16890,
    imageUrl: "Revestimiento/osb-11.jpg",
    category: "Revestimientos"
  },
  {
    id: 'prod-021',
    name: "Metal Siding Gris",
    sku: "SIDING-GRIS",
    description: "Revestimiento de metal siding en color gris. Excelente resistencia al exterior.",
    priceRetail: 18990,
    priceWholesale: 16990,
    imageUrl: "Revestimiento/metal-siding.jpg",
    category: "Revestimientos"
  },
  {
    id: 'prod-021b',
    name: "Metal Siding Madera",
    sku: "SIDING-MADERA",
    description: "Revestimiento de metal siding tipo madera. Terminación estética y duradera.",
    priceRetail: 18990,
    priceWholesale: 16990,
    imageUrl: "Revestimiento/metal-siding-madera.jpg",
    category: "Revestimientos"
  },
  {
    id: 'prod-021c',
    name: "Metal Siding Blanco",
    sku: "SIDING-BLANCO",
    description: "Revestimiento de metal siding en color blanco. Ilumina tus fachadas.",
    priceRetail: 18990,
    priceWholesale: 16990,
    imageUrl: "Revestimiento/metal-siding-blanco.jpg",
    category: "Revestimientos"
  },
  {
    id: 'prod-021d',
    name: "Silicona Estructural 995A",
    sku: "SIL-995A",
    description: "Silicona estructural 995A de alto rendimiento para sellados profesionales.",
    priceRetail: 2700,
    priceWholesale: 2500,
    imageUrl: "Revestimiento/silicona-estructural.jpg",
    category: "Revestimientos"
  },
  {
    id: 'prod-021e',
    name: "Esquineros y Uniones Siding",
    sku: "ESQ-UN",
    description: "Esquineros y uniones para instalación perfecta de Metal Siding.",
    priceRetail: 2990,
    priceWholesale: 2600,
    imageUrl: "Revestimiento/esquineros-uniones.jpg",
    category: "Revestimientos"
  },

  // --- GASFITERÍA ---
  {
    id: 'prod-022',
    name: "Llave Combinación Lavaplatos 30492",
    sku: "030686",
    description: "Llave de combinación para lavaplatos. Diseño clásico de alta durabilidad.",
    priceRetail: 17900,
    priceWholesale: 17500,
    imageUrl: "Gasfiteria/030686.jpg",
    category: "Gasfitería"
  },
  {
    id: 'prod-023',
    name: "Llave Lavaplatos Monomando 30940",
    sku: "030683",
    description: "Llave monomando para lavaplatos. Diseño moderno y fácil uso.",
    priceRetail: 19500,
    priceWholesale: 18900,
    imageUrl: "Gasfiteria/030683.jpg",
    category: "Gasfitería"
  },
  {
    id: 'prod-024',
    name: "Llave Tina Monomando 30495",
    sku: "030681",
    description: "Llave monomando para tina con transferencia para ducha.",
    priceRetail: 22990,
    priceWholesale: 22200,
    imageUrl: "Gasfiteria/030681.jpg",
    category: "Gasfitería"
  },
  {
    id: 'prod-025',
    name: "Llave Monomando Ducha 30496",
    sku: "030682",
    description: "Llave monomando exclusivo para ducha. Excelente control térmico.",
    priceRetail: 19960,
    priceWholesale: 19460,
    imageUrl: "Gasfiteria/030682.jpg",
    category: "Gasfitería"
  },

  // --- HERRAMIENTAS ELÉCTRICAS Y MAQUINARIA ---
  {
    id: 'prod-029',
    name: "Compresor de Aire 200L (3HP)",
    sku: "010156",
    description: "Compresor de aire industrial 200 Litros 3HP para múltiples aplicaciones pesadas.",
    priceRetail: 450000,
    priceWholesale: 425000,
    imageUrl: "HerramientasElectricas/010156.jpg",
    category: "Maquinaria"
  },
  {
    id: 'prod-030',
    name: "Compresor de Aire 100L (2.5HP)",
    sku: "010152",
    description: "Compresor de aire 100 Litros 2.5HP, versatilidad y potencia móvil.",
    priceRetail: 210000,
    priceWholesale: 195000,
    imageUrl: "HerramientasElectricas/010152.jpg",
    category: "Maquinaria"
  },
  {
    id: 'prod-031',
    name: "Prensa Hidráulica 20 Ton",
    sku: "011500",
    description: "Prensa hidráulica robusta de 20 toneladas para trabajo en maestranza.",
    priceRetail: 135000,
    priceWholesale: 128000,
    imageUrl: "HerramientasElectricas/011500.jpg",
    category: "Maquinaria"
  },

  // --- ELECTRICIDAD DE CONTROL ---
  {
    id: 'prod-032',
    name: "Tablero Eléctrico Embutido 36 Módulos",
    sku: "160505",
    description: "Tablero eléctrico de embutir de 36 módulos, amplio espacio para cableado.",
    priceRetail: 18900,
    priceWholesale: 17500,
    imageUrl: "Electricidad/160505.jpg",
    category: "Electricidad"
  },
  {
    id: 'prod-033',
    name: "Tablero Eléctrico Sobreponer 24 Módulos",
    sku: "160502",
    description: "Tablero eléctrico de sobreponer 24 módulos para instalaciones superficiales.",
    priceRetail: 14500,
    priceWholesale: 13200,
    imageUrl: "Electricidad/160502.jpg",
    category: "Electricidad"
  },

  // --- FIJACIONES Y SEGURIDAD ---
  {
    id: 'prod-034',
    name: "Kit Tarugos y Tornillos (100 unid)",
    sku: "080012",
    description: "Kit multipropósito de fijaciones. 100 unidades combinadas de tarugos y tornillos.",
    priceRetail: 2500,
    priceWholesale: 1990,
    imageUrl: "Fijaciones/080012.jpg",
    category: "Fijaciones"
  },
  {
    id: 'prod-035',
    name: "Guante Cabritilla Premium",
    sku: "090344",
    description: "Guantes de cabritilla premium. Protección y tacto para trabajos de construcción.",
    priceRetail: 2200,
    priceWholesale: 1850,
    imageUrl: "Seguridad/090344.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-100",
    name: "Amarra 200x3.6mm blancas bolsas 100u",
    sku: "120301",
    description: "Amarra 200x3.6mm blancas bolsas 100u para uso profesional.",
    priceRetail: 1390,
    priceWholesale: 1190,
    imageUrl: "Fijaciones/120301.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-101",
    name: "Amarra 250x3.6mm blancas bolsas 100u",
    sku: "120302",
    description: "Amarra 250x3.6mm blancas bolsas 100u para uso profesional.",
    priceRetail: 1690,
    priceWholesale: 1490,
    imageUrl: "Fijaciones/120302.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-102",
    name: "Amarra 300x3.6mm blancas bolsas 100u",
    sku: "120303",
    description: "Amarra 300x3.6mm blancas bolsas 100u para uso profesional.",
    priceRetail: 2150,
    priceWholesale: 1950,
    imageUrl: "Fijaciones/120303.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-103",
    name: "Amarra 350x4.8mm blancas bolsas 100u",
    sku: "120304",
    description: "Amarra 350x4.8mm blancas bolsas 100u para uso profesional.",
    priceRetail: 3350,
    priceWholesale: 3150,
    imageUrl: "Fijaciones/120304.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-104",
    name: "Amarra 400x4.8mm blancas bolsas 100u",
    sku: "120305",
    description: "Amarra 400x4.8mm blancas bolsas 100u para uso profesional.",
    priceRetail: 4300,
    priceWholesale: 3900,
    imageUrl: "Fijaciones/120305.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-105",
    name: "Amarra 500x4.8mm blancas bolsas 100u",
    sku: "120306",
    description: "Amarra 500x4.8mm blancas bolsas 100u para uso profesional.",
    priceRetail: 4550,
    priceWholesale: 4350,
    imageUrl: "Fijaciones/120306.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-106",
    name: "Set de mechas DG-W802 8pcs",
    sku: "130620",
    description: "Set de mechas DG-W802 8pcs para uso profesional.",
    priceRetail: 2000,
    priceWholesale: 2000,
    imageUrl: "Herramientas Manuales/130620.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-107",
    name: "Set de mechas DG-W502 5pcs",
    sku: "130621",
    description: "Set de mechas DG-W502 5pcs para uso profesional.",
    priceRetail: 1550,
    priceWholesale: 1350,
    imageUrl: "Herramientas Manuales/130621.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-108",
    name: "Set de brocas paleta 10-25mm 6pcs",
    sku: "130636",
    description: "Set de brocas paleta 10-25mm 6pcs para uso profesional.",
    priceRetail: 2750,
    priceWholesale: 2550,
    imageUrl: "Herramientas Manuales/130636.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-109",
    name: "Set de brocas para concreto M802 8pcs",
    sku: "130670",
    description: "Set de brocas para concreto M802 8pcs para uso profesional.",
    priceRetail: 1180,
    priceWholesale: 980,
    imageUrl: "Herramientas Manuales/130670.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-110",
    name: "Set de brocas para concreto M501 5pcs",
    sku: "130671",
    description: "Set de brocas para concreto M501 5pcs para uso profesional.",
    priceRetail: 880,
    priceWholesale: 680,
    imageUrl: "Herramientas Manuales/130671.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-111",
    name: "Set de brocas para concreto M502 5pcs",
    sku: "130672",
    description: "Set de brocas para concreto M502 5pcs para uso profesional.",
    priceRetail: 1030,
    priceWholesale: 830,
    imageUrl: "Herramientas Manuales/130672.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-112",
    name: "Set de brocas HSS 1-10mm 19pcs",
    sku: "130675",
    description: "Set de brocas HSS 1-10mm 19pcs para uso profesional.",
    priceRetail: 6130,
    priceWholesale: 5930,
    imageUrl: "Herramientas Manuales/130675.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-113",
    name: "Huincha aisladora 3/4\\\" 10YD",
    sku: "160301",
    description: "Huincha aisladora 3/4\\\" 10YD para uso profesional.",
    priceRetail: 950,
    priceWholesale: 750,
    imageUrl: "Fijaciones/160301.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-114",
    name: "Maskitape 18mm x 35mm",
    sku: "160305",
    description: "Maskitape 18mm x 35mm para uso profesional.",
    priceRetail: 830,
    priceWholesale: 630,
    imageUrl: "Fijaciones/160305.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-115",
    name: "Maskitape 36mm x 35mm",
    sku: "160307",
    description: "Maskitape 36mm x 35mm para uso profesional.",
    priceRetail: 1400,
    priceWholesale: 1200,
    imageUrl: "Fijaciones/160307.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-116",
    name: "Maskitape 48mm x 35mm",
    sku: "160308",
    description: "Maskitape 48mm x 35mm para uso profesional.",
    priceRetail: 1790,
    priceWholesale: 1590,
    imageUrl: "Fijaciones/160308.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-117",
    name: "Huincha de Embalaje 48x100mm",
    sku: "160352",
    description: "Huincha de Embalaje 48x100mm para uso profesional.",
    priceRetail: 1590,
    priceWholesale: 1390,
    imageUrl: "Fijaciones/160352.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-118",
    name: "Brocha de 2 1/2\\\"",
    sku: "011385",
    description: "Brocha de 2 1/2\\\" para uso profesional.",
    priceRetail: 1450,
    priceWholesale: 1150,
    imageUrl: "Revestimientos/011385.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-119",
    name: "Brocha de 2\\\"",
    sku: "011384",
    description: "Brocha de 2\\\" para uso profesional.",
    priceRetail: 1260,
    priceWholesale: 960,
    imageUrl: "Revestimientos/011384.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-120",
    name: "Brocha de 1 1/2\\\"",
    sku: "011383",
    description: "Brocha de 1 1/2\\\" para uso profesional.",
    priceRetail: 990,
    priceWholesale: 720,
    imageUrl: "Revestimientos/011383.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-121",
    name: "Brocha de 1\\\"",
    sku: "011382",
    description: "Brocha de 1\\\" para uso profesional.",
    priceRetail: 680,
    priceWholesale: 480,
    imageUrl: "Revestimientos/011382.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-122",
    name: "Brocha de 3/4\\\"",
    sku: "011381",
    description: "Brocha de 3/4\\\" para uso profesional.",
    priceRetail: 730,
    priceWholesale: 430,
    imageUrl: "Revestimientos/011381.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-123",
    name: "Brocha de 1/2\\\"",
    sku: "011380",
    description: "Brocha de 1/2\\\" para uso profesional.",
    priceRetail: 500,
    priceWholesale: 300,
    imageUrl: "Revestimientos/011380.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-124",
    name: "Martillo Peña forjado 1.lb",
    sku: "070131",
    description: "Martillo Peña forjado 1.lb para uso profesional.",
    priceRetail: 2500,
    priceWholesale: 2250,
    imageUrl: "Herramientas Manuales/070131.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-125",
    name: "Martillo mecánico 200g",
    sku: "070121",
    description: "Martillo mecánico 200g para uso profesional.",
    priceRetail: 1500,
    priceWholesale: 1350,
    imageUrl: "Herramientas Manuales/070121.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-126",
    name: "Martillo mecánico 100g",
    sku: "070120",
    description: "Martillo mecánico 100g para uso profesional.",
    priceRetail: 1490,
    priceWholesale: 1190,
    imageUrl: "Martillos/070120.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-127",
    name: "Alicate Universal 7\\\"",
    sku: "070341",
    description: "Alicate Universal 7\\\" para uso profesional.",
    priceRetail: 2900,
    priceWholesale: 2400,
    imageUrl: "Herramientas Manuales/070341.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-128",
    name: "Set de destornillador",
    sku: "011018",
    description: "Set de destornillador para uso profesional.",
    priceRetail: 4650,
    priceWholesale: 4350,
    imageUrl: "Herramientas Manuales/011018.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-129",
    name: "Set de punta 23031B / 31 piezas",
    sku: "011035",
    description: "Set de punta 23031B / 31 piezas para uso profesional.",
    priceRetail: 6950,
    priceWholesale: 6750,
    imageUrl: "Herramientas Manuales/011035.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-130",
    name: "Set de punta AX-21023B / 23 piezas",
    sku: "011031",
    description: "Set de punta AX-21023B / 23 piezas para uso profesional.",
    priceRetail: 4650,
    priceWholesale: 4350,
    imageUrl: "Herramientas Manuales/011031.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-131",
    name: "Set de punta AX-23018B / 18 piezas",
    sku: "011032",
    description: "Set de punta AX-23018B / 18 piezas para uso profesional.",
    priceRetail: 4580,
    priceWholesale: 4280,
    imageUrl: "Herramientas Manuales/011032.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-132",
    name: "Set de punta AX-23021 / 21 piezas",
    sku: "011033",
    description: "Set de punta AX-23021 / 21 piezas para uso profesional.",
    priceRetail: 5550,
    priceWholesale: 5250,
    imageUrl: "Herramientas Manuales/011033.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-133",
    name: "Set de punta AX-23031 / 31 piezas",
    sku: "011034",
    description: "Set de punta AX-23031 / 31 piezas para uso profesional.",
    priceRetail: 5000,
    priceWholesale: 4880,
    imageUrl: "Herramientas Manuales/011034.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-134",
    name: "Set de punta AX-24067 / 67 piezas",
    sku: "011037",
    description: "Set de punta AX-24067 / 67 piezas para uso profesional.",
    priceRetail: 4650,
    priceWholesale: 4350,
    imageUrl: "Herramientas Manuales/011037.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-135",
    name: "Set de punta AX-25016 / 16 piezas",
    sku: "011038",
    description: "Set de punta AX-25016 / 16 piezas para uso profesional.",
    priceRetail: 5550,
    priceWholesale: 5250,
    imageUrl: "Herramientas Manuales/011038.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-136",
    name: "Set de punta PJN-99149 / 10 piezas",
    sku: "011023",
    description: "Set de punta PJN-99149 / 10 piezas para uso profesional.",
    priceRetail: 1350,
    priceWholesale: 1050,
    imageUrl: "Herramientas Manuales/011023.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-137",
    name: "Set de punta PJN-99154 / 14 piezas",
    sku: "011024",
    description: "Set de punta PJN-99154 / 14 piezas para uso profesional.",
    priceRetail: 1500,
    priceWholesale: 1200,
    imageUrl: "Herramientas Manuales/011024.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-138",
    name: "Set de punta WS-1085 / 32 piezas",
    sku: "011030",
    description: "Set de punta WS-1085 / 32 piezas para uso profesional.",
    priceRetail: 5550,
    priceWholesale: 5250,
    imageUrl: "Herramientas Manuales/011030.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-139",
    name: "Set de puntas DS-70311 / 29 piezas",
    sku: "011021",
    description: "Set de puntas DS-70311 / 29 piezas para uso profesional.",
    priceRetail: 5550,
    priceWholesale: 5250,
    imageUrl: "Herramientas Manuales/011021.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-140",
    name: "Set de puntas DS-70334 / 33 piezas",
    sku: "011022",
    description: "Set de puntas DS-70334 / 33 piezas para uso profesional.",
    priceRetail: 6050,
    priceWholesale: 5850,
    imageUrl: "Herramientas Manuales/011022.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-141",
    name: "Set destornillador 6 piezas",
    sku: "011001",
    description: "Set destornillador 6 piezas para uso profesional.",
    priceRetail: 3300,
    priceWholesale: 3000,
    imageUrl: "Herramientas Manuales/011001.jpg",
    category: "Herramientas Manuales"
  },

  {
    id: "prod-200",
    name: "Escuadra de acero 12\\\"",
    sku: "011143",
    description: "Escuadra de acero 12\\\" de excelente calidad profesional.",
    priceRetail: 2340,
    priceWholesale: 2040,
    imageUrl: "CatalogoExtra/011143.jpg",
    category: "Medición"
  },
  {
    id: "prod-201",
    name: "escuadra de acero 6\\\"",
    sku: "011140",
    description: "escuadra de acero 6\\\" de excelente calidad profesional.",
    priceRetail: 1050,
    priceWholesale: 850,
    imageUrl: "CatalogoExtra/011140.jpg",
    category: "Medición"
  },
  {
    id: "prod-202",
    name: "Escuadra repisa 4x5",
    sku: "010925",
    description: "Escuadra repisa 4x5 de excelente calidad profesional.",
    priceRetail: 790,
    priceWholesale: 490,
    imageUrl: "CatalogoExtra/010925.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-203",
    name: "Escuadra repisa 5x6",
    sku: "011161",
    description: "Escuadra repisa 5x6 de excelente calidad profesional.",
    priceRetail: 810,
    priceWholesale: 510,
    imageUrl: "CatalogoExtra/011161.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-204",
    name: "Espatula de 1 1/2\\\"",
    sku: "011161",
    description: "Espatula de 1 1/2\\\" de excelente calidad profesional.",
    priceRetail: 980,
    priceWholesale: 680,
    imageUrl: "CatalogoExtra/011161.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-205",
    name: "Espatula de 1\\\"",
    sku: "011160",
    description: "Espatula de 1\\\" de excelente calidad profesional.",
    priceRetail: 800,
    priceWholesale: 500,
    imageUrl: "CatalogoExtra/011160.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-206",
    name: "Espatula de 2 1/2\\\"",
    sku: "011163",
    description: "Espatula de 2 1/2\\\" de excelente calidad profesional.",
    priceRetail: 1150,
    priceWholesale: 850,
    imageUrl: "CatalogoExtra/011163.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-207",
    name: "Espatula de 2",
    sku: "011162",
    description: "Espatula de 2 de excelente calidad profesional.",
    priceRetail: 1070,
    priceWholesale: 770,
    imageUrl: "CatalogoExtra/011162.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-208",
    name: "Espatula de 3\\\"",
    sku: "011164",
    description: "Espatula de 3\\\" de excelente calidad profesional.",
    priceRetail: 1240,
    priceWholesale: 940,
    imageUrl: "CatalogoExtra/011164.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-209",
    name: "Espatula de 4\\\"",
    sku: "011165",
    description: "Espatula de 4\\\" de excelente calidad profesional.",
    priceRetail: 1320,
    priceWholesale: 1020,
    imageUrl: "CatalogoExtra/011165.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-210",
    name: "Espatula de 5\\\"",
    sku: "011165",
    description: "Espatula de 5\\\" de excelente calidad profesional.",
    priceRetail: 1570,
    priceWholesale: 1270,
    imageUrl: "CatalogoExtra/011165.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-211",
    name: "Extractor de poleas 3\\\"",
    sku: "010660",
    description: "Extractor de poleas 3\\\" de excelente calidad profesional.",
    priceRetail: 4800,
    priceWholesale: 4500,
    imageUrl: "CatalogoExtra/010660.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-212",
    name: "Set destornillador estrella 2 piezas",
    sku: "011004",
    description: "Set destornillador estrella 2 piezas de excelente calidad profesional.",
    priceRetail: 1390,
    priceWholesale: 1090,
    imageUrl: "CatalogoExtra/011004.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-213",
    name: "Set destornillador Pin 5 piezas",
    sku: "011003",
    description: "Set destornillador Pin 5 piezas de excelente calidad profesional.",
    priceRetail: 3300,
    priceWholesale: 3000,
    imageUrl: "CatalogoExtra/011003.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-214",
    name: "Set destornillador relojero 6 piezas",
    sku: "011003",
    description: "Set destornillador relojero 6 piezas de excelente calidad profesional.",
    priceRetail: 1200,
    priceWholesale: 900,
    imageUrl: "CatalogoExtra/011003.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-215",
    name: "set destornillados JG070",
    sku: "011003",
    description: "set destornillados JG070 de excelente calidad profesional.",
    priceRetail: 1800,
    priceWholesale: 1100,
    imageUrl: "CatalogoExtra/011003.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-216",
    name: "Disco de Corte para Fierro 115mm",
    sku: "140140",
    description: "Disco de Corte para Fierro 115mm de excelente calidad profesional.",
    priceRetail: 1000,
    priceWholesale: 830,
    imageUrl: "CatalogoExtra/140140.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-217",
    name: "Disco de Corte para Fierro 180mm",
    sku: "140141",
    description: "Disco de Corte para Fierro 180mm de excelente calidad profesional.",
    priceRetail: 1790,
    priceWholesale: 1490,
    imageUrl: "CatalogoExtra/140141.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-218",
    name: "Disco Diamon Especial 115mm",
    sku: "070429",
    description: "Disco Diamon Especial 115mm de excelente calidad profesional.",
    priceRetail: 3300,
    priceWholesale: 3000,
    imageUrl: "CatalogoExtra/070429.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-219",
    name: "Disco Diamon Mojado 180mm",
    sku: "070436",
    description: "Disco Diamon Mojado 180mm de excelente calidad profesional.",
    priceRetail: 4790,
    priceWholesale: 4490,
    imageUrl: "CatalogoExtra/070436.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-220",
    name: "Disco Dn Seco 115mm",
    sku: "070430",
    description: "Disco Dn Seco 115mm de excelente calidad profesional.",
    priceRetail: 4000,
    priceWholesale: 3750,
    imageUrl: "CatalogoExtra/070430.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-221",
    name: "Hoja sierra circular 4-1/2\\\" 18 Dientes",
    sku: "140110",
    description: "Hoja sierra circular 4-1/2\\\" 18 Dientes de excelente calidad profesional.",
    priceRetail: 4000,
    priceWholesale: 3740,
    imageUrl: "CatalogoExtra/140110.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-222",
    name: "Hoja sierra circular 4-1/2\\\" 24 Dientes",
    sku: "140111",
    description: "Hoja sierra circular 4-1/2\\\" 24 Dientes de excelente calidad profesional.",
    priceRetail: 4000,
    priceWholesale: 3740,
    imageUrl: "CatalogoExtra/140111.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-223",
    name: "Hoja sierra circular 9\\\" 24 Dientes",
    sku: "140114",
    description: "Hoja sierra circular 9\\\" 24 Dientes de excelente calidad profesional.",
    priceRetail: 7000,
    priceWholesale: 6740,
    imageUrl: "CatalogoExtra/140114.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-224",
    name: "Barre Hojas Extensible R121",
    sku: "070198",
    description: "Barre Hojas Extensible R121 de excelente calidad profesional.",
    priceRetail: 3500,
    priceWholesale: 3000,
    imageUrl: "CatalogoExtra/070198.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-225",
    name: "Barre Hojas R112A",
    sku: "070199",
    description: "Barre Hojas R112A de excelente calidad profesional.",
    priceRetail: 5550,
    priceWholesale: 2250,
    imageUrl: "CatalogoExtra/070199.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-226",
    name: "Horqueta F111.",
    sku: "070190",
    description: "Horqueta F111. de excelente calidad profesional.",
    priceRetail: 6230,
    priceWholesale: 5930,
    imageUrl: "CatalogoExtra/070190.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-227",
    name: "Rastrillo R103-140D Rojo",
    sku: "070197",
    description: "Rastrillo R103-140D Rojo de excelente calidad profesional.",
    priceRetail: 2550,
    priceWholesale: 2250,
    imageUrl: "CatalogoExtra/070197.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-228",
    name: "Tijera De Jardin 8\\\"",
    sku: "070244",
    description: "Tijera De Jardin 8\\\" de excelente calidad profesional.",
    priceRetail: 2780,
    priceWholesale: 2480,
    imageUrl: "CatalogoExtra/070244.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-229",
    name: "Tijera de pasto SK606 12\\\"",
    sku: "070249",
    description: "Tijera de pasto SK606 12\\\" de excelente calidad profesional.",
    priceRetail: 6830,
    priceWholesale: 6530,
    imageUrl: "CatalogoExtra/070249.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-230",
    name: "Tijera De Uva 8\\\"",
    sku: "070243",
    description: "Tijera De Uva 8\\\" de excelente calidad profesional.",
    priceRetail: 2550,
    priceWholesale: 2250,
    imageUrl: "CatalogoExtra/070243.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-231",
    name: "Tijeras de Lata Avion 10",
    sku: "070253",
    description: "Tijeras de Lata Avion 10 de excelente calidad profesional.",
    priceRetail: 4000,
    priceWholesale: 3750,
    imageUrl: "CatalogoExtra/070253.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-232",
    name: "Tijeras De Podar 10\\\"",
    sku: "070253",
    description: "Tijeras De Podar 10\\\" de excelente calidad profesional.",
    priceRetail: 4750,
    priceWholesale: 4350,
    imageUrl: "CatalogoExtra/070253.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-233",
    name: "Llave Francesa 12\\\"",
    sku: "010413",
    description: "Llave Francesa 12\\\" de excelente calidad profesional.",
    priceRetail: 6600,
    priceWholesale: 6300,
    imageUrl: "CatalogoExtra/010413.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-234",
    name: "Llave Francesa 18\\\"",
    sku: "010415",
    description: "Llave Francesa 18\\\" de excelente calidad profesional.",
    priceRetail: 22800,
    priceWholesale: 22500,
    imageUrl: "CatalogoExtra/010415.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-235",
    name: "Llave Francesa 6\\\"",
    sku: "010410",
    description: "Llave Francesa 6\\\" de excelente calidad profesional.",
    priceRetail: 2100,
    priceWholesale: 1800,
    imageUrl: "CatalogoExtra/010410.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-236",
    name: "Extractor de poleas 4\\\"",
    sku: "010661",
    description: "Extractor de poleas 4\\\" de excelente calidad profesional.",
    priceRetail: 5650,
    priceWholesale: 5250,
    imageUrl: "CatalogoExtra/010661.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-237",
    name: "Extractor de poleas 6\\\"",
    sku: "010662",
    description: "Extractor de poleas 6\\\" de excelente calidad profesional.",
    priceRetail: 7000,
    priceWholesale: 6750,
    imageUrl: "CatalogoExtra/010662.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-238",
    name: "Extractor de poleas 8\\\"",
    sku: "010662",
    description: "Extractor de poleas 8\\\" de excelente calidad profesional.",
    priceRetail: 7600,
    priceWholesale: 7200,
    imageUrl: "CatalogoExtra/010662.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-239",
    name: "Formon suelto 1- 1/5\\\"",
    sku: "070093",
    description: "Formon suelto 1- 1/5\\\" de excelente calidad profesional.",
    priceRetail: 3600,
    priceWholesale: 3300,
    imageUrl: "CatalogoExtra/070093.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-240",
    name: "Set de formon 4 piezas",
    sku: "070093",
    description: "Set de formon 4 piezas de excelente calidad profesional.",
    priceRetail: 7650,
    priceWholesale: 7350,
    imageUrl: "CatalogoExtra/070093.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-241",
    name: "Guante albañil goma",
    sku: "011",
    description: "Guante albañil goma de excelente calidad profesional.",
    priceRetail: 1580,
    priceWholesale: 1280,
    imageUrl: "CatalogoExtra/011.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-242",
    name: "Guante de goma para aseo",
    sku: "011667",
    description: "Guante de goma para aseo de excelente calidad profesional.",
    priceRetail: 780,
    priceWholesale: 380,
    imageUrl: "CatalogoExtra/011667.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-243",
    name: "Guante Pigmentado",
    sku: "011659",
    description: "Guante Pigmentado de excelente calidad profesional.",
    priceRetail: 700,
    priceWholesale: 360,
    imageUrl: "CatalogoExtra/011659.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-244",
    name: "Guantes de cuero",
    sku: "011663",
    description: "Guantes de cuero de excelente calidad profesional.",
    priceRetail: 4000,
    priceWholesale: 3750,
    imageUrl: "CatalogoExtra/011663.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-245",
    name: "Guantes de goma azul",
    sku: "011661",
    description: "Guantes de goma azul de excelente calidad profesional.",
    priceRetail: 1320,
    priceWholesale: 1020,
    imageUrl: "CatalogoExtra/011661.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-246",
    name: "Guantes de goma negra",
    sku: "011662",
    description: "Guantes de goma negra de excelente calidad profesional.",
    priceRetail: 750,
    priceWholesale: 450,
    imageUrl: "CatalogoExtra/011662.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-247",
    name: "Guantes de goma verde",
    sku: "011662",
    description: "Guantes de goma verde de excelente calidad profesional.",
    priceRetail: 750,
    priceWholesale: 450,
    imageUrl: "CatalogoExtra/011662.jpg",
    category: "Herramientas Manuales"
  },

  {
    id: "prod-300",
    name: "Prensa F 60x500",
    sku: "010826",
    description: "Prensa F 60x500 resistente y duradero.",
    priceRetail: 13990,
    priceWholesale: 13500,
    imageUrl: "CatalogoTerceros/010826.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-301",
    name: "Prensa F 80x250",
    sku: "010829",
    description: "Prensa F 80x250 resistente y duradero.",
    priceRetail: 19500,
    priceWholesale: 14250,
    imageUrl: "CatalogoTerceros/010829.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-302",
    name: "Prensa F 80x300",
    sku: "010830",
    description: "Prensa F 80x300 resistente y duradero.",
    priceRetail: 15500,
    priceWholesale: 15000,
    imageUrl: "CatalogoTerceros/010830.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-303",
    name: "Prensa F 80x500",
    sku: "010834",
    description: "Prensa F 80x500 resistente y duradero.",
    priceRetail: 18500,
    priceWholesale: 18000,
    imageUrl: "CatalogoTerceros/010834.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-304",
    name: "Prensa F 80x600",
    sku: "010836",
    description: "Prensa F 80x600 resistente y duradero.",
    priceRetail: 20750,
    priceWholesale: 20250,
    imageUrl: "CatalogoTerceros/010836.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-305",
    name: "Prensa F 80x700",
    sku: "010838",
    description: "Prensa F 80x700 resistente y duradero.",
    priceRetail: 23750,
    priceWholesale: 23250,
    imageUrl: "CatalogoTerceros/010838.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-306",
    name: "Prensa F 50x150",
    sku: "010809",
    description: "Prensa F 50x150 resistente y duradero.",
    priceRetail: 4000,
    priceWholesale: 3750,
    imageUrl: "CatalogoTerceros/010809.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-307",
    name: "Prensa F 50x200",
    sku: "010810",
    description: "Prensa F 50x200 resistente y duradero.",
    priceRetail: 4900,
    priceWholesale: 4500,
    imageUrl: "CatalogoTerceros/010810.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-308",
    name: "Prensa F 50x250",
    sku: "010811",
    description: "Prensa F 50x250 resistente y duradero.",
    priceRetail: 6500,
    priceWholesale: 6000,
    imageUrl: "CatalogoTerceros/010811.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-309",
    name: "Prensa G 2\\\"",
    sku: "010838",
    description: "Prensa G 2\\\" resistente y duradero.",
    priceRetail: 1500,
    priceWholesale: 1130,
    imageUrl: "CatalogoTerceros/010838.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-310",
    name: "Regla de acero 12\\\"",
    sku: "011900",
    description: "Regla de acero 12\\\" resistente y duradero.",
    priceRetail: 1990,
    priceWholesale: 1500,
    imageUrl: "CatalogoTerceros/011900.jpg",
    category: "Medición"
  },
  {
    id: "prod-311",
    name: "Regla de acero 24\\\"",
    sku: "011900",
    description: "Regla de acero 24\\\" resistente y duradero.",
    priceRetail: 3600,
    priceWholesale: 3300,
    imageUrl: "CatalogoTerceros/011900.jpg",
    category: "Medición"
  },
  {
    id: "prod-312",
    name: "Llave Francesa 8\\\"",
    sku: "010410",
    description: "Llave Francesa 8\\\" resistente y duradero.",
    priceRetail: 3000,
    priceWholesale: 2700,
    imageUrl: "CatalogoTerceros/010410.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-313",
    name: "Llave pipa 10mm",
    sku: "010021",
    description: "Llave pipa 10mm resistente y duradero.",
    priceRetail: 1440,
    priceWholesale: 1140,
    imageUrl: "CatalogoTerceros/010021.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-314",
    name: "Llave pipa 11mm",
    sku: "010022",
    description: "Llave pipa 11mm resistente y duradero.",
    priceRetail: 1790,
    priceWholesale: 1330,
    imageUrl: "CatalogoTerceros/010022.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-315",
    name: "Llave pipa 12mm",
    sku: "010023",
    description: "Llave pipa 12mm resistente y duradero.",
    priceRetail: 1820,
    priceWholesale: 1520,
    imageUrl: "CatalogoTerceros/010023.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-316",
    name: "Llave pipa 13mm",
    sku: "010024",
    description: "Llave pipa 13mm resistente y duradero.",
    priceRetail: 2000,
    priceWholesale: 1720,
    imageUrl: "CatalogoTerceros/010024.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-317",
    name: "Llave pipa 14mm",
    sku: "010025",
    description: "Llave pipa 14mm resistente y duradero.",
    priceRetail: 2200,
    priceWholesale: 1900,
    imageUrl: "CatalogoTerceros/010025.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-318",
    name: "Llave pipa 15mm",
    sku: "010026",
    description: "Llave pipa 15mm resistente y duradero.",
    priceRetail: 2390,
    priceWholesale: 2090,
    imageUrl: "CatalogoTerceros/010026.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-319",
    name: "Llave pipa 19mm",
    sku: "010028",
    description: "Llave pipa 19mm resistente y duradero.",
    priceRetail: 2870,
    priceWholesale: 2570,
    imageUrl: "CatalogoTerceros/010028.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-320",
    name: "Llave pipa 8mm",
    sku: "010028",
    description: "Llave pipa 8mm resistente y duradero.",
    priceRetail: 1260,
    priceWholesale: 960,
    imageUrl: "CatalogoTerceros/010028.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-321",
    name: "Napoleon de 12\\\"",
    sku: "011769",
    description: "Napoleon de 12\\\" resistente y duradero.",
    priceRetail: 4790,
    priceWholesale: 4490,
    imageUrl: "CatalogoTerceros/011769.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-322",
    name: "Napoleon de 14\\\"",
    sku: "011771",
    description: "Napoleon de 14\\\" resistente y duradero.",
    priceRetail: 5790,
    priceWholesale: 5390,
    imageUrl: "CatalogoTerceros/011771.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-323",
    name: "Napoleon de 24\\\"",
    sku: "011773",
    description: "Napoleon de 24\\\" resistente y duradero.",
    priceRetail: 10390,
    priceWholesale: 10090,
    imageUrl: "CatalogoTerceros/011773.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-324",
    name: "Napoleon de 30\\\"",
    sku: "011773",
    description: "Napoleon de 30\\\" resistente y duradero.",
    priceRetail: 14550,
    priceWholesale: 14250,
    imageUrl: "CatalogoTerceros/011773.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-325",
    name: "Nivel Aluminio 10\\\"",
    sku: "011071",
    description: "Nivel Aluminio 10\\\" resistente y duradero.",
    priceRetail: 1740,
    priceWholesale: 1340,
    imageUrl: "CatalogoTerceros/011071.jpg",
    category: "Medición"
  },
  {
    id: "prod-326",
    name: "Nivel aluminio 14\\\"",
    sku: "011073",
    description: "Nivel aluminio 14\\\" resistente y duradero.",
    priceRetail: 2250,
    priceWholesale: 1950,
    imageUrl: "CatalogoTerceros/011073.jpg",
    category: "Medición"
  },
  {
    id: "prod-327",
    name: "Nivel aluminio 16\\\"",
    sku: "011074",
    description: "Nivel aluminio 16\\\" resistente y duradero.",
    priceRetail: 3000,
    priceWholesale: 2700,
    imageUrl: "CatalogoTerceros/011074.jpg",
    category: "Medición"
  },
  {
    id: "prod-328",
    name: "Nivel aluminio 18\\\"",
    sku: "011075",
    description: "Nivel aluminio 18\\\" resistente y duradero.",
    priceRetail: 3500,
    priceWholesale: 3000,
    imageUrl: "CatalogoTerceros/011075.jpg",
    category: "Medición"
  },
  {
    id: "prod-329",
    name: "Nivel aluminio 20\\\"",
    sku: "011076",
    description: "Nivel aluminio 20\\\" resistente y duradero.",
    priceRetail: 3500,
    priceWholesale: 3300,
    imageUrl: "CatalogoTerceros/011076.jpg",
    category: "Medición"
  },
  {
    id: "prod-330",
    name: "Nivel aluminio 20\\\" con iman",
    sku: "011085",
    description: "Nivel aluminio 20\\\" con iman resistente y duradero.",
    priceRetail: 4500,
    priceWholesale: 4200,
    imageUrl: "CatalogoTerceros/011085.jpg",
    category: "Medición"
  },
  {
    id: "prod-331",
    name: "Nivel aluminio 22\\\"",
    sku: "011077",
    description: "Nivel aluminio 22\\\" resistente y duradero.",
    priceRetail: 4000,
    priceWholesale: 3750,
    imageUrl: "CatalogoTerceros/011077.jpg",
    category: "Medición"
  },
  {
    id: "prod-332",
    name: "Nivel aluminio 24\\\"",
    sku: "011078",
    description: "Nivel aluminio 24\\\" resistente y duradero.",
    priceRetail: 4350,
    priceWholesale: 4050,
    imageUrl: "CatalogoTerceros/011078.jpg",
    category: "Medición"
  },
  {
    id: "prod-333",
    name: "Nivel aluminio 24\\\" con iman",
    sku: "011087",
    description: "Nivel aluminio 24\\\" con iman resistente y duradero.",
    priceRetail: 5550,
    priceWholesale: 5250,
    imageUrl: "CatalogoTerceros/011087.jpg",
    category: "Medición"
  },
  {
    id: "prod-334",
    name: "Nivel aluminio 26\\\"",
    sku: "011079",
    description: "Nivel aluminio 26\\\" resistente y duradero.",
    priceRetail: 4800,
    priceWholesale: 4500,
    imageUrl: "CatalogoTerceros/011079.jpg",
    category: "Medición"
  },
  {
    id: "prod-335",
    name: "Nivel aluminio 26\\\" con iman",
    sku: "011088",
    description: "Nivel aluminio 26\\\" con iman resistente y duradero.",
    priceRetail: 6000,
    priceWholesale: 5700,
    imageUrl: "CatalogoTerceros/011088.jpg",
    category: "Medición"
  },
  {
    id: "prod-336",
    name: "Nivel aluminio 48\\\"",
    sku: "011081",
    description: "Nivel aluminio 48\\\" resistente y duradero.",
    priceRetail: 5550,
    priceWholesale: 5250,
    imageUrl: "CatalogoTerceros/011081.jpg",
    category: "Medición"
  },
  {
    id: "prod-337",
    name: "Nivel topedo 9\\\"",
    sku: "011081",
    description: "Nivel topedo 9\\\" resistente y duradero.",
    priceRetail: 2550,
    priceWholesale: 2250,
    imageUrl: "CatalogoTerceros/011081.jpg",
    category: "Medición"
  },
  {
    id: "prod-338",
    name: "Pasadores para ventana 3\\\"",
    sku: "030312",
    description: "Pasadores para ventana 3\\\" resistente y duradero.",
    priceRetail: 380,
    priceWholesale: 180,
    imageUrl: "CatalogoTerceros/030312.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-339",
    name: "Pasadores para ventana 4\\\"",
    sku: "030313",
    description: "Pasadores para ventana 4\\\" resistente y duradero.",
    priceRetail: 390,
    priceWholesale: 190,
    imageUrl: "CatalogoTerceros/030313.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-340",
    name: "Pasadores para ventana 5\\\"",
    sku: "030314",
    description: "Pasadores para ventana 5\\\" resistente y duradero.",
    priceRetail: 470,
    priceWholesale: 270,
    imageUrl: "CatalogoTerceros/030314.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-341",
    name: "Pasadores para ventana 6\\\"",
    sku: "030315",
    description: "Pasadores para ventana 6\\\" resistente y duradero.",
    priceRetail: 490,
    priceWholesale: 290,
    imageUrl: "CatalogoTerceros/030315.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-342",
    name: "Pasadores para ventana 8\\\"",
    sku: "030315",
    description: "Pasadores para ventana 8\\\" resistente y duradero.",
    priceRetail: 560,
    priceWholesale: 360,
    imageUrl: "CatalogoTerceros/030315.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-343",
    name: "Plana con punta cuadrada 5\\\"",
    sku: "011730",
    description: "Plana con punta cuadrada 5\\\" resistente y duradero.",
    priceRetail: 1370,
    priceWholesale: 1170,
    imageUrl: "CatalogoTerceros/011730.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-344",
    name: "Plana con punta cuadrada 6\\\"",
    sku: "011731",
    description: "Plana con punta cuadrada 6\\\" resistente y duradero.",
    priceRetail: 1580,
    priceWholesale: 1280,
    imageUrl: "CatalogoTerceros/011731.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-345",
    name: "Plana con punta cuadrada 7\\\"",
    sku: "011732",
    description: "Plana con punta cuadrada 7\\\" resistente y duradero.",
    priceRetail: 1950,
    priceWholesale: 1650,
    imageUrl: "CatalogoTerceros/011732.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-346",
    name: "Plana con punta cuadrada 8\\\"",
    sku: "011733",
    description: "Plana con punta cuadrada 8\\\" resistente y duradero.",
    priceRetail: 2000,
    priceWholesale: 1880,
    imageUrl: "CatalogoTerceros/011733.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-347",
    name: "Plana con punta redonda 5\\\"",
    sku: "011734",
    description: "Plana con punta redonda 5\\\" resistente y duradero.",
    priceRetail: 1330,
    priceWholesale: 1130,
    imageUrl: "CatalogoTerceros/011734.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-348",
    name: "Plana con punta redonda 6\\\"",
    sku: "011735",
    description: "Plana con punta redonda 6\\\" resistente y duradero.",
    priceRetail: 1580,
    priceWholesale: 1280,
    imageUrl: "CatalogoTerceros/011735.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-349",
    name: "Plana con punta redonda 7\\\"",
    sku: "011736",
    description: "Plana con punta redonda 7\\\" resistente y duradero.",
    priceRetail: 1720,
    priceWholesale: 1420,
    imageUrl: "CatalogoTerceros/011736.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-350",
    name: "Plana con punta redonda 8\\\"",
    sku: "011736",
    description: "Plana con punta redonda 8\\\" resistente y duradero.",
    priceRetail: 2000,
    priceWholesale: 1880,
    imageUrl: "CatalogoTerceros/011736.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-351",
    name: "Prensa esquina 4\\\"",
    sku: "010870",
    description: "Prensa esquina 4\\\" resistente y duradero.",
    priceRetail: 4900,
    priceWholesale: 4500,
    imageUrl: "CatalogoTerceros/010870.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-352",
    name: "Pasadores para ventana 5\\\"",
    sku: "010808",
    description: "Pasadores para ventana 5\\\" resistente y duradero.",
    priceRetail: 3000,
    priceWholesale: 2850,
    imageUrl: "CatalogoTerceros/010808.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-353",
    name: "Prensa F 60x200",
    sku: "010820",
    description: "Prensa F 60x200 resistente y duradero.",
    priceRetail: 9990,
    priceWholesale: 9750,
    imageUrl: "CatalogoTerceros/010820.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-354",
    name: "Prensa F 60x250",
    sku: "010821",
    description: "Prensa F 60x250 resistente y duradero.",
    priceRetail: 10990,
    priceWholesale: 10500,
    imageUrl: "CatalogoTerceros/010821.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-355",
    name: "Prensa F 60x300",
    sku: "010823",
    description: "Prensa F 60x300 resistente y duradero.",
    priceRetail: 12500,
    priceWholesale: 12000,
    imageUrl: "CatalogoTerceros/010823.jpg",
    category: "Herramientas Manuales"
  },

  {
    id: "prod-400",
    name: "Sacaclavos 12\\\"",
    sku: "070080",
    description: "Sacaclavos 12\\\" de alta durabilidad.",
    priceRetail: 1990,
    priceWholesale: 1650,
    imageUrl: "CatalogoExtra2/070080.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-401",
    name: "Sacaclavos 18\\\"",
    sku: "070081",
    description: "Sacaclavos 18\\\" de alta durabilidad.",
    priceRetail: 2990,
    priceWholesale: 2700,
    imageUrl: "CatalogoExtra2/070081.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-402",
    name: "Serrucho de ebanista 10\\\"",
    sku: "011747",
    description: "Serrucho de ebanista 10\\\" de alta durabilidad.",
    priceRetail: 1500,
    priceWholesale: 1000,
    imageUrl: "CatalogoExtra2/011747.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-403",
    name: "Serrucho de ebanista 8\\\"",
    sku: "011746",
    description: "Serrucho de ebanista 8\\\" de alta durabilidad.",
    priceRetail: 1000,
    priceWholesale: 850,
    imageUrl: "CatalogoExtra2/011746.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-404",
    name: "Serrucho 22\\\"",
    sku: "011742",
    description: "Serrucho 22\\\" de alta durabilidad.",
    priceRetail: 2990,
    priceWholesale: 2550,
    imageUrl: "CatalogoExtra2/011742.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-405",
    name: "Serrucho 24\\\"",
    sku: "011742",
    description: "Serrucho 24\\\" de alta durabilidad.",
    priceRetail: 3500,
    priceWholesale: 3000,
    imageUrl: "CatalogoExtra2/011742.jpg",
    category: "Herramientas Manuales"
  },
  {
    id: "prod-406",
    name: "Tarugo Tipo Fisher 10mm",
    sku: "070473",
    description: "Tarugo Tipo Fisher 10mm de alta durabilidad.",
    priceRetail: 5000,
    priceWholesale: 4800,
    imageUrl: "CatalogoExtra2/070473.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-407",
    name: "Tarugo Tipo Fisher 5mm",
    sku: "070470",
    description: "Tarugo Tipo Fisher 5mm de alta durabilidad.",
    priceRetail: 4000,
    priceWholesale: 3750,
    imageUrl: "CatalogoExtra2/070470.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-408",
    name: "Tarugo Tipo Fisher 6mm",
    sku: "070471",
    description: "Tarugo Tipo Fisher 6mm de alta durabilidad.",
    priceRetail: 4680,
    priceWholesale: 4380,
    imageUrl: "CatalogoExtra2/070471.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-409",
    name: "Tarugo Tipo Fisher 8mm",
    sku: "070471",
    description: "Tarugo Tipo Fisher 8mm de alta durabilidad.",
    priceRetail: 4720,
    priceWholesale: 4420,
    imageUrl: "CatalogoExtra2/070471.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-410",
    name: "Goma para llave 1/2\\\"- 5/8\\\"",
    sku: "030641",
    description: "Goma para llave 1/2\\\"- 5/8\\\" de alta durabilidad.",
    priceRetail: 2000,
    priceWholesale: 1700,
    imageUrl: "CatalogoExtra2/030641.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-411",
    name: "Llave lavamano muro 20cm 30493",
    sku: "03068",
    description: "Llave lavamano muro 20cm 30493 de alta durabilidad.",
    priceRetail: 15900,
    priceWholesale: 15400,
    imageUrl: "CatalogoExtra2/03068.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-412",
    name: "Llave Combinacion Lavaplatos 30492",
    sku: "030686",
    description: "Llave Combinacion Lavaplatos 30492 de alta durabilidad.",
    priceRetail: 17900,
    priceWholesale: 17500,
    imageUrl: "CatalogoExtra2/030686.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-413",
    name: "Llave de jardin BQA036 con hilo",
    sku: "030602",
    description: "Llave de jardin BQA036 con hilo de alta durabilidad.",
    priceRetail: 5900,
    priceWholesale: 5500,
    imageUrl: "CatalogoExtra2/030602.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-414",
    name: "Llave de jardin Gal.518 con hilo",
    sku: "030600",
    description: "Llave de jardin Gal.518 con hilo de alta durabilidad.",
    priceRetail: 3500,
    priceWholesale: 2800,
    imageUrl: "CatalogoExtra2/030600.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-415",
    name: "Llave lavamano muro 15cm 30494",
    sku: "030684",
    description: "Llave lavamano muro 15cm 30494 de alta durabilidad.",
    priceRetail: 16990,
    priceWholesale: 16660,
    imageUrl: "CatalogoExtra2/030684.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-416",
    name: "Llave lavamano muro 20cm 30493",
    sku: "030685",
    description: "Llave lavamano muro 20cm 30493 de alta durabilidad.",
    priceRetail: 19500,
    priceWholesale: 18900,
    imageUrl: "CatalogoExtra2/030685.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-417",
    name: "Llave Lavamanos par simple 30403",
    sku: "030688",
    description: "Llave Lavamanos par simple 30403 de alta durabilidad.",
    priceRetail: 15900,
    priceWholesale: 15400,
    imageUrl: "CatalogoExtra2/030688.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-418",
    name: "Llave lavaplatos monomando 30940",
    sku: "030683",
    description: "Llave lavaplatos monomando 30940 de alta durabilidad.",
    priceRetail: 19500,
    priceWholesale: 18900,
    imageUrl: "CatalogoExtra2/030683.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-419",
    name: "Llave monomando 35mm 30401",
    sku: "030680",
    description: "Llave monomando 35mm 30401 de alta durabilidad.",
    priceRetail: 15990,
    priceWholesale: 15200,
    imageUrl: "CatalogoExtra2/030680.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-420",
    name: "Llave monomando ducha 30496",
    sku: "030682",
    description: "Llave monomando ducha 30496 de alta durabilidad.",
    priceRetail: 19960,
    priceWholesale: 19460,
    imageUrl: "CatalogoExtra2/030682.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-421",
    name: "tubo flexible para ducha 1.5m",
    sku: "030681",
    description: "tubo flexible para ducha 1.5m de alta durabilidad.",
    priceRetail: 2500,
    priceWholesale: 1950,
    imageUrl: "CatalogoExtra2/030681.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-422",
    name: "Ducha Telefono",
    sku: "030687",
    description: "Ducha Telefono de alta durabilidad.",
    priceRetail: 1990,
    priceWholesale: 1660,
    imageUrl: "CatalogoExtra2/030687.jpg",
    category: "Gasfitería"
  },
  {
    id: "prod-423",
    name: "Candado dorado 32mm",
    sku: "010187",
    description: "Candado dorado 32mm de alta durabilidad.",
    priceRetail: 1500,
    priceWholesale: 1000,
    imageUrl: "CatalogoExtra2/010187.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-424",
    name: "Candado dorado 38mm",
    sku: "010188",
    description: "Candado dorado 38mm de alta durabilidad.",
    priceRetail: 1700,
    priceWholesale: 1200,
    imageUrl: "CatalogoExtra2/010188.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-425",
    name: "Carretilla 85L",
    sku: "030600",
    description: "Carretilla 85L de alta durabilidad.",
    priceRetail: 60000,
    priceWholesale: 58500,
    imageUrl: "CatalogoExtra2/030600.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-426",
    name: "Tuberia Conduit PVC 25x1.5x3000mm",
    sku: "011570",
    description: "Tuberia Conduit PVC 25x1.5x3000mm de alta durabilidad.",
    priceRetail: 2000,
    priceWholesale: 1550,
    imageUrl: "CatalogoExtra2/011570.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-427",
    name: "Tuberia Conduit PVC 16x1.4x3000mm",
    sku: "011570",
    description: "Tuberia Conduit PVC 16x1.4x3000mm de alta durabilidad.",
    priceRetail: 1100,
    priceWholesale: 780,
    imageUrl: "CatalogoExtra2/011570.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-428",
    name: "Tuberia Conduit PVC 20x1.5x3000mm",
    sku: "011572",
    description: "Tuberia Conduit PVC 20x1.5x3000mm de alta durabilidad.",
    priceRetail: 1500,
    priceWholesale: 1000,
    imageUrl: "CatalogoExtra2/011572.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-429",
    name: "Tuberia EMT 20mm x 1.2mm",
    sku: "011500",
    description: "Tuberia EMT 20mm x 1.2mm de alta durabilidad.",
    priceRetail: 3500,
    priceWholesale: 2950,
    imageUrl: "CatalogoExtra2/011500.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-430",
    name: "Tuberia EMT 25mm x 1.2mm",
    sku: "011501",
    description: "Tuberia EMT 25mm x 1.2mm de alta durabilidad.",
    priceRetail: 5900,
    priceWholesale: 5500,
    imageUrl: "CatalogoExtra2/011501.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-431",
    name: "Tuberia EMT 32mm x 1.2mm",
    sku: "011502",
    description: "Tuberia EMT 32mm x 1.2mm de alta durabilidad.",
    priceRetail: 6900,
    priceWholesale: 6600,
    imageUrl: "CatalogoExtra2/011502.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-432",
    name: "Yegua azul extensible 250kilos",
    sku: "010479",
    description: "Yegua azul extensible 250kilos de alta durabilidad.",
    priceRetail: 47500,
    priceWholesale: 46800,
    imageUrl: "CatalogoExtra2/010479.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-433",
    name: "Yegua roja con ruedas 250 kilos",
    sku: "010479",
    description: "Yegua roja con ruedas 250 kilos de alta durabilidad.",
    priceRetail: 44550,
    priceWholesale: 43550,
    imageUrl: "CatalogoExtra2/010479.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-434",
    name: "Basurero pvc 120L Gris",
    sku: "010251",
    description: "Basurero pvc 120L Gris de alta durabilidad.",
    priceRetail: 37800,
    priceWholesale: 37800,
    imageUrl: "CatalogoExtra2/010251.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-435",
    name: "Basurero pvc 240L Verde",
    sku: "010251",
    description: "Basurero pvc 240L Verde de alta durabilidad.",
    priceRetail: 52700,
    priceWholesale: 52700,
    imageUrl: "CatalogoExtra2/010251.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-436",
    name: "Bomba de piscina SUPB100 0.75KW",
    sku: "011419",
    description: "Bomba de piscina SUPB100 0.75KW de alta durabilidad.",
    priceRetail: 166750,
    priceWholesale: 166750,
    imageUrl: "CatalogoExtra2/011419.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-437",
    name: "Bomba de piscina SWIM050 0.75KW",
    sku: "011420",
    description: "Bomba de piscina SWIM050 0.75KW de alta durabilidad.",
    priceRetail: 159850,
    priceWholesale: 159850,
    imageUrl: "CatalogoExtra2/011420.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-438",
    name: "Compresor de aire de 2 HP 200 litros",
    sku: "130162",
    description: "Compresor de aire de 2 HP 200 litros de alta durabilidad.",
    priceRetail: 471500,
    priceWholesale: 471500,
    imageUrl: "CatalogoExtra2/130162.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-439",
    name: "Fresador con taladro ZAY7045FG",
    sku: "130230",
    description: "Fresador con taladro ZAY7045FG de alta durabilidad.",
    priceRetail: 2600000,
    priceWholesale: 2600000,
    imageUrl: "CatalogoExtra2/130230.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-440",
    name: "Frezador con traladro ZAY7032FG",
    sku: "130229",
    description: "Frezador con traladro ZAY7032FG de alta durabilidad.",
    priceRetail: 2490000,
    priceWholesale: 2490000,
    imageUrl: "CatalogoExtra2/130229.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-441",
    name: "Gata Caiman 2T",
    sku: "130129",
    description: "Gata Caiman 2T de alta durabilidad.",
    priceRetail: 30000,
    priceWholesale: 27000,
    imageUrl: "CatalogoExtra2/130129.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-442",
    name: "Gata Caiman 3T",
    sku: "130132",
    description: "Gata Caiman 3T de alta durabilidad.",
    priceRetail: 93000,
    priceWholesale: 89000,
    imageUrl: "CatalogoExtra2/130132.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-443",
    name: "Gata Caiman 3T Larga",
    sku: "130131",
    description: "Gata Caiman 3T Larga de alta durabilidad.",
    priceRetail: 173000,
    priceWholesale: 166750,
    imageUrl: "CatalogoExtra2/130131.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-444",
    name: "Gata Tijera 1.5T",
    sku: "130091",
    description: "Gata Tijera 1.5T de alta durabilidad.",
    priceRetail: 13500,
    priceWholesale: 12800,
    imageUrl: "CatalogoExtra2/130091.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-445",
    name: "Gata Tijera 1T",
    sku: "130090",
    description: "Gata Tijera 1T de alta durabilidad.",
    priceRetail: 13000,
    priceWholesale: 11050,
    imageUrl: "CatalogoExtra2/130090.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-446",
    name: "Maquina de Madera MQ443A",
    sku: "13002",
    description: "Maquina de Madera MQ443A de alta durabilidad.",
    priceRetail: 1341000,
    priceWholesale: 1341000,
    imageUrl: "CatalogoExtra2/13002.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-447",
    name: "Prensa Hidraulica 30T con Manometro",
    sku: "130145",
    description: "Prensa Hidraulica 30T con Manometro de alta durabilidad.",
    priceRetail: 530000,
    priceWholesale: 518000,
    imageUrl: "CatalogoExtra2/130145.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-448",
    name: "Prensa Hidraulica 50T con Manometro",
    sku: "130146",
    description: "Prensa Hidraulica 50T con Manometro de alta durabilidad.",
    priceRetail: 1092500,
    priceWholesale: 1092500,
    imageUrl: "CatalogoExtra2/130146.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-449",
    name: "Tecle Pluma Doble 2T",
    sku: "130196",
    description: "Tecle Pluma Doble 2T de alta durabilidad.",
    priceRetail: 235000,
    priceWholesale: 229500,
    imageUrl: "CatalogoExtra2/130196.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-450",
    name: "Molino Forrajero FZ500",
    sku: "130212",
    description: "Molino Forrajero FZ500 de alta durabilidad.",
    priceRetail: 799750,
    priceWholesale: 799750,
    imageUrl: "CatalogoExtra2/130212.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-451",
    name: "Plato para Torno de 3 patitas 10\\\"",
    sku: "130238",
    description: "Plato para Torno de 3 patitas 10\\\" de alta durabilidad.",
    priceRetail: 227000,
    priceWholesale: 224000,
    imageUrl: "CatalogoExtra2/130238.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-452",
    name: "Plato para Torno de 3 patitas 4\\\"",
    sku: "130235",
    description: "Plato para Torno de 3 patitas 4\\\" de alta durabilidad.",
    priceRetail: 85000,
    priceWholesale: 80500,
    imageUrl: "CatalogoExtra2/130235.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-453",
    name: "Plato para Torno de 3 patitas 6\\\"",
    sku: "130235",
    description: "Plato para Torno de 3 patitas 6\\\" de alta durabilidad.",
    priceRetail: 135000,
    priceWholesale: 132000,
    imageUrl: "CatalogoExtra2/130235.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-454",
    name: "Plato para Torno de 3 patitas 8\\\"",
    sku: "130237",
    description: "Plato para Torno de 3 patitas 8\\\" de alta durabilidad.",
    priceRetail: 155500,
    priceWholesale: 149500,
    imageUrl: "CatalogoExtra2/130237.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-455",
    name: "PORTPOWER SD0202 10T",
    sku: "130152",
    description: "PORTPOWER SD0202 10T de alta durabilidad.",
    priceRetail: 195000,
    priceWholesale: 190000,
    imageUrl: "CatalogoExtra2/130152.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-456",
    name: "Prensa Hidraulica 20T",
    sku: "130142",
    description: "Prensa Hidraulica 20T de alta durabilidad.",
    priceRetail: 275500,
    priceWholesale: 264500,
    imageUrl: "CatalogoExtra2/130142.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-457",
    name: "Prensa Hidraulica 20T con Manometro",
    sku: "130143",
    description: "Prensa Hidraulica 20T con Manometro de alta durabilidad.",
    priceRetail: 420000,
    priceWholesale: 402500,
    imageUrl: "CatalogoExtra2/130143.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-458",
    name: "Prensa Hidraulica 30T",
    sku: "130156",
    description: "Prensa Hidraulica 30T de alta durabilidad.",
    priceRetail: 450000,
    priceWholesale: 443000,
    imageUrl: "CatalogoExtra2/130156.jpg",
    category: "Maquinaria"
  },

  {
    id: "prod-500",
    name: "Ampolleta Led 12w 3500k",
    sku: "160815",
    description: "Ampolleta Led 12w 3500k de alto rendimiento industrial.",
    priceRetail: 1680,
    priceWholesale: 1380,
    imageUrl: "CatalogoTerceros2/160815.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-501",
    name: "Ampolleta Led 5w 6500k-3500k",
    sku: "160810-160811",
    description: "Ampolleta Led 5w 6500k-3500k de alto rendimiento industrial.",
    priceRetail: 1300,
    priceWholesale: 1000,
    imageUrl: "CatalogoTerceros2/160810-160811.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-502",
    name: "Ampolleta Led 7w 6500k",
    sku: "160832",
    description: "Ampolleta Led 7w 6500k de alto rendimiento industrial.",
    priceRetail: 1390,
    priceWholesale: 1090,
    imageUrl: "CatalogoTerceros2/160832.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-503",
    name: "Ampolleta Led 9w 6500k-3500k",
    sku: "160812-160813",
    description: "Ampolleta Led 9w 6500k-3500k de alto rendimiento industrial.",
    priceRetail: 1490,
    priceWholesale: 1190,
    imageUrl: "CatalogoTerceros2/160812-160813.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-504",
    name: "Ampolleta Led GU-10 5w 6500k-3500k",
    sku: "160836-160837",
    description: "Ampolleta Led GU-10 5w 6500k-3500k de alto rendimiento industrial.",
    priceRetail: 1800,
    priceWholesale: 1500,
    imageUrl: "CatalogoTerceros2/160836-160837.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-505",
    name: "Ampolleta Led M-T 20w 6500k-3500k",
    sku: "160841-160842",
    description: "Ampolleta Led M-T 20w 6500k-3500k de alto rendimiento industrial.",
    priceRetail: 2890,
    priceWholesale: 2590,
    imageUrl: "CatalogoTerceros2/160841-160842.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-506",
    name: "Ampolleta Led M-T 28w 6500k-3500k E27",
    sku: "160843-160844",
    description: "Ampolleta Led M-T 28w 6500k-3500k E27 de alto rendimiento industrial.",
    priceRetail: 3790,
    priceWholesale: 3490,
    imageUrl: "CatalogoTerceros2/160843-160844.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-507",
    name: "Ampolleta Led M-T 36w 6500k-3500k E27",
    sku: "160845-160846",
    description: "Ampolleta Led M-T 36w 6500k-3500k E27 de alto rendimiento industrial.",
    priceRetail: 4690,
    priceWholesale: 4190,
    imageUrl: "CatalogoTerceros2/160845-160846.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-508",
    name: "Ampolleta Led M-T 45w 6500k-3500k E27",
    sku: "160847-160848",
    description: "Ampolleta Led M-T 45w 6500k-3500k E27 de alto rendimiento industrial.",
    priceRetail: 5500,
    priceWholesale: 5300,
    imageUrl: "CatalogoTerceros2/160847-160848.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-509",
    name: "Ampolleta Tubular Led 100w E-40",
    sku: "160027",
    description: "Ampolleta Tubular Led 100w E-40 de alto rendimiento industrial.",
    priceRetail: 28490,
    priceWholesale: 28190,
    imageUrl: "CatalogoTerceros2/160027.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-510",
    name: "Campa Policarbonato con Gancho E27 12\\\"",
    sku: "140250",
    description: "Campa Policarbonato con Gancho E27 12\\\" de alto rendimiento industrial.",
    priceRetail: 18150,
    priceWholesale: 17850,
    imageUrl: "CatalogoTerceros2/140250.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-511",
    name: "Campa Policarbonato con Gancho E27 22\\\"",
    sku: "140257",
    description: "Campa Policarbonato con Gancho E27 22\\\" de alto rendimiento industrial.",
    priceRetail: 28490,
    priceWholesale: 28190,
    imageUrl: "CatalogoTerceros2/140257.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-512",
    name: "Foco Led ZH-COB0252 25w 6500K-3500K",
    sku: "120926-120927",
    description: "Foco Led ZH-COB0252 25w 6500K-3500K de alto rendimiento industrial.",
    priceRetail: 8550,
    priceWholesale: 8250,
    imageUrl: "CatalogoTerceros2/120926-120927.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-513",
    name: "Foco Led ZH-COB052 5w 6500K-3500K",
    sku: "120900-120700",
    description: "Foco Led ZH-COB052 5w 6500K-3500K de alto rendimiento industrial.",
    priceRetail: 6000,
    priceWholesale: 5750,
    imageUrl: "CatalogoTerceros2/120900-120700.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-514",
    name: "Foco Led ZH-TD3 3w 6500-3500K",
    sku: "120800-120801",
    description: "Foco Led ZH-TD3 3w 6500-3500K de alto rendimiento industrial.",
    priceRetail: 1270,
    priceWholesale: 970,
    imageUrl: "CatalogoTerceros2/120800-120801.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-515",
    name: "Foco Led ZH-TD4 4w 6500-3500K",
    sku: "120802-120803",
    description: "Foco Led ZH-TD4 4w 6500-3500K de alto rendimiento industrial.",
    priceRetail: 1720,
    priceWholesale: 1420,
    imageUrl: "CatalogoTerceros2/120802-120803.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-516",
    name: "Foco Led ZH-TD7 7w 6500-3500K",
    sku: "120808-120809",
    description: "Foco Led ZH-TD7 7w 6500-3500K de alto rendimiento industrial.",
    priceRetail: 2500,
    priceWholesale: 2240,
    imageUrl: "CatalogoTerceros2/120808-120809.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-517",
    name: "Lampara Estaca LEd 3w blanca",
    sku: "120028",
    description: "Lampara Estaca LEd 3w blanca de alto rendimiento industrial.",
    priceRetail: 7720,
    priceWholesale: 7420,
    imageUrl: "CatalogoTerceros2/120028.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-518",
    name: "Lampara Estaca LEd 3w Negra",
    sku: "120029",
    description: "Lampara Estaca LEd 3w Negra de alto rendimiento industrial.",
    priceRetail: 7720,
    priceWholesale: 7420,
    imageUrl: "CatalogoTerceros2/120029.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-519",
    name: "Lampara Led de piscina RGB 12v 12w",
    sku: "120029-PISCINA",
    description: "Lampara Led de piscina RGB 12v 12w de alto rendimiento industrial.",
    priceRetail: 55000,
    priceWholesale: 54600,
    imageUrl: "CatalogoTerceros2/120029-PISCINA.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-520",
    name: "Lampara Led de piscina RGB 12v 15w",
    sku: "150003",
    description: "Lampara Led de piscina RGB 12v 15w de alto rendimiento industrial.",
    priceRetail: 57900,
    priceWholesale: 57600,
    imageUrl: "CatalogoTerceros2/150003.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-521",
    name: "Lampara Led de piscina RGB 12v 18w",
    sku: "150004",
    description: "Lampara Led de piscina RGB 12v 18w de alto rendimiento industrial.",
    priceRetail: 59700,
    priceWholesale: 59400,
    imageUrl: "CatalogoTerceros2/150004.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-522",
    name: "Lampara Led de piscina RGB 12v 24w",
    sku: "150005",
    description: "Lampara Led de piscina RGB 12v 24w de alto rendimiento industrial.",
    priceRetail: 69900,
    priceWholesale: 69600,
    imageUrl: "CatalogoTerceros2/150005.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-523",
    name: "Lampara Led de piscina RGB 12v 6w",
    sku: "120920-120921-PISCINA",
    description: "Lampara Led de piscina RGB 12v 6w de alto rendimiento industrial.",
    priceRetail: 42500,
    priceWholesale: 42000,
    imageUrl: "CatalogoTerceros2/120920-120921-PISCINA.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-524",
    name: "Campana led multipunto 180w",
    sku: "160136",
    description: "Campana led multipunto 180w de alto rendimiento industrial.",
    priceRetail: 31550,
    priceWholesale: 31250,
    imageUrl: "CatalogoTerceros2/160136.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-525",
    name: "Campana Ufo Led 100w N°2",
    sku: "120479",
    description: "Campana Ufo Led 100w N°2 de alto rendimiento industrial.",
    priceRetail: 24670,
    priceWholesale: 24370,
    imageUrl: "CatalogoTerceros2/120479.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-526",
    name: "Campana Ufo Led 150w N°2",
    sku: "120480",
    description: "Campana Ufo Led 150w N°2 de alto rendimiento industrial.",
    priceRetail: 34000,
    priceWholesale: 33750,
    imageUrl: "CatalogoTerceros2/120480.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-527",
    name: "Campana Ufo Led 200w",
    sku: "120478",
    description: "Campana Ufo Led 200w de alto rendimiento industrial.",
    priceRetail: 67390,
    priceWholesale: 66940,
    imageUrl: "CatalogoTerceros2/120478.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-528",
    name: "Campana Ufo Led 200w N°2",
    sku: "120481",
    description: "Campana Ufo Led 200w N°2 de alto rendimiento industrial.",
    priceRetail: 45000,
    priceWholesale: 43750,
    imageUrl: "CatalogoTerceros2/120481.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-529",
    name: "Campana Ufo N°1 Led 100w",
    sku: "120482",
    description: "Campana Ufo N°1 Led 100w de alto rendimiento industrial.",
    priceRetail: 30000,
    priceWholesale: 28500,
    imageUrl: "CatalogoTerceros2/120482.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-530",
    name: "Campana Ufo N°1 Led 150w",
    sku: "120483",
    description: "Campana Ufo N°1 Led 150w de alto rendimiento industrial.",
    priceRetail: 45000,
    priceWholesale: 43750,
    imageUrl: "CatalogoTerceros2/120483.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-531",
    name: "Canoa acrilica con tubo led 1x18w",
    sku: "040231",
    description: "Canoa acrilica con tubo led 1x18w de alto rendimiento industrial.",
    priceRetail: 9990,
    priceWholesale: 4390,
    imageUrl: "CatalogoTerceros2/040231.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-532",
    name: "Canoa acrilica con tubo led 2x18w",
    sku: "040230",
    description: "Canoa acrilica con tubo led 2x18w de alto rendimiento industrial.",
    priceRetail: 13630,
    priceWholesale: 13330,
    imageUrl: "CatalogoTerceros2/040230.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-533",
    name: "Canoa T5 28w con tubo amarillo",
    sku: "120140",
    description: "Canoa T5 28w con tubo amarillo de alto rendimiento industrial.",
    priceRetail: 5460,
    priceWholesale: 5160,
    imageUrl: "CatalogoTerceros2/120140.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-534",
    name: "Canoa T5 28w con tubo Azul",
    sku: "120143",
    description: "Canoa T5 28w con tubo Azul de alto rendimiento industrial.",
    priceRetail: 5460,
    priceWholesale: 5160,
    imageUrl: "CatalogoTerceros2/120143.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-535",
    name: "Canoa T5 28w con tubo Negro",
    sku: "120144",
    description: "Canoa T5 28w con tubo Negro de alto rendimiento industrial.",
    priceRetail: 5730,
    priceWholesale: 5430,
    imageUrl: "CatalogoTerceros2/120144.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-536",
    name: "Canoa T5 28w con tubo rojo",
    sku: "120141",
    description: "Canoa T5 28w con tubo rojo de alto rendimiento industrial.",
    priceRetail: 5460,
    priceWholesale: 5160,
    imageUrl: "CatalogoTerceros2/120141.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-537",
    name: "Canoa T5 28w con tubo verde",
    sku: "120142",
    description: "Canoa T5 28w con tubo verde de alto rendimiento industrial.",
    priceRetail: 5460,
    priceWholesale: 5160,
    imageUrl: "CatalogoTerceros2/120142.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-538",
    name: "Canoa T5 con Tubo Led compacto 16w 6500k",
    sku: "120142-LED",
    description: "Canoa T5 con Tubo Led compacto 16w 6500k de alto rendimiento industrial.",
    priceRetail: 6580,
    priceWholesale: 6280,
    imageUrl: "CatalogoTerceros2/120142-LED.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-539",
    name: "Tubo Led 18W 6500k",
    sku: "160804",
    description: "Tubo Led 18W 6500k de alto rendimiento industrial.",
    priceRetail: 2600,
    priceWholesale: 2300,
    imageUrl: "CatalogoTerceros2/160804.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-540",
    name: "Tubo Led 9W 6500k",
    sku: "160805",
    description: "Tubo Led 9W 6500k de alto rendimiento industrial.",
    priceRetail: 2300,
    priceWholesale: 2000,
    imageUrl: "CatalogoTerceros2/160805.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-541",
    name: "Foco Embutido led 5w 6500k-3500k",
    sku: "120051-120056",
    description: "Foco Embutido led 5w 6500k-3500k de alto rendimiento industrial.",
    priceRetail: 3000,
    priceWholesale: 2700,
    imageUrl: "CatalogoTerceros2/120051-120056.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-542",
    name: "Foco Embutido led 9w 6500k-3500k",
    sku: "120053-120058",
    description: "Foco Embutido led 9w 6500k-3500k de alto rendimiento industrial.",
    priceRetail: 3870,
    priceWholesale: 3570,
    imageUrl: "CatalogoTerceros2/120053-120058.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-543",
    name: "Foco Led TH-003 3w 3500K",
    sku: "120700",
    description: "Foco Led TH-003 3w 3500K de alto rendimiento industrial.",
    priceRetail: 5550,
    priceWholesale: 5250,
    imageUrl: "CatalogoTerceros2/120700.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-544",
    name: "Foco Led TH-009 9w 6500K-3500K",
    sku: "120094-120703",
    description: "Foco Led TH-009 9w 6500K-3500K de alto rendimiento industrial.",
    priceRetail: 8900,
    priceWholesale: 8700,
    imageUrl: "CatalogoTerceros2/120094-120703.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-545",
    name: "Foco Led TH-012 12w 6500K-3500K",
    sku: "120095-120705",
    description: "Foco Led TH-012 12w 6500K-3500K de alto rendimiento industrial.",
    priceRetail: 10450,
    priceWholesale: 10150,
    imageUrl: "CatalogoTerceros2/120095-120705.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-546",
    name: "Foco Led ZH-COB0102 10w 6500k-3500k",
    sku: "120906-120907",
    description: "Foco Led ZH-COB0102 10w 6500k-3500k de alto rendimiento industrial.",
    priceRetail: 7300,
    priceWholesale: 7000,
    imageUrl: "CatalogoTerceros2/120906-120907.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-547",
    name: "Foco Led ZH-COB0202 20w 6500k-3500k",
    sku: "120920-120921",
    description: "Foco Led ZH-COB0202 20w 6500k-3500k de alto rendimiento industrial.",
    priceRetail: 7000,
    priceWholesale: 6750,
    imageUrl: "CatalogoTerceros2/120920-120921.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-548",
    name: "Maquina para Desgrano de Choclo",
    sku: "130218",
    description: "Maquina para Desgrano de Choclo de alto rendimiento industrial.",
    priceRetail: 350000,
    priceWholesale: 328000,
    imageUrl: "CatalogoTerceros2/130218.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-549",
    name: "Maquina para Moler Grano blando",
    sku: "011419",
    description: "Maquina para Moler Grano blando de alto rendimiento industrial.",
    priceRetail: 285000,
    priceWholesale: 281750,
    imageUrl: "CatalogoTerceros2/011419.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-550",
    name: "Maquina para Moler Granos",
    sku: "130219",
    description: "Maquina para Moler Granos de alto rendimiento industrial.",
    priceRetail: 450000,
    priceWholesale: 420000,
    imageUrl: "CatalogoTerceros2/130219.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-551",
    name: "Transpaleta 2000KG NO 1",
    sku: "TRANSPALETA",
    description: "Transpaleta 2000KG NO 1 de alto rendimiento industrial.",
    priceRetail: 260000,
    priceWholesale: 253000,
    imageUrl: "CatalogoTerceros2/TRANSPALETA.jpg",
    category: "Maquinaria"
  },
  {
    id: "prod-552",
    name: "Alta eficiencia 1x18 sobrepuesta",
    sku: "160416",
    description: "Alta eficiencia 1x18 sobrepuesta de alto rendimiento industrial.",
    priceRetail: 8500,
    priceWholesale: 8000,
    imageUrl: "CatalogoTerceros2/160416.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-553",
    name: "Alta eficiencia 2 x 18 w Sobrepuesto",
    sku: "160414",
    description: "Alta eficiencia 2 x 18 w Sobrepuesto de alto rendimiento industrial.",
    priceRetail: 24300,
    priceWholesale: 23800,
    imageUrl: "CatalogoTerceros2/160414.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-554",
    name: "Alta eficiencia 2x9 sobrepuesta",
    sku: "160400",
    description: "Alta eficiencia 2x9 sobrepuesta de alto rendimiento industrial.",
    priceRetail: 17390,
    priceWholesale: 16890,
    imageUrl: "CatalogoTerceros2/160400.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-555",
    name: "Alta Eficiencia 3x18 sobrepuesta",
    sku: "160400-3X18",
    description: "Alta Eficiencia 3x18 sobrepuesta de alto rendimiento industrial.",
    priceRetail: 35500,
    priceWholesale: 35000,
    imageUrl: "CatalogoTerceros2/160400-3X18.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-556",
    name: "Ampolleta Champiñon Led 100w E-27",
    sku: "160026",
    description: "Ampolleta Champiñon Led 100w E-27 de alto rendimiento industrial.",
    priceRetail: 28490,
    priceWholesale: 28190,
    imageUrl: "CatalogoTerceros2/160026.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-557",
    name: "Ampolleta Champiñon Led 150w E-27",
    sku: "160027",
    description: "Ampolleta Champiñon Led 150w E-27 de alto rendimiento industrial.",
    priceRetail: 32170,
    priceWholesale: 31870,
    imageUrl: "CatalogoTerceros2/160027.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-558",
    name: "Ampolleta Champiñon Led 50w E-27",
    sku: "160025",
    description: "Ampolleta Champiñon Led 50w E-27 de alto rendimiento industrial.",
    priceRetail: 15170,
    priceWholesale: 14870,
    imageUrl: "CatalogoTerceros2/160025.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-559",
    name: "Ampolleta Led 10w 6500k-3500k",
    sku: "160840-160839",
    description: "Ampolleta Led 10w 6500k-3500k de alto rendimiento industrial.",
    priceRetail: 1490,
    priceWholesale: 1190,
    imageUrl: "CatalogoTerceros2/160840-160839.jpg",
    category: "Electricidad"
  },

  {
    id: "prod-600",
    name: "Lampara Led de piscina RGB 12v 9w",
    sku: "150001",
    description: "Lampara Led de piscina RGB 12v 9w de alto estándar de instalación.",
    priceRetail: 47000,
    priceWholesale: 46800,
    imageUrl: "CatalogoTerceros2/150001.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-601",
    name: "Lampara tortuga JM-FC62 blanca",
    sku: "160176",
    description: "Lampara tortuga JM-FC62 blanca de alto estándar de instalación.",
    priceRetail: 6000,
    priceWholesale: 5800,
    imageUrl: "CatalogoTerceros2/160176.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-602",
    name: "Lampara tortuga JM-FC62 Negro",
    sku: "160178",
    description: "Lampara tortuga JM-FC62 Negro de alto estándar de instalación.",
    priceRetail: 6000,
    priceWholesale: 5800,
    imageUrl: "CatalogoTerceros2/160178.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-603",
    name: "Lampara tortuga JM-FC63 Negro",
    sku: "160179",
    description: "Lampara tortuga JM-FC63 Negro de alto estándar de instalación.",
    priceRetail: 6000,
    priceWholesale: 5800,
    imageUrl: "CatalogoTerceros2/160179.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-604",
    name: "Lampara Tortuga redonda Led 12w",
    sku: "120070",
    description: "Lampara Tortuga redonda Led 12w de alto estándar de instalación.",
    priceRetail: 16550,
    priceWholesale: 16250,
    imageUrl: "CatalogoTerceros2/120070.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-605",
    name: "Plafon con sensor de 18w 6500k",
    sku: "120280",
    description: "Plafon con sensor de 18w 6500k de alto estándar de instalación.",
    priceRetail: 10800,
    priceWholesale: 10500,
    imageUrl: "CatalogoTerceros2/120280.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-606",
    name: "Plafon con sensor de 24w 6500k",
    sku: "120281",
    description: "Plafon con sensor de 24w 6500k de alto estándar de instalación.",
    priceRetail: 13600,
    priceWholesale: 13300,
    imageUrl: "CatalogoTerceros2/120281.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-607",
    name: "Plafon cuadrado Led 12w 6500k",
    sku: "120272",
    description: "Plafon cuadrado Led 12w 6500k de alto estándar de instalación.",
    priceRetail: 6000,
    priceWholesale: 5740,
    imageUrl: "CatalogoTerceros2/120272.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-608",
    name: "Plafon cuadrado Led 18w 6500k",
    sku: "120274",
    description: "Plafon cuadrado Led 18w 6500k de alto estándar de instalación.",
    priceRetail: 8000,
    priceWholesale: 7700,
    imageUrl: "CatalogoTerceros2/120274.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-609",
    name: "Plafon cuadrado Led 24w 6500k",
    sku: "120276",
    description: "Plafon cuadrado Led 24w 6500k de alto estándar de instalación.",
    priceRetail: 9990,
    priceWholesale: 9660,
    imageUrl: "CatalogoTerceros2/120276.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-610",
    name: "Plafon cuadrado Led 6w 6500k",
    sku: "120276-6W",
    description: "Plafon cuadrado Led 6w 6500k de alto estándar de instalación.",
    priceRetail: 4500,
    priceWholesale: 4200,
    imageUrl: "CatalogoTerceros2/120276-6W.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-611",
    name: "Lampara de Emergencia TD-269S",
    sku: "160260",
    description: "Lampara de Emergencia TD-269S de alto estándar de instalación.",
    priceRetail: 28990,
    priceWholesale: 28350,
    imageUrl: "CatalogoTerceros2/160260.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-612",
    name: "Lampara Hermetica 2x18 N°1",
    sku: "160603",
    description: "Lampara Hermetica 2x18 N°1 de alto estándar de instalación.",
    priceRetail: 9320,
    priceWholesale: 8920,
    imageUrl: "CatalogoTerceros2/160603.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-613",
    name: "Lampara Hermetica 2x18 N°2",
    sku: "160603-N2",
    description: "Lampara Hermetica 2x18 N°2 de alto estándar de instalación.",
    priceRetail: 10990,
    priceWholesale: 10710,
    imageUrl: "CatalogoTerceros2/160603-N2.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-614",
    name: "Panel Led 120 x 60 80w Sobrepuesto",
    sku: "120083",
    description: "Panel Led 120 x 60 80w Sobrepuesto de alto estándar de instalación.",
    priceRetail: 50900,
    priceWholesale: 50600,
    imageUrl: "CatalogoTerceros2/120083.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-615",
    name: "Panel Led 120x30 48w embutido",
    sku: "120090",
    description: "Panel Led 120x30 48w embutido de alto estándar de instalación.",
    priceRetail: 23990,
    priceWholesale: 23550,
    imageUrl: "CatalogoTerceros2/120090.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-616",
    name: "Panel Led 120x60 80w embutido",
    sku: "120082",
    description: "Panel Led 120x60 80w embutido de alto estándar de instalación.",
    priceRetail: 41990,
    priceWholesale: 41770,
    imageUrl: "CatalogoTerceros2/120082.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-617",
    name: "Panel LED 60x60 48W embutido",
    sku: "120097",
    description: "Panel LED 60x60 48W embutido de alto estándar de instalación.",
    priceRetail: 17550,
    priceWholesale: 17250,
    imageUrl: "CatalogoTerceros2/120097.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-618",
    name: "Panel Led 60x60 sobrepuesto 48w 6500K",
    sku: "120097-SOBRE",
    description: "Panel Led 60x60 sobrepuesto 48w 6500K de alto estándar de instalación.",
    priceRetail: 21990,
    priceWholesale: 21750,
    imageUrl: "CatalogoTerceros2/120097-SOBRE.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-619",
    name: "Proyector LED multipunto 100w",
    sku: "120449",
    description: "Proyector LED multipunto 100w de alto estándar de instalación.",
    priceRetail: 18500,
    priceWholesale: 18200,
    imageUrl: "CatalogoTerceros2/120449.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-620",
    name: "Proyector LED multipunto 10w",
    sku: "120440",
    description: "Proyector LED multipunto 10w de alto estándar de instalación.",
    priceRetail: 3600,
    priceWholesale: 3300,
    imageUrl: "CatalogoTerceros2/120440.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-621",
    name: "Proyector LED multipunto 150w",
    sku: "120450",
    description: "Proyector LED multipunto 150w de alto estándar de instalación.",
    priceRetail: 27700,
    priceWholesale: 27300,
    imageUrl: "CatalogoTerceros2/120450.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-622",
    name: "Proyector LED multipunto 200w",
    sku: "120451",
    description: "Proyector LED multipunto 200w de alto estándar de instalación.",
    priceRetail: 52990,
    priceWholesale: 52650,
    imageUrl: "CatalogoTerceros2/120451.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-623",
    name: "Proyector LED multipunto 20w",
    sku: "120441",
    description: "Proyector LED multipunto 20w de alto estándar de instalación.",
    priceRetail: 4940,
    priceWholesale: 4640,
    imageUrl: "CatalogoTerceros2/120441.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-624",
    name: "Proyector LED multipunto 300w",
    sku: "120452",
    description: "Proyector LED multipunto 300w de alto estándar de instalación.",
    priceRetail: 67800,
    priceWholesale: 67500,
    imageUrl: "CatalogoTerceros2/120452.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-625",
    name: "Proyector LED multipunto 30w",
    sku: "120442",
    description: "Proyector LED multipunto 30w de alto estándar de instalación.",
    priceRetail: 6580,
    priceWholesale: 5530,
    imageUrl: "CatalogoTerceros2/120442.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-626",
    name: "Proyector LED multipunto 50w",
    sku: "120443",
    description: "Proyector LED multipunto 50w de alto estándar de instalación.",
    priceRetail: 8420,
    priceWholesale: 8120,
    imageUrl: "CatalogoTerceros2/120443.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-627",
    name: "Proyector Led Multipunto con sensor de movimiento 10w",
    sku: "120444",
    description: "Proyector Led Multipunto con sensor de movimiento 10w de alto estándar de instalación.",
    priceRetail: 7000,
    priceWholesale: 6750,
    imageUrl: "CatalogoTerceros2/120444.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-628",
    name: "Proyector Led Multipunto con sensor de movimiento 20w",
    sku: "120445",
    description: "Proyector Led Multipunto con sensor de movimiento 20w de alto estándar de instalación.",
    priceRetail: 7800,
    priceWholesale: 7500,
    imageUrl: "CatalogoTerceros2/120445.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-629",
    name: "Proyector Led Multipunto con sensor de movimiento 30w",
    sku: "120446",
    description: "Proyector Led Multipunto con sensor de movimiento 30w de alto estándar de instalación.",
    priceRetail: 9000,
    priceWholesale: 8770,
    imageUrl: "CatalogoTerceros2/120446.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-630",
    name: "Proyector Led Multipunto con sensor de movimiento 50w",
    sku: "120446-50",
    description: "Proyector Led Multipunto con sensor de movimiento 50w de alto estándar de instalación.",
    priceRetail: 10560,
    priceWholesale: 10260,
    imageUrl: "CatalogoTerceros2/120446-50.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-631",
    name: "Adaptador simple 10A",
    sku: "159984",
    description: "Adaptador simple 10A de alto estándar de instalación.",
    priceRetail: 2000,
    priceWholesale: 1800,
    imageUrl: "CatalogoTerceros2/159984.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-632",
    name: "Alargador 3mts SL2714",
    sku: "159988",
    description: "Alargador 3mts SL2714 de alto estándar de instalación.",
    priceRetail: 7000,
    priceWholesale: 6800,
    imageUrl: "CatalogoTerceros2/159988.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-633",
    name: "Cable cordon 2x1.5 100MTS",
    sku: "040102",
    description: "Cable cordon 2x1.5 100MTS de alto estándar de instalación.",
    priceRetail: 154700,
    priceWholesale: 153000,
    imageUrl: "CatalogoTerceros2/040102.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-634",
    name: "Cable cordon de 3x2.5 100MTS",
    sku: "040102-3x2.5",
    description: "Cable cordon de 3x2.5 100MTS de alto estándar de instalación.",
    priceRetail: 185640,
    priceWholesale: 180000,
    imageUrl: "CatalogoTerceros2/040102-3x2.5.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-635",
    name: "Cable paralelo 2x20 Negro",
    sku: "040113",
    description: "Cable paralelo 2x20 Negro de alto estándar de instalación.",
    priceRetail: 52000,
    priceWholesale: 50000,
    imageUrl: "CatalogoTerceros2/040113.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-636",
    name: "Caja Chuqui para canaletas",
    sku: "159940",
    description: "Caja Chuqui para canaletas de alto estándar de instalación.",
    priceRetail: 1460,
    priceWholesale: 1160,
    imageUrl: "CatalogoTerceros2/159940.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-637",
    name: "Caja Estanca 100x100x7",
    sku: "160009",
    description: "Caja Estanca 100x100x7 de alto estándar de instalación.",
    priceRetail: 2690,
    priceWholesale: 2390,
    imageUrl: "CatalogoTerceros2/160009.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-638",
    name: "Caja Estanca 150x150x70",
    sku: "160010",
    description: "Caja Estanca 150x150x70 de alto estándar de instalación.",
    priceRetail: 4570,
    priceWholesale: 4270,
    imageUrl: "CatalogoTerceros2/160010.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-639",
    name: "Caja Estanca 80x80x50",
    sku: "160008",
    description: "Caja Estanca 80x80x50 de alto estándar de instalación.",
    priceRetail: 1530,
    priceWholesale: 1230,
    imageUrl: "CatalogoTerceros2/160008.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-640",
    name: "Caja Estanca 85x85x50",
    sku: "160007",
    description: "Caja Estanca 85x85x50 de alto estándar de instalación.",
    priceRetail: 1700,
    priceWholesale: 1400,
    imageUrl: "CatalogoTerceros2/160007.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-641",
    name: "Campana Timbre 3\\\"",
    sku: "140300",
    description: "Campana Timbre 3\\\" de alto estándar de instalación.",
    priceRetail: 7000,
    priceWholesale: 6800,
    imageUrl: "CatalogoTerceros2/140300.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-642",
    name: "Campana Timbre 4\\\"",
    sku: "140301",
    description: "Campana Timbre 4\\\" de alto estándar de instalación.",
    priceRetail: 8000,
    priceWholesale: 7800,
    imageUrl: "CatalogoTerceros2/140301.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-643",
    name: "Campana Timbre 6\\\"",
    sku: "140302",
    description: "Campana Timbre 6\\\" de alto estándar de instalación.",
    priceRetail: 13000,
    priceWholesale: 12800,
    imageUrl: "CatalogoTerceros2/140302.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-644",
    name: "Campana Timbre 8\\\"",
    sku: "140303",
    description: "Campana Timbre 8\\\" de alto estándar de instalación.",
    priceRetail: 16000,
    priceWholesale: 15800,
    imageUrl: "CatalogoTerceros2/140303.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-645",
    name: "Canoa para tubo led 1x18",
    sku: "160220",
    description: "Canoa para tubo led 1x18 de alto estándar de instalación.",
    priceRetail: 2370,
    priceWholesale: 2070,
    imageUrl: "CatalogoTerceros2/160220.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-646",
    name: "Enchufe hembra volante 16A",
    sku: "159973",
    description: "Enchufe hembra volante 16A de alto estándar de instalación.",
    priceRetail: 2000,
    priceWholesale: 1500,
    imageUrl: "CatalogoTerceros2/159973.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-647",
    name: "Enchufe macho plano 16A",
    sku: "159970",
    description: "Enchufe macho plano 16A de alto estándar de instalación.",
    priceRetail: 2000,
    priceWholesale: 1490,
    imageUrl: "CatalogoTerceros2/159970.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-648",
    name: "Enchufe macho volante 2p 10A",
    sku: "159970-2P",
    description: "Enchufe macho volante 2p 10A de alto estándar de instalación.",
    priceRetail: 1500,
    priceWholesale: 990,
    imageUrl: "CatalogoTerceros2/159970-2P.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-649",
    name: "Enchufe macho volante 3p 10A",
    sku: "159961",
    description: "Enchufe macho volante 3p 10A de alto estándar de instalación.",
    priceRetail: 1500,
    priceWholesale: 1200,
    imageUrl: "CatalogoTerceros2/159961.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-650",
    name: "Enchufe Triple Con Interruptor SL1048",
    sku: "159985",
    description: "Enchufe Triple Con Interruptor SL1048 de alto estándar de instalación.",
    priceRetail: 3900,
    priceWholesale: 3500,
    imageUrl: "CatalogoTerceros2/159985.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-651",
    name: "Gabinete metálico 1 puerta 300x200x150",
    sku: "160230",
    description: "Gabinete metálico 1 puerta 300x200x150 de alto estándar de instalación.",
    priceRetail: 19000,
    priceWholesale: 18700,
    imageUrl: "CatalogoTerceros2/160230.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-652",
    name: "Gabinete metálico 1 puerta 400x300x200",
    sku: "160231",
    description: "Gabinete metálico 1 puerta 400x300x200 de alto estándar de instalación.",
    priceRetail: 32900,
    priceWholesale: 32600,
    imageUrl: "CatalogoTerceros2/160231.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-653",
    name: "Gabinete metálico 1 puerta 500x400x200",
    sku: "160232",
    description: "Gabinete metálico 1 puerta 500x400x200 de alto estándar de instalación.",
    priceRetail: 46900,
    priceWholesale: 46400,
    imageUrl: "CatalogoTerceros2/160232.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-654",
    name: "Gabinete metálico 1 puerta 600x500x200",
    sku: "160233",
    description: "Gabinete metálico 1 puerta 600x500x200 de alto estándar de instalación.",
    priceRetail: 55600,
    priceWholesale: 55000,
    imageUrl: "CatalogoTerceros2/160233.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-655",
    name: "Interruptor Doble 9/15 10A-250V",
    sku: "159951",
    description: "Interruptor Doble 9/15 10A-250V de alto estándar de instalación.",
    priceRetail: 2100,
    priceWholesale: 1800,
    imageUrl: "CatalogoTerceros2/159951.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-656",
    name: "Interruptor doble 9/15 10A-250V Embutido",
    sku: "159967",
    description: "Interruptor doble 9/15 10A-250V Embutido de alto estándar de instalación.",
    priceRetail: 2000,
    priceWholesale: 1700,
    imageUrl: "CatalogoTerceros2/159967.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-657",
    name: "Interruptor simple 9/12 10A embutido",
    sku: "159966",
    description: "Interruptor simple 9/12 10A embutido de alto estándar de instalación.",
    priceRetail: 2000,
    priceWholesale: 1500,
    imageUrl: "CatalogoTerceros2/159966.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-658",
    name: "Interruptor simple 9/12 10A Sobrepuesto",
    sku: "159950",
    description: "Interruptor simple 9/12 10A Sobrepuesto de alto estándar de instalación.",
    priceRetail: 1590,
    priceWholesale: 1290,
    imageUrl: "CatalogoTerceros2/159950.jpg",
    category: "Electricidad"
  },
  {
    id: "prod-659",
    name: "Remarcador monofasico 220v 10(20)a 50hz Ip51",
    sku: "160182",
    description: "Remarcador monofasico 220v 10(20)a 50hz Ip51 de alto estándar de instalación.",
    priceRetail: 11000,
    priceWholesale: 10700,
    imageUrl: "CatalogoTerceros2/160182.jpg",
    category: "Electricidad"
  },

  {
    id: "prod-700",
    name: "Planchas OSB 11.1x2.44x1.22",
    sku: "OSB-111",
    description: "Planchas OSB 11.1x2.44x1.22 de terminación industrial y alta calidad.",
    priceRetail: 17890,
    priceWholesale: 16890,
    imageUrl: "CatalogoTerceros2/OSB-111.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-701",
    name: "Metal Siding Gris Madera Clara",
    sku: "SIDING-GMC",
    description: "Metal Siding Gris Madera Clara de terminación industrial y alta calidad.",
    priceRetail: 17990,
    priceWholesale: 16990,
    imageUrl: "CatalogoTerceros2/SIDING-GMC.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-702",
    name: "Metal Siding Gris Oscuro",
    sku: "SIDING-GO",
    description: "Metal Siding Gris Oscuro de terminación industrial y alta calidad.",
    priceRetail: 17990,
    priceWholesale: 16990,
    imageUrl: "CatalogoTerceros2/SIDING-GO.jpg",
    category: "Revestimientos"
  },

  {
    id: "prod-800",
    name: "Piso Flotante LH7049",
    sku: "LH7049",
    description: "Piso Flotante LH7049 de alta durabilidad y excelente acabo constructivo.",
    priceRetail: 21890,
    priceWholesale: 20890,
    imageUrl: "CatalogoTerceros2/LH7049.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-801",
    name: "Piso Flotante LH7101",
    sku: "LH7101",
    description: "Piso Flotante LH7101 de alta durabilidad y excelente acabo constructivo.",
    priceRetail: 21890,
    priceWholesale: 20890,
    imageUrl: "CatalogoTerceros2/LH7101.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-802",
    name: "Piso Flotante LH7114",
    sku: "LH7114",
    description: "Piso Flotante LH7114 de alta durabilidad y excelente acabo constructivo.",
    priceRetail: 21890,
    priceWholesale: 20890,
    imageUrl: "CatalogoTerceros2/LH7114.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-803",
    name: "Piso Flotante LH7146",
    sku: "LH7146",
    description: "Piso Flotante LH7146 de alta durabilidad y excelente acabo constructivo.",
    priceRetail: 21890,
    priceWholesale: 20890,
    imageUrl: "CatalogoTerceros2/LH7146.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-804",
    name: "Piso Flotante LH7198",
    sku: "LH7198",
    description: "Piso Flotante LH7198 de alta durabilidad y excelente acabo constructivo.",
    priceRetail: 21890,
    priceWholesale: 20890,
    imageUrl: "CatalogoTerceros2/LH7198.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-805",
    name: "Piso Flotante LH7374",
    sku: "LH7374",
    description: "Piso Flotante LH7374 de alta durabilidad y excelente acabo constructivo.",
    priceRetail: 21890,
    priceWholesale: 20890,
    imageUrl: "CatalogoTerceros2/LH7374.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-806",
    name: "Piso Flotante LH7375",
    sku: "LH7375",
    description: "Piso Flotante LH7375 de alta durabilidad y excelente acabo constructivo.",
    priceRetail: 21890,
    priceWholesale: 20890,
    imageUrl: "CatalogoTerceros2/LH7375.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-807",
    name: "Piso Flotante LH7794",
    sku: "LH7794",
    description: "Piso Flotante LH7794 de alta durabilidad y excelente acabo constructivo.",
    priceRetail: 21890,
    priceWholesale: 20890,
    imageUrl: "CatalogoTerceros2/LH7794.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-808",
    name: "Malla Electrosoldada Galv 1G 3.8mm 1.85x3mts",
    sku: "MALLA-1G",
    description: "Malla Electrosoldada Galv 1G 3.8mm 1.85x3mts de alta durabilidad y excelente acabo constructivo.",
    priceRetail: 17790,
    priceWholesale: 17790,
    imageUrl: "CatalogoTerceros2/MALLA-1G.jpg",
    category: "Fijaciones"
  },
  {
    id: "prod-809",
    name: "PANEL CIELO PVC BLANCO 250x3800mm",
    sku: "CIELO-PVC-B",
    description: "PANEL CIELO PVC BLANCO 250x3800mm de alta durabilidad y excelente acabo constructivo.",
    priceRetail: 5990,
    priceWholesale: 5990,
    imageUrl: "CatalogoTerceros2/CIELO-PVC-B.jpg",
    category: "Revestimientos"
  },
  {
    id: "prod-810",
    name: "CIELO PVC Blanco Vetas Madera 10 250X3800mm",
    sku: "CIELO-PVC-BM",
    description: "CIELO PVC Blanco Vetas Madera 10 250X3800mm de alta durabilidad y excelente acabo constructivo.",
    priceRetail: 5990,
    priceWholesale: 5990,
    imageUrl: "CatalogoTerceros2/CIELO-PVC-BM.jpg",
    category: "Revestimientos"
  },
];
