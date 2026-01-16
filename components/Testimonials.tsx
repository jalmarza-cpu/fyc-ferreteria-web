
import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Matias Canto",
    role: "Jefe de Obra",
    image: "Cliente-1-Matias-Canto.jpg",
    quote: "Pedí 3 taladros y llegaron al día siguiente a la obra con la factura lista. Excelente servicio.",
    highlight: "Rapidez Extrema"
  },
  {
    id: 2,
    name: "Axel 'Tito' Cabrera",
    role: "Contratista General",
    image: "Cliente-2-Axel-Cabrera.jpg",
    quote: "Cotización formal rápida. Los precios mayoristas son reales, se nota el ahorro en el total final.",
    highlight: "Precio Justo"
  },
  {
    id: 3,
    name: "Hector 'El maestro'",
    role: "Dueño de Casa",
    image: "Cliente-3-Hector-El-maestro",
    quote: "Necesitaba asesoría para un proyecto personal y me atendieron por WhatsApp como a un profesional.",
    highlight: "Calidad Industrial"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#0A0A0A] border-t border-[#222] relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-full px-4 py-1.5">
             <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
             <span className="text-[#FFD700] text-xs font-black uppercase tracking-widest">
                Clientes 100% Reales
             </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-industrial font-black text-white uppercase tracking-tight mb-4">
            Maestros que confían <span className="text-[#FFD700]">en FyC</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base">
            No lo decimos nosotros, lo dicen quienes están en terreno día a día construyendo Chile.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-[#111111] border border-[#333] p-8 rounded-2xl relative group hover:border-[#FFD700] transition-colors duration-300 flex flex-col h-full shadow-lg"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-[#FFD700]" />
              </div>

              {/* Stars - High Visibility */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700] drop-shadow-sm" />
                ))}
              </div>

              {/* Quote Text - Large & Legible */}
              <blockquote className="flex-grow mb-8">
                <p className="text-lg md:text-xl text-white font-medium leading-relaxed font-sans italic">
                  "{t.quote}"
                </p>
                <span className="inline-block mt-3 text-[10px] font-black uppercase tracking-widest text-[#FFD700] bg-[#FFD700]/10 px-2 py-1 rounded">
                  {t.highlight}
                </span>
              </blockquote>

              {/* User Profile */}
              <div className="flex items-center gap-4 mt-auto border-t border-[#222] pt-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#333] group-hover:border-[#FFD700] transition-colors">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-[#111]">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base leading-tight uppercase font-industrial tracking-wide">
                    {t.name}
                  </h4>
                  <p className="text-neutral-400 text-sm font-medium">
                    {t.role}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
