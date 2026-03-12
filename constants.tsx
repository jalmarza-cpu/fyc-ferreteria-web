
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
  "Herramientas Manuales",
  "Maquinaria",
  "Fijaciones",
  "Revestimientos",
  "Electricidad",
  "Gasfitería",
  "Medición"
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
    sku: "07012",
    description: "Martillo mecánico 100g para uso profesional.",
    priceRetail: 1490,
    priceWholesale: 1190,
    imageUrl: "Herramientas Manuales/07012.jpg",
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
];
