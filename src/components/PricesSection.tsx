import React from 'react';
import {
  Fuel,
  Droplets,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
  Minus } from
'lucide-react';
import { AnimateOnScroll } from './AnimateOnScroll';

// ╔══════════════════════════════════════════════════════════╗
// ║  👇 ÚNICO LUGAR QUE DEBES EDITAR CADA VIERNES  👇          ║
// ║  Cambia la fecha, los 5 precios y el "change" (cuánto      ║
// ║  subió/bajó en RD$ vs la semana anterior).                 ║
// ║     trend:  1 = subió | -1 = bajó | 0 = igual              ║
// ║     change: el monto en pesos del cambio (0 si igual)      ║
// ╚══════════════════════════════════════════════════════════╝
export const VIGENCIA = '7 Nov – 13 Nov 2026';

const prices = [
{ name: 'Gas Licuado (GLP)', price: '135.20', trend: 0, change: '0.00' },
{ name: 'Gasolina Premium', price: '362.10', trend: 1, change: '4.00' },
{ name: 'Gasolina Regular', price: '317.50', trend: 0, change: '0.00' },
{ name: 'Gasoil Óptimo', price: '322.10', trend: 1, change: '4.00' },
{ name: 'Gasoil Regular', price: '270.80', trend: 0, change: '0.00' }];

// ── Fin del bloque editable ──────────────────────────────────

// Cada combustible: color sólido + gradiente vivo (de-a) para acentos
const META: Record<
  string,
  {icon: any;solid: string;from: string;to: string;}> =
{
  'Gas Licuado (GLP)': { icon: Flame, solid: '#F59E0B', from: '#F59E0B', to: '#EA580C' },
  'Gasolina Premium': { icon: Fuel, solid: '#E11D48', from: '#F43F5E', to: '#BE123C' },
  'Gasolina Regular': { icon: Fuel, solid: '#EA580C', from: '#FB923C', to: '#EA580C' },
  'Gasoil Óptimo': { icon: Droplets, solid: '#0EA5E9', from: '#38BDF8', to: '#0284C7' },
  'Gasoil Regular': { icon: Droplets, solid: '#14B8A6', from: '#2DD4BF', to: '#0D9488' }
};

export const fuels = prices.map((p) => ({ ...p, ...META[p.name] }));

const MICM_URL =
'https://micm.gob.do/direcciones/combustibles/avisos-semanales-de-precios/avisos-semanales-de-precios-de-combustibles/';

// Texto del cambio vs semana anterior
function changeLabel(trend: number, change: string) {
  if (trend === 1) return `+RD$${change} vs. semana anterior`;
  if (trend === -1) return `−RD$${change} vs. semana anterior`;
  return 'Sin cambios vs. semana anterior';
}

// Pastilla de tendencia
function Trend({ trend }: {trend: number;}) {
  const up = trend === 1;
  const down = trend === -1;
  const Icon = up ? ArrowUpRight : down ? ArrowDownRight : Minus;
  const label = up ? 'Sube' : down ? 'Baja' : 'Estable';
  const color = up ? '#DC2626' : '#16A34A';
  const bg = up ? 'rgba(220,38,38,0.10)' : 'rgba(22,163,74,0.10)';
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] whitespace-nowrap"
      style={{ color, backgroundColor: bg }}>
      
      <Icon className="w-3.5 h-3.5" strokeWidth={2.75} />
      {label}
    </span>);

}

