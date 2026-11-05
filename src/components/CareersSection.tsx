import React, { useState, Component } from 'react';
import {
  Briefcase,
  FileText,
  Mail,
  Send,
  User,
  Phone,
  MessageSquare } from
'lucide-react';
import { AnimateOnScroll } from './AnimateOnScroll';
const targetEmails = [
'asistenciagestionhumana@grector.com',
'gestionhumana@grector.com',
'gerentegestionhumana@grector.com',
'rrhh@grector.com'];

const positions = [
'Operador de Estación',
'Técnico',
'Administrativo',
'Chofer',
'Otro'];

const ACCENT = '#EA580C';
const inputStyle = {
  backgroundColor: 'var(--input-bg)',
  borderColor: 'var(--border-color)',
  color: 'var(--text-primary)'
};
const inputClass =
'w-full px-4 py-3 border focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 transition-all rounded-xl';
export function CareersSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    posicion: '',
    mensaje: ''
  });
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>

  {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Solicitud de Empleo - ${formData.posicion || 'General'} - ${formData.nombre}`
    );
    const body = encodeURIComponent(`Nombre: ${formData.nombre}
Email: ${formData.email}
Teléfono: ${formData.telefono}
Posición Deseada: ${formData.posicion}

Mensaje/Carta de Presentación:
${formData.mensaje}

[POR FAVOR ADJUNTE SU CV/HOJA DE VIDA A ESTE CORREO ANTES DE ENVIAR]`);
    const mailtoLink = `mailto:${targetEmails.join(',')}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };
  const labelClass =
  'text-sm font-bold uppercase tracking-wider flex items-center gap-2';
  return (
    <section
      className="py-20 sm:py-28 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-primary)'
      }}>
      
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <AnimateOnScroll className="mb-14 max-w-3xl">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-4 px-3 py-1.5 rounded-full"
            style={{
              color: ACCENT,
              backgroundColor: 'rgba(234,88,12,0.10)'
            }}>
            
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
            Únete al equipo
          </span>
          <h2
            className="text-5xl sm:text-6xl font-black tracking-tight mb-5"
            style={{
              color: 'var(--text-primary)'
            }}>
            
            Trabaja con{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(90deg, #F59E0B, #EA580C)'
              }}>
              
              nosotros
            </span>
          </h2>
          <p
            className="text-lg sm:text-xl"
            style={{
              color: 'var(--text-secondary)'
            }}>
            
            Únete a nuestro equipo. Buscamos talento comprometido con la
            excelencia y el servicio. Envíanos tu CV y forma parte de la familia
            Junquito Gas.
          </p>
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll direction="up">
            <div
              className="rounded-3xl p-7 sm:p-9 pl-8 sm:pl-10 relative overflow-hidden"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: `0 16px 36px -22px ${ACCENT}`
              }}>
              
              {/* Barra de acento lateral */}
              <div
                className="absolute top-0 left-0 bottom-0 w-1.5"
                style={{
                  backgroundImage: 'linear-gradient(#F59E0B, #EA580C)'
                }} />
              

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="nombre"
                      className={labelClass}
                      style={{
                        color: 'var(--text-primary)'
                      }}>
                      
                      <User
                        className="w-4 h-4"
                        style={{
                          color: ACCENT
                        }} />
                      
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="Ej. Juan Pérez" />
                    
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className={labelClass}
                      style={{
                        color: 'var(--text-primary)'
                      }}>
                      
                      <Mail
                        className="w-4 h-4"
                        style={{
                          color: ACCENT
                        }} />
                      
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="ejemplo@correo.com" />
                    
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="telefono"
                      className={labelClass}
                      style={{
                        color: 'var(--text-primary)'
                      }}>
                      
                      <Phone
                        className="w-4 h-4"
                        style={{
                          color: ACCENT
                        }} />
                      
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="(000) 000-0000" />
                    
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="posicion"
                      className={labelClass}
                      style={{
                        color: 'var(--text-primary)'
                      }}>
                      
                      <Briefcase
                        className="w-4 h-4"
                        style={{
                          color: ACCENT
                        }} />
                      
                      Posición Deseada *
                    </label>
                    <select
                      id="posicion"
                      required
                      value={formData.posicion}
                      onChange={handleChange}
                      className={inputClass}
                      style={inputStyle}>
                      
                      <option value="" disabled>
                        Seleccione una posición
                      </option>
                      {positions.map((pos) =>
                      <option key={pos} value={pos}>
                          {pos}
                        </option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="mensaje"
                    className={labelClass}
                    style={{
                      color: 'var(--text-primary)'
                    }}>
                    
                    <MessageSquare
                      className="w-4 h-4"
                      style={{
                        color: ACCENT
                      }} />
                    
                    Mensaje / Carta de Presentación
                  </label>
                  <textarea
                    id="mensaje"
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                    placeholder="Cuéntanos sobre tu experiencia y por qué quieres unirte a nuestro equipo..." />
                  
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 text-white font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 group transition-transform duration-300 hover:-translate-y-1"
                    style={{
                      backgroundImage:
                      'linear-gradient(135deg, #F59E0B, #EA580C)',
                      boxShadow: '0 16px 32px -14px rgba(234,88,12,0.7)'
                    }}>
                    
                    <FileText className="w-5 h-5" />
                    Preparar Correo con CV
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <p
                    className="mt-4 text-sm flex items-start gap-2"
                    style={{
                      color: 'var(--text-muted)'
                    }}>
                    
                    <span
                      className="font-bold"
                      style={{
                        color: ACCENT
                      }}>
                      
                      Nota:
                    </span>{' '}
                    Al hacer clic en el botón, se abrirá su cliente de correo
                    predeterminado.
                    <strong
                      style={{
                        color: 'var(--text-primary)'
                      }}>
                      
                      {' '}
                      Por favor, no olvide adjuntar su CV/hoja de vida al correo
                      antes de enviarlo.
                    </strong>
                  </p>
                </div>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>);

}