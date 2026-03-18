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
      className="h-[600px] md:h-[700px] w-full flex items-center overflow-hidden border-b border-[#111] bg-[#050505] relative scroll-mt-32 shadow-[0_10px_50px_rgba(0,0,0,0.8)]"
    >
      {/* Static Premium Background: Dark Industrial Gradient */}
      <div className="absolute inset-0 w-full h-full z-0 bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,100,0,0.03)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#080808] to-black opacity-95"></div>
      </div>

      {/* Industrial Texture / Mesh Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] z-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>


      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 md:px-12 flex items-center h-full">
        {/* Barra Amarilla Decorativa (Acento Amarillo Neón Real) */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '60%' }}
          transition={{ duration: 1, ease: "circOut" }}
          className="w-2 md:w-3 bg-[#FFD700] absolute left-0 md:left-12 top-[20%] shadow-[0_0_20px_#FFD700,0_0_40px_#FFD700] rounded-r-lg"
        ></motion.div>

        <div className="flex flex-col max-w-3xl ml-4 md:ml-16 mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Etiqueta Superior */}
            <div className="inline-flex items-center gap-2 mb-6 bg-black/40 border border-[#FFD700] rounded-full px-5 py-2 backdrop-blur-md shadow-[0_0_15px_#FFD700]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] shadow-[0_0_10px_#FFD700,0_0_20px_#FFD700] animate-pulse"></span>
              <span className="text-[#FFD700] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] drop-shadow-[0_0_5px_#FFD700]">
                Stock Disponible 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.05] tracking-tighter font-industrial text-white mb-3 md:mb-4 drop-shadow-2xl">
              QUE TU OBRA NUNCA <br className="hidden md:block" /> SE DETENGA POR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFE55C] to-[#FFF1AB] drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">FALTA DE MATERIALES.</span>
            </h1>

            <h2 className="text-lg md:text-2xl text-white font-bold uppercase tracking-[0.15em] mb-8 flex items-center gap-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
              <span className="w-12 h-[2px] bg-[#FFD700] shadow-[0_0_15px_#FFD700]"></span>
              HERRAMIENTAS Y MATERIALES
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-xl text-white font-semibold max-w-xl leading-relaxed mb-10 border-l-2 border-[#FFD700] pl-6 backdrop-blur-sm bg-black/30 p-4 rounded-r-2xl drop-shadow-xl"
          >
            Evita retrasos y multas. Asegura tus insumos con stock real, facturación inmediata y despacho exprés.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <button
              onClick={onCatalogClick}
              className="group bg-[#FFD700] text-black px-8 py-4 md:py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_0_20px_#FFD700] hover:shadow-[0_0_40px_#FFD700,0_0_60px_#FFD700] font-industrial flex items-center justify-center gap-3 rounded-full w-full sm:w-auto"
            >
              Cotizar mi lista (Es rápido)
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={toggleCart}
              className="group bg-black/40 border border-[#FFD700]/50 text-white px-8 py-4 md:py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-[#FFD700]/20 hover:border-[#FFD700] transition-all backdrop-blur-md rounded-full w-full sm:w-auto flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_#FFD700]"
            >
              Resolver por WhatsApp
            </button>
          </motion.div>
        </div>

        {/* Lado Derecho: Imagen de Herramientas Premium con Glow */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="hidden xl:flex flex-1 justify-end items-center relative h-full"
        >
          {/* Glow Effect Backend */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFD700]/10 rounded-full blur-[120px] pointer-events-none"></div>

          <img
            src="/images/hero-tools.png"
            alt="Herramientas Industriales F&C"
            className="relative z-10 max-h-[550px] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter brightness-110"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