export function PricesSection() {
  const glp = fuels[0];
  const liquids = fuels.slice(1);
  const GlpIcon = glp.trend === 1 ? ArrowUpRight : glp.trend === -1 ? ArrowDownRight : Minus;
  const glpLabel = glp.trend === 1 ? 'Sube' : glp.trend === -1 ? 'Baja' : 'Estable';

  return (
    <section
      className="py-20 sm:py-28 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary)' }}>
      
      <div className="container mx-auto px-6 md:px-12 max-w-screen-2xl">
        {/* Encabezado */}
        <AnimateOnScroll>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-4 px-3 py-1.5 rounded-full"
                style={{
                  color: '#EA580C',
                  backgroundColor: 'rgba(234,88,12,0.10)'
                }}>
                
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                Monitoreo oficial MICM
              </span>
              <h2
                className="text-5xl sm:text-6xl font-black tracking-tight"
                style={{ color: 'var(--text-primary)' }}>
                
                Precios{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                    'linear-gradient(90deg, #F59E0B, #EA580C)'
                  }}>
                  
                  hoy
                </span>
              </h2>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <div
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl"
                style={{
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)'
                }}>
                
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Vigencia {VIGENCIA}
              </div>
              <a
                href={MICM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium underline underline-offset-4 decoration-1 transition-opacity hover:opacity-60"
                style={{ color: 'var(--text-muted)' }}>
                
                Fuente: MICM ↗
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* GLP — tarjeta protagonista con fondo de color vivo */}
          <AnimateOnScroll className="lg:row-span-2" direction="left">
            <div
              className="h-full rounded-3xl p-8 sm:p-9 flex flex-col justify-between min-h-[300px] lg:min-h-[420px] relative overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
              style={{
                backgroundImage: `linear-gradient(150deg, ${glp.from}, ${glp.to})`,
                boxShadow: `0 20px 40px -16px ${glp.to}90`
              }}>
              
              {/* Halo decorativo */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/15 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-black/10 blur-3xl pointer-events-none" />

              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <glp.icon className="w-6 h-6 text-white" strokeWidth={2.25} />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-white/90">
                    {glp.name}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] bg-white/25 text-white">
                  <GlpIcon className="w-3.5 h-3.5" strokeWidth={2.75} />
                  {glpLabel}
                </span>
              </div>

              <div className="relative z-10 mt-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white/70">RD$</span>
                  <span className="text-6xl sm:text-7xl font-black tracking-tight tabular-nums text-white drop-shadow-sm">
                    {glp.price}
                  </span>
                </div>
                <span className="block mt-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  por galón
                </span>
                {/* Cambio vs semana anterior */}
                <span className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 text-white">
                  <GlpIcon className="w-3.5 h-3.5" strokeWidth={2.75} />
                  {changeLabel(glp.trend, glp.change)}
                </span>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Combustibles líquidos */}
          {liquids.map((fuel, index) => {
            const up = fuel.trend === 1;
            const down = fuel.trend === -1;
            const ChangeIcon = up ? ArrowUpRight : down ? ArrowDownRight : Minus;
            const changeColor = up ? '#DC2626' : down ? '#16A34A' : 'var(--text-muted)';
            return (
              <AnimateOnScroll key={index} delay={index * 0.08} direction="right">
                <div
                  className="h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[195px] group relative overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    boxShadow: `0 12px 28px -18px ${fuel.solid}`
                  }}>
                  
                  {/* Barra de acento lateral con gradiente */}
                  <div
                    className="absolute top-0 left-0 bottom-0 w-1.5"
                    style={{
                      backgroundImage: `linear-gradient(${fuel.from}, ${fuel.to})`
                    }} />
                  

                  <div className="flex items-start justify-between gap-3 pl-2">
                    <span
                      className="text-sm font-bold uppercase tracking-wider leading-snug max-w-[55%]"
                      style={{ color: 'var(--text-secondary)' }}>
                      
                      {fuel.name}
                    </span>
                    <Trend trend={fuel.trend} />
                  </div>

                  <div className="flex items-end justify-between pl-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className="text-base font-bold"
                          style={{ color: fuel.solid }}>
                          
                          RD$
                        </span>
                        <span
                          className="text-4xl sm:text-[2.75rem] font-black tracking-tight tabular-nums leading-none"
                          style={{ color: 'var(--text-primary)' }}>
                          
                          {fuel.price}
                        </span>
                      </div>
                      {/* Cambio vs semana anterior */}
                      <span
                        className="inline-flex items-center gap-1 mt-2 text-xs font-bold"
                        style={{ color: changeColor }}>
                        
                        <ChangeIcon className="w-3.5 h-3.5" strokeWidth={2.75} />
                        {up && `+RD$${fuel.change}`}
                        {down && `−RD$${fuel.change}`}
                        {!up && !down && 'Sin cambios'}
                      </span>
                    </div>

                    {/* Ícono en círculo de color suave */}
                    <div
                      className="p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                      style={{ backgroundColor: `${fuel.solid}18` }}>
                      
                      <fuel.icon
                        className="w-7 h-7"
                        style={{ color: fuel.solid }}
                        strokeWidth={2} />
                      
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>);

          })}
        </div>
      </div>
    </section>);

}