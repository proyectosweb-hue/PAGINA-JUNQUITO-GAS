import React from 'react';
import { MapPin, Navigation, ArrowUpRight } from 'lucide-react';
import { AnimateOnScroll } from './AnimateOnScroll';

const stations = [
{
  name: 'Ciruelo Gas',
  location: 'Santiago',
  mapsUrl:
  'https://www.google.com/maps/search/?api=1&query=Ciruelo+Gas+Santiago+RD'
},
{
  name: 'Baitoa Gas',
  location: 'Santiago',
  mapsUrl:
  'https://www.google.com/maps/search/?api=1&query=Baitoa+Gas+Santiago+RD'
},
{
  name: 'La Herradura Gas',
  location: 'Santiago-Sajoma',
  mapsUrl:
  'https://www.google.com/maps/search/?api=1&query=La+Herradura+Gas+Santiago+RD'
},
{
  name: 'Verdun Gas',
  location: 'San José De Las Matas',
  mapsUrl:
  'https://www.google.com/maps/search/?api=1&query=Verdun+Gas+SAJOMA+RD'
},
{
  name: 'Pedregal Gas',
  location: 'San José De Las Matas',
  mapsUrl:
  'https://www.google.com/maps/search/?api=1&query=Pedregal+Gas+SAJOMA+RD'
},
{
  name: 'Junquito Gas',
  location: 'Valverde Mao',
  mapsUrl:
  'https://www.google.com/maps/search/?api=1&query=Junquito+Gas+Mao+RD'
},
{
  name: 'Burende Gas',
  location: 'La Vega',
  mapsUrl:
  'https://www.google.com/maps/search/?api=1&query=Burende+Gas+La+Vega+RD'
},
{
  name: 'San José Gas',
  location: 'Santiago',
  mapsUrl:
  'https://www.google.com/maps/search/?api=1&query=San+Jose+Gas+Santiago+RD'
},
{
  name: 'Monumental Gas',
  location: 'Santo Domingo',
  mapsUrl:
  'https://www.google.com/maps/search/?api=1&query=Monumental+Gas+Santo+Domingo+Distrito+Nacional+RD'
},
{
  name: 'NEXT',
  location: 'Santiago - Plaza Jardines Bella Vista',
  mapsUrl: 'https://maps.app.goo.gl/WA1ZwSVmuasLcXxb8'
}];


// Paleta de acentos vivos (rota por estación), mismo lenguaje que PricesSection
const PALETTE = [
{ solid: '#F59E0B', from: '#F59E0B', to: '#EA580C' }, // ámbar
{ solid: '#E11D48', from: '#F43F5E', to: '#BE123C' }, // rojo
{ solid: '#EA580C', from: '#FB923C', to: '#EA580C' }, // naranja
{ solid: '#0EA5E9', from: '#38BDF8', to: '#0284C7' }, // azul
{ solid: '#14B8A6', from: '#2DD4BF', to: '#0D9488' } // turquesa
];

export function StationsSection() {
  return (
    <section
      className="py-20 sm:py-28 transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary)' }}>
      
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Encabezado */}
        <AnimateOnScroll className="mb-14 max-w-3xl">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-4 px-3 py-1.5 rounded-full"
            style={{ color: '#EA580C', backgroundColor: 'rgba(234,88,12,0.10)' }}>
            
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
            {stations.length} ubicaciones
          </span>
          <h2
            className="text-5xl sm:text-6xl font-black tracking-tight mb-5"
            style={{ color: 'var(--text-primary)' }}>
            
            Nuestras{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #F59E0B, #EA580C)' }}>
              
              estaciones
            </span>
          </h2>
          <p
            className="text-lg sm:text-xl"
            style={{ color: 'var(--text-secondary)' }}>
            
            Encuentra la estación más cercana a ti. Estamos estratégicamente
            ubicados para brindarte el mejor servicio.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stations.map((station, index) => {
            const c = PALETTE[index % PALETTE.length];
            const num = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
            return (
              <AnimateOnScroll key={index} delay={index % 3 * 0.1} direction="up">
                <div
                  className="group h-full rounded-3xl flex flex-col relative overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    boxShadow: `0 12px 28px -18px ${c.solid}`
                  }}>
                  
                  {/* Barra de acento lateral con gradiente */}
                  <div
                    className="absolute top-0 left-0 bottom-0 w-1.5"
                    style={{ backgroundImage: `linear-gradient(${c.from}, ${c.to})` }} />
                  

                  <div className="p-6 sm:p-7 pl-7 sm:pl-8 flex-1">
                    <div className="flex justify-between items-start mb-6">
                      {/* Ícono en círculo de color suave */}
                      <div
                        className="p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                        style={{ backgroundColor: `${c.solid}18` }}>
                        
                        <MapPin
                          className="w-6 h-6"
                          style={{ color: c.solid }}
                          strokeWidth={2} />
                        
                      </div>
                      <span
                        className="font-black text-4xl sm:text-5xl tabular-nums leading-none select-none"
                        style={{ color: c.solid, opacity: 0.18 }}>
                        
                        {num}
                      </span>
                    </div>

                    <h3
                      className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2.5"
                      style={{ color: 'var(--text-primary)' }}>
                      
                      {station.name}
                    </h3>

                    <div className="flex items-center gap-2">
                      <Navigation
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: c.solid }}
                        strokeWidth={2} />
                      
                      <span
                        className="text-sm font-semibold uppercase tracking-wide leading-snug"
                        style={{ color: 'var(--text-secondary)' }}>
                        
                        {station.location}
                      </span>
                    </div>
                  </div>

                  {/* Botón Ver mapa */}
                  <a
                    href={station.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 sm:px-7 py-4 flex justify-between items-center border-t transition-colors duration-300 cursor-pointer"
                    style={{
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'transparent'
                    }}>
                    
                    <span
                      className="text-xs font-bold uppercase tracking-[0.15em] transition-colors"
                      style={{ color: c.solid }}>
                      
                      Ver mapa
                    </span>
                    <span
                      className="p-1.5 rounded-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ backgroundColor: `${c.solid}18` }}>
                      
                      <ArrowUpRight
                        className="w-4 h-4"
                        style={{ color: c.solid }}
                        strokeWidth={2.5} />
                      
                    </span>
                  </a>
                </div>
              </AnimateOnScroll>);

          })}
        </div>
      </div>
    </section>);

}