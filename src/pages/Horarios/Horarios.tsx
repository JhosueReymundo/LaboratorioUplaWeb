

import React, { useState, useEffect } from 'react';
import { Download, Calendar, Clock, MapPin, Loader } from 'lucide-react';
import { horariosService, type Horario } from './services/horariosService';
import './Horarios.scss';

const Horarios: React.FC = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [labSeleccionado, setLabSeleccionado] = useState<number | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  useEffect(() => {
    cargarHorarios();
  }, []);

  const cargarHorarios = async () => {
    try {
      setLoading(true);
      const data = await horariosService.getHorariosVisibles();
      setHorarios(data);

      if (data.length > 0) {
        setLabSeleccionado(data[0].id);
      }
    } catch (err) {
      setError('Error al cargar los horarios. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeleccionarLab = (id: number) => {
    setLabSeleccionado(id);
    setLoadingPdf(true);
  };

  const handlePdfLoad = () => {
    setLoadingPdf(false);
  };

  const handleDescargar = async () => {
    if (!labSeleccionado) return;

    const horario = horarios.find(h => h.id === labSeleccionado);
    if (!horario) return;

    try {
      await horariosService.descargarHorario(horario.id, horario.nombre);
    } catch (err) {
      alert('Error al descargar el horario');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="horarios">
        <div className="horarios__container">
          <div className="horarios__loading">
            <div className="horarios__spinner"></div>
            <p>Cargando horarios...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="horarios">
        <div className="horarios__container">
          <div className="horarios__error">
            <div className="horarios__error-icon">⚠️</div>
            <p>{error}</p>
            <button onClick={cargarHorarios} className="horarios__retry-btn">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (horarios.length === 0) {
    return (
      <div className="horarios">
        <div className="horarios__container">
          <div className="horarios__empty-state">
            <Calendar size={64} />
            <p>No hay horarios disponibles en este momento</p>
          </div>
        </div>
      </div>
    );
  }

  const labActual = horarios.find(h => h.id === labSeleccionado);

  return (
    <div className="horarios">
      <div className="horarios__container">

        {/* Hero Section */}
        <div className="horarios__hero">
          <div className="horarios__hero-content">
            <h1 className="horarios__title">Horarios de Laboratorios</h1>
            <p className="horarios__subtitle">
              Selecciona un laboratorio para ver su horario de atención
            </p>
          </div>
        </div>

        {/* Botones de Laboratorios */}
        <div className="horarios__labs-grid">
          {horarios.map((horario) => (
            <button
              key={horario.id}
              onClick={() => handleSeleccionarLab(horario.id)}
              className={`horarios__lab-btn ${labSeleccionado === horario.id ? 'horarios__lab-btn--active' : ''}`}
            >
              {/* <div className="horarios__lab-icon">
                <MapPin size={20} />
              </div> */}
              <span className="horarios__lab-name">{horario.nombre}</span>
            </button>
          ))}
        </div>

        {/* Visor de Horario */}
        {labSeleccionado && labActual && labActual.archivoPdf && (
          <div className="horarios__viewer">

            {/* Header del Visor */}
            <div className="horarios__viewer-header">
              <div className="horarios__viewer-info">
                <Calendar size={24} />
                <div>
                  <h2 className="horarios__viewer-title">{labActual.nombre}</h2>
                  <p className="horarios__viewer-subtitle">Horario actualizado</p>
                </div>
              </div>

              <button 
                className="horarios__download-btn"
                onClick={handleDescargar}
              >
                <Download size={20} />
                Descargar Horario
              </button>
            </div>

            {/* PDF */}
            <div className="horarios__pdf-container">
              {loadingPdf && (
                <div className="horarios__pdf-loading">
                  <Loader className="horarios__pdf-spinner" size={48} />
                  <p>Cargando horario...</p>
                </div>
              )}

              <iframe
                src={horariosService.getPdfUrl(labActual.archivoPdf)}
                className="horarios__pdf-frame"
                title={`Horario ${labActual.nombre}`}
                onLoad={handlePdfLoad}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Horarios;
