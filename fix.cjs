const fs = require('fs');
let code = fs.readFileSync('components/AdminDashboard.tsx', 'utf8');

code = code.split(".eq('id', formData.id)").join(".eq('sku', formData.sku)");
code = code.split("p.id === formData.id").join("p.sku === formData.sku");
code = code.split("p.id !== formData.id").join("p.sku !== formData.sku");

code = code.split("updateQuickStock(p.id, p.stock)").join("updateQuickStock(p.sku, p.stock)");
code = code.split("updateQuickStock = async (id, currentStock)").join("updateQuickStock = async (sku, currentStock)");
code = code.split("id + 'stock'").join("sku + 'stock'");
code = code.split(".eq('id', id)").join(".eq('sku', sku)");
code = code.split("p.id === id ?").join("p.sku === sku ?");

code = code.split("setUpdatingId(p.id + 'mayorista')").join("setUpdatingId(p.sku + 'mayorista')");
code = code.split(".eq('id', p.id)").join(".eq('sku', p.sku)");
code = code.split("prod.id === p.id").join("prod.sku === p.sku");

code = code.split("setUpdatingId(p.id + 'detalle')").join("setUpdatingId(p.sku + 'detalle')");
code = code.split("updatingId === p.id +").join("updatingId === p.sku +");

fs.writeFileSync('components/AdminDashboard.tsx', code);
console.log('done');
