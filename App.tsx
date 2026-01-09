
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, CheckCircle2, AlertCircle, Menu, ArrowUp, Truck } from 'lucide-react';
import { PRODUCTS, CONTACT_PHONE_DISPLAY } from './constants';
import { useCartStore } from './store';

// Imports from specialized components
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Sidebar from './components/Sidebar';
import CategoryBento from './components/CategoryBento';
import About from './components/About';

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
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotal, checkout } = useCartStore();

  // Configuración de Envío Gratis
  const FREE_SHIPPING_THRESHOLD = 100000;
  const currentTotal = getTotal();
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - currentTotal);
  const progressPercentage = Math.min((currentTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

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
            onClick={toggleCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]"
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#f5f5f5] text-black z-[90] flex flex-col shadow-2xl"
          >
            {/* Header Limpio (Estilo imagen referencia) */}
            <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-white">
              <h2 className="text-xl font-bold text-black">Carrito</h2>
              <button onClick={toggleCart} className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black transition-colors">
                <X className="w-5 h-5" /> Cerrar
              </button>
            </div>

            {/* Lista de Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-80">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                     <ShoppingCart className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-bold text-sm text-gray-500">Tu carrito está vacío</p>
                </div>
              ) : (
                items.map(item => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 border-b border-gray-100 pb-4 last:border-0"
                  >
                    <div className="w-20 h-20 bg-gray-50 flex-shrink-0 rounded border border-gray-200 overflow-hidden p-2">
                      <img src={item.image || "https://placehold.co/100"} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-sm font-bold text-black leading-tight mb-1 pr-2 line-clamp-2">{item.name}</h4>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">SKU: {item.sku}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                         <div className="flex items-center bg-gray-100 rounded px-1 h-8">
                           <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-full flex items-center justify-center hover:bg-gray-200 text-gray-600 rounded transition-colors"><Minus className="w-3 h-3" /></button>
                           <span className="w-8 text-center text-xs font-bold text-black select-none">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-full flex items-center justify-center hover:bg-gray-200 text-gray-600 rounded transition-colors"><Plus className="w-3 h-3" /></button>
                         </div>
                         <div className="text-right">
                             <p className="text-sm font-bold text-black">{formatPrice(item.price * item.quantity)}</p>
                             {item.quantity > 1 && <p className="text-[10px] text-gray-500">{formatPrice(item.price)} c/u</p>}
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer con Lógica de Envío Gratis (Replica de Referencia) */}
            {items.length > 0 && (
              <div className="bg-white p-6 border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-black">Subtotal:</span>
                    <span className="text-xl font-bold text-[#0056b3]">{formatPrice(getTotal())}</span>
                </div>

                {/* Barra de Progreso Envío */}
                <div className="mb-6">
                    <p className="text-xs text-gray-600 mb-2">
                    {remainingForFreeShipping > 0 
                        ? <>Agrega <span className="font-bold text-[#0056b3]">{formatPrice(remainingForFreeShipping)}</span> al carrito y obtén envío gratuito (solo en Santiago)</>
                        : <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> ¡Felicidades! Tienes envío gratuito en Santiago</span>
                    }
                    </p>
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 0.5 }}
                            className={`h-full ${remainingForFreeShipping <= 0 ? 'bg-green-500' : 'bg-[#0056b3]'} rounded-full relative`}
                        >
                            {/* Efecto de rayas en la barra (Estilo similar a referencia) */}
                            <div className="absolute inset-0 w-full h-full opacity-30 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
                        </motion.div>
                    </div>
                </div>

                {/* Botones de Acción */}
                <div className="space-y-3">
                    <button 
                        onClick={toggleCart} // En una SPA esto suele ser "Seguir Comprando"
                        className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider rounded transition-colors"
                    >
                        Ver Carrito / Seguir Comprando
                    </button>
                    
                    <button 
                        onClick={checkout}
                        className="w-full py-3.5 bg-[#0056b3] hover:bg-[#004494] text-white font-bold text-xs uppercase tracking-wider rounded transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                    >
                        Finalizar Compra
                    </button>
                </div>

              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- MAIN APP ---
export default function App() {
  const [category, setCategory] = useState('Todas');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Price filter logic
  const maxProductPrice = Math.max(...PRODUCTS.map(p => p.priceRetail));
  const [maxPrice, setMaxPrice] = useState(maxProductPrice);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = category === 'Todas' || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sku.includes(searchTerm);
      const matchPrice = p.priceWholesale <= maxPrice;
      return matchCat && matchSearch && matchPrice;
    });
  }, [category, searchTerm, maxPrice]);

  const handleBentoCategorySelect = (cat: string) => {
    setCategory(cat);
    const grid = document.getElementById('catalogo');
    grid?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFooterNavigation = (section: string) => {
    if (section === 'inicio') {
        // Reset state so Hero and Bento appear
        setCategory('Todas');
        setSearchTerm('');
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const el = document.getElementById(section);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white selection:bg-[#FFD700] selection:text-black font-sans">
      
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        onMenuClick={() => setSidebarOpen(true)}
      />

      <MobileSidebarDrawer isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
         <Sidebar 
            selectedCategory={category} 
            onSelectCategory={(c) => { setCategory(c); setSidebarOpen(false); }}
            maxPrice={maxPrice}
            onPriceChange={setMaxPrice}
            absMaxPrice={maxProductPrice}
         />
      </MobileSidebarDrawer>

      <main className="flex-1 relative">
        <MarqueeBar />

        {/* Hero Section (Only shows on home/no search) */}
        {category === 'Todas' && !searchTerm && (
          <>
            <Hero onCatalogClick={() => {
                const grid = document.getElementById('catalogo');
                grid?.scrollIntoView({ behavior: 'smooth' });
            }} />
            
            <CategoryBento onSelectCategory={handleBentoCategorySelect} />

            {/* New About Us Section */}
            <About />
          </>
        )}

        {/* Catalog Section with Sidebar Layout */}
        <div className="bg-gray-100 border-t border-[#222]">
          <div id="catalogo" className="max-w-[1600px] mx-auto px-6 py-16 md:py-24 scroll-mt-32">
            
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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-gray-300">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-industrial font-black text-black uppercase tracking-tighter mb-2">
                      {searchTerm ? `Buscando "${searchTerm}"` : category}
                    </h2>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-widest">
                      <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
                      {filteredProducts.length} Productos Disponibles
                    </div>
                  </div>
                  
                  {/* Mobile Filter Trigger (Visible only on mobile/tablet) */}
                  <button 
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden flex items-center justify-center gap-2 w-full md:w-auto bg-white border border-gray-300 rounded-full py-4 px-6 text-black text-xs font-black uppercase tracking-widest hover:border-[#FFD700] hover:shadow-lg transition-all shadow-md"
                  >
                    <Menu className="w-4 h-4" /> Filtrar Catálogo
                  </button>
                </div>

                {/* Grid UPDATED: Compact Design (4 columns on XL, tighter gap) */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="min-h-[400px] flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-2xl bg-white p-12 text-center">
                    <AlertCircle className="w-16 h-16 mb-4 text-gray-300" />
                    <h3 className="text-2xl font-industrial font-bold uppercase mb-2 text-black">Sin resultados</h3>
                    <p className="text-sm uppercase tracking-wider mb-8 text-gray-500">No encontramos herramientas con esos filtros.</p>
                    <button onClick={() => {setSearchTerm(''); setCategory('Todas'); setMaxPrice(maxProductPrice)}} className="bg-black text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#FFD700] hover:text-black transition-colors shadow-xl">
                      Ver Todo el Catálogo
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={handleFooterNavigation} />
      <CartDrawer />
      <ScrollToTopButton />
    </div>
  );
}
