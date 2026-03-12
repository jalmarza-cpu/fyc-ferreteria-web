const fs = require('fs');

const constantsPath = './constants.tsx';
let constantsContent = fs.readFileSync(constantsPath, 'utf8');

const catalog = [
  // Image 1 -- Lámparas Tortuga, Plafones y Emergencia
  { sku: "150001", name: "Lampara Led de piscina RGB 12v 9w", retail: 47000, wholesale: 46800, category: "Electricidad" },
  { sku: "160176", name: "Lampara tortuga JM-FC62 blanca", retail: 6000, wholesale: 5800, category: "Electricidad" },
  { sku: "160178", name: "Lampara tortuga JM-FC62 Negro", retail: 6000, wholesale: 5800, category: "Electricidad" },
  { sku: "160179", name: "Lampara tortuga JM-FC63 Negro", retail: 6000, wholesale: 5800, category: "Electricidad" },
  { sku: "120070", name: "Lampara Tortuga redonda Led 12w", retail: 16550, wholesale: 16250, category: "Electricidad" },
  { sku: "120280", name: "Plafon con sensor de 18w 6500k", retail: 10800, wholesale: 10500, category: "Electricidad" },
  { sku: "120281", name: "Plafon con sensor de 24w 6500k", retail: 13600, wholesale: 13300, category: "Electricidad" },
  { sku: "120272", name: "Plafon cuadrado Led 12w 6500k", retail: 6000, wholesale: 5740, category: "Electricidad" },
  { sku: "120274", name: "Plafon cuadrado Led 18w 6500k", retail: 8000, wholesale: 7700, category: "Electricidad" },
  { sku: "120276", name: "Plafon cuadrado Led 24w 6500k", retail: 9990, wholesale: 9660, category: "Electricidad" },
  { sku: "120276-6W", name: "Plafon cuadrado Led 6w 6500k", retail: 4500, wholesale: 4200, category: "Electricidad" },
  { sku: "160260", name: "Lampara de Emergencia TD-269S", retail: 28990, wholesale: 28350, category: "Electricidad" },

  // Image 2 -- Herméticas, Paneles y Proyectores
  { sku: "160603", name: "Lampara Hermetica 2x18 N°1", retail: 9320, wholesale: 8920, category: "Electricidad" },
  { sku: "160603-N2", name: "Lampara Hermetica 2x18 N°2", retail: 10990, wholesale: 10710, category: "Electricidad" },
  { sku: "120083", name: "Panel Led 120 x 60 80w Sobrepuesto", retail: 50900, wholesale: 50600, category: "Electricidad" },
  { sku: "120090", name: "Panel Led 120x30 48w embutido", retail: 23990, wholesale: 23550, category: "Electricidad" },
  { sku: "120082", name: "Panel Led 120x60 80w embutido", retail: 41990, wholesale: 41770, category: "Electricidad" },
  { sku: "120097", name: "Panel LED 60x60 48W embutido", retail: 17550, wholesale: 17250, category: "Electricidad" },
  { sku: "120097-SOBRE", name: "Panel Led 60x60 sobrepuesto 48w 6500K", retail: 21990, wholesale: 21750, category: "Electricidad" },
  { sku: "120449", name: "Proyector LED multipunto 100w", retail: 18500, wholesale: 18200, category: "Electricidad" },
  { sku: "120440", name: "Proyector LED multipunto 10w", retail: 3600, wholesale: 3300, category: "Electricidad" },
  { sku: "120450", name: "Proyector LED multipunto 150w", retail: 27700, wholesale: 27300, category: "Electricidad" },
  { sku: "120451", name: "Proyector LED multipunto 200w", retail: 52990, wholesale: 52650, category: "Electricidad" },
  { sku: "120441", name: "Proyector LED multipunto 20w", retail: 4940, wholesale: 4640, category: "Electricidad" },

  // Image 3 -- Proyectores con sensor y Cables
  { sku: "120452", name: "Proyector LED multipunto 300w", retail: 67800, wholesale: 67500, category: "Electricidad" },
  { sku: "120442", name: "Proyector LED multipunto 30w", retail: 6580, wholesale: 5530, category: "Electricidad" },
  { sku: "120443", name: "Proyector LED multipunto 50w", retail: 8420, wholesale: 8120, category: "Electricidad" },
  { sku: "120444", name: "Proyector Led Multipunto con sensor de movimiento 10w", retail: 7000, wholesale: 6750, category: "Electricidad" },
  { sku: "120445", name: "Proyector Led Multipunto con sensor de movimiento 20w", retail: 7800, wholesale: 7500, category: "Electricidad" },
  { sku: "120446", name: "Proyector Led Multipunto con sensor de movimiento 30w", retail: 9000, wholesale: 8770, category: "Electricidad" },
  { sku: "120446-50", name: "Proyector Led Multipunto con sensor de movimiento 50w", retail: 10560, wholesale: 10260, category: "Electricidad" },
  { sku: "159984", name: "Adaptador simple 10A", retail: 2000, wholesale: 1800, category: "Electricidad" },
  { sku: "159988", name: "Alargador 3mts SL2714", retail: 7000, wholesale: 6800, category: "Electricidad" },
  { sku: "040102", name: "Cable cordon 2x1.5 100MTS", retail: 154700, wholesale: 153000, category: "Electricidad" },
  { sku: "040102-3x2.5", name: "Cable cordon de 3x2.5 100MTS", retail: 185640, wholesale: 180000, category: "Electricidad" },
  { sku: "040113", name: "Cable paralelo 2x20 Negro", retail: 52000, wholesale: 50000, category: "Electricidad" },

  // Image 4 -- Cajas, Timbres y Enchufes volantes
  { sku: "159940", name: "Caja Chuqui para canaletas", retail: 1460, wholesale: 1160, category: "Electricidad" },
  { sku: "160009", name: "Caja Estanca 100x100x7", retail: 2690, wholesale: 2390, category: "Electricidad" },
  { sku: "160010", name: "Caja Estanca 150x150x70", retail: 4570, wholesale: 4270, category: "Electricidad" },
  { sku: "160008", name: "Caja Estanca 80x80x50", retail: 1530, wholesale: 1230, category: "Electricidad" },
  { sku: "160007", name: "Caja Estanca 85x85x50", retail: 1700, wholesale: 1400, category: "Electricidad" },
  { sku: "140300", name: "Campana Timbre 3\"", retail: 7000, wholesale: 6800, category: "Electricidad" },
  { sku: "140301", name: "Campana Timbre 4\"", retail: 8000, wholesale: 7800, category: "Electricidad" },
  { sku: "140302", name: "Campana Timbre 6\"", retail: 13000, wholesale: 12800, category: "Electricidad" },
  { sku: "140303", name: "Campana Timbre 8\"", retail: 16000, wholesale: 15800, category: "Electricidad" },
  { sku: "160220", name: "Canoa para tubo led 1x18", retail: 2370, wholesale: 2070, category: "Electricidad" },
  { sku: "159973", name: "Enchufe hembra volante 16A", retail: 2000, wholesale: 1500, category: "Electricidad" },
  { sku: "159970", name: "Enchufe macho plano 16A", retail: 2000, wholesale: 1490, category: "Electricidad" },

  // Image 5 -- Más enchufes, Gabinetes e Interruptores
  { sku: "159970-2P", name: "Enchufe macho volante 2p 10A", retail: 1500, wholesale: 990, category: "Electricidad" },
  { sku: "159961", name: "Enchufe macho volante 3p 10A", retail: 1500, wholesale: 1200, category: "Electricidad" },
  { sku: "159985", name: "Enchufe Triple Con Interruptor SL1048", retail: 3900, wholesale: 3500, category: "Electricidad" },
  { sku: "160230", name: "Gabinete metálico 1 puerta 300x200x150", retail: 19000, wholesale: 18700, category: "Electricidad" },
  { sku: "160231", name: "Gabinete metálico 1 puerta 400x300x200", retail: 32900, wholesale: 32600, category: "Electricidad" },
  { sku: "160232", name: "Gabinete metálico 1 puerta 500x400x200", retail: 46900, wholesale: 46400, category: "Electricidad" },
  { sku: "160233", name: "Gabinete metálico 1 puerta 600x500x200", retail: 55600, wholesale: 55000, category: "Electricidad" },
  { sku: "159951", name: "Interruptor Doble 9/15 10A-250V", retail: 2100, wholesale: 1800, category: "Electricidad" },
  { sku: "159967", name: "Interruptor doble 9/15 10A-250V Embutido", retail: 2000, wholesale: 1700, category: "Electricidad" },
  { sku: "159966", name: "Interruptor simple 9/12 10A embutido", retail: 2000, wholesale: 1500, category: "Electricidad" },
  { sku: "159950", name: "Interruptor simple 9/12 10A Sobrepuesto", retail: 1590, wholesale: 1290, category: "Electricidad" },
  { sku: "160182", name: "Remarcador monofasico 220v 10(20)a 50hz Ip51", retail: 11000, wholesale: 10700, category: "Electricidad" }
];

let toAppend = '';
let prodIdCount = 600; // start at 600 for safety

for (const item of catalog) {
  const saneNameForRegex = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const exactCheckStr = 'name: "' + saneNameForRegex.replace(/"/g, '\\\\\"') + '"';
  
  if (!constantsContent.includes(exactCheckStr) && !constantsContent.includes('name: "' + item.name + '"')) {
     toAppend += '\n  {\n';
     toAppend += '    id: "prod-' + (prodIdCount++) + '",\n';
     const saneName = item.name.replace(/"/g, '\\\\\\"');
     toAppend += '    name: "' + saneName + '",\n';
     toAppend += '    sku: "' + item.sku + '",\n';
     toAppend += '    description: "' + saneName + ' de alto estándar de instalación.",\n';
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
console.log('Appended missed items from the 5 new images.');
