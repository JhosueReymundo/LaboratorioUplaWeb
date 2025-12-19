/* import React from 'react';
import { FileText, ChevronRight, Download } from 'lucide-react';
import './Documentos.scss';

const Documentos: React.FC = () => {
  const documentos = [
    {
      nombre: 'Reglamento Interno',
      descripcion: 'Normativa interna del departamento de TI',
      fecha: '2025',
      archivo: '/assets/reglamentoInterno.pdf'
    },
    {
      nombre: 'Manual de Procedimientos',
      descripcion: 'Guía de procesos y procedimientos técnicos',
      fecha: '2025',
      archivo: '/assets/mycv.pdf'
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
          Accede a los documentos oficiales y normativas de la Oficina de Infraestructura Tecnológica y Desarrollo de Software
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

export default Documentos; */

import React, { useState, useEffect } from 'react';
import { FileText, ChevronRight, Download, ChevronDown, ChevronUp, X, Loader } from 'lucide-react';
/* import { documentosService, DocumentoGestion } from '../../services/documentosService'; */

import { documentosService, type DocumentoGestion } from './services/documentosService';
import './Documentos.scss';
const Documentos: React.FC = () => {
  const [documentos, setDocumentos] = useState<DocumentoGestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [documentoExpandido, setDocumentoExpandido] = useState<number | null>(null);
  const [loadingPdf, setLoadingPdf] = useState<number | null>(null);

  useEffect(() => {
    cargarDocumentos();
  }, []);

  const cargarDocumentos = async () => {
    try {
      setLoading(true);
      const data = await documentosService.getDocumentosActivos();
      setDocumentos(data);
    } catch (err) {
      setError('Error al cargar los documentos. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisor = (documentoId: number) => {
    if (documentoExpandido === documentoId) {
      setDocumentoExpandido(null);
    } else {
      setDocumentoExpandido(documentoId);
      setLoadingPdf(documentoId);
    }
  };

  const handlePdfLoad = () => {
    setLoadingPdf(null);
  };

  const handleDescargar = async (documentoId: number, nombreDoc: string) => {
    try {
      await documentosService.descargarDocumento(documentoId, nombreDoc);
    } catch (err) {
      alert('Error al descargar el documento');
      console.error(err);
    }
  };

  const handleVerNuevaPestana = (archivoPdf: string) => {
    const url = documentosService.getPdfUrl(archivoPdf);
    window.open(url, '_blank');
  };

  const getAñoActualizacion = (fecha: Date): string => {
    return new Date(fecha).getFullYear().toString();
  };

  if (loading) {
    return (
      <div className="documentos">
        <div className="documentos__container">
          <div className="documentos__loading">
            <div className="documentos__spinner"></div>
            <p>Cargando documentos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="documentos">
        <div className="documentos__container">
          <div className="documentos__error">
            <div className="documentos__error-icon">⚠️</div>
            <p>{error}</p>
            <button onClick={cargarDocumentos} className="documentos__retry-btn">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (documentos.length === 0) {
    return (
      <div className="documentos">
        <div className="documentos__container">
          <div className="documentos__empty">
            <FileText size={64} />
            <p>No hay documentos disponibles en este momento</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="documentos">
      <div className="documentos__container">
        
        {/* Header */}
        <div className="documentos__header">
          <h1 className="documentos__title">Documentos de gestión</h1>
          <p className="documentos__subtitle">
            Accede a los documentos oficiales y normativas de la Oficina de Infraestructura 
            Tecnológica y Desarrollo de Software
          </p>
        </div>

        {/* Lista de Documentos */}
        <div className="documentos__grid">
          {documentos.map((doc) => (
            <div key={doc.id} className="documentos__card-wrapper">
              
              {/* Card Principal */}
              <div className="documentos__card">
                <div className="documentos__card-content">
                  <FileText className="documentos__icon" size={32} />
                  
                  <div className="documentos__info">
                    <span className="documentos__card-title">{doc.nombreDoc}</span>
                    <span className="documentos__description">{doc.descripcion}</span>
                    <span className="documentos__fecha">
                      Actualizado: {getAñoActualizacion(doc.updatedAt)}
                    </span>
                  </div>
                </div>

                <div className="documentos__actions">
                  {doc.archivoPdf ? (
                    <>
                      <button 
                        className="documentos__btn documentos__btn--view"
                        onClick={() => handleToggleVisor(doc.id)}
                        title={documentoExpandido === doc.id ? "Ocultar visor" : "Ver documento"}
                      >
                        {documentoExpandido === doc.id ? (
                          <>
                            <ChevronUp size={20} />
                            Ocultar
                          </>
                        ) : (
                          <>
                            <ChevronDown size={20} />
                            Ver
                          </>
                        )}
                      </button>

                      <button 
                        className="documentos__btn documentos__btn--download"
                        onClick={() => handleDescargar(doc.id, doc.nombreDoc)}
                        title="Descargar documento"
                      >
                        <Download size={20} />
                        Descargar
                      </button>
                    </>
                  ) : (
                    <span className="documentos__no-disponible">
                      Documento no disponible
                    </span>
                  )}
                </div>
              </div>

              {/* Visor de PDF Expandible */}
              {documentoExpandido === doc.id && doc.archivoPdf && (
                <div className="documentos__visor">
                  <div className="documentos__visor-header">
                    <span className="documentos__visor-title">
                      Vista previa: {doc.nombreDoc}
                    </span>
                    <button 
                      className="documentos__visor-close"
                      onClick={() => setDocumentoExpandido(null)}
                      title="Cerrar visor"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="documentos__visor-content">
                    {loadingPdf === doc.id && (
                      <div className="documentos__visor-loading">
                        <Loader className="documentos__visor-spinner" size={40} />
                        <p>Cargando PDF...</p>
                      </div>
                    )}

                    <iframe
                      src={documentosService.getPdfUrl(doc.archivoPdf)}
                      className="documentos__visor-iframe"
                      title={doc.nombreDoc}
                      onLoad={handlePdfLoad}
                    />
                  </div>

                  <div className="documentos__visor-footer">
                    <button 
                      className="documentos__visor-btn"
                      onClick={() => handleVerNuevaPestana(doc.archivoPdf!)}
                    >
                      <ChevronRight size={18} />
                      Abrir en nueva pestaña
                    </button>
                    <button 
                      className="documentos__visor-btn"
                      onClick={() => handleDescargar(doc.id, doc.nombreDoc)}
                    >
                      <Download size={18} />
                      Descargar PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Documentos;