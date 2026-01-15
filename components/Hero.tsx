
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useCartStore } from '../store';

interface HeroProps {
  onCatalogClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCatalogClick }) => {
  const toggleCart = useCartStore((state) => state.toggleCart);

  return (
    <section 
      id="inicio" 
      className="h-[600px] md:h-[700px] w-full flex items-center overflow-hidden border-b border-[#222] bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat relative scroll-mt-32"
    >
      {/* Overlay oscuro para legibilidad mejorada sobre la foto del maestro */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40 z-0"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 md:px-12 flex items-center h-full">
        {/* Barra Amarilla Decorativa (Identidad de Marca) */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: '60%' }}
          transition={{ duration: 1, ease: "circOut" }}
          className="w-2 md:w-4 bg-[#FFD700] absolute left-0 md:left-12 top-0 shadow-[0_0_30px_rgba(255,215,0,0.4)] rounded-b-lg hidden md:block"
        ></motion.div>

        <div className="flex flex-col max-w-3xl ml-0 md:ml-16 mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
             {/* Etiqueta Superior Actualizada */}
             <div className="inline-flex items-center gap-2 mb-4 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full px-4 py-1.5 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></span>
                <span className="text-[#FFD700] text-[10px] md:text-xs font-black uppercase tracking-widest">
                  Stock Disponible 2026
                </span>
             </div>

             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.1] tracking-tighter font-industrial text-white mb-2 drop-shadow-2xl">
               EL SOCIO DE TU OBRA: <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFE55C]">PRECIOS MAYORISTAS Y RAPIDEZ</span>
             </h1>

             {/* NUEVO SUBTÍTULO: CLARIDAD EN EL MODELO DE NEGOCIO */}
             <h2 className="text-xl md:text-2xl text-neutral-300 font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
               <span className="w-8 h-[2px] bg-[#FFD700]"></span>
               VENTA TÉCNICA INDUSTRIAL
             </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-xl text-neutral-300 font-medium max-w-xl leading-relaxed mb-10 border-l-2 border-[#FFD700] pl-6"
          >
            Herramientas y materiales técnicos. Cotiza formalmente con Factura o Boleta en segundos. Despachos a todo Chile.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={onCatalogClick}
              className="group bg-[#FFD700] text-black px-8 py-4 md:py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] font-industrial flex items-center justify-center gap-3 rounded-full w-full sm:w-auto"
            >
              VER CATÁLOGO COMPLETO
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
            
            <button 
              onClick={toggleCart}
              className="group bg-transparent border border-white/30 text-white px-8 py-4 md:py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-sm rounded-full w-full sm:w-auto flex items-center justify-center"
            >
              Cotizar Lista
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
