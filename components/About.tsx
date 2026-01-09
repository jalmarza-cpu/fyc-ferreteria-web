
import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Handshake, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <section id="nosotros" className="relative py-20 bg-[#0A0A0A] border-y border-[#222] overflow-hidden scroll-mt-32">
      
      {/* Background Texture & Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#111] to-transparent pointer-events-none"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Column 1: The Manifesto */}
          <div>
            <div className="inline-flex items-center gap-2 mb-6 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-full px-4 py-1.5">
               <Users className="w-4 h-4 text-[#FFD700]" />
               <span className="text-[#FFD700] text-[10px] font-black uppercase tracking-widest">
                  Nuestra Filosofía
               </span>
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-industrial font-black text-white uppercase leading-[1] tracking-tighter mb-8"
            >
              El Socio que <br/>
              <span className="text-[#FFD700]">Tu Obra Necesita</span>
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-neutral-400 text-sm md:text-base leading-relaxed"
            >
              <p className="font-medium text-white border-l-4 border-[#FFD700] pl-6 py-1">
                En <strong className="text-white">F y C Spa</strong>, entendemos la regla de oro: <span className="text-[#FFD700]">una obra no puede detenerse</span>. 
              </p>
              
              <p>
                Nacimos con una misión radicalmente clara: <strong>democratizar los precios industriales en Chile</strong>. Rompemos la barrera entre las grandes constructoras y el maestro independiente. Creemos firmemente que todos merecen acceso a herramientas profesionales, insumos de primera línea y <span className="text-white underline decoration-[#FFD700] decoration-2 underline-offset-4">precios mayoristas reales</span>, sin letra chica ni requisitos imposibles.
              </p>

              <p>
                Somos una empresa chilena forjada en el compromiso con la <strong>calidad</strong>, la obsesión por la <strong>rapidez en el despacho</strong> y, sobre todo, el profundo <strong>respeto</strong> por quienes construyen el futuro del país con sus propias manos.
              </p>

              <div className="pt-4">
                <h3 className="text-2xl font-industrial font-bold text-white uppercase italic tracking-wide">
                  "Soluciones firmes para trabajos exigentes."
                </h3>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Visual Grid & Values */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Card 1 */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-[#151515] border border-[#222] p-6 rounded-2xl group hover:border-[#FFD700] transition-colors"
                >
                    <HardHat className="w-10 h-10 text-neutral-600 group-hover:text-[#FFD700] mb-4 transition-colors" />
                    <h4 className="text-white font-bold uppercase text-sm mb-2">Para el Maestro</h4>
                    <p className="text-xs text-neutral-500">Trato digno y precios justos sin importar el tamaño de tu compra.</p>
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-[#151515] border border-[#222] p-6 rounded-2xl group hover:border-[#FFD700] transition-colors sm:mt-8"
                >
                    <Award className="w-10 h-10 text-neutral-600 group-hover:text-[#FFD700] mb-4 transition-colors" />
                    <h4 className="text-white font-bold uppercase text-sm mb-2">Calidad Certificada</h4>
                    <p className="text-xs text-neutral-500">Solo vendemos herramientas que nosotros mismos usaríamos.</p>
                </motion.div>

                 {/* Card 3 */}
                 <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-[#151515] border border-[#222] p-6 rounded-2xl group hover:border-[#FFD700] transition-colors"
                >
                    <Handshake className="w-10 h-10 text-neutral-600 group-hover:text-[#FFD700] mb-4 transition-colors" />
                    <h4 className="text-white font-bold uppercase text-sm mb-2">Trato Directo</h4>
                    <p className="text-xs text-neutral-500">Sin intermediarios burocráticos. Hablas con expertos.</p>
                </motion.div>

                {/* Image Decorator */}
                <div className="relative rounded-2xl overflow-hidden h-full min-h-[160px] sm:mt-8">
                    <img 
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600" 
                        alt="Trabajador de construcción" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                        <span className="text-[#FFD700] font-black text-4xl">100%</span>
                        <span className="block text-white text-[10px] font-bold uppercase tracking-widest">Compromiso</span>
                    </div>
                </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
