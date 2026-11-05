import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Fuel,
  Flame,
  Droplets,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react'
import { fuels, VIGENCIA } from './PricesSection'

function TrendIcon({ trend }: { trend: number }) {
  if (trend === 1)
    return <ArrowUpRight className="w-4 h-4" style={{ color: '#DC2626' }} strokeWidth={2.75} />
  if (trend === -1)
    return <ArrowDownRight className="w-4 h-4" style={{ color: '#16A34A' }} strokeWidth={2.75} />
  return <Minus className="w-4 h-4" style={{ color: 'var(--text-muted)' }} strokeWidth={2.75} />
}

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const ease = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  const rise = (delay: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(24px)',
    transition: `all 0.7s ${ease} ${delay}s`,
  })

  const products = [
    { label: 'GLP', icon: Flame, solid: '#F59E0B' },
    { label: 'Gasolina', icon: Fuel, solid: '#EA580C' },
    { label: 'Gasoil', icon: Droplets, solid: '#0EA5E9' },
  ]

  const glp = fuels[0]
  const liquids = fuels.slice(1)

  return (
    <section
      className="relative w-full overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Halos de color suaves de fondo */}
      <div
        className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none opacity-[0.18]"
        style={{ backgroundImage: 'radial-gradient(circle, #F59E0B, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 -left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-[0.12]"
        style={{ backgroundImage: 'radial-gradient(circle, #EA580C, transparent 70%)' }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-screen-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          {/* Columna de texto */}
          <div className="lg:col-span-7">
            {/* Tagline / badge */}
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-6 px-3 py-1.5 rounded-full"
              style={{
                ...rise(0.2),
                color: '#EA580C',
                backgroundColor: 'rgba(234,88,12,0.10)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
              Comercialización de combustibles
            </span>

            {/* Título */}
            <h1
              className="text-6xl sm:text-7xl xl:text-[5.5rem] font-black tracking-tight leading-[0.92] mb-6 sm:mb-8"
              style={{ ...rise(0.35), color: 'var(--text-primary)' }}
            >
              Junquito{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #F59E0B, #EA580C)' }}
              >
                Gas
              </span>
            </h1>

            {/* Descripción */}
            <p
              className="text-lg sm:text-xl md:text-2xl max-w-2xl mb-9 sm:mb-10 font-medium leading-relaxed"
              style={{ ...rise(0.5), color: 'var(--text-secondary)' }}
            >
              Ofrecemos{' '}
              <strong style={{ color: 'var(--text-primary)' }}>GLP</strong> para
              hogares, vehículos y negocios. Además, operamos bajo la marca{' '}
              <strong style={{ color: 'var(--text-primary)' }}>NEXT</strong>,
              ofreciendo{' '}
              <strong style={{ color: 'var(--text-primary)' }}>
                gasolina y gasoil
              </strong>{' '}
              de alta calidad. Nuestro compromiso es brindar combustibles
              confiables, seguridad y un excelente servicio en nuestras estaciones
              de República Dominicana.
            </p>

            {/* Tags de productos */}
            <div className="flex flex-wrap gap-3 mb-10 sm:mb-12" style={rise(0.65)}>
              {products.map((product) => (
                <span
                  key={product.label}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full"
                  style={{
                    color: product.solid,
                    backgroundColor: `${product.solid}15`,
                  }}
                >
                  <product.icon className="w-4 h-4" />
                  {product.label}
                </span>
              ))}
              <span
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full"
                style={{
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <Fuel className="w-4 h-4" />
                Estaciones NEXT
              </span>
            </div>

            {/* Botones CTA */}
            <div className="flex flex-col sm:flex-row gap-4" style={rise(0.8)}>
              <button
                onClick={() => {
                  navigate('/solicitar')
                  window.scrollTo(0, 0)
                }}
                className="group relative px-8 py-4 font-black uppercase tracking-wider text-white text-sm sm:text-base rounded-2xl transition-transform duration-300 hover:-translate-y-1"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #F59E0B, #EA580C)',
                  boxShadow: '0 16px 32px -14px rgba(234,88,12,0.7)',
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  Solicitar servicio
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => scrollToSection('estaciones')}
                className="px-8 py-4 font-bold uppercase tracking-wider text-sm sm:text-base rounded-2xl transition-colors duration-200"
                style={{
                  border: '2px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--card-bg)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--text-primary)'
                  e.currentTarget.style.color = 'var(--bg-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--card-bg)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                }}
              >
                Ver estaciones
              </button>
            </div>
          </div>

          {/* Columna derecha: precios de hoy (solo pantallas grandes) */}
          <div className="hidden lg:block lg:col-span-5" style={rise(0.6)}>
            <div
              className="rounded-3xl p-6 xl:p-7 relative overflow-hidden"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 30px 60px -30px rgba(234,88,12,0.55)',
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-5">
                <span
                  className="text-sm font-black uppercase tracking-wider"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Precios de hoy
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {VIGENCIA}
                </span>
              </div>

              {/* GLP destacado */}
              <div
                className="rounded-2xl p-5 mb-4 flex items-center justify-between relative overflow-hidden"
                style={{ backgroundImage: `linear-gradient(135deg, ${glp.from}, ${glp.to})` }}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="p-2 rounded-xl bg-white/20">
                    <Flame className="w-5 h-5 text-white" strokeWidth={2.25} />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-white">
                    {glp.name}
                  </span>
                </div>
                <div className="text-right relative z-10">
                  <span className="text-3xl xl:text-4xl font-black tabular-nums text-white">
                    <span className="text-base font-bold mr-1">RD$</span>
                    {glp.price}
                  </span>
                </div>
              </div>

              {/* Resto de combustibles */}
              <ul>
                {liquids.map((fuel) => (
                  <li
                    key={fuel.name}
                    className="flex items-center justify-between py-3 border-b last:border-b-0"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: fuel.solid }}
                      />
                      <span
                        className="text-sm font-semibold"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {fuel.name}
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span
                        className="text-lg font-black tabular-nums"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <span className="text-xs font-bold mr-1" style={{ color: fuel.solid }}>
                          RD$
                        </span>
                        {fuel.price}
                      </span>
                      <TrendIcon trend={fuel.trend} />
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection('precios')}
                className="mt-5 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors duration-200"
                style={{ color: '#EA580C', backgroundColor: 'rgba(234,88,12,0.10)' }}
              >
                Ver detalle de precios
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="mt-3 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                Precios oficiales del MICM, por galón
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
