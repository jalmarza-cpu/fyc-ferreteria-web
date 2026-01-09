
import { create } from 'zustand';
import { CONTACT_PHONE } from './constants';

export interface CartItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  toggleCart: () => void;
  addItem: (product: any, quantity?: number, price?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  getTotal: () => number;
  clearCart: () => void;
  checkout: () => void;
}

const formatPrice = (val: number) => 
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(val);

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  
  addItem: (product, quantity = 1, priceOverride) => set((state) => {
    const existing = state.items.find(i => i.id === product.id);
    // El precio a usar es el override si existe, sino el precio mayorista por defecto del producto
    const finalPrice = priceOverride !== undefined ? priceOverride : product.priceWholesale;

    if (existing) {
      return {
        items: state.items.map(i => 
          i.id === product.id ? { 
            ...i, 
            quantity: i.quantity + quantity,
            price: finalPrice // Actualizamos el precio al último seleccionado por el usuario
          } : i
        ),
        isOpen: true
      };
    }
    return {
      items: [...state.items, {
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: finalPrice,
        quantity: quantity,
        image: product.imageUrl || product.image 
      }],
      isOpen: true
    };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),

  updateQuantity: (id, delta) => set((state) => ({
    items: state.items.map(i => {
      if (i.id === id) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : i;
      }
      return i;
    })
  })),

  getTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  clearCart: () => set({ items: [] }),

  checkout: () => {
    const { items, getTotal } = get();
    if (items.length === 0) return;

    // Mensaje de Pedido Optimizado
    let message = "Hola F y C Spa, envío mi pedido web:\n\n";
    
    items.forEach(item => {
      message += `${item.quantity}x ${item.name}\n`;
    });
    
    message += `\n*TOTAL A PAGAR: ${formatPrice(getTotal())}*\n\nQuedo atento a los datos de pago y despacho.`;
    
    // Usamos encodeURIComponent para asegurar que los saltos de línea y caracteres especiales se procesen bien
    const url = `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}));
