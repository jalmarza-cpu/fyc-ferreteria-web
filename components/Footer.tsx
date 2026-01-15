
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CONTACT_PHONE_DISPLAY } from '../constants';
import { Phone, Mail, MapPin, Facebook, Instagram, ShieldCheck, Truck, Headphones, ArrowRight, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

const Footer: React.FC<FooterProps> = () => {
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const [errors, setErrors] = useState({ email: '', phone: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', phone: '' };

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Formato de correo inválido';
      isValid = false;
    }

    const phoneRegex = /^[0-9\+\s]{8,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Mínimo 8 números válidos';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitStatus('success');
      setTimeout(() => {
        setSubmitStatus('idle');
        setFormData({ email: '', phone: '' });
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Helper to handle scrolling for hash links if on home, or navigate home then scroll
  const handleScrollLink = (id: string) => {
      // Logic handled nicely by Home component usually, but here we can force a nav to / then scroll
      // Simple implementation:
      window.location.href = `/#${id}`;
  };

  return (
    <footer className="bg-[#050505] border-t border-[#222] text-neutral-400 pt-16 pb-8">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#1A1A1A]">
          <div className="flex flex-col items-center text-center p-6 bg-[#0E0E0E] border border-[#1A1A1A] group hover:border-[#FFD700]/50 transition-colors">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFD700] transition-colors duration-300">
               <Truck className="w-8 h-8 text-[#FFD700] group-hover:text-black transition-colors" />
            </div>
            <h4 className="text-white font-industrial text-xl font-bold uppercase mb-2">Envíos en 24h</h4>
            <p className="text-xs text-neutral-500">Despacho express para mantener tu obra en movimiento.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-[#0E0E0E] border border-[#1A1A1A] group hover:border-[#FFD700]/50 transition-colors">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFD700] transition-colors duration-300">
              <ShieldCheck className="w-8 h-8 text-[#FFD700] group-hover:text-black transition-colors" />
            </div>
            <h4 className="text-white font-industrial text-xl font-bold uppercase mb-2">Garantía de Calidad</h4>
            <p className="text-xs text-neutral-500">Productos certificados y 100% garantizados.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-[#0E0E0E] border border-[#1A1A1A] group hover:border-[#FFD700]/50 transition-colors">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFD700] transition-colors duration-300">
              <Headphones className="w-8 h-8 text-[#FFD700] group-hover:text-black transition-colors" />
            </div>
            <h4 className="text-white font-industrial text-xl font-bold uppercase mb-2">Asesoría Técnica</h4>
            <p className="text-xs text-neutral-500">Expertos listos para resolver tus dudas por WhatsApp.</p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          {/* Brand Column */}
          <div className="col-span-1 space-y-6">
             <div className="flex flex-col">
                <h2 className="text-3xl font-industrial font-black text-white tracking-tighter">F y C <span className="text-[#FFD700]">SPA</span></h2>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-600">Soluciones en Ferretería</span>
             </div>
             <p className="text-xs leading-relaxed max-w-xs">
               Tu socio estratégico en construcción. Herramientas profesionales y materiales de primera calidad al mejor precio del mercado.
             </p>
             <div className="flex gap-4 pt-4">
               <a href="#" className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-all rounded-full border border-[#333]">
                 <Facebook className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-all rounded-full border border-[#333]">
                 <Instagram className="w-5 h-5" />
               </a>
             </div>
          </div>

          {/* Quick Links - NOW USING REACT ROUTER LINK */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8 border-l-2 border-[#FFD700] pl-4">Navegación</h3>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li>
                <Link to="/" className="hover:text-[#FFD700] flex items-center gap-2 group text-left">
                  <ArrowRight className="w-3 h-3 text-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity" /> Inicio
                </Link>
              </li>
              <li>
                <a href="/#catalogo" className="hover:text-[#FFD700] flex items-center gap-2 group text-left">
                  <ArrowRight className="w-3 h-3 text-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity" /> Catálogo
                </a>
              </li>
              <li>
                <a href="/#nosotros" className="hover:text-[#FFD700] flex items-center gap-2 group text-left">
                  <ArrowRight className="w-3 h-3 text-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity" /> Nosotros
                </a>
              </li>
              <li>
                <a href="/#contacto" className="hover:text-[#FFD700] flex items-center gap-2 group text-left">
                  <ArrowRight className="w-3 h-3 text-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity" /> Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8 border-l-2 border-[#FFD700] pl-4">Información</h3>
            <div className="space-y-6">
              <ul className="space-y-2 text-xs tracking-wider mb-6">
                <li className="flex justify-between border-b border-[#222] pb-1">
                  <span className="text-white font-bold">Lunes - Viernes</span>
                  <span className="text-[#FFD700]">08:30 - 18:30</span>
                </li>
                <li className="flex justify-between pb-1">
                  <span className="text-white font-bold">Sábado</span>
                  <span className="text-[#FFD700]">09:00 - 14:00</span>
                </li>
              </ul>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FFD700] mt-1 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase text-neutral-500">Casa Matriz</span>
                    <span className="text-white text-xs font-bold">Av. Libertador B. O'Higgins 1234, Santiago.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#FFD700] mt-1 shrink-0" />
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black uppercase text-neutral-500">Fono Ventas</span>
                     <a href={`tel:${CONTACT_PHONE_DISPLAY}`} className="text-white text-xs font-bold hover:text-[#FFD700] transition-colors">{CONTACT_PHONE_DISPLAY}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contacto" className="bg-[#0E0E0E] p-6 border border-[#222] rounded-xl relative overflow-hidden scroll-mt-32">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFD700] opacity-5 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
            
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#FFD700]" /> Te Llamamos
            </h3>
            <p className="text-[10px] text-neutral-500 mb-4">Déjanos tus datos y un ejecutivo técnico te contactará en breve.</p>

            {submitStatus === 'success' ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                <span className="text-white font-bold text-xs uppercase">¡Enviado Exitosamente!</span>
                <span className="text-[9px] text-green-400 mt-1">Te contactaremos pronto.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Tu Correo Electrónico"
                    className={`w-full bg-[#1A1A1A] border ${errors.email ? 'border-red-500' : 'border-[#333] focus:border-[#FFD700]'} text-white text-xs py-3 px-4 rounded outline-none transition-colors placeholder-neutral-600`}
                  />
                  {errors.email && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                      <AlertCircle className="w-4 h-4" />
                    </span>
                  )}
                </div>
                {errors.email && <p className="text-[9px] text-red-500 mt-1 pl-1">{errors.email}</p>}

                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Tu Teléfono (+569...)"
                    className={`w-full bg-[#1A1A1A] border ${errors.phone ? 'border-red-500' : 'border-[#333] focus:border-[#FFD700]'} text-white text-xs py-3 px-4 rounded outline-none transition-colors placeholder-neutral-600`}
                  />
                  {errors.phone && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                      <AlertCircle className="w-4 h-4" />
                    </span>
                  )}
                </div>
                {errors.phone && <p className="text-[9px] text-red-500 mt-1 pl-1">{errors.phone}</p>}

                <button 
                  type="submit"
                  className="w-full bg-[#FFD700] hover:bg-white text-black font-black uppercase text-xs py-3 rounded transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                >
                  Solicitar Contacto <Send className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright & Legal Links - NOW USING LINK */}
        <div className="border-t border-[#1A1A1A] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2026 F y C Spa. Ferretería Industrial.</p>
          <div className="flex flex-wrap justify-center gap-6 text-neutral-600">
            <Link to="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link>
            <Link to="/despachos" className="hover:text-white transition-colors">Políticas de Despacho</Link>
            <Link to="/devoluciones" className="hover:text-white transition-colors">Cambios y Devoluciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
