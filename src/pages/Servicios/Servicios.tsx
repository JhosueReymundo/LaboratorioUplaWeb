import React, { useState, useEffect } from 'react';
import {CheckCircle2, Wrench } from 'lucide-react';
import './Servicios.scss';
import { serviciosService, type Servicio } from './services/serviciosService';

const Servicios: React.FC = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      setLoading(true);
      const data = await serviciosService.getServiciosPublicos();
      setServicios(data);
    } catch (err) {
      setError('Error al cargar los servicios. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="servicios">
        <div className="servicios__container">
          <div className="servicios__loading">
            <div className="servicios__spinner"></div>
            <p>Cargando servicios...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="servicios">
        <div className="servicios__container">
          <div className="servicios__error">
            <div className="servicios__error-icon">⚠️</div>
            <p>{error}</p>
            <button onClick={cargarServicios} className="servicios__retry-btn">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (servicios.length === 0) {
    return (
      <div className="servicios">
        <div className="servicios__container">
          <div className="servicios__empty">
            <Wrench size={64} />
            <p>No hay servicios disponibles en este momento</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="servicios">
      <div className="servicios__container">
        
        {/* Hero Section */}
        <div className="servicios__hero">
          <h1 className="servicios__title">Nuestros servicios</h1>
          <p className="servicios__intro">
            Realizamos una amplia gama de trabajos tecnológicos para garantizar 
            el funcionamiento óptimo de la infraestructura TI universitaria.
          </p>
        </div>

        {/* Grid de Servicios */}
        <div className="servicios__grid">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="servicios__card">
              
              {/* Icono */}
              <div className="servicios__icon-wrapper">
                <span className="servicios__icon">{servicio.icono}</span>
              </div>

              {/* Contenido */}
              <div className="servicios__content">
                <h3 className="servicios__card-title">{servicio.titulo}</h3>
                <p className="servicios__description">{servicio.descripcion}</p>

                {/* Detalles */}
                {servicio.detalles && servicio.detalles.length > 0 && (
                  <div className="servicios__details">
                    <h4 className="servicios__details-title">¿Qué incluye?</h4>
                    <ul className="servicios__list">
                      {servicio.detalles
                        .sort((a, b) => a.orden - b.orden)
                        .map((detalle) => (
                          <li key={detalle.id} className="servicios__list-item">
                            <CheckCircle2 size={18} className="servicios__check-icon" />
                            <span>{detalle.detalle}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>

              
            </div>
          ))}
        </div>

       

      </div>
    </div>
  );
};

export default Servicios;