/// <reference types="vite/client" />
import { create } from 'zustand';
import { CONTACT_PHONE } from './constants';
import { supabase } from './utils/supabase';

export interface CartItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CustomerData {
  name: string;
  phone: string;
  address?: string;
  region?: string;
  rut?: string;
  razonSocial?: string;
  giro?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  stockWarnings: string[];
  toggleCart: () => void;
  addItem: (product: any, quantity?: number, price?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  getTotal: () => number;
  clearCart: () => void;
  clearStockWarnings: () => void;
  validateCartStock: () => Promise<void>;
  checkout: (customerData: CustomerData, docType: string) => Promise<void>;
  quickCheckout: () => Promise<void>;
}

const formatPrice = (val: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(val);

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  stockWarnings: [],
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, quantity = 1, priceOverride) => set((state) => {
    const existing = state.items.find(i => i.id === product.id);
    const finalPrice = priceOverride !== undefined ? priceOverride : product.priceWholesale;

    if (existing) {
      return {
        items: state.items.map(i =>
          i.id === product.id ? {
            ...i,
            quantity: i.quantity + quantity,
            price: finalPrice
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

  clearStockWarnings: () => set({ stockWarnings: [] }),

  validateCartStock: async () => {
    const { items, removeItem } = get();
    if (items.length === 0) return;
    try {
      const skus = items.map(i => i.sku);
      const { data } = await supabase.from('productos').select('sku, nombre, en_stock').in('sku', skus);
      if (data && data.length > 0) {
        for (const item of items) {
          const remote = data.find(d => d.sku === item.sku);
          if (remote && remote.en_stock === false) {
            removeItem(item.id);
            set((state) => ({
              stockWarnings: [...state.stockWarnings, `ITEM ELIMINADO POR FALTA DE STOCK: ${item.name}`]
            }));
          }
        }
      }
    } catch (err) {
      console.warn("Fallo validación estricta de stock", err);
    }
  },

  checkout: async (customerData, docType) => {
    const { items, getTotal } = get();
    if (items.length === 0) return;

    // VALIDACIÓN DE STOCK EN VIVO
    try {
      const skus = items.map(i => i.sku);
      const { data } = await supabase.from('productos').select('sku, nombre, en_stock').in('sku', skus);
      if (data && data.length > 0) {
        for (const item of items) {
          const remote = data.find(d => d.sku === item.sku);
          if (remote && remote.en_stock === false) {
            alert(`Lo sentimos, el producto "${item.name}" acaba de agotarse y ya no está disponible.`);
            return; // Bloqueamos el flujo
          }
        }
      }
    } catch (err) {
      console.warn("Fallo validación estricta de stock, proceeding...", err);
    }

    // 1. Formateo del mensaje (Compatible con WhatsApp y Evolution API)
    let message = `*SOLICITUD DE PEDIDO / COTIZACIÓN*\n`;
    message += `--------------------------------\n`;
    message += `📋 *DOCUMENTO:* ${docType === 'factura' ? 'FACTURA' : 'BOLETA'}\n`;
    message += `👤 *CLIENTE:* ${customerData.name}\n`;
    message += `📱 *TEL:* ${customerData.phone}\n`;

    if (customerData.address) {
      message += `📍 *DESPACHO:* ${customerData.address}${customerData.region ? `, ${customerData.region}` : ''}\n`;
    }

    if (docType === 'factura') {
      message += `--------------------------------\n`;
      message += `🏢 *DATOS FACTURACIÓN*\n`;
      message += `RUT: ${customerData.rut}\n`;
      message += `RAZÓN: ${customerData.razonSocial}\n`;
      if (customerData.giro) message += `GIRO: ${customerData.giro}\n`;
    }

    message += `--------------------------------\n`;
    message += `🛒 *DETALLE DEL PEDIDO*\n`;
    items.forEach(item => {
      const unitPrice = new Intl.NumberFormat('es-CL').format(item.price);
      const subtotal = new Intl.NumberFormat('es-CL').format(item.price * item.quantity);
      message += `▪ ${item.quantity}x ${item.name}\n   SKU: ${item.sku} | $${unitPrice} c/u | Subtotal: $${subtotal}\n`;
    });

    message += `--------------------------------\n`;
    message += `💰 *TOTAL A PAGAR: ${formatPrice(getTotal())}*\n`;
    message += `--------------------------------\n`;
    message += `Quedo atento a la confirmación de stock y datos de transferencia.`;

    // 2. Envío Silencioso vía Webhook a n8n (Evolution API Ready)
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://24.199.110.9:5678/webhook/pedido-fyc';
    const payload = {
      // Campos Nativos Webhook FYC
      customer: customerData,
      documentType: docType,
      items: items,
      total: getTotal(),
      date: new Date().toISOString(),

      // EVOLUTION API READY FIELDS
      number: customerData.phone,
      text: message,
      source: 'F Y C Soluciones Ferreteras - Checkout Completo'
    };

    try {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.warn("Aviso n8n (puede ignorarse si está offline):", err));
    } catch (error) {
      console.warn("Fallo al enviar a n8n:", error);
    }

    // 3. Redirección Cliente a WhatsApp Web/App
    const url = `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  },

  quickCheckout: async () => {
    const { items, getTotal } = get();
    if (items.length === 0) return;

    // VALIDACIÓN DE STOCK EN VIVO
    try {
      const skus = items.map(i => i.sku);
      const { data } = await supabase.from('productos').select('sku, nombre, en_stock').in('sku', skus);
      if (data && data.length > 0) {
        for (const item of items) {
          const remote = data.find(d => d.sku === item.sku);
          if (remote && remote.en_stock === false) {
            alert(`Lo sentimos, el producto "${item.name}" acaba de agotarse y ya no está disponible.`);
            return; // Bloqueamos el flujo
          }
        }
      }
    } catch (err) {
      console.warn("Fallo validación estricta de stock, proceeding...", err);
    }

    let message = `*SOLICITUD DE COTIZACIÓN RÁPIDA - FYC*\n`;
    message += `--------------------------------\n`;
    message += `🛒 *DETALLE DEL PEDIDO*\n`;
    items.forEach(item => {
      const unitPrice = new Intl.NumberFormat('es-CL').format(item.price);
      const subtotal = new Intl.NumberFormat('es-CL').format(item.price * item.quantity);
      message += `▪ ${item.quantity}x ${item.name}\n   SKU: ${item.sku} | $${unitPrice} c/u | Subtotal: $${subtotal}\n`;
    });
    message += `--------------------------------\n`;
    message += `💰 *TOTAL ESTIMADO: ${formatPrice(getTotal())}*\n`;
    message += `--------------------------------\n`;
    message += `Hola, me interesa confirmar la disponibilidad de estos productos y el costo de envío.`;

    // Envío Silencioso vía Webhook a n8n (Espejo Innobate)
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://24.199.110.9:5678/webhook/pedido-fyc';
    const payload = {
      customer: { name: 'Cotización Rápida', phone: 'WhatsApp' },
      documentType: 'cotizacion',
      items: items,
      total: getTotal(),
      date: new Date().toISOString(),
      number: CONTACT_PHONE,
      text: message,
      source: 'F Y C Soluciones Ferreteras - Quick Checkout'
    };

    try {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.warn("Aviso n8n:", err));
    } catch (error) {
      console.warn("Fallo al enviar a n8n:", error);
    }

    const url = `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}));
