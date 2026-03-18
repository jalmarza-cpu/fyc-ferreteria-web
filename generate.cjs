const fs = require('fs');

const constantsPath = './constants.tsx';
let constantsContent = fs.readFileSync(constantsPath, 'utf8');

const catalog = {
  // Brochas From Image 1 and Image 3
  "011387": { name: 'Brocha de 4"', retail: 1900, wholesale: 1300, category: "Revestimientos" },
  "011386": { name: 'Brocha de 3"', retail: 1500, wholesale: 1300, category: "Revestimientos" },
  "011385": { name: 'Brocha de 2 1/2"', retail: 1450, wholesale: 1150, category: "Revestimientos" },
  "011384": { name: 'Brocha de 2"', retail: 1260, wholesale: 960, category: "Revestimientos" },
  "011383": { name: 'Brocha de 1 1/2"', retail: 990, wholesale: 720, category: "Revestimientos" },
  "011382": { name: 'Brocha de 1"', retail: 680, wholesale: 480, category: "Revestimientos" },
  "011381": { name: 'Brocha de 3/4"', retail: 730, wholesale: 430, category: "Revestimientos" },
  "011380": { name: 'Brocha de 1/2"', retail: 500, wholesale: 300, category: "Revestimientos" },
  "011317": { name: 'Brocha café de 4"', retail: 990, wholesale: 780, category: "Revestimientos" },
  "011316": { name: 'Brocha café de 3"', retail: 990, wholesale: 700, category: "Revestimientos" },
  "011315": { name: 'Brocha café de 2.5"', retail: 990, wholesale: 600, category: "Revestimientos" },
  "011310": { name: 'Brocha café de 1/2"', retail: 340, wholesale: 140, category: "Revestimientos" },

  // Rodillos and Martillos image 3
  "011181": { name: "Rodillo Chiporro 20cm", retail: 2000, wholesale: 1860, category: "Revestimientos" },
  "070131": { name: "Martillo Peña forjado 1.lb", retail: 2500, wholesale: 2250, category: "Herramientas Manuales" },
  "070129": { name: "Martillo Peña forjado 1.5lb", retail: 4000, wholesale: 3750, category: "Herramientas Manuales" },
  "070122": { name: "Martillo mecánico 300g", retail: 1990, wholesale: 1760, category: "Herramientas Manuales" },
  "070121": { name: "Martillo mecánico 200g", retail: 1500, wholesale: 1350, category: "Herramientas Manuales" },
  "070120": { name: "Martillo mecánico 100g", retail: 1490, wholesale: 1190, category: "Herramientas Manuales" },
  "070112": { name: "Martillo con mango de fibra forjado 25mm", retail: 3500, wholesale: 3300, category: "Herramientas Manuales" },

  // Alicates image 3 and image 2
  "070346": { name: 'Alicate Cortante 8"', retail: 2500, wholesale: 2250, category: "Herramientas Manuales" },
  "070323": { name: 'Alicate Ford 8"', retail: 2500, wholesale: 2170, category: "Herramientas Manuales" },
  "070360": { name: "Alicate Multiuso HS7004", retail: 3000, wholesale: 2700, category: "Herramientas Manuales" },
  "070340": { name: 'Alicate Universal 6"', retail: 2000, wholesale: 1800, category: "Herramientas Manuales" },
  "070341": { name: 'Alicate Universal 7"', retail: 2900, wholesale: 2400, category: "Herramientas Manuales" },

  // Amarras image 2
  "120300": { name: "Amarra 150x3.6mm blancas bolsas 100u", retail: 1190, wholesale: 900, category: "Fijaciones" },
  "120301": { name: "Amarra 200x3.6mm blancas bolsas 100u", retail: 1390, wholesale: 1190, category: "Fijaciones" },
  "120302": { name: "Amarra 250x3.6mm blancas bolsas 100u", retail: 1690, wholesale: 1490, category: "Fijaciones" },
  "120303": { name: "Amarra 300x3.6mm blancas bolsas 100u", retail: 2150, wholesale: 1950, category: "Fijaciones" },
  "120304": { name: "Amarra 350x4.8mm blancas bolsas 100u", retail: 3350, wholesale: 3150, category: "Fijaciones" },
  "120305": { name: "Amarra 400x4.8mm blancas bolsas 100u", retail: 4300, wholesale: 3900, category: "Fijaciones" },
  "120306": { name: "Amarra 500x4.8mm blancas bolsas 100u", retail: 4550, wholesale: 4350, category: "Fijaciones" },

  // Cintas image 2 and 4
  "160301": { name: "Huincha aisladora 3/4\" 10YD", retail: 950, wholesale: 750, category: "Fijaciones" },
  "160352": { name: "Huincha de Embalaje 48x100mm", retail: 1590, wholesale: 1390, category: "Fijaciones" },
  "160305": { name: "Maskitape 18mm x 35mm", retail: 830, wholesale: 630, category: "Fijaciones" },
  "160307": { name: "Maskitape 36mm x 35mm", retail: 1400, wholesale: 1200, category: "Fijaciones" },
  "160308": { name: "Maskitape 48mm x 35mm", retail: 1790, wholesale: 1590, category: "Fijaciones" },

  // Brocas and Mechas image 4
  "130675": { name: "Set de brocas HSS 1-10mm 19pcs", retail: 6130, wholesale: 5930, category: "Herramientas Manuales" },
  "130636": { name: "Set de brocas paleta 10-25mm 6pcs", retail: 2750, wholesale: 2550, category: "Herramientas Manuales" },
  "130671": { name: "Set de brocas para concreto M501 5pcs", retail: 880, wholesale: 680, category: "Herramientas Manuales" },
  "130672": { name: "Set de brocas para concreto M502 5pcs", retail: 1030, wholesale: 830, category: "Herramientas Manuales" },
  "130670": { name: "Set de brocas para concreto M802 8pcs", retail: 1180, wholesale: 980, category: "Herramientas Manuales" },
  "130621": { name: "Set de mechas DG-W502 5pcs", retail: 1550, wholesale: 1350, category: "Herramientas Manuales" },
  "130620": { name: "Set de mechas DG-W802 8pcs", retail: 2000, wholesale: 2000, category: "Herramientas Manuales" },
  "011018": { name: "Set de destornillador", retail: 4650, wholesale: 4350, category: "Herramientas Manuales" },
  "011035": { name: "Set de punta 23031B / 31 piezas", retail: 6950, wholesale: 6750, category: "Herramientas Manuales" },

  // Set de puntas image 5
  "011031": { name: "Set de punta AX-21023B / 23 piezas", retail: 4650, wholesale: 4350, category: "Herramientas Manuales" },
  "011032": { name: "Set de punta AX-23018B / 18 piezas", retail: 4580, wholesale: 4280, category: "Herramientas Manuales" },
  "011033": { name: "Set de punta AX-23021 / 21 piezas", retail: 5550, wholesale: 5250, category: "Herramientas Manuales" },
  "011034": { name: "Set de punta AX-23031 / 31 piezas", retail: 5000, wholesale: 4880, category: "Herramientas Manuales" },
  "011037": { name: "Set de punta AX-24067 / 67 piezas", retail: 4650, wholesale: 4350, category: "Herramientas Manuales" },
  "011038": { name: "Set de punta AX-25016 / 16 piezas", retail: 5550, wholesale: 5250, category: "Herramientas Manuales" },
  "011023": { name: "Set de punta PJN-99149 / 10 piezas", retail: 1350, wholesale: 1050, category: "Herramientas Manuales", overrideSku: "011023" },
  "011024": { name: "Set de punta PJN-99154 / 14 piezas", retail: 1500, wholesale: 1200, category: "Herramientas Manuales" },
  "011030": { name: "Set de punta WS-1085 / 32 piezas", retail: 5550, wholesale: 5250, category: "Herramientas Manuales" },
  "011021": { name: "Set de puntas DS-70311 / 29 piezas", retail: 5550, wholesale: 5250, category: "Herramientas Manuales" },
  "011022": { name: "Set de puntas DS-70334 / 33 piezas", retail: 6050, wholesale: 5850, category: "Herramientas Manuales" },
  "011001": { name: "Set destornillador 6 piezas", retail: 3300, wholesale: 3000, category: "Herramientas Manuales" }
};

