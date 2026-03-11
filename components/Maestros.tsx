
import React, { useState, useEffect } from 'react';
import { Star, Quote, CheckCircle2, Factory, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getMaestroImageUrl, supabase } from '../utils/supabase';

interface Maestro {
  id: number;
  name: string;
  role: string;
  originalImage: string;
  imagePath?: string;
  quote: string;
  highlight: string;
}

const FALLBACK_MAESTROS: Maestro[] = [
  {
    id: 1,
    name: "Matías Canto",
    role: "Jefe de Obra",
    originalImage: "https://ui-avatars.com/api/?name=Matias+Canto&background=FFD700&color=0A0A0A&size=200&bold=true",
    imagePath: "Cliente-1-Matias-Canto.jpg",
    quote: "Pedí alicates y llegaron al día siguiente a la obra con la factura lista. Excelente servicio.",
    highlight: "Rapidez Extrema"
  },
  {
    id: 2,
    name: "Axel Cabrera",
    role: "Contratista General",
    originalImage: "https://ui-avatars.com/api/?name=Axel+Cabrera&background=FFD700&color=0A0A0A&size=200&bold=true",
    imagePath: "Cliente-2-Axel-Cabrera.jpeg",
    quote: "Cotización formal rápida. Los precios mayoristas son reales, se nota el ahorro en el total final.",
    highlight: "Precio Justo"
  },
  {
    id: 3,
    name: "Héctor El Maestro",
    role: "Pintor Profesional",
    originalImage: "https://ui-avatars.com/api/?name=Hector+El+Maestro&background=FFD700&color=0A0A0A&size=200&bold=true",
    imagePath: "Cliente-3-Hector-El-maestro.jpeg",
    quote: "Necesitaba asesoría para un proyecto grande y me atendieron por WhatsApp de maravilla.",
    highlight: "Calidad Industrial"
  }
];

const Maestros = () => {
  const [maestrosData, setMaestrosData] = useState<Maestro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaestros = async () => {
      try {
        // Intento de conexión con la tabla 'testimonios'
        const { data, error } = await supabase
          .from('testimonios')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          // Mapear los datos de Supabase. Si imagePath viene en la BD, se usa.
          const mappedData = data.map((item: any) => ({
             id: item.id,
             name: item.name || item.nombre || 'Maestro Anónimo',
             role: item.role || item.rol || 'Cliente Fiscal',
             quote: item.quote || item.comentario || item.testimonio || '',
             highlight: item.highlight || item.destacado || 'Cliente Verificado',
             imagePath: item.imagePath || item.imagen || item.image || undefined,
             originalImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name || item.nombre || 'M')}&background=FFD700&color=0A0A0A&size=200&bold=true`
          }));
          setMaestrosData(mappedData);
        } else {
           console.log("No se encontraron testimonios en Supabase. Aplicando Fallback de Seguridad.");
           setMaestrosData(FALLBACK_MAESTROS);
        }
      } catch (error) {
        console.error("Error obteniendo testimonios de Supabase, activando protección:", error);
        setMaestrosData(FALLBACK_MAESTROS);
      } finally {
        setLoading(false);
      }
    };

    fetchMaestros();
  }, []);

  return (
    <section className="py-20 bg-[#0A0A0A] border-t border-[#222] relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent shadow-[0_0_20px_#FFD700]"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
             <Factory className="w-4 h-4 text-[#FFD700]" />
             <span className="text-[#FFD700] text-xs font-black uppercase tracking-widest drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]">
                Red de Profesionales
             </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-industrial font-black text-white uppercase tracking-tight mb-4">
            Únete a los jefes de obra <span className="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">más eficientes de Chile</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base uppercase tracking-wider font-bold">
            No lo decimos nosotros, lo dicen quienes construyen.
          </p>
        </div>

        {/* Grid of Cards */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
             <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-[#FFD700] animate-spin" />
                <span className="text-[#FFD700] uppercase font-black tracking-widest text-xs">Cargando Testimonios...</span>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {maestrosData.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-[#111111] border-2 border-[#222] hover:border-[#FFD700] p-8 rounded-xl relative group transition-all duration-300 flex flex-col h-full shadow-[0_0_0_rgba(255,215,0,0)] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
              >
                {/* Top Accent Line Neon */}
                <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-[#FFD700] transition-colors rounded-t-xl group-hover:shadow-[0_0_15px_#FFD700]"></div>

                {/* Quote Icon Background */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-30 transition-opacity drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                  <Quote className="w-12 h-12 text-[#FFD700]" />
                </div>

                {/* Stars - High Visibility Neon */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700] drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
                  ))}
                </div>

                {/* Quote Text - Large & Legible */}
                <blockquote className="flex-grow mb-8">
                  <p className="text-base md:text-lg text-white font-medium leading-relaxed font-sans italic relative z-10">
                    "{t.quote}"
                  </p>
                  <span className="inline-block mt-4 text-[10px] font-black uppercase tracking-widest text-black bg-[#FFD700] px-3 py-1.5 rounded shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                    {t.highlight}
                  </span>
                </blockquote>

                {/* User Profile */}
                <div className="flex items-center gap-4 mt-auto border-t border-[#333] pt-6 group-hover:border-[#FFD700]/50 transition-colors">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#333] group-hover:border-[#FFD700] transition-colors group-hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] bg-[#1A1A1A]">
                      <img 
                        src={getMaestroImageUrl(t.name, t.imagePath)} 
                        alt={t.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                           const target = e.target as HTMLImageElement;
                           if (target.src !== t.originalImage) { target.src = t.originalImage; }
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-[#111] shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base leading-tight uppercase font-industrial tracking-wide group-hover:text-[#FFD700] transition-colors drop-shadow-md">
                      {t.name}
                    </h4>
                    <p className="text-neutral-400 text-xs font-black uppercase tracking-widest mt-1">
                      {t.role}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Maestros;
