import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Fuel, Flame, Droplets } from 'lucide-react';

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ease = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  const rise = (delay: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(24px)',
    transition: `all 0.7s ${ease} ${delay}s`
  });

  const products = [
  { label: 'GLP', icon: Flame, solid: '#F59E0B' },
  { label: 'Gasolina', icon: Fuel, solid: '#EA580C' },
  { label: 'Gasoil', icon: Droplets, solid: '#0EA5E9' }];


  return (
    <section
      className="relative w-full overflow-hidden pt-20 pb-28 sm:pt-24 sm:pb-36 lg:pt-32 lg:pb-44 transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      
      {/* Halos de color suaves de fondo */}
      <div
        className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none opacity-[0.18]"
        style={{ backgroundImage: 'radial-gradient(circle, #F59E0B, transparent 70%)' }} />
      
      <div
        className="absolute bottom-0 -left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-[0.12]"
        style={{ backgroundImage: 'radial-gradient(circle, #EA580C, transparent 70%)' }} />
      

      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="max-w-4xl">
          {/* Tagline / badge */}
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-6 px-3 py-1.5 rounded-full"
            style={{
              ...rise(0.2),
              color: '#EA580C',
              backgroundColor: 'rgba(234,88,12,0.10)'
            }}>
            
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
            Distribuidora de combustibles
          </span>

          {/* Título */}
          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.92] mb-6 sm:mb-8"
            style={{ ...rise(0.35), color: 'var(--text-primary)' }}>
            
            Junquito{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #F59E0B, #EA580C)' }}>
              
              Gas
            </span>
          </h1>

          {/* Descripción */}
          <p
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mb-9 sm:mb-10 font-medium leading-relaxed"
            style={{ ...rise(0.5), color: 'var(--text-secondary)' }}>
            
            Ofrecemos{' '}
            <strong style={{ color: 'var(--text-primary)' }}>
              GLP, Gasoil, Gasolina
            </strong>{' '}
            y más. Nuestra gasolina es distribuida en colaboración con{' '}
            <strong style={{ color: 'var(--text-primary)' }}>NEXT</strong>.
            Combustible confiable y seguro para sus vehículos, hogares y negocios
            en República Dominicana.
          </p>

          {/* Tags de productos */}
          <div className="flex flex-wrap gap-3 mb-10 sm:mb-12" style={rise(0.65)}>
            {products.map((product) =>
            <span
              key={product.label}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full"
              style={{
                color: product.solid,
                backgroundColor: `${product.solid}15`
              }}>
              
                <product.icon className="w-4 h-4" />
                {product.label}
              </span>
            )}
            <span
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full"
              style={{
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)'
              }}>
              
              <Fuel className="w-4 h-4" />
              Powered by NEXT
            </span>
          </div>

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row gap-4" style={rise(0.8)}>
            <button
              onClick={() => {
                navigate('/solicitar');
                window.scrollTo(0, 0);
              }}
              className="group relative px-8 py-4 font-black uppercase tracking-wider text-white text-sm sm:text-base rounded-2xl transition-transform duration-300 hover:-translate-y-1"
              style={{
                backgroundImage: 'linear-gradient(135deg, #F59E0B, #EA580C)',
                boxShadow: '0 16px 32px -14px rgba(234,88,12,0.7)'
              }}>
              
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
                backgroundColor: 'var(--card-bg)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--text-primary)';
                e.currentTarget.style.color = 'var(--bg-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}>
              
              Ver estaciones
            </button>
          </div>
        </div>
      </div>
    </section>);

}