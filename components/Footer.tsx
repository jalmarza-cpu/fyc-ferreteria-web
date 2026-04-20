import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { CONTACT_PHONE_DISPLAY, CONTACT_EMAIL, CONTACT_ADDRESS, CONTACT_MAP_URL, BUSINESS_HOURS, CONTACT_PHONE } from '../constants';
import { Link } from 'react-router-dom';

interface FooterProps {
  onNavigate: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050505] border-t border-[#222] text-neutral-400 py-[40px]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMNA 1: MARCA */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
               <div className="font-industrial font-black text-3xl tracking-tighter uppercase">
                 FYC<span className="text-[#FFFFFF]">SPA</span>
               </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Soluciones en ferretería industrial y materiales de construcción. 
              Calidad profesional al alcance de tu obra y hogar.
            </p>
            <div className="flex gap-4">
              {/* Instagram — ACTIVO Etapa 1 */}
              <a
                href="https://www.instagram.com/fyc.ferreteria/"
                target="_blank"
                rel="noopener noreferrer"
                title="Síguenos en Instagram"
                aria-label="Síguenos en Instagram"
                className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center hover:bg-[#FFFFFF] hover:text-black transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              {/* Facebook — STANDBY Etapa 2 (deshabilitado) */}
              <span
                title="Facebook próximamente"
                className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center opacity-40 cursor-default select-none"
              >
                <Facebook className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* COLUMNA 2: CONTACTO DIRECTO */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#FFFFFF]"></span> Contacto
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent('¡Hola FYC! Necesito una cotización.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-[#FFFFFF] transition-colors group"
                >
                  <Phone className="w-5 h-5 text-[#FFFFFF] group-hover:animate-pulse" />
                  <span className="font-bold text-white">{CONTACT_PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-start gap-3 hover:text-[#FFFFFF] transition-colors">
                  <Mail className="w-5 h-5 text-[#FFFFFF]" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </li>
              <li>
                <a href={CONTACT_MAP_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-[#FFFFFF] transition-colors">
                  <MapPin className="w-5 h-5 text-[#FFFFFF] shrink-0" />
                  <div>
                    <span className="block text-white font-medium">Centro de Operaciones:</span>
                    {/* AQUI SE USA LA VARIABLE AUTOMÁTICA */}
                    <span>{CONTACT_ADDRESS}</span>
                    <span className="block text-[10px] text-[#FFFFFF] mt-1">(Venta Online y Despachos)</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: HORARIO EXTENDIDO */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#FFFFFF]"></span> Horario Atención
            </h3>
            <ul className="space-y-4 text-sm bg-[#111] p-4 rounded-lg border border-[#222]">
              {/* AQUI SE GENERAN LOS HORARIOS AUTOMÁTICAMENTE */}
              {BUSINESS_HOURS.map((item, index) => (
                <li key={index} className="flex items-center justify-between border-b border-[#222] last:border-0 pb-2 last:pb-0">
                  <span className="flex items-center gap-2 text-neutral-300">
                    <Clock className="w-3 h-3 text-[#FFFFFF]" /> {item.day}
                  </span>
                  <span className="font-bold text-white text-xs">{item.hours}</span>
                </li>
              ))}
              <li className="pt-2 text-[10px] text-[#FFFFFF] text-center font-bold uppercase tracking-wider">
                ¡Atendemos tus urgencias!
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: LEGAL */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#FFFFFF]"></span> Información
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/despachos" className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors group">
                  <ArrowRight className="w-3 h-3 text-[#333] group-hover:text-[#FFFFFF]" /> Políticas de Despacho
                </Link>
              </li>
              <li>
                <Link to="/devoluciones" className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors group">
                   <ArrowRight className="w-3 h-3 text-[#333] group-hover:text-[#FFFFFF]" /> Cambios y Devoluciones
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors group">
                   <ArrowRight className="w-3 h-3 text-[#333] group-hover:text-[#FFFFFF]" /> Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BARRA INFERIOR */}
        <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 FYC Ferretería Industrial SpA. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2 text-neutral-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Sitio Seguro SSL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
