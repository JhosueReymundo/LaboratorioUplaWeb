import React from 'react';
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
              
              {/* <button className="servicios__button">
                Solicitar servicio <ChevronRight size={20} />
              </button> */}
            </div>
          ))}
        </div>

        {/* <div className="servicios__cta">
          <h2 className="servicios__cta-title">¿Necesitas ayuda?</h2>
          <p className="servicios__cta-text">
            Nuestro equipo está disponible para atender tus solicitudes de soporte técnico
          </p>
          <div className="servicios__cta-buttons">
            <button className="servicios__cta-button servicios__cta-button--primary">
              Crear Ticket de Soporte
            </button>
            <button className="servicios__cta-button servicios__cta-button--secondary">
              Contactar por Email
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Servicios;