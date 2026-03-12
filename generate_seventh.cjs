const fs = require('fs');

const constantsPath = './constants.tsx';
let constantsContent = fs.readFileSync(constantsPath, 'utf8');

const catalog = [
  // Image 1 -- Ampolletas and Campanas Policarbonato
  { sku: "160815", name: "Ampolleta Led 12w 3500k", retail: 1680, wholesale: 1380, category: "Electricidad" },
  { sku: "160810-160811", name: "Ampolleta Led 5w 6500k-3500k", retail: 1300, wholesale: 1000, category: "Electricidad" },
  { sku: "160832", name: "Ampolleta Led 7w 6500k", retail: 1390, wholesale: 1090, category: "Electricidad" },
  { sku: "160812-160813", name: "Ampolleta Led 9w 6500k-3500k", retail: 1490, wholesale: 1190, category: "Electricidad" },
  { sku: "160836-160837", name: "Ampolleta Led GU-10 5w 6500k-3500k", retail: 1800, wholesale: 1500, category: "Electricidad" },
  { sku: "160841-160842", name: "Ampolleta Led M-T 20w 6500k-3500k", retail: 2890, wholesale: 2590, category: "Electricidad" },
  { sku: "160843-160844", name: "Ampolleta Led M-T 28w 6500k-3500k E27", retail: 3790, wholesale: 3490, category: "Electricidad" },
  { sku: "160845-160846", name: "Ampolleta Led M-T 36w 6500k-3500k E27", retail: 4690, wholesale: 4190, category: "Electricidad" }, // Estimate wholesale based on others
  { sku: "160847-160848", name: "Ampolleta Led M-T 45w 6500k-3500k E27", retail: 5500, wholesale: 5300, category: "Electricidad" },
  { sku: "160027", name: "Ampolleta Tubular Led 100w E-40", retail: 28490, wholesale: 28190, category: "Electricidad" },
  { sku: "140250", name: "Campa Policarbonato con Gancho E27 12\"", retail: 18150, wholesale: 17850, category: "Electricidad" },
  { sku: "140257", name: "Campa Policarbonato con Gancho E27 22\"", retail: 28490, wholesale: 28190, category: "Electricidad" },

  // Image 2 -- Focos Led y Piscinas
  { sku: "120926-120927", name: "Foco Led ZH-COB0252 25w 6500K-3500K", retail: 8550, wholesale: 8250, category: "Electricidad" },
  { sku: "120900-120700", name: "Foco Led ZH-COB052 5w 6500K-3500K", retail: 6000, wholesale: 5750, category: "Electricidad" },
  { sku: "120800-120801", name: "Foco Led ZH-TD3 3w 6500-3500K", retail: 1270, wholesale: 970, category: "Electricidad" },
  { sku: "120802-120803", name: "Foco Led ZH-TD4 4w 6500-3500K", retail: 1720, wholesale: 1420, category: "Electricidad" },
  { sku: "120808-120809", name: "Foco Led ZH-TD7 7w 6500-3500K", retail: 2500, wholesale: 2240, category: "Electricidad" },
  { sku: "120028", name: "Lampara Estaca LEd 3w blanca", retail: 7720, wholesale: 7420, category: "Electricidad" },
  { sku: "120029", name: "Lampara Estaca LEd 3w Negra", retail: 7720, wholesale: 7420, category: "Electricidad" },
  { sku: "120029-PISCINA", name: "Lampara Led de piscina RGB 12v 12w", retail: 55000, wholesale: 54600, category: "Electricidad" }, // Adjusted SKU to prevent clash with estaca
  { sku: "150003", name: "Lampara Led de piscina RGB 12v 15w", retail: 57900, wholesale: 57600, category: "Electricidad" },
  { sku: "150004", name: "Lampara Led de piscina RGB 12v 18w", retail: 59700, wholesale: 59400, category: "Electricidad" },
  { sku: "150005", name: "Lampara Led de piscina RGB 12v 24w", retail: 69900, wholesale: 69600, category: "Electricidad" },
  { sku: "120920-120921-PISCINA", name: "Lampara Led de piscina RGB 12v 6w", retail: 42500, wholesale: 42000, category: "Electricidad" },

  // Image 3 -- Campanas UFO y Canoas
  { sku: "160136", name: "Campana led multipunto 180w", retail: 31550, wholesale: 31250, category: "Electricidad" },
  { sku: "120479", name: "Campana Ufo Led 100w N°2", retail: 24670, wholesale: 24370, category: "Electricidad" },
  { sku: "120480", name: "Campana Ufo Led 150w N°2", retail: 34000, wholesale: 33750, category: "Electricidad" },
  { sku: "120478", name: "Campana Ufo Led 200w", retail: 67390, wholesale: 66940, category: "Electricidad" },
  { sku: "120481", name: "Campana Ufo Led 200w N°2", retail: 45000, wholesale: 43750, category: "Electricidad" },
  { sku: "120482", name: "Campana Ufo N°1 Led 100w", retail: 30000, wholesale: 28500, category: "Electricidad" },
  { sku: "120483", name: "Campana Ufo N°1 Led 150w", retail: 45000, wholesale: 43750, category: "Electricidad" },
  { sku: "040231", name: "Canoa acrilica con tubo led 1x18w", retail: 9990, wholesale: 4390, category: "Electricidad" },
  { sku: "040230", name: "Canoa acrilica con tubo led 2x18w", retail: 13630, wholesale: 13330, category: "Electricidad" },
  { sku: "120140", name: "Canoa T5 28w con tubo amarillo", retail: 5460, wholesale: 5160, category: "Electricidad" },
  { sku: "120143", name: "Canoa T5 28w con tubo Azul", retail: 5460, wholesale: 5160, category: "Electricidad" },
  { sku: "120144", name: "Canoa T5 28w con tubo Negro", retail: 5730, wholesale: 5430, category: "Electricidad" },

  // Image 4 -- Canoas Colores y Focos Embutidos
  { sku: "120141", name: "Canoa T5 28w con tubo rojo", retail: 5460, wholesale: 5160, category: "Electricidad" },
  { sku: "120142", name: "Canoa T5 28w con tubo verde", retail: 5460, wholesale: 5160, category: "Electricidad" },
  { sku: "120142-LED", name: "Canoa T5 con Tubo Led compacto 16w 6500k", retail: 6580, wholesale: 6280, category: "Electricidad" },
  { sku: "160804", name: "Tubo Led 18W 6500k", retail: 2600, wholesale: 2300, category: "Electricidad" },
  { sku: "160805", name: "Tubo Led 9W 6500k", retail: 2300, wholesale: 2000, category: "Electricidad" },
  { sku: "120051-120056", name: "Foco Embutido led 5w 6500k-3500k", retail: 3000, wholesale: 2700, category: "Electricidad" },
  { sku: "120053-120058", name: "Foco Embutido led 9w 6500k-3500k", retail: 3870, wholesale: 3570, category: "Electricidad" },
  { sku: "120700", name: "Foco Led TH-003 3w 3500K", retail: 5550, wholesale: 5250, category: "Electricidad" },
  { sku: "120094-120703", name: "Foco Led TH-009 9w 6500K-3500K", retail: 8900, wholesale: 8700, category: "Electricidad" },
  { sku: "120095-120705", name: "Foco Led TH-012 12w 6500K-3500K", retail: 10450, wholesale: 10150, category: "Electricidad" },
  { sku: "120906-120907", name: "Foco Led ZH-COB0102 10w 6500k-3500k", retail: 7300, wholesale: 7000, category: "Electricidad" },
  { sku: "120920-120921", name: "Foco Led ZH-COB0202 20w 6500k-3500k", retail: 7000, wholesale: 6750, category: "Electricidad" },

  // Image 5 -- Maquinaria y Alta Eficiencia
  { sku: "130218", name: "Maquina para Desgrano de Choclo", retail: 350000, wholesale: 328000, category: "Maquinaria" },
  { sku: "011419", name: "Maquina para Moler Grano blando", retail: 285000, wholesale: 281750, category: "Maquinaria" },
  { sku: "130219", name: "Maquina para Moler Granos", retail: 450000, wholesale: 420000, category: "Maquinaria" },
  { sku: "TRANSPALETA", name: "Transpaleta 2000KG NO 1", retail: 260000, wholesale: 253000, category: "Maquinaria" },
  { sku: "160416", name: "Alta eficiencia 1x18 sobrepuesta", retail: 8500, wholesale: 8000, category: "Electricidad" },
  { sku: "160414", name: "Alta eficiencia 2 x 18 w Sobrepuesto", retail: 24300, wholesale: 23800, category: "Electricidad" },
  { sku: "160400", name: "Alta eficiencia 2x9 sobrepuesta", retail: 17390, wholesale: 16890, category: "Electricidad" },
  { sku: "160400-3X18", name: "Alta Eficiencia 3x18 sobrepuesta", retail: 35500, wholesale: 35000, category: "Electricidad" },
  { sku: "160026", name: "Ampolleta Champiñon Led 100w E-27", retail: 28490, wholesale: 28190, category: "Electricidad" },
  { sku: "160027", name: "Ampolleta Champiñon Led 150w E-27", retail: 32170, wholesale: 31870, category: "Electricidad" },
  { sku: "160025", name: "Ampolleta Champiñon Led 50w E-27", retail: 15170, wholesale: 14870, category: "Electricidad" },
  { sku: "160840-160839", name: "Ampolleta Led 10w 6500k-3500k", retail: 1490, wholesale: 1190, category: "Electricidad" }
];

