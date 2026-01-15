
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, FileText, ArrowLeft, CheckCircle2, AlertTriangle, Scale, CreditCard } from 'lucide-react';

interface LegalPageProps {
  onBack: () => void; // Kept for prop compatibility if needed, but unused in favor of Link
}

// ------------------------------------------------------------------
// 1. POLÍTICAS DE DESPACHO (/despachos)
// ------------------------------------------------------------------
export const ShippingPolicy: React.FC<LegalPageProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  
  return (
    <div className="bg-[#050505] min-h-screen py-12 pt-32 px-6 md:px-12 text-neutral-300">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white mb-8 transition-colors font-bold uppercase text-xs tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        
        <div className="flex items-center gap-4 mb-8 border-b border-[#222] pb-6">
          <div className="p-3 bg-[#111] border border-[#333] rounded-xl">
            <Truck className="w-8 h-8 text-[#FFD700]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-industrial font-black text-white uppercase">Envíos y Despachos</h1>
        </div>

        <div className="space-y-8 font-sans leading-relaxed">
          <section>
            <h2 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#FFD700] rounded-full"></span> 1. Cobertura Nacional
            </h2>
            <p className="mb-4">
              En <strong className="text-white">F y C Spa</strong> despachamos a todo el territorio continental de Chile. Trabajamos con los operadores logísticos más confiables para asegurar que tus herramientas lleguen a la obra, taller o domicilio.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base border border-[#222] bg-[#111] p-6 rounded-xl">
              <li><strong>Starken:</strong> Cobertura nacional a domicilio y agencia.</li>
              <li><strong>Chilexpress:</strong> Envíos express (según factibilidad técnica).</li>
              <li><strong>Blue Express:</strong> Cobertura extendida para zonas rurales.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#FFD700] rounded-full"></span> 2. Tiempos de Procesamiento
            </h2>
            <p className="mb-4">
              Entendemos la urgencia de tu proyecto. Nuestro compromiso es procesar tu pedido en un plazo de <strong className="text-[#FFD700]">24 a 48 horas hábiles</strong> una vez confirmado el pago.
            </p>
            <div className="bg-[#1A1A1A] border-l-4 border-[#FFD700] p-4 text-xs md:text-sm italic text-neutral-400">
              <span className="text-white font-bold">Importante:</span> El tiempo de transporte (tránsito del courier) depende exclusivamente de la comuna de destino y la carga logística de la empresa de transporte externa.
            </div>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#FFD700] rounded-full"></span> 3. Costos y Modalidad
            </h2>
            <p>
              Ofrecemos dos modalidades de envío para adaptarnos a tu presupuesto:
            </p>
            <ul className="mt-4 space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                <span><strong>Envío Por Pagar:</strong> Pagas el costo del transporte directamente al recibir el producto o al retirarlo en la agencia del courier. Es la opción más utilizada y transparente.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                <span><strong>Envío Pagado (Web):</strong> En casos especiales y previa coordinación, se puede cotizar e incluir el costo de envío en la factura final.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#FFD700] rounded-full"></span> 4. Responsabilidad del Cliente
            </h2>
            <p className="text-sm">
              Una vez que el pedido es entregado al courier, F y C Spa enviará el <strong>Número de Seguimiento (OT)</strong> a tu correo o WhatsApp. Es responsabilidad del cliente realizar el seguimiento. Si el paquete es devuelto a origen por "domicilio sin moradores", "dirección incorrecta" o "no retirado en agencia", el cliente deberá costear el valor del nuevo envío.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 2. CAMBIOS Y DEVOLUCIONES (/devoluciones)
// ------------------------------------------------------------------
export const ReturnsPolicy: React.FC<LegalPageProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-[#050505] min-h-screen py-12 pt-32 px-6 md:px-12 text-neutral-300">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white mb-8 transition-colors font-bold uppercase text-xs tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        
        <div className="flex items-center gap-4 mb-8 border-b border-[#222] pb-6">
          <div className="p-3 bg-[#111] border border-[#333] rounded-xl">
            <ShieldCheck className="w-8 h-8 text-[#FFD700]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-industrial font-black text-white uppercase">Garantías y Devoluciones</h1>
        </div>

        <div className="space-y-10 font-sans leading-relaxed">
          
          <section className="bg-[#111] border border-[#222] p-6 rounded-xl">
            <h2 className="text-xl text-[#FFD700] font-black uppercase mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Garantía Legal (6 Meses)
            </h2>
            <p className="mb-4 text-white">
              Conforme a la Ley del Consumidor (Ley N° 19.496) actualizada, si tu producto presenta una <strong>falla de fábrica</strong> dentro de los <strong>6 meses</strong> posteriores a la compra, tienes derecho a elegir una de las siguientes opciones (Garantía 6x3):
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-neutral-300 font-bold mb-4">
              <li>Reparación gratuita del producto (Servicio Técnico).</li>
              <li>Cambio del producto por uno nuevo.</li>
              <li>Devolución total del dinero.</li>
            </ol>
            <div className="flex items-start gap-2 bg-[#1A1A1A] p-3 rounded border-l-2 border-[#FFD700]">
               <AlertTriangle className="w-4 h-4 text-[#FFD700] mt-0.5" />
               <p className="text-xs text-neutral-400">
                  Para hacer efectiva esta garantía, debes presentar tu boleta o factura. El producto será revisado por nuestro servicio técnico para certificar que la falla es de origen y no atribuible a mal uso.
               </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#FFD700] rounded-full"></span> Derecho a Retracto (10 Días)
            </h2>
            <p className="mb-4">
              Si te arrepientes de tu compra, en F y C Spa ofrecemos un plazo de <strong>10 días corridos</strong> desde la recepción del producto para solicitar la devolución del dinero o cambio, siempre que se cumplan <strong>estrictamente</strong> las siguientes condiciones:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div className="bg-[#151515] p-4 rounded border border-[#333] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm">El producto debe estar <strong>SIN USO</strong>, completamente nuevo.</p>
               </div>
               <div className="bg-[#151515] p-4 rounded border border-[#333] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm">Debe mantener sus <strong>SELLOS ORIGINALES</strong> intactos y embalaje en perfecto estado.</p>
               </div>
               <div className="bg-[#151515] p-4 rounded border border-[#333] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm">Incluir todos sus accesorios y manuales.</p>
               </div>
            </div>
            <p className="text-xs text-neutral-500">
               Importante: No se aceptarán devoluciones de productos que hayan sido abiertos, probados o manipulados, especialmente herramientas eléctricas, por razones de seguridad y garantía.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#FFD700] rounded-full"></span> Exclusiones
            </h2>
            <p className="text-sm">
              La garantía no cubre averías o daños ocasionados por uso indebido, instalación incorrecta, intervención de terceros no autorizados, desgaste natural por uso (carbones, brocas, discos) o variaciones de voltaje.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 3. TÉRMINOS Y CONDICIONES (/terminos)
// ------------------------------------------------------------------
export const TermsAndConditions: React.FC<LegalPageProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-[#050505] min-h-screen py-12 pt-32 px-6 md:px-12 text-neutral-300">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white mb-8 transition-colors font-bold uppercase text-xs tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        
        <div className="flex items-center gap-4 mb-8 border-b border-[#222] pb-6">
          <div className="p-3 bg-[#111] border border-[#333] rounded-xl">
            <Scale className="w-8 h-8 text-[#FFD700]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-industrial font-black text-white uppercase">Términos del Servicio</h1>
        </div>

        <div className="space-y-8 font-sans leading-relaxed">
          
          <section>
            <h2 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#FFD700] rounded-full"></span> 1. Aceptación
            </h2>
            <p>
              Al realizar una compra en el sitio web de F y C Spa, el cliente acepta los presentes términos y condiciones, así como las políticas de despacho y devolución detalladas anteriormente.
            </p>
          </section>

          <section>
             <h2 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#FFD700] rounded-full"></span> 2. Medios de Pago
            </h2>
            <p className="mb-4">
               Aceptamos los siguientes medios de pago para facilitar tu abastecimiento:
            </p>
            <div className="flex flex-col md:flex-row gap-4">
               <div className="flex-1 bg-[#111] p-4 rounded border border-[#333] flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-[#FFD700]" />
                  <div>
                     <h4 className="text-white font-bold text-sm">Transferencia Bancaria</h4>
                     <p className="text-xs text-neutral-500">Datos enviados al finalizar la compra.</p>
                  </div>
               </div>
               <div className="flex-1 bg-[#111] p-4 rounded border border-[#333] flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-[#FFD700]" />
                  <div>
                     <h4 className="text-white font-bold text-sm">Webpay Plus (Débito/Crédito)</h4>
                     <p className="text-xs text-neutral-500">Pago seguro a través de Transbank.</p>
                  </div>
               </div>
            </div>
          </section>

          <section>
             <h2 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#FFD700] rounded-full"></span> 3. Precios y Stock
            </h2>
            <p>
               Los precios publicados en nuestro sitio web incluyen IVA. F y C Spa se reserva el derecho de modificar los precios y ofertas sin previo aviso. El stock de los productos es referencial y se confirma al momento de procesar el pedido. En caso de quiebre de stock posterior a la compra, se ofrecerá la devolución inmediata del dinero o un producto alternativo.
            </p>
          </section>

          <section>
             <h2 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#FFD700] rounded-full"></span> 4. Facturación
            </h2>
            <p className="mb-4">
               Emitimos Boleta y Factura Electrónica.
            </p>
            <div className="bg-[#1A1A1A] border-l-4 border-red-500 p-4">
               <h4 className="text-white font-bold text-sm mb-1">IMPORTANTE:</h4>
               <p className="text-xs text-neutral-400">
                  Es responsabilidad exclusiva del cliente ingresar correctamente los datos de facturación (RUT, Razón Social, Giro, Dirección) al momento de la compra. <strong className="text-white">No se realizarán refacturaciones</strong> (cambio de boleta a factura) posteriores a la emisión del documento tributario por errores en el ingreso de datos.
               </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
