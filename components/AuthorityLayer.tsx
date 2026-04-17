import React from 'react';
import { Truck, PackageCheck, ShieldCheck } from 'lucide-react';

const partners = [
  "DeWalt", "Makita", "Bosch", "Milwaukee", "Stanley", "Toughbuilt", "Truper"
];

const AuthorityLayer: React.FC = () => {
  return (
    <section className="bg-[#050505] border-t border-[#222]">
      {/* Trust Badges */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[#111] bg-[#0A0A0A] hover:border-[#3B82F6]/50 transition-colors">
            <Truck className="w-10 h-10 text-[#A0AEC0] mb-4" strokeWidth={1.5} />
            <h3 className="text-white font-industrial font-bold text-xl uppercase tracking-wider mb-2">Despacho Hoy</h3>
            <p className="text-[#A0AEC0] text-xs">A todo Chile continental</p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[#111] bg-[#0A0A0A] hover:border-[#3B82F6]/50 transition-colors">
            <PackageCheck className="w-10 h-10 text-[#A0AEC0] mb-4" strokeWidth={1.5} />
            <h3 className="text-white font-industrial font-bold text-xl uppercase tracking-wider mb-2">Stock Real</h3>
            <p className="text-[#A0AEC0] text-xs">Inventario sincronizado 24/7</p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[#111] bg-[#0A0A0A] hover:border-[#3B82F6]/50 transition-colors">
            <ShieldCheck className="w-10 h-10 text-[#A0AEC0] mb-4" strokeWidth={1.5} />
            <h3 className="text-white font-industrial font-bold text-xl uppercase tracking-wider mb-2">Soporte INNOBATE</h3>
            <p className="text-[#A0AEC0] text-xs">Servicio experto especializado</p>
          </div>

        </div>
      </div>

      {/* Partners Carousel / Grid */}
      <div className="border-t border-[#111] bg-[#0A0A0A] py-10 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <p className="text-center text-[10px] font-bold text-[#A0AEC0] uppercase tracking-[0.3em] mb-8">
            HERRAMIENTAS DE CLASE MUNDIAL EN NUESTRO STOCK
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {partners.map((partner, idx) => (
              <span key={idx} className="font-industrial font-black text-2xl md:text-3xl tracking-tighter text-white opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorityLayer;
