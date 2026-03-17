
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, CheckCircle2, AlertCircle, Menu, ArrowUp, Truck, FileText, Receipt, User, Building2, MapPin, Phone, ArrowLeft, Send } from 'lucide-react';
import { PRODUCTS, CONTACT_PHONE_DISPLAY, CONTACT_PHONE } from './constants';
import { useCartStore } from './store';
import { supabase, getProductImageUrl } from './utils/supabase';

// Imports from specialized components
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Sidebar from './components/Sidebar';
import CategoryBento from './components/CategoryBento';
import About from './components/About';
import Maestros from './components/Maestros';
// Legal Pages Import
import { ShippingPolicy, ReturnsPolicy, TermsAndConditions } from './components/LegalPages';
// Code Splitting (Lazy-Loading pesado para el bundle principal)
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));

// --- UTILS ---
const formatPrice = (val: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(val);

// --- MARQUEE ---
const MarqueeBar = () => {
  return (
    <div className="bg-[#FFD700] overflow-hidden py-2 relative z-20 border-b border-[#cca700] shadow-md pointer-events-none select-none">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {[...Array(6)].map((_, i) => (
          <span key={i} className="text-black font-black uppercase text-[10px] md:text-xs tracking-[0.2em] mx-6 flex items-center gap-6">
            <span>⚡ PRECIOS ESPECIALES MAESTROS</span>
            <span className="w-1.5 h-1.5 bg-black rotate-45"></span>
            <span>🇨🇱 DESPACHO A REGIONES</span>
            <span className="w-1.5 h-1.5 bg-black rotate-45"></span>
            <span>📞 COTIZA AL: {CONTACT_PHONE_DISPLAY}</span>
            <span className="w-1.5 h-1.5 bg-black rotate-45"></span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// --- MOBILE SIDEBAR DRAWER ---
const MobileSidebarDrawer = ({ isOpen, onClose, children }: any) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[300px] bg-[#0A0A0A] border-r border-[#222] z-[70] flex flex-col shadow-2xl lg:hidden overflow-y-auto"
          >
            <div className="p-6 border-b border-[#222] flex justify-between items-center bg-[#050505] sticky top-0 z-10">
              <span className="font-industrial text-xl text-white font-bold uppercase tracking-wider">Filtros</span>
              <button onClick={onClose} className="p-2 bg-[#1a1a1a] rounded-full hover:bg-[#FFD700] hover:text-black transition-all"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

// --- SCROLL TO TOP BUTTON ---
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 bg-[#FFD700] text-black rounded-full shadow-xl hover:bg-white hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#FFD700]"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- CART DRAWER ---
const CartDrawer = () => {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotal, checkout, quickCheckout, validateCartStock, stockWarnings, clearStockWarnings } = useCartStore();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [docType, setDocType] = useState<'boleta' | 'factura'>('boleta');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    region: '',
    rut: '',
    razonSocial: '',
    giro: ''
  });

  const FREE_SHIPPING_THRESHOLD = 100000;
  const currentTotal = getTotal();
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - currentTotal);
  const progressPercentage = Math.min((currentTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep('cart'), 300);
      setTimeout(() => clearStockWarnings(), 300);
    } else {
      document.body.style.overflow = 'hidden';
      // Validación Estricta en Vivo al Abrir el Carrito
      validateCartStock();
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppCheckout = () => {
    if (!formData.name || !formData.phone) {
      alert("Por favor completa tu nombre y teléfono.");
      return;
    }

    if (docType === 'factura') {
      if (!formData.rut || !formData.razonSocial) {
        alert("Para solicitar FACTURA, el RUT y la Razón Social son obligatorios.");
        return;
      }
    }

    checkout(formData, docType);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0A0A0A] text-white z-[90] flex flex-col shadow-2xl border-l border-[#222]"
          >
            <div className="p-5 border-b border-[#222] flex items-center justify-between bg-[#111]">
              <div className="flex items-center gap-3">
                {step === 'checkout' && (
                  <button onClick={() => setStep('cart')} className="hover:text-[#FFD700] transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="text-xl font-industrial font-bold text-white uppercase tracking-wider">
                  {step === 'cart' ? 'Mi Carro' : 'Finalizar Compra'}
                </h2>
              </div>
              <button onClick={toggleCart} className="flex items-center gap-1 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                <X className="w-5 h-5" /> Cerrar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#0A0A0A] custom-scrollbar">
              {step === 'cart' && (
                <div className="p-5 space-y-4">

                  {/* Renderización de Alertas de Stock (Si N8N o Subapase lo agotaron) */}
                  <AnimatePresence>
                    {stockWarnings.map((warning, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[#D32F2F]/10 border border-[#D32F2F]/50 p-3 rounded-xl flex items-start gap-2 shadow-lg mb-2"
                      >
                        <AlertCircle className="w-5 h-5 text-[#D32F2F] flex-shrink-0" />
                        <p className="text-xs text-red-400 font-black uppercase tracking-wider">{warning}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {items.length === 0 ? (
                    <div className="h-[50vh] flex flex-col items-center justify-center text-neutral-600">
                      <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                      <p className="font-bold text-sm uppercase tracking-widest">Tu carrito está vacío</p>
                    </div>
                  ) : (
                    items.map(item => (
                      <motion.div layout key={item.id} className="flex gap-4 border-b border-[#222] pb-4 last:border-0">
                        <div className="w-20 h-20 bg-[#151515] rounded border border-[#333] overflow-hidden p-2 flex-shrink-0 flex items-center justify-center">
                          <img
                            src={item.image ? getProductImageUrl(item.name, item.image) : "https://placehold.co/100"}
                            alt={item.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (!target.src.includes('logo-fyc.png')) {
                                target.src = '/logo-fyc.png';
                              }
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h4 className="text-xs font-bold text-white uppercase leading-tight mb-1 line-clamp-2">{item.name}</h4>
                              <p className="text-[10px] text-[#FFD700] font-bold tracking-wider">SKU: {item.sku}</p>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-neutral-600 hover:text-[#D32F2F] transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center bg-[#151515] rounded border border-[#333] h-7">
                              <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-full flex items-center justify-center hover:bg-[#222] text-neutral-400 rounded-l transition-colors"><Minus className="w-3 h-3" /></button>
                              <span className="w-8 text-center text-xs font-bold text-white select-none">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-full flex items-center justify-center hover:bg-[#222] text-neutral-400 rounded-r transition-colors"><Plus className="w-3 h-3" /></button>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-[#FFD700]">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {step === 'checkout' && (
                <div className="p-5 space-y-6">
                  <div className="bg-[#111] p-1 rounded-lg border border-[#333] flex relative">
                    <button onClick={() => setDocType('boleta')} className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all relative z-10 ${docType === 'boleta' ? 'text-black bg-[#FFD700] shadow-md' : 'text-neutral-500 hover:text-white'}`}>
                      <Receipt className="w-4 h-4" /> Boleta
                    </button>
                    <button onClick={() => setDocType('factura')} className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all relative z-10 ${docType === 'factura' ? 'text-black bg-[#FFD700] shadow-md' : 'text-neutral-500 hover:text-white'}`}>
                      <FileText className="w-4 h-4" /> Factura
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
                      <User className="w-4 h-4 text-[#FFD700]" />
                      <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">Datos de Contacto</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Nombre Completo *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-[#151515] border border-[#333] focus:border-[#FFD700] rounded px-3 py-2 text-xs text-white outline-none transition-colors" placeholder="Ej: Juan Pérez" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Teléfono / WhatsApp *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#151515] border border-[#333] focus:border-[#FFD700] rounded px-3 py-2 text-xs text-white outline-none transition-colors" placeholder="+56 9 ..." />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Región / Comuna</label>
                          <input type="text" name="region" value={formData.region} onChange={handleInputChange} className="w-full bg-[#151515] border border-[#333] focus:border-[#FFD700] rounded px-3 py-2 text-xs text-white outline-none transition-colors" placeholder="Ej: Santiago" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Dirección</label>
                          <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-[#151515] border border-[#333] focus:border-[#FFD700] rounded px-3 py-2 text-xs text-white outline-none transition-colors" placeholder="Calle 123" />
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {docType === 'factura' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-4 pt-4">
                          <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
                            <Building2 className="w-4 h-4 text-[#FFD700]" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">Datos Empresa (SII)</h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">RUT Empresa *</label>
                              <input type="text" name="rut" value={formData.rut} onChange={handleInputChange} className="w-full bg-[#151515] border border-[#FFD700]/50 focus:border-[#FFD700] rounded px-3 py-2 text-xs text-white outline-none transition-colors bg-[#FFD700]/5" placeholder="76.123.456-K" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Razón Social *</label>
                              <input type="text" name="razonSocial" value={formData.razonSocial} onChange={handleInputChange} className="w-full bg-[#151515] border border-[#FFD700]/50 focus:border-[#FFD700] rounded px-3 py-2 text-xs text-white outline-none transition-colors bg-[#FFD700]/5" placeholder="Constructora SPA" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Giro Comercial</label>
                              <input type="text" name="giro" value={formData.giro} onChange={handleInputChange} className="w-full bg-[#151515] border border-[#FFD700]/50 focus:border-[#FFD700] rounded px-3 py-2 text-xs text-white outline-none transition-colors bg-[#FFD700]/5" placeholder="Ej: Obras menores en construcción" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="bg-[#111] p-6 border-t border-[#222] shadow-[0_-5px_30px_rgba(0,0,0,0.5)]">
                <div className="mb-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs text-neutral-400 font-medium">Total Estimado</span>
                    <span className="text-2xl font-black font-industrial text-[#FFD700]">{formatPrice(getTotal())}</span>
                  </div>
                  {step === 'cart' && (
                    <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} className={`h-full ${remainingForFreeShipping <= 0 ? 'bg-green-500' : 'bg-[#FFD700]'} relative`} />
                    </div>
                  )}
                  {step === 'cart' && remainingForFreeShipping > 0 && (
                    <p className="text-[9px] text-neutral-500 mt-1 text-right">Faltan {formatPrice(remainingForFreeShipping)} para envío gratis (Stgo).</p>
                  )}
                </div>
                <div className="space-y-3">
                  {step === 'cart' ? (
                    <>
                      <button onClick={quickCheckout} className="w-full py-4 bg-[#25D366] hover:bg-[#20b858] text-white font-black text-xs uppercase tracking-[0.1em] rounded transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" /> Cotizar Rápido por WhatsApp
                      </button>
                      <button onClick={() => setStep('checkout')} className="w-full py-3 bg-transparent border border-[#333] hover:border-[#FFD700] text-neutral-300 hover:text-white font-bold text-[10px] uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2">
                        Solicitar Factura Pyme <ArrowRight className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <button onClick={handleWhatsAppCheckout} className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black text-xs uppercase tracking-[0.15em] rounded transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" /> Enviar Pedido Formal
                    </button>
                  )}
                  {step === 'cart' && (
                    <button onClick={toggleCart} className="w-full py-3 bg-transparent text-neutral-500 hover:text-[#FFD700] font-bold text-[10px] uppercase tracking-wider rounded transition-colors underline decoration-neutral-700 underline-offset-4 hidden">
                      Seguir Viendo Productos
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- HOME COMPONENT (CATALOG VIEW) ---
const Home = ({
  category, setCategory,
  searchTerm, setSearchTerm,
  maxPrice, setMaxPrice,
  maxProductPrice,
  filteredProducts,
  setSidebarOpen
}: any) => {

  // WPO: State for Lazy Loading products (DOM size reduction)
  const [visibleCount, setVisibleCount] = useState(12);

  // Focus Navigation & Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(12);

    // Solo forzamos el scroll suave a la parrilla si no estamos en carga inicial silenciosa
    const timer = setTimeout(() => {
      const grid = document.getElementById('productos');
      if (grid) {
        // Obtenemos un offset superior considerando barras de navegación estáticas (Desktop/Mobile)
        const y = grid.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [category, searchTerm, maxPrice]);

  const handleBentoCategorySelect = (cat: string) => {
    setCategory(cat);
    const grid = document.getElementById('productos');
    grid?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section (Only shows when not searching) */}
      {category === 'Todas' && !searchTerm && (
        <>
          <Hero onCatalogClick={() => {
            const grid = document.getElementById('productos');
            grid?.scrollIntoView({ behavior: 'smooth' });
          }} />
          <CategoryBento onSelectCategory={handleBentoCategorySelect} />
          <About />
        </>
      )}

      {/* Catalog Section */}
      <div className="bg-[#111] border-t border-[#222]">
        <div id="productos" className="max-w-[1600px] mx-auto px-6 py-16 md:py-24 scroll-mt-32">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Desktop Sidebar (Sticky) */}
            <div className="hidden lg:block sticky top-32 w-72 flex-shrink-0">
              <Sidebar
                selectedCategory={category}
                onSelectCategory={setCategory}
                maxPrice={maxPrice}
                onPriceChange={setMaxPrice}
                absMaxPrice={maxProductPrice}
              />
            </div>

            {/* Product Grid Area */}
            <div className="flex-1 w-full">
              {/* Results Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#222]">
                <div>
                  <h2 className="text-3xl md:text-4xl font-industrial font-black text-white uppercase tracking-tighter mb-2">
                    {searchTerm ? `Buscando "${searchTerm}"` : category}
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
                    {filteredProducts.length} Productos Disponibles
                  </div>
                </div>

                {/* Mobile Filter Trigger */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center justify-center gap-2 w-full md:w-auto bg-[#1A1A1A] border border-[#333] rounded-full py-4 px-6 text-white text-xs font-black uppercase tracking-widest hover:border-[#FFD700] hover:text-[#FFD700] transition-all shadow-md"
                >
                  <Menu className="w-4 h-4" /> Filtrar Catálogo
                </button>
              </div>

              {/* Grid */}
              {filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.slice(0, visibleCount).map((product: any) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {visibleCount < filteredProducts.length && (
                    <div className="mt-12 flex justify-center">
                      <button
                        onClick={() => setVisibleCount(v => v + 12)}
                        className="bg-[#1A1A1A] hover:bg-[#FFD700] text-white hover:text-black border border-[#333] hover:border-[#FFD700] px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest transition-all shadow-xl"
                      >
                        Cargar Más Herramientas ({filteredProducts.length - visibleCount} restantes)
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="min-h-[400px] flex flex-col items-center justify-center text-neutral-500 border border-[#222] border-dashed rounded-2xl bg-[#0E0E0E] p-12 text-center">
                  <AlertCircle className="w-16 h-16 mb-4 text-neutral-700" />
                  <h3 className="text-2xl font-industrial font-bold uppercase mb-2 text-white">Sin resultados</h3>
                  <p className="text-sm uppercase tracking-wider mb-8 text-neutral-500">No encontramos herramientas con esos filtros.</p>
                  <button onClick={() => { setSearchTerm(''); setCategory('Todas'); setMaxPrice(maxProductPrice) }} className="bg-[#FFD700] text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-colors shadow-xl">
                    Ver Todo el Catálogo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Maestros />
    </>
  );
};

// --- APP CONTENT WRAPPER (To use Hooks) ---
const AppContent = () => {
  const [category, setCategory] = useState('Todas');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Navigation Hooks
  const navigate = useNavigate();
  const location = useLocation();

  const maxProductPrice = Math.max(...PRODUCTS.map(p => p.priceRetail));
  const [maxPrice, setMaxPrice] = useState(maxProductPrice);
  const [liveProducts, setLiveProducts] = useState(PRODUCTS);

  useEffect(() => {
    let isMounted = true;
    const fetchSupabaseProducts = async () => {
      try {
        const { data, error } = await supabase.from('productos').select('*');
        if (data && data.length > 0 && isMounted) {
          setLiveProducts(prev => {
            return prev.map(p => {
              const remote = data.find(d => d.sku === p.sku);
              if (remote) {
                return {
                  ...p,
                  inStock: remote.en_stock !== false,
                  priceWholesale: remote.precio_mayorista || p.priceWholesale,
                  priceRetail: remote.precio_detalle || p.priceRetail,
                  isVisible: remote.estado_visibilidad !== false,
                  imageUrl: remote.url_imagen || p.imageUrl
                };
              }
              return p;
            });
          });
        }
      } catch (err) {
        console.warn('Supabase fetch error, fallback to constants', err);
      }
    };
    fetchSupabaseProducts();

    // Suscripción Realtime a Supabase Postgres
    const channel = supabase
      .channel('productos_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'productos' }, (payload) => {
        // Al ocurrir un cambio, forzamos refetch para sincronizar
        fetchSupabaseProducts();
        // Validamos el estado del carro en caso de tener el item agotado
        useCartStore.getState().validateCartStock();
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return liveProducts.filter(p => {
      // Ocultar de la web si isVisible es false
      if (p.isVisible === false) return false;

      const matchCat = category === 'Todas' || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPrice = p.priceWholesale <= maxPrice;
      return matchCat && matchSearch && matchPrice;
    });
  }, [category, searchTerm, maxPrice, liveProducts]);

  // Handle Search Redirection
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    // If user starts searching while on a legal page, redirect to home/catalog
    if (term && location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleSidebarCategorySelect = (c: string) => {
    setCategory(c);
    setSidebarOpen(false);
    if (location.pathname !== '/') navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white selection:bg-[#FFD700] selection:text-black font-sans">

      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <MobileSidebarDrawer isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
        <Sidebar
          selectedCategory={category}
          onSelectCategory={handleSidebarCategorySelect}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
          absMaxPrice={maxProductPrice}
        />
      </MobileSidebarDrawer>

      <main className="flex-1 relative">
        <MarqueeBar />

        <Routes>
          <Route path="/" element={
            <Home
              category={category} setCategory={setCategory}
              searchTerm={searchTerm} setSearchTerm={setSearchTerm}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              maxProductPrice={maxProductPrice}
              filteredProducts={filteredProducts}
              setSidebarOpen={setSidebarOpen}
            />
          } />
          <Route path="/despachos" element={<ShippingPolicy onBack={() => { }} />} />
          <Route path="/devoluciones" element={<ReturnsPolicy onBack={() => { }} />} />
          <Route path="/terminos" element={<TermsAndConditions onBack={() => { }} />} />
          <Route
            path="/admin"
            element={
              <React.Suspense fallback={<div className="min-h-screen bg-[#050505] text-white flex justify-center items-center font-industrial text-xl uppercase animate-pulse">Cargando Módulo Administrativo...</div>}>
                <AdminDashboard />
              </React.Suspense>
            }
          />
        </Routes>

      </main>

      <Footer onNavigate={() => { }} /> {/* onNavigate is deprecated in Footer, uses Link now */}
      <CartDrawer />
      <ScrollToTopButton />
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
