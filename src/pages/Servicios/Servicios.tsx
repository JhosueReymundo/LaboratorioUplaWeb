/* import React from 'react';
import { ChevronRight } from 'lucide-react';
import './Servicios.scss';

const Servicios: React.FC = () => {
  const servicios = [
    {
      title: 'Mantenimiento de Laboratorios',
      description: 'Soporte técnico integral para todos los laboratorios de cómputo, incluyendo actualizaciones de software, mantenimiento preventivo y correctivo de equipos.',
      icon: '💻',
      detalles: [
        'Actualización de software y sistemas operativos',
        'Mantenimiento preventivo de hardware',
        'Reparación y configuración de equipos',
        'Limpieza y optimización de sistemas'
      ]
    },
    {
      title: 'Soporte Administrativo',
      description: 'Asistencia técnica especializada para oficinas administrativas, garantizando el funcionamiento óptimo de sistemas y equipos.',
      icon: '🏢',
      detalles: [
        'Configuración de equipos de oficina',
        'Soporte de aplicaciones administrativas',
        'Respaldo y recuperación de datos',
        'Instalación de impresoras y periféricos'
      ]
    },
    {
      title: 'Restablecimiento de Contraseñas',
      description: 'Servicio rápido y seguro de recuperación de accesos a sistemas universitarios.',
      icon: '🔐',
      detalles: [
        'Activación de cuentas institucionales',
        'Reestrablecimiento de contraseña del correo instirucional'
      ]
    },
    {
      title: 'Instalación de Software',
      description: 'Configuración e instalación de aplicaciones y herramientas necesarias para el trabajo académico y administrativo.',
      icon: '⚙️',
      detalles: [
        'Software académico especializado',
        'Herramientas ofimáticas',
        'Aplicaciones de diseño y desarrollo',
        'Software de seguridad y antivirus'
      ]
    },
    {
      title: 'Soporte de Red',
      description: 'Mantenimiento y configuración de infraestructura de red, conectividad WiFi y cableado estructurado.',
      icon: '📡',
      detalles: [
        'Diagnóstico de problemas de conexión',
        'Instalación de puntos de acceso'
      ]
    },
    {
      title: 'Capacitación Tecnológica',
      description: 'Programas de formación en uso de tecnologías y herramientas digitales para personal y estudiantes.',
      icon: '📚',
      detalles: [
        'Talleres de herramientas ofimáticas',
        'Capacitación en nuevas tecnologías',
        'Sesiones personalizadas'
      ]
    }
  ];

  return (
    <div className="servicios">
      <div className="servicios__container">
        <h1 className="servicios__title">Nuestros Servicios</h1>
        <p className="servicios__intro">
          Realizamos una amplia gama de trabajo tecnológicos para garantizar 
          el funcionamiento óptimo de la infraestructura TI universitaria.
        </p>
        
        <div className="servicios__grid">
          {servicios.map((servicio, idx) => (
            <div key={idx} className="servicios__card">
              <div className="servicios__icon">{servicio.icon}</div>
              <h3 className="servicios__card-title">{servicio.title}</h3>
              <p className="servicios__description">{servicio.description}</p>
              
              <div className="servicios__details">
                <h4 className="servicios__details-title">¿Qué incluye?</h4>
                <ul className="servicios__list">
                  {servicio.detalles.map((detalle, i) => (
                    <li key={i} className="servicios__list-item">
                      <span className="servicios__bullet">✓</span>
                      {detalle}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicios; */
import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle2, Wrench } from 'lucide-react';
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