import React from 'react';
import { MapPin, Users, Building2, Award } from 'lucide-react';
import { AnimateOnScroll } from './AnimateOnScroll';
const stats = [
{
  id: 1,
  label: 'Estaciones',
  value: '10',
  icon: MapPin,
  desc: 'En toda la región',
  solid: '#F59E0B',
  from: '#F59E0B',
  to: '#EA580C'
},
{
  id: 2,
  label: 'Clientes Satisfechos',
  value: '10,000+',
  icon: Users,
  desc: 'Confiando en nosotros',
  solid: '#E11D48',
  from: '#F43F5E',
  to: '#BE123C'
},
{
  id: 3,
  label: 'Años de Experiencia',
  value: '25+',
  icon: Building2,
  desc: 'Sirviendo a RD',
  solid: '#0EA5E9',
  from: '#38BDF8',
  to: '#0284C7'
},
{
  id: 4,
  label: 'Calidad Garantizada',
  value: '99%',
  icon: Award,
  desc: 'Producto certificado',
  solid: '#14B8A6',
  from: '#2DD4BF',
  to: '#0D9488'
}];

export function StatsGrid() {
  return (
    <section
      className="py-14 sm:py-20 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-primary)'
      }}>
      
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) =>
          <AnimateOnScroll key={stat.id} delay={index * 0.1} direction="up">
              <div
              className="group h-full rounded-3xl p-6 sm:p-7 pl-7 sm:pl-8 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: `0 12px 28px -18px ${stat.solid}`
              }}>
              
                {/* Barra de acento lateral */}
                <div
                className="absolute top-0 left-0 bottom-0 w-1.5"
                style={{
                  backgroundImage: `linear-gradient(${stat.from}, ${stat.to})`
                }} />
              

                <div
                className="inline-flex p-3 rounded-2xl mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                style={{
                  backgroundColor: `${stat.solid}18`
                }}>
                
                  <stat.icon
                  className="w-7 h-7 sm:w-8 sm:h-8"
                  style={{
                    color: stat.solid
                  }}
                  strokeWidth={2} />
                
                </div>

                <h3
                className="text-3xl sm:text-4xl font-black mb-2 tracking-tight tabular-nums"
                style={{
                  color: 'var(--text-primary)'
                }}>
                
                  {stat.value}
                </h3>
                <p
                className="font-bold uppercase tracking-wider text-xs sm:text-sm mb-1.5"
                style={{
                  color: stat.solid
                }}>
                
                  {stat.label}
                </p>
                <p
                className="text-xs sm:text-sm"
                style={{
                  color: 'var(--text-muted)'
                }}>
                
                  {stat.desc}
                </p>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </div>
    </section>);

}