import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { OrderSection } from '../components/OrderSection';
export function SolicitarPage() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-primary)'
      }}>
      
      <div className="pt-24 sm:pt-32 pb-8 container mx-auto px-4 sm:px-6 md:px-12">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-[#FCEE02] transition-colors mb-4"
          style={{
            color: 'var(--text-secondary)'
          }}>
          
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </button>
      </div>
      <OrderSection />
    </div>);

}