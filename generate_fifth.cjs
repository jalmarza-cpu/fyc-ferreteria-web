const fs = require('fs');

const constantsPath = './constants.tsx';
let constantsContent = fs.readFileSync(constantsPath, 'utf8');

const catalog = [
  // Image 1 -- Prensas and Reglas
  { sku: "010826", name: "Prensa F 60x500", retail: 13990, wholesale: 13500, category: "Herramientas Manuales" },
  { sku: "010829", name: "Prensa F 80x250", retail: 19500, wholesale: 14250, category: "Herramientas Manuales" },
  { sku: "010830", name: "Prensa F 80x300", retail: 15500, wholesale: 15000, category: "Herramientas Manuales" },
  { sku: "010834", name: "Prensa F 80x500", retail: 18500, wholesale: 18000, category: "Herramientas Manuales" },
  { sku: "010836", name: "Prensa F 80x600", retail: 20750, wholesale: 20250, category: "Herramientas Manuales" },
  { sku: "010838", name: "Prensa F 80x700", retail: 23750, wholesale: 23250, category: "Herramientas Manuales" },
  { sku: "010809", name: "Prensa F 50x150", retail: 4000, wholesale: 3750, category: "Herramientas Manuales" },
  { sku: "010810", name: "Prensa F 50x200", retail: 4900, wholesale: 4500, category: "Herramientas Manuales" },
  { sku: "010811", name: "Prensa F 50x250", retail: 6500, wholesale: 6000, category: "Herramientas Manuales" },
  { sku: "010838", name: "Prensa G 2\"", retail: 1500, wholesale: 1130, category: "Herramientas Manuales" },
  { sku: "011900", name: "Regla de acero 12\"", retail: 1990, wholesale: 1500, category: "Medición" },
  { sku: "011900", name: "Regla de acero 24\"", retail: 3600, wholesale: 3300, category: "Medición" },

  // Image 2 -- Llaves and Napoleones
  { sku: "010410", name: "Llave Francesa 8\"", retail: 3000, wholesale: 2700, category: "Herramientas Manuales" },
  { sku: "010021", name: "Llave pipa 10mm", retail: 1440, wholesale: 1140, category: "Herramientas Manuales" },
  { sku: "010022", name: "Llave pipa 11mm", retail: 1790, wholesale: 1330, category: "Herramientas Manuales" },
  { sku: "010023", name: "Llave pipa 12mm", retail: 1820, wholesale: 1520, category: "Herramientas Manuales" },
  { sku: "010024", name: "Llave pipa 13mm", retail: 2000, wholesale: 1720, category: "Herramientas Manuales" },
  { sku: "010025", name: "Llave pipa 14mm", retail: 2200, wholesale: 1900, category: "Herramientas Manuales" },
  { sku: "010026", name: "Llave pipa 15mm", retail: 2390, wholesale: 2090, category: "Herramientas Manuales" },
  { sku: "010027", name: "Tijeras de Lata Avion 10", retail: 2870, wholesale: 2570, category: "Herramientas Manuales" },
  { sku: "010028", name: "Llave pipa 19mm", retail: 2870, wholesale: 2570, category: "Herramientas Manuales" },
  { sku: "010028", name: "Llave pipa 8mm", retail: 1260, wholesale: 960, category: "Herramientas Manuales" },
  { sku: "011769", name: "Napoleon de 12\"", retail: 4790, wholesale: 4490, category: "Herramientas Manuales" },
  { sku: "011771", name: "Napoleon de 14\"", retail: 5790, wholesale: 5390, category: "Herramientas Manuales" },

  // Image 3 -- Napoleones and Niveles
  { sku: "011773", name: "Napoleon de 24\"", retail: 10390, wholesale: 10090, category: "Herramientas Manuales" },
  { sku: "011773", name: "Napoleon de 30\"", retail: 14550, wholesale: 14250, category: "Herramientas Manuales" },
  { sku: "011071", name: "Nivel Aluminio 10\"", retail: 1740, wholesale: 1340, category: "Medición" },
  { sku: "011073", name: "Nivel aluminio 14\"", retail: 2250, wholesale: 1950, category: "Medición" },
  { sku: "011074", name: "Nivel aluminio 16\"", retail: 3000, wholesale: 2700, category: "Medición" },
  { sku: "011075", name: "Nivel aluminio 18\"", retail: 3500, wholesale: 3000, category: "Medición" },
  { sku: "011076", name: "Nivel aluminio 20\"", retail: 3500, wholesale: 3300, category: "Medición" },
  { sku: "011085", name: "Nivel aluminio 20\" con iman", retail: 4500, wholesale: 4200, category: "Medición" },
  { sku: "011077", name: "Nivel aluminio 22\"", retail: 4000, wholesale: 3750, category: "Medición" },
  { sku: "011078", name: "Nivel aluminio 24\"", retail: 4350, wholesale: 4050, category: "Medición" },
  { sku: "011087", name: "Nivel aluminio 24\" con iman", retail: 5550, wholesale: 5250, category: "Medición" },
  { sku: "011079", name: "Nivel aluminio 26\"", retail: 4800, wholesale: 4500, category: "Medición" },

  // Image 4 -- Niveles, Pasadores y Planas
  { sku: "011088", name: "Nivel aluminio 26\" con iman", retail: 6000, wholesale: 5700, category: "Medición" },
  { sku: "011081", name: "Nivel aluminio 48\"", retail: 5550, wholesale: 5250, category: "Medición" },
  { sku: "011081", name: "Nivel topedo 9\"", retail: 2550, wholesale: 2250, category: "Medición" },
  { sku: "030312", name: "Pasadores para ventana 3\"", retail: 380, wholesale: 180, category: "Fijaciones" },
  { sku: "030313", name: "Pasadores para ventana 4\"", retail: 390, wholesale: 190, category: "Fijaciones" },
  { sku: "030314", name: "Pasadores para ventana 5\"", retail: 470, wholesale: 270, category: "Fijaciones" },
  { sku: "030315", name: "Pasadores para ventana 6\"", retail: 490, wholesale: 290, category: "Fijaciones" },
  { sku: "030315", name: "Pasadores para ventana 8\"", retail: 560, wholesale: 360, category: "Fijaciones" },
  { sku: "011730", name: "Plana con punta cuadrada 5\"", retail: 1370, wholesale: 1170, category: "Herramientas Manuales" },
  { sku: "011731", name: "Plana con punta cuadrada 6\"", retail: 1580, wholesale: 1280, category: "Herramientas Manuales" },
  { sku: "011732", name: "Plana con punta cuadrada 7\"", retail: 1950, wholesale: 1650, category: "Herramientas Manuales" },
  { sku: "011733", name: "Plana con punta cuadrada 8\"", retail: 2000, wholesale: 1880, category: "Herramientas Manuales" },

  // Image 5 -- Planas, Prensas y Pasadores
  { sku: "011734", name: "Plana con punta redonda 5\"", retail: 1330, wholesale: 1130, category: "Herramientas Manuales" },
  { sku: "011735", name: "Plana con punta redonda 6\"", retail: 1580, wholesale: 1280, category: "Herramientas Manuales" },
  { sku: "011736", name: "Plana con punta redonda 7\"", retail: 1720, wholesale: 1420, category: "Herramientas Manuales" },
  { sku: "011736", name: "Plana con punta redonda 8\"", retail: 2000, wholesale: 1880, category: "Herramientas Manuales" },
  { sku: "010870", name: "Prensa esquina 4\"", retail: 4900, wholesale: 4500, category: "Herramientas Manuales" },
  { sku: "010808", name: "Pasadores para ventana 5\"", retail: 3000, wholesale: 2850, category: "Fijaciones" },
  { sku: "010820", name: "Prensa F 60x200", retail: 9990, wholesale: 9750, category: "Herramientas Manuales" },
  { sku: "010821", name: "Prensa F 60x250", retail: 10990, wholesale: 10500, category: "Herramientas Manuales" },
  { sku: "010823", name: "Prensa F 60x300", retail: 12500, wholesale: 12000, category: "Herramientas Manuales" }
];

let toAppend = '';
let prodIdCount = 300; // start at 300 to not conflict with previous prod-ids

for (const item of catalog) {
  const saneNameForRegex = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Check if item name exists exactly
  const hasItem = constantsContent.includes('name: "' + saneNameForRegex.replace(/"/g, '\\\\\"') + '"') || constantsContent.includes('name: "' + item.name + '"');
  
  if (!hasItem) {
     toAppend += '\n  {\n';
     toAppend += '    id: "prod-' + (prodIdCount++) + '",\n';
     const saneName = item.name.replace(/"/g, '\\\\\\"');
     toAppend += '    name: "' + saneName + '",\n';
     toAppend += '    sku: "' + item.sku + '",\n';
     toAppend += '    description: "' + saneName + ' resistente y duradero.",\n';
     toAppend += '    priceRetail: ' + item.retail + ',\n';
     toAppend += '    priceWholesale: ' + item.wholesale + ',\n';
     toAppend += '    imageUrl: "CatalogoTerceros/' + item.sku + '.jpg",\n';
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
console.log('Appended missed items from the 5 newest images.');
