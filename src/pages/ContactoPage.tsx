import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { AnimateOnScroll } from '../components/AnimateOnScroll';
export function ContactoPage() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-primary)'
      }}>
      
      <div className="pt-24 sm:pt-32 container mx-auto px-4 sm:px-6 md:px-12">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-[#FCEE02] transition-colors mb-8"
          style={{
            color: 'var(--text-secondary)'
          }}>
          
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </button>
      </div>

      <section
        className="py-16 sm:py-24 relative overflow-hidden transition-colors duration-300"
        style={{
          backgroundColor: 'var(--bg-primary)'
        }}>
        
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
            'linear-gradient(#FCEE02 1px, transparent 1px), linear-gradient(90deg, #FCEE02 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <AnimateOnScroll className="mb-12 sm:mb-16 max-w-3xl">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 transition-colors duration-300"
              style={{
                color: 'var(--text-primary)'
              }}>
              
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCEE02] to-[#FB900D]">
                Contáctanos
              </span>
            </h2>
            <p
              className="text-lg sm:text-xl border-l-4 border-[#FCEE02] pl-4 sm:pl-6 transition-colors duration-300"
              style={{
                color: 'var(--text-secondary)'
              }}>
              
              Estamos aquí para ayudarte. Comunícate con nosotros a través de
              cualquiera de nuestros canales.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
            {
              icon: Phone,
              title: 'Teléfono',
              value: '+1-809-247-2104',
              href: 'tel:+18092472104',
              color: '#FCEE02'
            },
            {
              icon: Mail,
              title: 'Email',
              value: 'info@junquitogas.com',
              href: 'mailto:info@junquitogas.com',
              color: '#FB900D'
            },
            {
              icon: MessageCircle,
              title: 'WhatsApp',
              value: '+1-809-247-2104',
              href: 'https://wa.me/18092472104',
              color: '#25D366'
            },
            {
              icon: MapPin,
              title: 'Dirección',
              value:
              'Av. Presidente Antonio Guzmán Fernández, Santiago De Los Caballeros, RD',
              href: 'https://www.google.com/maps/search/?api=1&query=Av+Presidente+Antonio+Guzman+Fernandez+Santiago+RD',
              color: '#EC2424'
            }].
            map((item, index) =>
            <AnimateOnScroll key={index} delay={index * 0.1} direction="up">
                <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={
                item.href.startsWith('http') ?
                'noopener noreferrer' :
                undefined
                }
                className="group p-6 sm:p-8 border hover:border-[#FCEE02] transition-all duration-300 relative overflow-hidden h-full block rounded-xl"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)'
                }}>
                
                  <div
                  className="absolute top-0 left-0 w-full h-1 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 rounded-t-xl"
                  style={{
                    backgroundColor: item.color
                  }} />
                

                  <div
                  className="p-3 border group-hover:border-white/20 transition-colors rounded-lg inline-block mb-6"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)'
                  }}>
                  
                    <item.icon
                    className="w-7 h-7"
                    style={{
                      color: item.color
                    }}
                    strokeWidth={1.5} />
                  
                  </div>

                  <h3
                  className="text-lg font-bold uppercase mb-2 group-hover:text-[#FCEE02] transition-colors"
                  style={{
                    color: 'var(--text-primary)'
                  }}>
                  
                    {item.title}
                  </h3>

                  <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: 'var(--text-secondary)'
                  }}>
                  
                    {item.value}
                  </p>
                </a>
              </AnimateOnScroll>
            )}
          </div>

          {/* Social Links */}
          <AnimateOnScroll>
            <div
              className="p-8 border rounded-xl text-center"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)'
              }}>
              
              <h3
                className="text-2xl font-black uppercase mb-6"
                style={{
                  color: 'var(--text-primary)'
                }}>
                
                Síguenos en Redes
              </h3>
              <div className="flex justify-center gap-6">
                {[
                {
                  label: 'Facebook',
                  href: 'https://www.facebook.com/junquitogas/?locale=es_LA'
                },
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/junquitogas/'
                },
                {
                  label: 'WhatsApp',
                  href: 'https://wa.me/18092472104'
                }].
                map((social) =>
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 font-bold uppercase tracking-wider text-sm hover:bg-[#FCEE02] hover:text-[#251F1F] hover:border-[#FCEE02] transition-colors rounded-lg"
                  style={{
                    borderColor: 'var(--border-color-strong)',
                    color: 'var(--text-primary)'
                  }}>
                  
                    {social.label}
                  </a>
                )}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Simple footer */}
      <div
        className="border-t py-8 text-center text-sm transition-colors duration-300"
        style={{
          borderColor: 'var(--border-color)',
          color: 'var(--text-muted)',
          backgroundColor: 'var(--bg-primary)'
        }}>
        
        <p>&copy; 2026 Junquito Gas. Todos los derechos reservados.</p>
      </div>
    </div>);

}