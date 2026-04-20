import React from 'react';
import { Truck, PackageCheck, ShieldCheck } from 'lucide-react';

const clients = [
  {
    name: "K'iris Inmobiliaria",
    logo: "/assets/clients/logo-Kiris-sin-fondo.png",
    // Texto negro en sitio oscuro → necesita fondo claro propio
    needsLightBg: true,
  },
  {
    name: "INNOBATE Agency",
    logo: "/assets/clients/logo-innobate.png",
    needsLightBg: false,
  },
  {
    name: "Taller Villar",
    logo: "/assets/clients/logo-electricidad-y-mecanica-villar.png",
    needsLightBg: false,
  },
  {
    name: "TransBravo",
    logo: "/assets/clients/Logo-transbravo-con-texto-con-fondo-negro.jpeg",
    needsLightBg: false,
  },
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

      {/* Clientes — Social Proof */}
      <div className="border-t border-[#111] bg-[#0A0A0A] py-14 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <p className="text-center text-[10px] font-bold text-[#A0AEC0] uppercase tracking-[0.3em] mb-12">
            EMPRESAS QUE CONFÍAN EN NOSOTROS
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
            {clients.map((client, idx) => (
              <div
                key={idx}
                title={client.name}
                className={`flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                  client.needsLightBg
                    ? 'bg-white rounded-xl px-5 py-3'
                    : ''
                }`}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-20 max-w-[200px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorityLayer;
