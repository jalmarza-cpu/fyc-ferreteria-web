const fs = require('fs');

const constantsPath = './constants.tsx';
let constantsContent = fs.readFileSync(constantsPath, 'utf8');

const catalog = [
  // Image 1 -- Planchas and Revestimiento
  { sku: "1671", name: "Plancha UV tipo mármol", retail: 25000, wholesale: 17990, category: "Revestimientos", imageUrl: "CatalogoTerceros2/1671.jpg" },
  { sku: "ESQ-UN", name: "Esquineros y Uniones", retail: 2990, wholesale: 2600, category: "Revestimientos", imageUrl: "CatalogoTerceros2/ESQ-UN.jpg" },
  { sku: "SIL-995A", name: "Silicona 995A", retail: 2700, wholesale: 2500, category: "Fijaciones", imageUrl: "CatalogoTerceros2/SIL-995A.jpg" },
  { sku: "OSB-111", name: "Planchas OSB 11.1x2.44x1.22", retail: 17890, wholesale: 16890, category: "Revestimientos", imageUrl: "CatalogoTerceros2/OSB-111.jpg" },

  // Image 2 -- Siding
  { sku: "SIDING-G", name: "Metal Siding Gris", retail: 17990, wholesale: 16990, category: "Revestimientos", imageUrl: "CatalogoTerceros2/SIDING-G.jpg" },
  { sku: "SIDING-GMC", name: "Metal Siding Gris Madera Clara", retail: 17990, wholesale: 16990, category: "Revestimientos", imageUrl: "CatalogoTerceros2/SIDING-GMC.jpg" },
  { sku: "SIDING-GO", name: "Metal Siding Gris Oscuro", retail: 17990, wholesale: 16990, category: "Revestimientos", imageUrl: "CatalogoTerceros2/SIDING-GO.jpg" }
];

let toAppend = '';
let prodIdCount = 700; // start at 700 for safety

for (const item of catalog) {
  const saneNameForRegex = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const exactCheckStr = 'name: "' + saneNameForRegex.replace(/"/g, '\\\\\"') + '"';
  
  if (!constantsContent.includes(exactCheckStr) && !constantsContent.includes('name: "' + item.name + '"') && !constantsContent.includes('sku: "' + item.sku + '"')) {
     toAppend += '\n  {\n';
     toAppend += '    id: "prod-' + (prodIdCount++) + '",\n';
     const saneName = item.name.replace(/"/g, '\\\\\\"');
     toAppend += '    name: "' + saneName + '",\n';
     toAppend += '    sku: "' + item.sku + '",\n';
     toAppend += '    description: "' + saneName + ' de terminación industrial y alta calidad.",\n';
     toAppend += '    priceRetail: ' + item.retail + ',\n';
     toAppend += '    priceWholesale: ' + item.wholesale + ',\n';
     toAppend += '    imageUrl: "' + item.imageUrl + '",\n';
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
console.log('Appended missed items from Revestimientos and Terminaciones.');
