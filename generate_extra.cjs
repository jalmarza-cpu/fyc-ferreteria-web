const fs = require('fs');

const constantsPath = './constants.tsx';
let constantsContent = fs.readFileSync(constantsPath, 'utf8');

const catalog = [
  // Image 2 - Escuadras, Espatulas, Extractor
  { sku: "011143", name: "Escuadra de acero 12\"", retail: 2340, wholesale: 2040, category: "Medición" },
  { sku: "011140", name: "escuadra de acero 6\"", retail: 1050, wholesale: 850, category: "Medición" },
  { sku: "010925", name: "Escuadra repisa 4x5", retail: 790, wholesale: 490, category: "Fijaciones" },
  { sku: "011161", name: "Escuadra repisa 5x6", retail: 810, wholesale: 510, category: "Fijaciones" },
  { sku: "011161", name: "Espatula de 1 1/2\"", retail: 980, wholesale: 680, category: "Revestimientos" },
  { sku: "011160", name: "Espatula de 1\"", retail: 800, wholesale: 500, category: "Revestimientos" },
  { sku: "011163", name: "Espatula de 2 1/2\"", retail: 1150, wholesale: 850, category: "Revestimientos" },
  { sku: "011162", name: "Espatula de 2", retail: 1070, wholesale: 770, category: "Revestimientos" },
  { sku: "011164", name: "Espatula de 3\"", retail: 1240, wholesale: 940, category: "Revestimientos" },
  { sku: "011165", name: "Espatula de 4\"", retail: 1320, wholesale: 1020, category: "Revestimientos" },
  { sku: "011165", name: "Espatula de 5\"", retail: 1570, wholesale: 1270, category: "Revestimientos" },
  { sku: "010660", name: "Extractor de poleas 3\"", retail: 4800, wholesale: 4500, category: "Herramientas Manuales" },

  // Image 3 - Destornilladores y Discos
  { sku: "011004", name: "Set destornillador estrella 2 piezas", retail: 1390, wholesale: 1090, category: "Herramientas Manuales" },
  { sku: "011003", name: "Set destornillador Pin 5 piezas", retail: 3300, wholesale: 3000, category: "Herramientas Manuales" },
  { sku: "011003", name: "Set destornillador relojero 6 piezas", retail: 1200, wholesale: 900, category: "Herramientas Manuales" },
  { sku: "011003", name: "set destornillados JG070", retail: 1800, wholesale: 1100, category: "Herramientas Manuales" },
  { sku: "140140", name: "Disco de Corte para Fierro 115mm", retail: 1000, wholesale: 830, category: "Herramientas Manuales" },
  { sku: "140141", name: "Disco de Corte para Fierro 180mm", retail: 1790, wholesale: 1490, category: "Herramientas Manuales" },
  { sku: "070429", name: "Disco Diamon Especial 115mm", retail: 3300, wholesale: 3000, category: "Herramientas Manuales" },
  { sku: "070436", name: "Disco Diamon Mojado 180mm", retail: 4790, wholesale: 4490, category: "Herramientas Manuales" },
  { sku: "070430", name: "Disco Dn Seco 115mm", retail: 4000, wholesale: 3750, category: "Herramientas Manuales" },
  { sku: "140110", name: "Hoja sierra circular 4-1/2\" 18 Dientes", retail: 4000, wholesale: 3740, category: "Herramientas Manuales" },
  { sku: "140111", name: "Hoja sierra circular 4-1/2\" 24 Dientes", retail: 4000, wholesale: 3740, category: "Herramientas Manuales" },
  { sku: "140114", name: "Hoja sierra circular 9\" 24 Dientes", retail: 7000, wholesale: 6740, category: "Herramientas Manuales" },

  // Image 4 - Jardín, Tijeras, Llaves
  { sku: "070198", name: "Barre Hojas Extensible R121", retail: 3500, wholesale: 3000, category: "Herramientas Manuales" },
  { sku: "070199", name: "Barre Hojas R112A", retail: 5550, wholesale: 2250, category: "Herramientas Manuales" },
  { sku: "070190", name: "Horqueta F111.", retail: 6230, wholesale: 5930, category: "Herramientas Manuales" },
  { sku: "070197", name: "Rastrillo R103-140D Rojo", retail: 2550, wholesale: 2250, category: "Herramientas Manuales" },
  { sku: "070244", name: "Tijera De Jardin 8\"", retail: 2780, wholesale: 2480, category: "Herramientas Manuales" },
  { sku: "070249", name: "Tijera de pasto SK606 12\"", retail: 6830, wholesale: 6530, category: "Herramientas Manuales" },
  { sku: "070243", name: "Tijera De Uva 8\"", retail: 2550, wholesale: 2250, category: "Herramientas Manuales" },
  { sku: "070253", name: "Tijeras de Lata Avion 10", retail: 4000, wholesale: 3750, category: "Herramientas Manuales" },
  { sku: "070253", name: "Tijeras De Podar 10\"", retail: 4750, wholesale: 4350, category: "Herramientas Manuales" },
  { sku: "010413", name: "Llave Francesa 12\"", retail: 6600, wholesale: 6300, category: "Herramientas Manuales" },
  { sku: "010415", name: "Llave Francesa 18\"", retail: 22800, wholesale: 22500, category: "Herramientas Manuales" },
  { sku: "010410", name: "Llave Francesa 6\"", retail: 2100, wholesale: 1800, category: "Herramientas Manuales" },

  // Image 5 - Extractor, Formones, Guantes
  { sku: "010661", name: "Extractor de poleas 4\"", retail: 5650, wholesale: 5250, category: "Herramientas Manuales" },
  { sku: "010662", name: "Extractor de poleas 6\"", retail: 7000, wholesale: 6750, category: "Herramientas Manuales" },
  { sku: "010662", name: "Extractor de poleas 8\"", retail: 7600, wholesale: 7200, category: "Herramientas Manuales" },
  { sku: "070093", name: "Formon suelto 1- 1/5\"", retail: 3600, wholesale: 3300, category: "Herramientas Manuales" },
  { sku: "070093", name: "Set de formon 4 piezas", retail: 7650, wholesale: 7350, category: "Herramientas Manuales" },
  { sku: "011", name: "Guante albañil goma", retail: 1580, wholesale: 1280, category: "Revestimientos" }, // Assuming PPE can go anywhere, maybe "Fijaciones" or "Revestimientos", I'll put it in Herramientas Manuales
  { sku: "011667", name: "Guante de goma para aseo", retail: 780, wholesale: 380, category: "Herramientas Manuales" },
  { sku: "011659", name: "Guante Pigmentado", retail: 700, wholesale: 360, category: "Herramientas Manuales" },
  { sku: "011663", name: "Guantes de cuero", retail: 4000, wholesale: 3750, category: "Herramientas Manuales" },
  { sku: "011661", name: "Guantes de goma azul", retail: 1320, wholesale: 1020, category: "Herramientas Manuales" },
  { sku: "011662", name: "Guantes de goma negra", retail: 750, wholesale: 450, category: "Herramientas Manuales" },
  { sku: "011662", name: "Guantes de goma verde", retail: 750, wholesale: 450, category: "Herramientas Manuales" }
];

let toAppend = '';
let prodIdCount = 200;

for (const item of catalog) {
  const saneNameForRegex = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (!constantsContent.includes('name: "' + saneNameForRegex + '"') && !constantsContent.includes('name: "' + item.name + '"')) {
     toAppend += '\n  {\n';
     toAppend += '    id: "prod-' + (prodIdCount++) + '",\n';
     const saneName = item.name.replace(/"/g, '\\\\\\"');
     toAppend += '    name: "' + saneName + '",\n';
     toAppend += '    sku: "' + item.sku + '",\n';
     toAppend += '    description: "' + saneName + ' de excelente calidad profesional.",\n';
     toAppend += '    priceRetail: ' + item.retail + ',\n';
     toAppend += '    priceWholesale: ' + item.wholesale + ',\n';
     toAppend += '    imageUrl: "CatalogoExtra/' + item.sku + '.jpg",\n';
     toAppend += '    category: "' + (item.name.includes("Guante") ? "Herramientas Manuales" : item.category) + '"\n';
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
console.log('Appended missed items from the 4 extra images.');
