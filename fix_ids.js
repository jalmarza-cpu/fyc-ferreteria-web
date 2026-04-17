const fs = require("fs");
let code = fs.readFileSync("components/AdminDashboard.tsx", "utf8");

code = code.replace(/\.eq\("id", formData\.id\)/g, ".eq(\"sku\", formData.sku)");
code = code.replace(/\.eq\('\id'\, formData\.id\)/g, ".eq(\"sku\", formData.sku)"); // catch single quotes

code = code.replace(/p\.id === formData\.id/g, "p.sku === formData.sku");
code = code.replace(/p\.id !== formData\.id/g, "p.sku !== formData.sku");

code = code.replace(/updateQuickStock\((p\.id)(?!_)(, p\.stock\))/g, "updateQuickStock(p.sku$2");
code = code.replace(/updateQuickStock = async \(id,/g, "updateQuickStock = async (sku,");
code = code.replace(/id \+ "stock"/g, "sku + \"stock\"");
code = code.replace(/id \+ '\stock'\/g, "sku + \"stock\"");

code = code.replace(/\.eq\("id", id\)/g, ".eq(\"sku\", sku)");
code = code.replace(/\.eq\('\id'\, id\)/g, ".eq(\"sku\", sku)");

code = code.replace(/p\.id === id \?/g, "p.sku === sku ?");

code = code.replace(/setUpdatingId\(p\.id \+ "mayorista"\);/g, "setUpdatingId(p.sku + \"mayorista\");");
code = code.replace(/setUpdatingId\(p\.id \+ '\mayorista'\);/g, "setUpdatingId(p.sku + \"mayorista\");");

code = code.replace(/\.eq\("id", p\.id\)/g, ".eq(\"sku\", p.sku)");
code = code.replace(/\.eq\('\id'\, p\.id\)/g, ".eq(\"sku\", p.sku)");

code = code.replace(/prod\.id === p\.id/g, "prod.sku === p.sku");

code = code.replace(/updatingId === p\.id \+/g, "updatingId === p.sku +");

// Fix manually because regex quoting varies
fs.writeFileSync("components/AdminDashboard.tsx", code);
