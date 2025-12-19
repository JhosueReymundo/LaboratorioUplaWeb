import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, ChevronRight, AlertCircle } from 'lucide-react';
import './Encuestas.scss';
import { encuestasService, type Encuesta } from './services/encuestasService';

const Encuestas: React.FC = () => {
  const [encuestas, setEncuestas] = useState<Encuesta[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadEncuestas();
  }, []);

  const loadEncuestas = async () => {
    try {
      setLoading(true);
      const data = await encuestasService.getEncuestasPublicas();
      setEncuestas(data);
    } catch (error) {
      console.error('Error al cargar encuestas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRealizarEncuesta = (encuestaId: number) => {
    navigate(`/encuestas/${encuestaId}/formulario`);
  };

  const formatFecha = (fecha: string | null) => {
    if (!fecha) return 'Sin fecha';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getEstadoBadge = (estado: string) => {
    const badges = {
      activa: { text: 'Activa', class: 'badge-activa' },
      borrador: { text: 'Borrador', class: 'badge-borrador' },
      cerrada: { text: 'Cerrada', class: 'badge-cerrada' }
    };
    return badges[estado as keyof typeof badges] || badges.borrador;
  };

  if (loading) {
    return (
      <div className="encuestas-loading">
        <div className="spinner"></div>
        <p>Cargando encuestas...</p>
      </div>
    );
  }

  return (
    <div className="encuestas">
      <div className="encuestas__container">
        {/* Header */}
        <div className="encuestas__header">
          <div>
            <h1 className="encuestas__title">Encuestas disponibles</h1>
            <p className="encuestas__subtitle">
              Tu opinión es importante. Participa en nuestras encuestas y ayúdanos a mejorar.
            </p>
          </div>
          <div className="encuestas__stats">
            <div className="stat-card">
              <FileText size={32} />
              <div>
                <span className="stat-number">{encuestas.length}</span>
                <span className="stat-label">Encuestas disponibles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de encuestas */}
        <div className="encuestas__grid">
          {encuestas.map((encuesta) => {
            const badge = getEstadoBadge(encuesta.estado);
            
            return (
              <article key={encuesta.id} className="encuesta-card">
                <div className="encuesta-card__header">
                  <span className={`badge ${badge.class}`}>
                    {badge.text}
                  </span>
                </div>

                <div className="encuesta-card__content">
                  <h2 className="encuesta-card__titulo">{encuesta.nombre}</h2>
                  <p className="encuesta-card__descripcion">{encuesta.descripcion}</p>

                  <div className="encuesta-card__meta">
                    {encuesta.fecha_inicio && (
                      <div className="meta-item">
                        <Calendar size={16} />
                        <span>Inicio: {formatFecha(encuesta.fecha_inicio)}</span>
                      </div>
                    )}
                    {encuesta.fecha_fin && (
                      <div className="meta-item">
                        <Calendar size={16} />
                        <span>Fin: {formatFecha(encuesta.fecha_fin)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="encuesta-card__footer">
                  <button 
                    className="btn-realizar"
                    onClick={() => handleRealizarEncuesta(encuesta.id)}
                    disabled={encuesta.estado === 'cerrada'}
                  >
                    {encuesta.estado === 'cerrada' ? (
                      <>
                        <AlertCircle size={20} />
                        Encuesta cerrada
                      </>
                    ) : (
                      <>
                        Realizar encuesta
                        <ChevronRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty state */}
        {encuestas.length === 0 && (
          <div className="encuestas__empty">
            <FileText size={64} />
            <h3>No hay encuestas disponibles</h3>
            <p>No hay encuestas públicas en este momento. Vuelve más tarde.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Encuestas;