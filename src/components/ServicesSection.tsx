import React from 'react';
import { ShieldCheck, HeadphonesIcon, Fuel } from 'lucide-react';
import { AnimateOnScroll } from './AnimateOnScroll';

const services = [
{
  title: 'Combustibles de Calidad',
  description:
  'Distribuimos GLP, Gasolina y Gasoil de la más alta calidad. Nuestra gasolina es suministrada en colaboración con NEXT, garantizando un producto premium que mejora el rendimiento y reduce emisiones.',
  icon: Fuel,
  solid: '#F59E0B',
  from: '#F59E0B',
  to: '#EA580C'
},
{
  title: 'Servicio al Cliente Superior',
  description:
  'Nos enorgullecemos de ofrecer un servicio al cliente excepcional. Nuestro equipo capacitado está comprometido a satisfacer sus necesidades de combustible y responder a sus consultas con prontitud y profesionalismo.',
  icon: HeadphonesIcon,
  solid: '#EA580C',
  from: '#FB923C',
  to: '#EA580C'
},
{
  title: 'Seguridad y Confianza',
  description:
  'La seguridad de nuestros clientes es nuestra principal prioridad. Implementamos rigurosos estándares de seguridad y control de calidad para garantizar que cada transacción de combustible sea segura y confiable.',
  icon: ShieldCheck,
  solid: '#E11D48',
  from: '#F43F5E',
  to: '#BE123C'
}];


export function ServicesSection() {
  return (
    <section
      className="py-20 sm:py-28 transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary)' }}>
      
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <AnimateOnScroll className="mb-14 max-w-3xl">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-4 px-3 py-1.5 rounded-full"
            style={{ color: '#EA580C', backgroundColor: 'rgba(234,88,12,0.10)' }}>
            
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
            Lo que ofrecemos
          </span>
          <h2
            className="text-5xl sm:text-6xl font-black tracking-tight mb-5"
            style={{ color: 'var(--text-primary)' }}>
            
            Nuestros{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #F59E0B, #EA580C)' }}>
              
              servicios
            </span>
          </h2>
          <p className="text-lg sm:text-xl" style={{ color: 'var(--text-secondary)' }}>
            Comprometidos con ofrecer productos de la más alta calidad y un
            servicio excepcional a nuestros clientes.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, index) =>
          <AnimateOnScroll key={index} delay={index * 0.12} direction="up">
              <div
              className="group h-full rounded-3xl p-7 sm:p-8 pl-8 sm:pl-9 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: `0 12px 28px -18px ${service.solid}`
              }}>
              
                {/* Barra de acento lateral */}
                <div
                className="absolute top-0 left-0 bottom-0 w-1.5"
                style={{ backgroundImage: `linear-gradient(${service.from}, ${service.to})` }} />
              

                <div className="flex justify-between items-start mb-7">
                  <div
                  className="p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                  style={{ backgroundColor: `${service.solid}18` }}>
                  
                    <service.icon
                    className="w-7 h-7 sm:w-8 sm:h-8"
                    style={{ color: service.solid }}
                    strokeWidth={2} />
                  
                  </div>
                  <span
                  className="font-black text-4xl tabular-nums leading-none select-none"
                  style={{ color: service.solid, opacity: 0.18 }}>
                  
                    0{index + 1}
                  </span>
                </div>

                <h3
                className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-4"
                style={{ color: 'var(--text-primary)' }}>
                
                  {service.title}
                </h3>

                <p
                className="leading-relaxed text-sm sm:text-base"
                style={{ color: 'var(--text-secondary)' }}>
                
                  {service.description}
                </p>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </div>
    </section>);

}