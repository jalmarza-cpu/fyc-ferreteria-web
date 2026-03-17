import sys
import json

def validate_inventory(products):
    skus = set()
    for product in products:
        sku = product.get('sku')
        if not sku:
            print("Error [Validación Crítica]: Producto creado sin SKU")
            sys.exit(1)
        if sku in skus:
            print(f"Error [Validación Crítica]: SKU Duplicado detectado: {sku}")
            sys.exit(1)
        skus.add(sku)
    
    print("✓ Check de Gobernanza Exitoso: Todos los SKUs son únicos y consistentes.")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                validate_inventory(data)
        except Exception as e:
            print(f"Error cargando inventario: {str(e)}")
            sys.exit(1)
    else:
        print("Uso sugerido: python validate_inventory.py <ruta_del_json>")
