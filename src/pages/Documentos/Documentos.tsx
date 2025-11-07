/* import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import './Documentos.scss';

const Documentos: React.FC = () => {
  const documentos = [
    {
      nombre: 'Reglamento Interno',
      descripcion: 'Normativa interna del departamento de TI',
      fecha: '2025'
    },
    {
      nombre: 'Manual de Procedimientos',
      descripcion: 'Guía de procesos y procedimientos técnicos',
      fecha: '2025'
    },
    {
      nombre: 'Políticas de Uso',
      descripcion: 'Políticas de uso de recursos tecnológicos',
      fecha: '2025'
    },
    {
      nombre: 'Normas de Seguridad',
      descripcion: 'Normas de seguridad informática',
      fecha: '2025'
    },
    {
      nombre: 'Código de Ética',
      descripcion: 'Código de ética para el personal TI',
      fecha: '2025'
    },
    {
      nombre: 'Protocolos de Atención',
      descripcion: 'Protocolos para atención de tickets y soporte',
      fecha: '2025'
    }
  ];

  return (
    <div className="documentos">
      <div className="documentos__container">
        <h1 className="documentos__title">Documentos de Gestión</h1>
        <p className="documentos__subtitle">
          Accede a los documentos oficiales y normativas del departamento de Soporte TI
        </p>
        
        <div className="documentos__grid">
          {documentos.map((doc, idx) => (
            <div key={idx} className="documentos__card">
              <div className="documentos__card-content">
                <FileText className="documentos__icon" size={32} />
                <div className="documentos__info">
                  <span className="documentos__card-title">{doc.nombre}</span>
                  <span className="documentos__description">{doc.descripcion}</span>
                  <span className="documentos__fecha">Actualizado: {doc.fecha}</span>
                </div>
              </div>
              <ChevronRight className="documentos__arrow" size={24} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documentos; */

import React from 'react';
import { FileText, ChevronRight, Download } from 'lucide-react';
import './Documentos.scss';

const Documentos: React.FC = () => {
  const documentos = [
    {
      nombre: 'Reglamento Interno',
      descripcion: 'Normativa interna del departamento de TI',
      fecha: '2025',
      archivo: '/assets/mycv.pdf'
    },
    {
      nombre: 'Manual de Procedimientos',
      descripcion: 'Guía de procesos y procedimientos técnicos',
      fecha: '2025',
      archivo: null
    },
    {
      nombre: 'Políticas de Uso',
      descripcion: 'Políticas de uso de recursos tecnológicos',
      fecha: '2025',
      archivo: null
    },
    {
      nombre: 'Normas de Seguridad',
      descripcion: 'Normas de seguridad informática',
      fecha: '2025',
      archivo: null
    },
    {
      nombre: 'Código de Ética',
      descripcion: 'Código de ética para el personal TI',
      fecha: '2025',
      archivo: null
    },
    {
      nombre: 'Protocolos de Atención',
      descripcion: 'Protocolos para atención de tickets y soporte',
      fecha: '2025',
      archivo: null
    }
  ];

  const handleVerDocumento = (archivo: string | null) => {
    if (archivo) {
      window.open(archivo, '_blank');
    } else {
      alert('Documento no disponible por el momento');
    }
  };

  const handleDescargar = (archivo: string | null, nombre: string) => {
    if (archivo) {
      const link = document.createElement('a');
      link.href = archivo;
      link.download = `${nombre}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Documento no disponible para descarga');
    }
  };

  return (
    <div className="documentos">
      <div className="documentos__container">
        <h1 className="documentos__title">Documentos de Gestión</h1>
        <p className="documentos__subtitle">
          Accede a los documentos oficiales y normativas del departamento de Soporte TI
        </p>
        
        <div className="documentos__grid">
          {documentos.map((doc, idx) => (
            <div key={idx} className="documentos__card">
              <div className="documentos__card-content">
                <FileText className="documentos__icon" size={32} />
                <div className="documentos__info">
                  <span className="documentos__card-title">{doc.nombre}</span>
                  <span className="documentos__description">{doc.descripcion}</span>
                  <span className="documentos__fecha">Actualizado: {doc.fecha}</span>
                </div>
              </div>
              <div className="documentos__actions">
                <button 
                  className="documentos__btn documentos__btn--view"
                  onClick={() => handleVerDocumento(doc.archivo)}
                  title="Ver documento"
                >
                  <ChevronRight size={20} />
                  Ver
                </button>
                {doc.archivo && (
                  <button 
                    className="documentos__btn documentos__btn--download"
                    onClick={() => handleDescargar(doc.archivo, doc.nombre)}
                    title="Descargar documento"
                  >
                    <Download size={20} />
                    Descargar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documentos;