let toAppend = '';
let prodIdCount = 100;

for (const [sku, item] of Object.entries(catalog)) {
  const finalSku = item.overrideSku || sku;
  if (!constantsContent.includes('sku: "' + finalSku + '"')) {
    toAppend += '\n  {\n';
    toAppend += '    id: "prod-' + (prodIdCount++) + '",\n';
    const saneName = item.name.replace(/"/g, '\\\\\\"');
    toAppend += '    name: "' + saneName + '",\n';
    toAppend += '    sku: "' + finalSku + '",\n';
    toAppend += '    description: "' + saneName + ' para uso profesional.",\n';
    toAppend += '    priceRetail: ' + item.retail + ',\n';
    toAppend += '    priceWholesale: ' + item.wholesale + ',\n';
    toAppend += '    imageUrl: "' + item.category.replace(/\\s+/g, '') + '/' + finalSku + '.jpg",\n';
    toAppend += '    category: "' + item.category + '"\n';
    toAppend += '  },';
  }
}

if (toAppend.length > 0) {
  // Find the last ]; which belongs to PRODUCTS array.
  const lastBracketIndex = constantsContent.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    constantsContent = constantsContent.slice(0, lastBracketIndex) + toAppend + '\n];' + constantsContent.slice(lastBracketIndex + 2);
  }
}

fs.writeFileSync(constantsPath, constantsContent);
console.log('Appended missed items.');