let toAppend = '';
let prodIdCount = 500; // start at 500 for safety

for (const item of catalog) {
  const saneNameForRegex = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const exactCheckStr = 'name: "' + saneNameForRegex.replace(/"/g, '\\\\\"') + '"';
  
  if (!constantsContent.includes(exactCheckStr) && !constantsContent.includes('name: "' + item.name + '"')) {
     toAppend += '\n  {\n';
     toAppend += '    id: "prod-' + (prodIdCount++) + '",\n';
     const saneName = item.name.replace(/"/g, '\\\\\\"');
     toAppend += '    name: "' + saneName + '",\n';
     toAppend += '    sku: "' + item.sku + '",\n';
     toAppend += '    description: "' + saneName + ' de alto rendimiento industrial.",\n';
     toAppend += '    priceRetail: ' + item.retail + ',\n';
     toAppend += '    priceWholesale: ' + item.wholesale + ',\n';
     toAppend += '    imageUrl: "CatalogoTerceros2/' + item.sku + '.jpg",\n';
     toAppend += '    category: "' + item.category + '"\n';
     toAppend += '  },';
  }
}

if (toAppend.length > 0) {
    const lastBracketIndex = constantsContent.lastIndexOf('];');
    if (lastBracketIndex !== -1) {
        constantsContent = constantsContent.slice(0, lastBracketIndex) + toAppend + '\n];' + constantsContent.slice(lastBracketIndex + 2);
    }
}

fs.writeFileSync(constantsPath, constantsContent);
console.log('Appended missed items from the latest 5 illumination images.');
