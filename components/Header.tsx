
import React from 'react';
import { ShoppingCart, Search, Phone, Mail, Menu } from 'lucide-react';
import { CONTACT_PHONE_DISPLAY, CONTACT_EMAIL, CONTACT_PHONE } from '../constants';
import { useCartStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, onMenuClick }) => {
  const { items, toggleCart, getTotal } = useCartStore();

  // Calcular cantidad total de productos (suma de cantidades, no solo SKUs únicos)
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = getTotal();

  const formatPriceHeader = (val: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(val);

  return (
    <header className="sticky top-0 z-50 w-full shadow-2xl">
      {/* 1. Top Bar - Contact Info */}
      <div className="bg-[#111111] text-gray-400 py-2 px-4 border-b border-[#222] text-[10px] md:text-xs font-medium tracking-wide">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`tel:${CONTACT_PHONE_DISPLAY}`} className="flex items-center gap-2 hover:text-[#FFD700] transition-colors">
              <Phone className="w-3 h-3 text-[#FFD700]" />
              <span>{CONTACT_PHONE_DISPLAY}</span>
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hidden sm:flex items-center gap-2 hover:text-[#FFD700] transition-colors">
              <Mail className="w-3 h-3 text-[#FFD700]" />
              <span className="lowercase">{CONTACT_EMAIL}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-gray-500 uppercase tracking-widest text-[9px]">Atención a Empresas y Maestros</span>
            <div className="h-3 w-[1px] bg-[#333] hidden md:block"></div>
            <span className="text-[#FFD700] font-bold uppercase tracking-wider text-[9px]">Envíos a todo Chile</span>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222] py-4 px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4 md:gap-12">

          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button onClick={onMenuClick} className="lg:hidden text-white hover:text-[#FFD700] transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex flex-col leading-none select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex items-center gap-1">
                <span className="font-industrial text-3xl md:text-4xl text-white font-black tracking-tighter">F<span className="text-[#FFD700]">y</span>C</span>
                <span className="font-industrial text-xl md:text-2xl text-white font-bold tracking-tight mt-1">SPA</span>
              </div>
              <span className="text-[8px] md:text-[9px] text-neutral-500 font-black uppercase tracking-[0.3em] pl-1">Soluciones en Ferretería</span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6 mx-4">
            <a href="/#inicio" className="text-[11px] font-black uppercase tracking-widest text-white hover:text-[#FFD700] transition-colors">Inicio</a>
            <a href="/#nosotros" className="text-[11px] font-black uppercase tracking-widest text-[#999] hover:text-[#FFD700] transition-colors">Nosotros</a>
            <a href="/#productos" className="text-[11px] font-black uppercase tracking-widest text-[#999] hover:text-[#FFD700] transition-colors">Catálogo</a>
            <a href="/#maestros" className="text-[11px] font-black uppercase tracking-widest text-[#999] hover:text-[#FFD700] transition-colors">Maestros</a>
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-2xl relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-500 group-focus-within:text-[#FFD700] transition-colors" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full bg-[#151515] border border-[#333] text-white text-xs font-bold py-3.5 pl-10 pr-4 focus:ring-1 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none placeholder-neutral-600 uppercase tracking-widest transition-all"
              placeholder="Buscar herramienta, SKU o categoría..."
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <kbd className="inline-flex items-center border border-[#333] rounded px-2 text-[10px] font-sans font-medium text-neutral-500">
                ESC
              </kbd>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-[9px] text-neutral-500 font-black uppercase tracking-widest mb-0.5">Cotizar Ahora</span>
              <a href={`https://wa.me/${CONTACT_PHONE}?text=Hola,%20necesito%20una%20cotización.`} target="_blank" rel="noopener noreferrer" className="text-white text-xs font-bold hover:text-[#FFD700] transition-colors flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                WhatsApp Directo
              </a>
            </div>

            {/* --- BOTÓN DE CARRITO (PALETA CORPORATIVA) --- */}
            <button
              onClick={toggleCart}
              className="relative group flex items-center gap-3 bg-[#FFD700] hover:bg-[#FFED4D] text-black pl-1.5 pr-5 py-1.5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]"
            >
              {/* Círculo Negro con Ícono Amarillo */}
              <div className="bg-black text-[#FFD700] w-9 h-9 rounded-full flex items-center justify-center shadow-sm border border-[#333] group-hover:border-[#FFD700] transition-colors">
                <ShoppingCart className="w-4 h-4 fill-current" />
              </div>

              {/* Precio Total */}
              <div className="flex flex-col items-start">
                <span className="text-[9px] uppercase font-black text-neutral-800 leading-none tracking-wider mb-0.5">Mi Carro</span>
                <span className="text-base font-black tracking-tighter leading-none">{formatPriceHeader(totalPrice)}</span>
              </div>

              {/* Badge Flotante (Contador) */}
              <AnimatePresence mode="popLayout">
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="absolute -top-2 -right-2 bg-black text-[#FFD700] text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-[#1A1A1A] shadow-md"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Search (Visible only on mobile) */}
        <div className="lg:hidden mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="BUSCAR..."
            className="w-full bg-[#151515] border border-[#333] py-3 pl-10 text-xs text-white uppercase font-bold outline-none focus:border-[#FFD700]"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
