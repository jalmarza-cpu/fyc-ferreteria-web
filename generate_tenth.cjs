const fs = require('fs');

const constantsPath = './constants.tsx';
let constantsContent = fs.readFileSync(constantsPath, 'utf8');

const catalog = [
  // Image 1 -- Pisos Flotantes
  { sku: "LH7020", name: "Piso Flotante LH7020", retail: 21890, wholesale: 20890, category: "Revestimientos" },
  { sku: "LH7049", name: "Piso Flotante LH7049", retail: 21890, wholesale: 20890, category: "Revestimientos" },
  { sku: "LH7101", name: "Piso Flotante LH7101", retail: 21890, wholesale: 20890, category: "Revestimientos" },
  { sku: "LH7114", name: "Piso Flotante LH7114", retail: 21890, wholesale: 20890, category: "Revestimientos" },
  { sku: "LH7146", name: "Piso Flotante LH7146", retail: 21890, wholesale: 20890, category: "Revestimientos" },
  { sku: "LH7198", name: "Piso Flotante LH7198", retail: 21890, wholesale: 20890, category: "Revestimientos" },
  { sku: "LH7374", name: "Piso Flotante LH7374", retail: 21890, wholesale: 20890, category: "Revestimientos" },
  { sku: "LH7375", name: "Piso Flotante LH7375", retail: 21890, wholesale: 20890, category: "Revestimientos" },
  { sku: "LH7794", name: "Piso Flotante LH7794", retail: 21890, wholesale: 20890, category: "Revestimientos" },

  // Image 2 -- Malla y Cielos PVC
  { sku: "MALLA-1G", name: "Malla Electrosoldada Galv 1G 3.8mm 1.85x3mts", retail: 17790, wholesale: 17790, category: "Fijaciones" },
  { sku: "CIELO-PVC-B", name: "PANEL CIELO PVC BLANCO 250x3800mm", retail: 5990, wholesale: 5990, category: "Revestimientos" },
  { sku: "CIELO-PVC-BM", name: "CIELO PVC Blanco Vetas Madera 10 250X3800mm", retail: 5990, wholesale: 5990, category: "Revestimientos" }
];

let toAppend = '';
let prodIdCount = 800; // start at 800 for safety

for (const item of catalog) {
  const saneNameForRegex = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const exactCheckStr = 'name: "' + saneNameForRegex.replace(/"/g, '\\\\\"') + '"';
  
  if (!constantsContent.includes(exactCheckStr) && !constantsContent.includes('name: "' + item.name + '"') && !constantsContent.includes('sku: "' + item.sku + '"')) {
     toAppend += '\n  {\n';
     toAppend += '    id: "prod-' + (prodIdCount++) + '",\n';
     const saneName = item.name.replace(/"/g, '\\\\\\"');
     toAppend += '    name: "' + saneName + '",\n';
     toAppend += '    sku: "' + item.sku + '",\n';
     toAppend += '    description: "' + saneName + ' de alta durabilidad y excelente acabo constructivo.",\n';
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
console.log('Appended missed items from Pisos and PVC panels.');
