import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
const ACCENT = '#EA580C';
export function Footer() {
  const socials = [
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
  }];

  return (
    <footer
      className="pt-20 pb-10 border-t transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        borderColor: 'var(--border-color)'
      }}>
      
      <div className="container mx-auto px-6 md:px-12 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img
                src="/NBA_(1).png"
                alt="Junquito Gas Logo"
                className="h-24 object-contain"
                style={{
                  background: 'transparent'
                }} />
              
            </div>
            <p
              className="max-w-md mb-8"
              style={{
                color: 'var(--text-secondary)'
              }}>
              
              Distribuidora de combustibles (GLP, Gasoil y Gasolina) y
              estaciones de servicio comprometidas con ofrecer productos de la
              más alta calidad. Nuestra gasolina es distribuida en colaboración
              con NEXT. Combustible confiable y seguro para sus vehículos,
              hogares y negocios.
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) =>
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-colors"
                style={{
                  color: ACCENT,
                  backgroundColor: 'rgba(234,88,12,0.10)'
                }}>
                
                  {s.label}
                </a>
              )}
            </div>
          </div>

          <div>
            <h4
              className="font-black uppercase tracking-wider mb-6"
              style={{
                color: ACCENT
              }}>
              
              Servicios
            </h4>
            <ul
              className="space-y-4"
              style={{
                color: 'var(--text-secondary)'
              }}>
              
              {[
              'GLP de Alta Calidad',
              'Gasolina (NEXT)',
              'Gasoil Premium',
              'Estaciones Certificadas'].
              map((item) =>
              <li key={item}>
                  <a
                  href="#"
                  className="hover:opacity-100 opacity-90 transition-opacity flex items-center gap-2.5"
                  onMouseEnter={(e) => e.currentTarget.style.color = ACCENT}
                  onMouseLeave={(e) =>
                  e.currentTarget.style.color = 'inherit'
                  }>
                  
                    <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: ACCENT
                    }} />
                  
                    {item}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4
              className="font-black uppercase tracking-wider mb-6"
              style={{
                color: ACCENT
              }}>
              
              Contacto
            </h4>
            <ul
              className="space-y-4"
              style={{
                color: 'var(--text-secondary)'
              }}>
              
              <li className="flex items-center gap-2.5">
                <Phone
                  className="w-4 h-4 flex-shrink-0"
                  style={{
                    color: ACCENT
                  }} />
                
                +1-809-247-2104
              </li>
              <li className="flex items-center gap-2.5">
                <Mail
                  className="w-4 h-4 flex-shrink-0"
                  style={{
                    color: ACCENT
                  }} />
                
                info@junquitogas.com
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="w-4 h-4 mt-1 flex-shrink-0"
                  style={{
                    color: ACCENT
                  }} />
                
                <span>
                  Av. Presidente Antonio Guzmán Fernández
                  <br />
                  Santiago De Los Caballeros, RD
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
          style={{
            borderColor: 'var(--border-color)',
            color: 'var(--text-muted)'
          }}>
          
          <p>&copy; 2026 Junquito Gas. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = ACCENT}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
              
              Política de Privacidad
            </a>
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = ACCENT}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
              
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>);

}