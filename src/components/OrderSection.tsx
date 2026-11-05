import React, { useState, useRef, Fragment, Component } from 'react';
import {
  Send,
  CheckCircle,
  Download,
  ArrowRight,
  ArrowLeft,
  Building2,
  CreditCard,
  FileText,
  AlertCircle } from
'lucide-react';
import emailjs from '@emailjs/browser';
import { jsPDF } from 'jspdf';
// --- Constants & Types ---
const tankSizes = [
{
  size: '60',
  unit: 'Galones',
  icon: 'S'
},
{
  size: '120',
  unit: 'Galones',
  icon: 'M'
},
{
  size: '250',
  unit: 'Galones',
  icon: 'L'
},
{
  size: '500',
  unit: 'Galones',
  icon: 'XL'
},
{
  size: '1000',
  unit: 'Galones',
  icon: 'XXL'
}];

// Provincias y municipios de República Dominicana
const provinciasMunicipios: Record<string, string[]> = {
  Azua: [
  'Azua de Compostela',
  'Estebanía',
  'Guayabal',
  'Las Charcas',
  'Las Yayas de Viajama',
  'Padre Las Casas',
  'Peralta',
  'Pueblo Viejo',
  'Sabana Yegua',
  'Tábara Arriba'],

  Baoruco: ['Neiba', 'Galván', 'Los Ríos', 'Tamayo', 'Villa Jaragua'],
  Barahona: [
  'Barahona',
  'Cabral',
  'El Peñón',
  'Enriquillo',
  'Fundación',
  'Jaquimeyes',
  'La Ciénaga',
  'Las Salinas',
  'Paraíso',
  'Polo',
  'Vicente Noble'],

  Dajabón: ['Dajabón', 'El Pino', 'Loma de Cabrera', 'Partido', 'Restauración'],
  'Distrito Nacional': ['Santo Domingo de Guzmán'],
  Duarte: [
  'San Francisco de Macorís',
  'Arenoso',
  'Castillo',
  'Eugenio María de Hostos',
  'Las Guáranas',
  'Pimentel',
  'Villa Riva'],

  'El Seibo': ['El Seibo', 'Miches'],
  'Elías Piña': [
  'Comendador',
  'Bánica',
  'El Llano',
  'Hondo Valle',
  'Juan Santiago',
  'Pedro Santana'],

  Espaillat: [
  'Moca',
  'Cayetano Germosén',
  'Gaspar Hernández',
  'Jamao al Norte'],

  'Hato Mayor': ['Hato Mayor del Rey', 'El Valle', 'Sabana de la Mar'],
  'Hermanas Mirabal': ['Salcedo', 'Tenares', 'Villa Tapia'],
  Independencia: [
  'Jimaní',
  'Cristóbal',
  'Duvergé',
  'La Descubierta',
  'Mella',
  'Postrer Río'],

  'La Altagracia': ['Higüey', 'San Rafael del Yuma'],
  'La Romana': ['La Romana', 'Guaymate', 'Villa Hermosa'],
  'La Vega': ['La Vega', 'Constanza', 'Jarabacoa', 'Jima Abajo'],
  'María Trinidad Sánchez': ['Nagua', 'Cabrera', 'El Factor', 'Río San Juan'],
  'Monseñor Nouel': ['Bonao', 'Maimón', 'Piedra Blanca'],
  'Monte Cristi': [
  'Monte Cristi',
  'Castañuelas',
  'Guayubín',
  'Las Matas de Santa Cruz',
  'Pepillo Salcedo',
  'Villa Vásquez'],

  'Monte Plata': [
  'Monte Plata',
  'Bayaguana',
  'Peralvillo',
  'Sabana Grande de Boyá',
  'Yamasá'],

  Pedernales: ['Pedernales', 'Oviedo'],
  Peravia: ['Baní', 'Nizao'],
  'Puerto Plata': [
  'Puerto Plata',
  'Altamira',
  'Guananico',
  'Imbert',
  'Los Hidalgos',
  'Luperón',
  'Sosúa',
  'Villa Isabela',
  'Villa Montellano'],

  Samaná: ['Samaná', 'Las Terrenas', 'Sánchez'],
  'San Cristóbal': [
  'San Cristóbal',
  'Bajos de Haina',
  'Cambita Garabitos',
  'Los Cacaos',
  'Sabana Grande de Palenque',
  'San Gregorio de Nigua',
  'Villa Altagracia',
  'Yaguate'],

  'San José de Ocoa': ['San José de Ocoa', 'Rancho Arriba', 'Sabana Larga'],
  'San Juan': [
  'San Juan de la Maguana',
  'Bohechío',
  'El Cercado',
  'Juan de Herrera',
  'Las Matas de Farfán',
  'Vallejuelo'],

  'San Pedro de Macorís': [
  'San Pedro de Macorís',
  'Consuelo',
  'Guayacanes',
  'Quisqueya',
  'Ramón Santana',
  'San José de Los Llanos'],

  'Sánchez Ramírez': ['Cotuí', 'Cevicos', 'Fantino', 'La Mata'],
  Santiago: [
  'Santiago de los Caballeros',
  'Bisonó',
  'Jánico',
  'Licey al Medio',
  'Puñal',
  'Sabana Iglesia',
  'San José de las Matas',
  'Tamboril',
  'Villa González'],

  'Santiago Rodríguez': [
  'San Ignacio de Sabaneta',
  'Monción',
  'Villa Los Almácigos'],

  'Santo Domingo': [
  'Santo Domingo Este',
  'Santo Domingo Norte',
  'Santo Domingo Oeste',
  'Boca Chica',
  'Los Alcarrizos',
  'Pedro Brand',
  'San Antonio de Guerra'],

  Valverde: ['Mao', 'Esperanza', 'Laguna Salada']
};
const provinces = Object.keys(provinciasMunicipios);
interface TankFormData {
  tankSize: string;
  nombre: string;
  apellido: string;
  telefono: string;
  provincia: string;
  municipio: string;
  direccion: string;
  email: string;
}
interface CreditFormData {
  nombreEmpresa: string;
  rnc: string;
  direccionEmpresa: string;
  correoEmpresa: string;
  telefonoEmpresa: string;
  nombrePropietario: string;
  actividadEmpresa: string;
  cedulaPropietario: string;
  tanqueGLP: boolean;
  telefonoPropietario: string;
  condicionesInstalacion: {
    manguera: boolean;
    manometro: boolean;
    otros: boolean;
  };
  direccionPropietario: string;
  condicionesPago: 'contado' | 'transferencia' | 'credito';
  plazoCredito: '15' | '30' | '45' | '';
  consumoGLP: 'semanal' | 'quincenal' | 'mensual' | 'otro';
  consumoOtro: string;
  sectorEmpresa: {
    [key: string]: boolean;
  };
  sectorOtro: string;
  refBancaria1: string;
  numCuenta1: string;
  refBancaria2: string;
  numCuenta2: string;
  refComercial1: string;
  infoContacto1: string;
  refComercial2: string;
  infoContacto2: string;
  refComercial3: string;
  infoContacto3: string;
  autorizacion: boolean;
  nombreRepresentante: string;
}
const initialCreditData: CreditFormData = {
  nombreEmpresa: '',
  rnc: '',
  direccionEmpresa: '',
  correoEmpresa: '',
  telefonoEmpresa: '',
  nombrePropietario: '',
  actividadEmpresa: '',
  cedulaPropietario: '',
  tanqueGLP: false,
  telefonoPropietario: '',
  condicionesInstalacion: {
    manguera: false,
    manometro: false,
    otros: false
  },
  direccionPropietario: '',
  condicionesPago: 'contado',
  plazoCredito: '',
  consumoGLP: 'mensual',
  consumoOtro: '',
  sectorEmpresa: {
    minorista: false,
    mayorista: false,
    contratista: false,
    distribucion: false,
    mercadeo: false,
    servicios: false,
    proveedor: false,
    tecnologia: false,
    fabricante: false,
    consultor: false,
    transporte: false,
    otros: false
  },
  sectorOtro: '',
  refBancaria1: '',
  numCuenta1: '',
  refBancaria2: '',
  numCuenta2: '',
  refComercial1: '',
  infoContacto1: '',
  refComercial2: '',
  infoContacto2: '',
  refComercial3: '',
  infoContacto3: '',
  autorizacion: false,
  nombreRepresentante: ''
};
// Shared input style
const inputStyle = {
  backgroundColor: 'var(--input-bg)',
  borderColor: 'var(--border-color)',
  color: 'var(--text-primary)'
};
const inputClass =
'w-full px-4 py-3 border focus:outline-none focus:border-[#FCEE02] focus:ring-2 focus:ring-[#FCEE02]/20 transition-all rounded-lg';
// --- Main Component ---
export function OrderSection() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [tankFormData, setTankFormData] = useState<TankFormData>({
    tankSize: '',
    nombre: '',
    apellido: '',
    telefono: '',
    provincia: '',
    municipio: '',
    direccion: '',
    email: ''
  });
  const [creditFormData, setCreditFormData] =
  useState<CreditFormData>(initialCreditData);
  const [creditFormSubmitted, setCreditFormSubmitted] = useState(false);
  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Available municipios based on selected provincia
  const availableMunicipios = tankFormData.provincia ?
  provinciasMunicipios[tankFormData.provincia] || [] :
  [];
  // =============================================
  // TANK PDF — Full detailed format (original)
  // =============================================
  const generateTankPDF = async (
  mode: 'download' | 'blob' = 'download')
  : Promise<Blob | void> => {
    const doc = new jsPDF();
    const pageWidth = 210;
    const marginLeft = 20;
    const contentWidth = pageWidth - marginLeft * 2;
    let yPos = 0;
    // HEADER — Yellow bar
    doc.setFillColor(252, 238, 2);
    doc.rect(0, 0, pageWidth, 28, 'F');
    doc.setTextColor(37, 31, 31);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('SOLICITUD DE COTIZACIÓN', pageWidth / 2, 17, {
      align: 'center'
    });
    yPos = 40;
    // GREETING
    doc.setTextColor(37, 31, 31);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`¡Hola ${tankFormData.nombre}!`, marginLeft, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const greetingText =
    'Hemos recibido tu interés para el suministro de gas. Estamos procesando tu solicitud con los siguientes datos:';
    const splitGreeting = doc.splitTextToSize(greetingText, contentWidth);
    doc.text(splitGreeting, marginLeft, yPos);
    yPos += splitGreeting.length * 5 + 10;
    // DATA TABLE
    const tableStartY = yPos;
    const rowHeight = 12;
    const labelWidth = 35;
    const fullAddress = [
    tankFormData.direccion,
    tankFormData.municipio,
    tankFormData.provincia,
    'República Dominicana'].

    filter(Boolean).
    join(', ');
    const tableRows = [
    {
      label: 'Servicio:',
      value: 'Instalación/Suministro de Tanque'
    },
    {
      label: 'Capacidad:',
      value: `${selectedSize} galones`
    },
    {
      label: 'Ubicación:',
      value: fullAddress
    },
    {
      label: 'Teléfono:',
      value: tankFormData.telefono
    },
    {
      label: 'Email:',
      value: tankFormData.email
    }];

    let totalTableHeight = 0;
    const rowDetails: Array<{
      label: string;
      lines: string[];
      height: number;
    }> = [];
    tableRows.forEach((row) => {
      const valueWidth = contentWidth - labelWidth - 10;
      const lines = doc.splitTextToSize(row.value, valueWidth);
      const height = Math.max(rowHeight, lines.length * 6 + 6);
      totalTableHeight += height;
      rowDetails.push({
        label: row.label,
        lines,
        height
      });
    });
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.rect(marginLeft, tableStartY, contentWidth, totalTableHeight + 4);
    let currentRowY = tableStartY + 2;
    rowDetails.forEach((row, index) => {
      if (index > 0) {
        doc.setDrawColor(235, 235, 235);
        doc.setLineWidth(0.3);
        doc.line(
          marginLeft + 4,
          currentRowY,
          marginLeft + contentWidth - 4,
          currentRowY
        );
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(37, 31, 31);
      doc.text(row.label, marginLeft + 6, currentRowY + 8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.text(row.lines, marginLeft + labelWidth + 10, currentRowY + 8);
      currentRowY += row.height;
    });
    yPos = tableStartY + totalTableHeight + 18;
    // STATUS BANNER — Yellow bar
    doc.setFillColor(252, 238, 2);
    doc.rect(marginLeft, yPos, contentWidth, 22, 'F');
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('ESTADO DEL PRESUPUESTO:', pageWidth / 2, yPos + 8, {
      align: 'center'
    });
    doc.setTextColor(37, 31, 31);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PENDIENTE DE EVALUACIÓN', pageWidth / 2, yPos + 17, {
      align: 'center'
    });
    yPos += 34;
    // NEXT STEPS
    const nextStepsStartY = yPos;
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(37, 31, 31);
    doc.text('¿Qué sigue ahora?', pageWidth / 2, yPos + 10, {
      align: 'center'
    });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const nextStepsText = `Nuestro equipo técnico revisará los detalles de tu ubicación. Te llamaremos al ${tankFormData.telefono} para brindarte el presupuesto final y coordinar la entrega.`;
    const splitNextSteps = doc.splitTextToSize(nextStepsText, contentWidth - 20);
    doc.text(splitNextSteps, pageWidth / 2, yPos + 18, {
      align: 'center',
      maxWidth: contentWidth - 20
    });
    const nextStepsHeight = 18 + splitNextSteps.length * 5 + 8;
    doc.rect(marginLeft, nextStepsStartY, contentWidth, nextStepsHeight);
    yPos += nextStepsHeight + 16;
    // FOOTER — Logo
    try {
      const logoUrl = "/NBA_(1).png";

      const response = await fetch(logoUrl);
      const blob = await response.blob();
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      doc.addImage(base64, 'PNG', (pageWidth - 40) / 2, yPos, 40, 30);
      yPos += 36;
    } catch {
      doc.setFillColor(252, 238, 2);
      doc.roundedRect((pageWidth - 50) / 2, yPos, 50, 16, 2, 2, 'F');
      doc.setTextColor(37, 31, 31);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('JUNQUITO GAS', pageWidth / 2, yPos + 11, {
        align: 'center'
      });
      yPos += 24;
    }
    // Signature
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text('Atentamente,', pageWidth / 2, yPos, {
      align: 'center'
    });
    yPos += 6;
    doc.setTextColor(251, 144, 13);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Junquito Gas', pageWidth / 2, yPos, {
      align: 'center'
    });
    yPos += 8;
    doc.setTextColor(160, 160, 160);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('+1-809-247-2104  |  info@junquitogas.com', pageWidth / 2, yPos, {
      align: 'center'
    });
    yPos += 4;
    doc.text(
      'Av. Presidente Antonio Guzmán Fernández, Santiago De Los Caballeros, RD',
      pageWidth / 2,
      yPos,
      {
        align: 'center'
      }
    );
    // BOTTOM ACCENT BAR
    const barY = 290;
    const barHeight = 4;
    const segmentWidth = pageWidth / 3;
    doc.setFillColor(252, 238, 2);
    doc.rect(0, barY, segmentWidth, barHeight, 'F');
    doc.setFillColor(251, 144, 13);
    doc.rect(segmentWidth, barY, segmentWidth, barHeight, 'F');
    doc.setFillColor(236, 36, 36);
    doc.rect(segmentWidth * 2, barY, segmentWidth, barHeight, 'F');
    // Reference number
    doc.setTextColor(180, 180, 180);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    const refNumber = `REF-${Date.now().toString(36).toUpperCase()}`;
    const dateStr = new Date().toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`${refNumber}  •  ${dateStr}`, pageWidth / 2, barY - 3, {
      align: 'center'
    });
    if (mode === 'blob') return doc.output('blob');
    doc.save(
      `Solicitud_JunquitoGas_${tankFormData.nombre}_${tankFormData.apellido}.pdf`
    );
  };
  // =============================================
  // CREDIT PDF
  // =============================================
  const generateCreditPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = 210;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = 15;
    const drawField = (
    label: string,
    value: string,
    x: number,
    y: number,
    w: number,
    h: number = 6) =>
    {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.text(label, x + 1, y + 3);
      doc.setFont('helvetica', 'normal');
      doc.text(String(value || ''), x + 1, y + 8);
      doc.rect(x, y, w, h + 4);
    };
    doc.setFillColor(252, 238, 2);
    doc.rect(0, 0, pageWidth, 25, 'F');
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('SOLICITUD DE CRÉDITO', pageWidth / 2, 16, {
      align: 'center'
    });
    try {
      const logoUrl = "/NBA_(1).png";

      const response = await fetch(logoUrl);
      const blob = await response.blob();
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      doc.addImage(base64, 'PNG', margin, 2, 30, 20);
    } catch (e) {}
    y = 35;
    const col1 = margin;
    const col2 = margin + contentWidth / 2;
    const w = contentWidth / 2;
    // Section 1
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, contentWidth, 6, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(
      'SECCIÓN 1: DETALLES DE LA EMPRESA E INFORMACIÓN GENERAL',
      pageWidth / 2,
      y + 4,
      {
        align: 'center'
      }
    );
    y += 6;
    drawField('Nombre de la empresa:', creditFormData.nombreEmpresa, col1, y, w);
    drawField('RNC:', creditFormData.rnc, col2, y, w);
    y += 10;
    drawField(
      'Dirección de la empresa:',
      creditFormData.direccionEmpresa,
      col1,
      y,
      w
    );
    drawField('Correo Electrónico:', creditFormData.correoEmpresa, col2, y, w);
    y += 10;
    drawField('Teléfono:', creditFormData.telefonoEmpresa, col1, y, w);
    drawField(
      'Nombre del Propietario:',
      creditFormData.nombrePropietario,
      col2,
      y,
      w
    );
    y += 10;
    drawField(
      'Actividad de la empresa:',
      creditFormData.actividadEmpresa,
      col1,
      y,
      w
    );
    drawField(
      'Cédula del Propietario:',
      creditFormData.cedulaPropietario,
      col2,
      y,
      w
    );
    y += 10;
    doc.rect(margin, y, contentWidth, 12);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('Condiciones de Pago:', margin + 2, y + 4);
    doc.setFont('helvetica', 'normal');
    let payX = margin + 35;
    doc.text(
      `[${creditFormData.condicionesPago === 'contado' ? 'X' : ' '}] Contado`,
      payX,
      y + 4
    );
    doc.text(
      `[${creditFormData.condicionesPago === 'transferencia' ? 'X' : ' '}] Transferencia`,
      payX,
      y + 9
    );
    doc.text(
      `[${creditFormData.condicionesPago === 'credito' ? 'X' : ' '}] Crédito`,
      payX + 35,
      y + 4
    );
    if (creditFormData.condicionesPago === 'credito') {
      doc.text(`Plazo: ${creditFormData.plazoCredito} días`, payX + 35, y + 9);
    }
    y += 14;
    // Section 2
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, contentWidth, 6, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(
      'SECCIÓN 2: SECTOR AL QUE CORRESPONDE LA EMPRESA',
      pageWidth / 2,
      y + 4,
      {
        align: 'center'
      }
    );
    y += 6;
    doc.rect(margin, y, contentWidth, 25);
    let sx = margin + 2;
    let sy = y + 5;
    Object.keys(creditFormData.sectorEmpresa).forEach((sec, i) => {
      const label = sec.charAt(0).toUpperCase() + sec.slice(1);
      const checked = creditFormData.sectorEmpresa[sec];
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`[${checked ? 'X' : ' '}] ${label}`, sx, sy);
      sy += 5;
      if ((i + 1) % 4 === 0) {
        sx += 45;
        sy = y + 5;
      }
    });
    y += 27;
    // Section 3
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, contentWidth, 6, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('SECCIÓN 3: REFERENCIAS BANCARIAS', pageWidth / 2, y + 4, {
      align: 'center'
    });
    y += 6;
    drawField('Referente Bancario 1:', creditFormData.refBancaria1, col1, y, w);
    drawField('Número de cuenta:', creditFormData.numCuenta1, col2, y, w);
    y += 10;
    drawField('Referente Bancario 2:', creditFormData.refBancaria2, col1, y, w);
    drawField('Número de cuenta:', creditFormData.numCuenta2, col2, y, w);
    y += 12;
    // Section 4
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, contentWidth, 6, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('SECCIÓN 4: REFERENCIAS COMERCIALES', pageWidth / 2, y + 4, {
      align: 'center'
    });
    y += 6;
    drawField(
      'Referente Comercial 1:',
      creditFormData.refComercial1,
      col1,
      y,
      w
    );
    drawField(
      'Información de Contacto:',
      creditFormData.infoContacto1,
      col2,
      y,
      w
    );
    y += 10;
    drawField(
      'Referente Comercial 2:',
      creditFormData.refComercial2,
      col1,
      y,
      w
    );
    drawField(
      'Información de Contacto:',
      creditFormData.infoContacto2,
      col2,
      y,
      w
    );
    y += 12;
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    const authText = doc.splitTextToSize(
      'Autorizo a JUNQUITO GAS SRL, a realizar consultas sobre mi historial crediticio en cualquier buró de información autorizado en la República Dominicana, incluyendo, pero no limitado a, Data Crédito y TransUnion, para fines de evaluación y análisis de riesgos.',
      contentWidth
    );
    doc.text(authText, margin, y);
    y += 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(
      `[${creditFormData.autorizacion ? 'X' : ' '}] Acepto los términos y condiciones`,
      margin,
      y
    );
    y += 10;
    doc.text('Datos del Representante:', margin, y);
    y += 8;
    doc.line(margin, y, margin + 80, y);
    doc.text(creditFormData.nombreRepresentante || 'Firma', margin, y + 4);
    doc.text(
      `Fecha: ${new Date().toLocaleDateString('es-DO')}`,
      margin + 100,
      y + 4
    );
    // Bottom bar
    const barY = 290;
    const segmentWidth = pageWidth / 3;
    doc.setFillColor(252, 238, 2);
    doc.rect(0, barY, segmentWidth, 4, 'F');
    doc.setFillColor(251, 144, 13);
    doc.rect(segmentWidth, barY, segmentWidth, 4, 'F');
    doc.setFillColor(236, 36, 36);
    doc.rect(segmentWidth * 2, barY, segmentWidth, 4, 'F');
    doc.save(
      `Solicitud_Credito_${creditFormData.nombreEmpresa || 'Cliente'}.pdf`
    );
  };
  // --- Handlers ---
  const handleTankChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>

  {
    const { id, value } = e.target;
    if (id === 'provincia') {
      // Reset municipio when provincia changes
      setTankFormData((prev) => ({
        ...prev,
        provincia: value,
        municipio: ''
      }));
    } else {
      setTankFormData((prev) => ({
        ...prev,
        [id]: value
      }));
    }
  };
  const handleCreditChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>

  {
    const { id, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (id.startsWith('sector_')) {
        const sector = id.replace('sector_', '');
        setCreditFormData((prev) => ({
          ...prev,
          sectorEmpresa: {
            ...prev.sectorEmpresa,
            [sector]: checked
          }
        }));
      } else if (id.startsWith('inst_')) {
        const inst = id.replace('inst_', '');
        setCreditFormData((prev) => ({
          ...prev,
          condicionesInstalacion: {
            ...prev.condicionesInstalacion,
            [inst]: checked
          }
        }));
      } else if (id === 'tanqueGLP') {
        setCreditFormData((prev) => ({
          ...prev,
          tanqueGLP: checked
        }));
      } else if (id === 'autorizacion') {
        setCreditFormData((prev) => ({
          ...prev,
          autorizacion: checked
        }));
      }
    } else {
      setCreditFormData((prev) => ({
        ...prev,
        [id]: value
      }));
    }
  };
  const handleTankSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const fullAddress = [
      tankFormData.direccion,
      tankFormData.municipio,
      tankFormData.provincia,
      'República Dominicana'].

      filter(Boolean).
      join(', ');
      const templateParams = {
        nombre: tankFormData.nombre,
        apellido: tankFormData.apellido,
        email: tankFormData.email,
        telefono: tankFormData.telefono,
        provincia: tankFormData.provincia,
        direccion: fullAddress,
        tankSize: selectedSize,
        gps_coords: 'No GPS',
        type: 'SOLICITUD DE TANQUE'
      };
      await emailjs.send(
        'service_6yn661v',
        'template_ljanvky',
        templateParams,
        '2Y7qV78KKkpt8cRDy'
      );
      setStep(2);
    } catch (error) {
      console.error(error);
      setSubmitError(
        'Error al enviar. Verifique su conexión e intente nuevamente, o contáctenos al +1-809-247-2104.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCreditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const templateParams = {
        ...creditFormData,
        nombre: tankFormData.nombre,
        email: tankFormData.email,
        type: 'SOLICITUD DE CRÉDITO',
        sector_info: Object.entries(creditFormData.sectorEmpresa).
        filter(([, v]) => v).
        map(([k]) => k).
        join(', '),
        pago_info: `${creditFormData.condicionesPago} ${creditFormData.plazoCredito ? `(${creditFormData.plazoCredito} días)` : ''}`
      };
      await emailjs.send(
        'service_6yn661v',
        'template_ljanvky',
        templateParams as any,
        '2Y7qV78KKkpt8cRDy'
      );
      setCreditFormSubmitted(true);
      setStep(3);
    } catch (error) {
      console.error(error);
      setSubmitError('Error al enviar solicitud de crédito.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const skipCreditStep = () => {
    setStep(3);
  };
  // --- Render ---
  const renderStepIndicator = () =>
  <div className="flex items-center justify-center mb-12 gap-2 sm:gap-4">
      {[
    {
      num: 1,
      label: 'Tanque'
    },
    {
      num: 2,
      label: 'Crédito'
    },
    {
      num: 3,
      label: 'Listo'
    }].
    map((s, i) =>
    <Fragment key={s.num}>
          {i > 0 &&
      <div
        className="w-6 sm:w-10 h-0.5"
        style={{
          backgroundColor:
          step >= s.num ? '#FCEE02' : 'var(--border-color)'
        }} />

      }
          <div
        className={`flex items-center gap-2 ${step >= s.num ? '' : 'opacity-40'}`}>
        
            <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s.num ? 'bg-[#FCEE02] text-black' : ''}`}
          style={
          step < s.num ?
          {
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-muted)'
          } :
          {}
          }>
          
              {step > s.num ? '✓' : s.num}
            </div>
            <span
          className="hidden sm:inline font-bold uppercase text-xs"
          style={{
            color:
            step >= s.num ? 'var(--text-primary)' : 'var(--text-muted)'
          }}>
          
              {s.label}
            </span>
          </div>
        </Fragment>
    )}
    </div>;

  const renderTankForm = () =>
  <form onSubmit={handleTankSubmit} className="space-y-8">
      {/* Tank Size */}
      <div>
        <label
        className="block font-bold uppercase tracking-wider mb-4"
        style={{
          color: 'var(--text-primary)'
        }}>
        
          Seleccione el tamaño del tanque *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {tankSizes.map((tank) =>
        <label
          key={tank.size}
          className={`cursor-pointer relative p-4 border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 rounded-xl ${selectedSize === tank.size ? 'border-[#FB900D]' : 'hover:border-[#FCEE02]'}`}
          style={{
            backgroundColor:
            selectedSize === tank.size ?
            'var(--bg-tertiary)' :
            'var(--bg-primary)',
            borderColor:
            selectedSize === tank.size ?
            '#FB900D' :
            'var(--border-color)'
          }}>
          
              <input
            type="radio"
            name="tankSize"
            value={tank.size}
            checked={selectedSize === tank.size}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="sr-only"
            required />
          
              <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${selectedSize === tank.size ? 'bg-[#FB900D] text-white border-[#FB900D]' : 'text-gray-400'}`}
            style={
            selectedSize !== tank.size ?
            {
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color-strong)'
            } :
            {}
            }>
            
                {tank.icon}
              </div>
              <div className="text-center">
                <span
              className="block text-lg font-black"
              style={{
                color: 'var(--text-primary)'
              }}>
              
                  {tank.size}
                </span>
                <span className="text-xs text-gray-500 uppercase">
                  {tank.unit}
                </span>
              </div>
              {selectedSize === tank.size &&
          <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-[#FB900D]" />
          }
            </label>
        )}
        </div>
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
          htmlFor="nombre"
          className="block text-sm font-bold uppercase mb-2"
          style={{
            color: 'var(--text-secondary)'
          }}>
          
            Nombre *
          </label>
          <input
          type="text"
          id="nombre"
          value={tankFormData.nombre}
          onChange={handleTankChange}
          required
          className={inputClass}
          style={inputStyle}
          placeholder="Su nombre" />
        
        </div>
        <div>
          <label
          htmlFor="apellido"
          className="block text-sm font-bold uppercase mb-2"
          style={{
            color: 'var(--text-secondary)'
          }}>
          
            Apellido *
          </label>
          <input
          type="text"
          id="apellido"
          value={tankFormData.apellido}
          onChange={handleTankChange}
          required
          className={inputClass}
          style={inputStyle}
          placeholder="Su apellido" />
        
        </div>
        <div>
          <label
          htmlFor="telefono"
          className="block text-sm font-bold uppercase mb-2"
          style={{
            color: 'var(--text-secondary)'
          }}>
          
            Teléfono *
          </label>
          <input
          type="tel"
          id="telefono"
          value={tankFormData.telefono}
          onChange={handleTankChange}
          required
          className={inputClass}
          style={inputStyle}
          placeholder="(809) 000-0000" />
        
        </div>
        <div>
          <label
          htmlFor="email"
          className="block text-sm font-bold uppercase mb-2"
          style={{
            color: 'var(--text-secondary)'
          }}>
          
            Correo Electrónico *
          </label>
          <input
          type="email"
          id="email"
          value={tankFormData.email}
          onChange={handleTankChange}
          required
          className={inputClass}
          style={inputStyle}
          placeholder="correo@ejemplo.com" />
        
        </div>
      </div>

      {/* Location — Cascading Dropdowns */}
      <div className="space-y-4">
        <h4
        className="font-bold uppercase tracking-wider text-sm"
        style={{
          color: 'var(--text-primary)'
        }}>
        
          Ubicación de Entrega *
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* País */}
          <div>
            <label
            className="block text-sm font-bold uppercase mb-2"
            style={{
              color: 'var(--text-secondary)'
            }}>
            
              País
            </label>
            <input
            type="text"
            value="República Dominicana"
            disabled
            className={inputClass + ' opacity-70 cursor-not-allowed'}
            style={inputStyle} />
          
          </div>

          {/* Provincia */}
          <div>
            <label
            htmlFor="provincia"
            className="block text-sm font-bold uppercase mb-2"
            style={{
              color: 'var(--text-secondary)'
            }}>
            
              Provincia *
            </label>
            <div className="relative">
              <select
              id="provincia"
              value={tankFormData.provincia}
              onChange={handleTankChange}
              required
              className={inputClass + ' appearance-none'}
              style={inputStyle}>
              
                <option value="">Seleccione provincia</option>
                {provinces.map((p) =>
              <option key={p} value={p}>
                    {p}
                  </option>
              )}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                className="w-4 h-4"
                style={{
                  color: 'var(--text-muted)'
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                
                  <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7" />
                
                </svg>
              </div>
            </div>
          </div>

          {/* Municipio */}
          <div>
            <label
            htmlFor="municipio"
            className="block text-sm font-bold uppercase mb-2"
            style={{
              color: 'var(--text-secondary)'
            }}>
            
              Municipio *
            </label>
            <div className="relative">
              <select
              id="municipio"
              value={tankFormData.municipio}
              onChange={handleTankChange}
              required
              disabled={!tankFormData.provincia}
              className={
              inputClass +
              ' appearance-none' + (
              !tankFormData.provincia ?
              ' opacity-50 cursor-not-allowed' :
              '')
              }
              style={inputStyle}>
              
                <option value="">
                  {tankFormData.provincia ?
                'Seleccione municipio' :
                'Primero seleccione provincia'}
                </option>
                {availableMunicipios.map((m) =>
              <option key={m} value={m}>
                    {m}
                  </option>
              )}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                className="w-4 h-4"
                style={{
                  color: 'var(--text-muted)'
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                
                  <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7" />
                
                </svg>
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label
            htmlFor="direccion"
            className="block text-sm font-bold uppercase mb-2"
            style={{
              color: 'var(--text-secondary)'
            }}>
            
              Dirección (Calle, Sector, #) *
            </label>
            <textarea
            id="direccion"
            value={tankFormData.direccion}
            onChange={handleTankChange}
            required
            rows={2}
            className={inputClass + ' resize-none'}
            style={inputStyle}
            placeholder="Ej: Calle Principal #5, Sector Los Jardines, cerca del parque central" />
          
          </div>
        </div>
      </div>

      {/* Submit */}
      <div
      className="pt-4 border-t"
      style={{
        borderColor: 'var(--border-color)'
      }}>
      
        {submitError &&
      <div className="mb-4 p-4 bg-[#EC2424]/10 border border-[#EC2424]/30 rounded-xl text-[#EC2424] text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">Error al enviar</p>
              <p>{submitError}</p>
            </div>
          </div>
      }
        <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto md:min-w-[220px] float-right px-8 py-4 bg-[#EC2424] text-white font-black uppercase tracking-wider hover:bg-[#FB900D] transition-colors duration-300 shadow-lg disabled:opacity-70 flex items-center justify-center gap-2 border-2 border-[#EC2424] hover:border-[#FB900D] rounded-xl">
        
          {isSubmitting ?
        'Procesando...' :

        <>
              <span>Siguiente Paso</span> <ArrowRight className="w-5 h-5" />
            </>
        }
        </button>
      </div>
    </form>;

  const renderCreditForm = () =>
  <form onSubmit={handleCreditSubmit} className="space-y-8">
      <div className="bg-[#FCEE02]/10 p-4 rounded-xl border border-[#FCEE02]">
        <h3
        className="font-bold text-lg flex items-center gap-2"
        style={{
          color: 'var(--text-primary)'
        }}>
        
          <CreditCard className="w-5 h-5 text-[#FB900D]" /> Solicitud de Crédito
          (Opcional)
        </h3>
        <p
        className="text-sm mt-1"
        style={{
          color: 'var(--text-secondary)'
        }}>
        
          Complete este formulario si desea aplicar para crédito comercial.
          Puede omitir este paso.
        </p>
      </div>

      {/* Section 1 */}
      <div className="space-y-4">
        <h4
        className="font-bold uppercase border-b pb-2"
        style={{
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}>
        
          1. Detalles de la Empresa
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
          type="text"
          id="nombreEmpresa"
          placeholder="Nombre de la empresa *"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.nombreEmpresa}
          onChange={handleCreditChange}
          required />
        
          <input
          type="text"
          id="rnc"
          placeholder="RNC *"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.rnc}
          onChange={handleCreditChange}
          required />
        
          <input
          type="text"
          id="direccionEmpresa"
          placeholder="Dirección de la empresa *"
          className={inputClass + ' md:col-span-2'}
          style={inputStyle}
          value={creditFormData.direccionEmpresa}
          onChange={handleCreditChange}
          required />
        
          <input
          type="email"
          id="correoEmpresa"
          placeholder="Correo Electrónico *"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.correoEmpresa}
          onChange={handleCreditChange}
          required />
        
          <input
          type="tel"
          id="telefonoEmpresa"
          placeholder="Teléfono *"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.telefonoEmpresa}
          onChange={handleCreditChange}
          required />
        
          <input
          type="text"
          id="nombrePropietario"
          placeholder="Nombre del Propietario *"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.nombrePropietario}
          onChange={handleCreditChange}
          required />
        
          <input
          type="text"
          id="cedulaPropietario"
          placeholder="Cédula del Propietario *"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.cedulaPropietario}
          onChange={handleCreditChange}
          required />
        
          <input
          type="text"
          id="actividadEmpresa"
          placeholder="Actividad de la empresa"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.actividadEmpresa}
          onChange={handleCreditChange} />
        
          <input
          type="tel"
          id="telefonoPropietario"
          placeholder="Teléfono del Propietario"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.telefonoPropietario}
          onChange={handleCreditChange} />
        
        </div>

        <div className="mt-4">
          <label
          className="block text-sm font-bold mb-2"
          style={{
            color: 'var(--text-secondary)'
          }}>
          
            Condiciones de Pago
          </label>
          <div className="flex flex-wrap gap-4">
            {['contado', 'transferencia', 'credito'].map((opt) =>
          <label
            key={opt}
            className="flex items-center gap-2 cursor-pointer"
            style={{
              color: 'var(--text-primary)'
            }}>
            
                <input
              type="radio"
              name="condicionesPago"
              id="condicionesPago"
              value={opt}
              checked={creditFormData.condicionesPago === opt}
              onChange={handleCreditChange}
              className="accent-[#FCEE02]" />
            
                <span className="capitalize text-sm">{opt}</span>
              </label>
          )}
          </div>
          {creditFormData.condicionesPago === 'credito' &&
        <select
          id="plazoCredito"
          value={creditFormData.plazoCredito}
          onChange={handleCreditChange}
          className={inputClass + ' mt-2 max-w-xs'}
          style={inputStyle}>
          
              <option value="">Seleccione Plazo</option>
              <option value="15">15 días</option>
              <option value="30">30 días</option>
              <option value="45">45 días</option>
            </select>
        }
        </div>
      </div>

      {/* Section 2 */}
      <div className="space-y-4">
        <h4
        className="font-bold uppercase border-b pb-2"
        style={{
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}>
        
          2. Sector de la Empresa
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.keys(creditFormData.sectorEmpresa).map((key) =>
        <label
          key={key}
          className="flex items-center gap-2 cursor-pointer text-sm"
          style={{
            color: 'var(--text-primary)'
          }}>
          
              <input
            type="checkbox"
            id={`sector_${key}`}
            checked={creditFormData.sectorEmpresa[key]}
            onChange={handleCreditChange}
            className="accent-[#FCEE02] w-4 h-4" />
          
              <span className="capitalize">
                {key === 'distribucion' ?
            'Distribución/Ventas' :
            key === 'mercadeo' ?
            'Mercadeo/Publicidad' :
            key === 'servicios' ?
            'Servicios Profesionales' :
            key === 'proveedor' ?
            'Proveedor de servicios' :
            key}
              </span>
            </label>
        )}
        </div>
      </div>

      {/* Section 3 */}
      <div className="space-y-4">
        <h4
        className="font-bold uppercase border-b pb-2"
        style={{
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}>
        
          3. Referencias Bancarias
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
          type="text"
          id="refBancaria1"
          placeholder="Referencia Bancaria 1"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.refBancaria1}
          onChange={handleCreditChange} />
        
          <input
          type="text"
          id="numCuenta1"
          placeholder="Número de Cuenta 1"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.numCuenta1}
          onChange={handleCreditChange} />
        
          <input
          type="text"
          id="refBancaria2"
          placeholder="Referencia Bancaria 2"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.refBancaria2}
          onChange={handleCreditChange} />
        
          <input
          type="text"
          id="numCuenta2"
          placeholder="Número de Cuenta 2"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.numCuenta2}
          onChange={handleCreditChange} />
        
        </div>
      </div>

      {/* Section 4 */}
      <div className="space-y-4">
        <h4
        className="font-bold uppercase border-b pb-2"
        style={{
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}>
        
          4. Referencias Comerciales
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
          type="text"
          id="refComercial1"
          placeholder="Referencia Comercial 1"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.refComercial1}
          onChange={handleCreditChange} />
        
          <input
          type="text"
          id="infoContacto1"
          placeholder="Contacto 1"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.infoContacto1}
          onChange={handleCreditChange} />
        
          <input
          type="text"
          id="refComercial2"
          placeholder="Referencia Comercial 2"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.refComercial2}
          onChange={handleCreditChange} />
        
          <input
          type="text"
          id="infoContacto2"
          placeholder="Contacto 2"
          className={inputClass}
          style={inputStyle}
          value={creditFormData.infoContacto2}
          onChange={handleCreditChange} />
        
        </div>
      </div>

      {/* Auth */}
      <div
      className="p-5 rounded-xl border"
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        borderColor: 'var(--border-color)'
      }}>
      
        <p
        className="mb-4 text-sm"
        style={{
          color: 'var(--text-secondary)'
        }}>
        
          Autorizo a JUNQUITO GAS SRL, a realizar consultas sobre mi historial
          crediticio en cualquier buró de información autorizado en la República
          Dominicana, incluyendo, pero no limitado a, Data Crédito y TransUnion,
          para fines de evaluación y análisis de riesgos.
        </p>
        <label
        className="flex items-center gap-3 cursor-pointer font-bold"
        style={{
          color: 'var(--text-primary)'
        }}>
        
          <input
          type="checkbox"
          id="autorizacion"
          checked={creditFormData.autorizacion}
          onChange={handleCreditChange}
          className="w-5 h-5 accent-[#EC2424]"
          required />
        
          Acepto los términos y condiciones
        </label>
        <input
        type="text"
        id="nombreRepresentante"
        placeholder="Nombre y Apellido del Representante (Firma) *"
        className={inputClass + ' mt-4'}
        style={inputStyle}
        value={creditFormData.nombreRepresentante}
        onChange={handleCreditChange}
        required />
      
      </div>

      {/* Submit */}
      <div
      className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t"
      style={{
        borderColor: 'var(--border-color)'
      }}>
      
        {submitError &&
      <div className="w-full mb-2 p-3 bg-[#EC2424]/10 border border-[#EC2424]/30 rounded-xl text-[#EC2424] text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {submitError}
          </div>
      }
        <button
        type="button"
        onClick={skipCreditStep}
        className="font-bold underline text-sm"
        style={{
          color: 'var(--text-muted)'
        }}>
        
          Omitir Solicitud de Crédito
        </button>
        <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-4 bg-[#FCEE02] text-black font-black uppercase tracking-wider hover:bg-[#FB900D] hover:text-white transition-colors shadow-lg rounded-xl flex items-center gap-2">
        
          {isSubmitting ?
        'Enviando...' :

        <>
              <span>Enviar Solicitud</span> <Send className="w-5 h-5" />
            </>
        }
        </button>
      </div>
    </form>;

  const renderSuccess = () =>
  <div className="text-center py-8">
      <div className="w-24 h-24 bg-[#FCEE02] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
        <CheckCircle className="w-12 h-12 text-[#251F1F]" />
      </div>
      <h2
      className="text-3xl sm:text-4xl font-black uppercase mb-4"
      style={{
        color: 'var(--text-primary)'
      }}>
      
        ¡Solicitud Completada!
      </h2>
      <p
      className="mb-2 text-lg"
      style={{
        color: 'var(--text-secondary)'
      }}>
      
        Hemos recibido su información correctamente.
      </p>
      <p
      className="mb-8"
      style={{
        color: 'var(--text-secondary)'
      }}>
      
        Se han enviado los detalles a{' '}
        <strong className="text-[#FB900D]">{tankFormData.email}</strong>.
        Nuestro equipo le contactará pronto.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
        <button
        onClick={() => generateTankPDF('download')}
        className="flex-1 px-6 py-4 border-2 border-[#FCEE02] hover:bg-[#FCEE02] hover:text-black transition-colors rounded-xl font-bold uppercase flex items-center justify-center gap-2"
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)'
        }}>
        
          <Download className="w-5 h-5" /> Descargar Orden de Tanque
        </button>
        {creditFormSubmitted &&
      <button
        onClick={() => generateCreditPDF()}
        className="flex-1 px-6 py-4 bg-[#251F1F] text-white hover:bg-[#333] transition-colors rounded-xl font-bold uppercase flex items-center justify-center gap-2">
        
            <FileText className="w-5 h-5" /> Descargar Solicitud Crédito
          </button>
      }
      </div>

      <button
      onClick={() => {
        setStep(1);
        setCreditFormSubmitted(false);
        setTankFormData({
          tankSize: '',
          nombre: '',
          apellido: '',
          telefono: '',
          provincia: '',
          municipio: '',
          direccion: '',
          email: ''
        });
        setSelectedSize('');
        setCreditFormData(initialCreditData);
        setSubmitError(null);
      }}
      className="mt-10 font-bold underline"
      style={{
        color: 'var(--text-muted)'
      }}>
      
        Realizar nueva solicitud
      </button>
    </div>;

  return (
    <section
      className="py-24 relative overflow-hidden border-y-4 border-[#FCEE02] transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-primary)'
      }}>
      
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#FB900D 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2
            className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6"
            style={{
              color: 'var(--text-primary)'
            }}>
            
            Solicitar{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB900D] to-[#EC2424]">
              Servicio
            </span>
          </h2>
          {renderStepIndicator()}
        </div>

        <div
          className="max-w-4xl mx-auto p-8 md:p-12 border-2 relative shadow-2xl transition-colors duration-300 rounded-2xl"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)'
          }}>
          
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FCEE02] via-[#FB900D] to-[#EC2424] rounded-t-2xl" />
          {step === 1 && renderTankForm()}
          {step === 2 && renderCreditForm()}
          {step === 3 && renderSuccess()}
        </div>
      </div>
    </section>);

}