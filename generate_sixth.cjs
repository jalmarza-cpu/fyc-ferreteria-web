const fs = require('fs');

const constantsPath = './constants.tsx';
let constantsContent = fs.readFileSync(constantsPath, 'utf8');

const catalog = [
  // Image 1 -- Sacaclavos, Serruchos, Tarugos, Gomas, Llaves
  { sku: "070080", name: "Sacaclavos 12\"", retail: 1990, wholesale: 1650, category: "Herramientas Manuales" },
  { sku: "070081", name: "Sacaclavos 18\"", retail: 2990, wholesale: 2700, category: "Herramientas Manuales" },
  { sku: "011747", name: "Serrucho de ebanista 10\"", retail: 1500, wholesale: 1000, category: "Herramientas Manuales" },
  { sku: "011746", name: "Serrucho de ebanista 8\"", retail: 1000, wholesale: 850, category: "Herramientas Manuales" },
  { sku: "011742", name: "Serrucho 22\"", retail: 2990, wholesale: 2550, category: "Herramientas Manuales" },
  { sku: "011742", name: "Serrucho 24\"", retail: 3500, wholesale: 3000, category: "Herramientas Manuales" },
  { sku: "070473", name: "Tarugo Tipo Fisher 10mm", retail: 5000, wholesale: 4800, category: "Fijaciones" },
  { sku: "070470", name: "Tarugo Tipo Fisher 5mm", retail: 4000, wholesale: 3750, category: "Fijaciones" },
  { sku: "070471", name: "Tarugo Tipo Fisher 6mm", retail: 4680, wholesale: 4380, category: "Fijaciones" },
  { sku: "070471", name: "Tarugo Tipo Fisher 8mm", retail: 4720, wholesale: 4420, category: "Fijaciones" },
  { sku: "030641", name: "Goma para llave 1/2\"- 5/8\"", retail: 2000, wholesale: 1700, category: "Gasfitería" },
  { sku: "03068", name: "Llave lavamano muro 20cm 30493", retail: 15900, wholesale: 15400, category: "Gasfitería" },

  // Image 2 -- Llaves Gasfitería
  { sku: "030686", name: "Llave Combinacion Lavaplatos 30492", retail: 17900, wholesale: 17500, category: "Gasfitería" },
  { sku: "030602", name: "Llave de jardin BQA036 con hilo", retail: 5900, wholesale: 5500, category: "Gasfitería" },
  { sku: "030600", name: "Llave de jardin Gal.518 con hilo", retail: 3500, wholesale: 2800, category: "Gasfitería" },
  { sku: "030684", name: "Llave lavamano muro 15cm 30494", retail: 16990, wholesale: 16660, category: "Gasfitería" },
  { sku: "030685", name: "Llave lavamano muro 20cm 30493", retail: 19500, wholesale: 18900, category: "Gasfitería" },
  { sku: "030688", name: "Llave Lavamanos par simple 30403", retail: 15900, wholesale: 15400, category: "Gasfitería" },
  { sku: "030683", name: "Llave lavaplatos monomando 30940", retail: 19500, wholesale: 18900, category: "Gasfitería" },
  { sku: "030680", name: "Llave monomando 35mm 30401", retail: 15990, wholesale: 15200, category: "Gasfitería" },
  { sku: "030682", name: "Llave monomando ducha 30496", retail: 19960, wholesale: 19460, category: "Gasfitería" },
  { sku: "030681", name: "Llave Tina Monomando 30495", retail: 22990, wholesale: 22200, category: "Gasfitería" },
  { sku: "030681", name: "tubo flexible para ducha 1.5m", retail: 2500, wholesale: 1950, category: "Gasfitería" },
  { sku: "030687", name: "Ducha Telefono", retail: 1990, wholesale: 1660, category: "Gasfitería" },

  // Image 3 -- Candados, Tuberias, Yeguas
  { sku: "010187", name: "Candado dorado 32mm", retail: 1500, wholesale: 1000, category: "Fijaciones" },
  { sku: "010188", name: "Candado dorado 38mm", retail: 1700, wholesale: 1200, category: "Fijaciones" },
  { sku: "030600", name: "Carretilla 85L", retail: 60000, wholesale: 58500, category: "Maquinaria" },
  { sku: "011570", name: "Tuberia Conduit PVC 25x1.5x3000mm", retail: 2000, wholesale: 1550, category: "Electricidad" },
  { sku: "011570", name: "Tuberia Conduit PVC 16x1.4x3000mm", retail: 1100, wholesale: 780, category: "Electricidad" },
  { sku: "011572", name: "Tuberia Conduit PVC 20x1.5x3000mm", retail: 1500, wholesale: 1000, category: "Electricidad" },
  { sku: "011500", name: "Tuberia EMT 20mm x 1.2mm", retail: 3500, wholesale: 2950, category: "Electricidad" },
  { sku: "011501", name: "Tuberia EMT 25mm x 1.2mm", retail: 5900, wholesale: 5500, category: "Electricidad" },
  { sku: "011502", name: "Tuberia EMT 32mm x 1.2mm", retail: 6900, wholesale: 6600, category: "Electricidad" },
  { sku: "010479", name: "Yegua azul extensible 250kilos", retail: 47500, wholesale: 46800, category: "Maquinaria" },
  { sku: "010479", name: "Yegua roja con ruedas 250 kilos", retail: 44550, wholesale: 43550, category: "Maquinaria" },
  { sku: "010251", name: "Basurero pvc 120L Gris", retail: 37800, wholesale: 37800, category: "Maquinaria" },

  // Image 4 -- Basureros, Bombas, Compresor, Fresador, Gatas, Maquina madera
  { sku: "010251", name: "Basurero pvc 240L Verde", retail: 52700, wholesale: 52700, category: "Maquinaria" },
  { sku: "011419", name: "Bomba de piscina SUPB100 0.75KW", retail: 166750, wholesale: 166750, category: "Maquinaria" },
  { sku: "011420", name: "Bomba de piscina SWIM050 0.75KW", retail: 159850, wholesale: 159850, category: "Maquinaria" },
  { sku: "130162", name: "Compresor de aire de 2 HP 200 litros", retail: 471500, wholesale: 471500, category: "Maquinaria" },
  { sku: "130230", name: "Fresador con taladro ZAY7045FG", retail: 2600000, wholesale: 2600000, category: "Maquinaria" },
  { sku: "130229", name: "Frezador con traladro ZAY7032FG", retail: 2490000, wholesale: 2490000, category: "Maquinaria" },
  { sku: "130129", name: "Gata Caiman 2T", retail: 30000, wholesale: 27000, category: "Maquinaria" },
  { sku: "130132", name: "Gata Caiman 3T", retail: 93000, wholesale: 89000, category: "Maquinaria" },
  { sku: "130131", name: "Gata Caiman 3T Larga", retail: 173000, wholesale: 166750, category: "Maquinaria" },
  { sku: "130091", name: "Gata Tijera 1.5T", retail: 13500, wholesale: 12800, category: "Maquinaria" },
  { sku: "130090", name: "Gata Tijera 1T", retail: 13000, wholesale: 11050, category: "Maquinaria" },
  { sku: "13002", name: "Maquina de Madera MQ443A", retail: 1341000, wholesale: 1341000, category: "Maquinaria" },

  // Image 5 -- Prensas hidraulicas, Platos de Torno, Molinos
  { sku: "130145", name: "Prensa Hidraulica 30T con Manometro", retail: 530000, wholesale: 518000, category: "Maquinaria" },
  { sku: "130146", name: "Prensa Hidraulica 50T con Manometro", retail: 1092500, wholesale: 1092500, category: "Maquinaria" },
  { sku: "130196", name: "Tecle Pluma Doble 2T", retail: 235000, wholesale: 229500, category: "Maquinaria" },
  { sku: "130212", name: "Molino Forrajero FZ500", retail: 799750, wholesale: 799750, category: "Maquinaria" },
  { sku: "130238", name: "Plato para Torno de 3 patitas 10\"", retail: 227000, wholesale: 224000, category: "Maquinaria" },
  { sku: "130235", name: "Plato para Torno de 3 patitas 4\"", retail: 85000, wholesale: 80500, category: "Maquinaria" },
  { sku: "130235", name: "Plato para Torno de 3 patitas 6\"", retail: 135000, wholesale: 132000, category: "Maquinaria" },
  { sku: "130237", name: "Plato para Torno de 3 patitas 8\"", retail: 155500, wholesale: 149500, category: "Maquinaria" },
  { sku: "130152", name: "PORTPOWER SD0202 10T", retail: 195000, wholesale: 190000, category: "Maquinaria" },
  { sku: "130142", name: "Prensa Hidraulica 20T", retail: 275500, wholesale: 264500, category: "Maquinaria" },
  { sku: "130143", name: "Prensa Hidraulica 20T con Manometro", retail: 420000, wholesale: 402500, category: "Maquinaria" },
  { sku: "130156", name: "Prensa Hidraulica 30T", retail: 450000, wholesale: 443000, category: "Maquinaria" }
];

let toAppend = '';
let prodIdCount = 400; // start at 400 for safety

for (const item of catalog) {
  const saneNameForRegex = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const exactCheckStr = 'name: "' + saneNameForRegex.replace(/"/g, '\\\\\"') + '"';
  
  if (!constantsContent.includes(exactCheckStr) && !constantsContent.includes('name: "' + item.name + '"')) {
     toAppend += '\n  {\n';
     toAppend += '    id: "prod-' + (prodIdCount++) + '",\n';
     const saneName = item.name.replace(/"/g, '\\\\\\"');
     toAppend += '    name: "' + saneName + '",\n';
     toAppend += '    sku: "' + item.sku + '",\n';
     toAppend += '    description: "' + saneName + ' de alta durabilidad.",\n';
     toAppend += '    priceRetail: ' + item.retail + ',\n';
     toAppend += '    priceWholesale: ' + item.wholesale + ',\n';
     toAppend += '    imageUrl: "CatalogoExtra2/' + item.sku + '.jpg",\n';
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
console.log('Appended missed items from the latest 5 images.');
