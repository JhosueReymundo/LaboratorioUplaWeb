import React from 'react';
import { ChevronRight } from 'lucide-react';
import './Productos.scss';

const Productos: React.FC = () => {
  const productos = [
    {
      nombre: 'Sistema de Gestión Académica',
      descripcion: 'Plataforma integral para la administración de procesos académicos, registro de notas, control de asistencia y gestión de horarios.',
      caracteristicas: [
        'Gestión de notas y calificaciones',
        'Control de asistencia automatizado',
        'Generación de reportes académicos',
        'Panel administrativo completo',
        'Módulo de registro de estudiantes'
      ],
      estado: 'Activo',
      version: 'v3.2.1',
      usuarios: '5,000+'
    },
    {
      nombre: 'Portal Estudiantil',
      descripcion: 'Acceso centralizado a todos los servicios universitarios para estudiantes, incluyendo matrícula, consulta de notas y trámites académicos.',
      caracteristicas: [
        'Matrícula en línea',
        'Consulta de notas en tiempo real',
        'Solicitud de certificados digitales',
        'Biblioteca virtual integrada',
        'Sistema de pagos en línea'
      ],
      estado: 'Activo',
      version: 'v2.8.0',
      usuarios: '8,500+'
    },
    {
      nombre: 'Sistema de Tickets',
      descripcion: 'Plataforma de gestión eficiente para solicitudes de soporte técnico con seguimiento en tiempo real y sistema de prioridades.',
      caracteristicas: [
        'Creación y gestión de tickets',
        'Seguimiento en tiempo real',
        'Sistema de prioridades inteligente',
        'Historial completo de solicitudes',
        'Notificaciones automáticas'
      ],
      estado: 'Activo',
      version: 'v1.5.3',
      usuarios: '1,200+'
    },
    {
      nombre: 'App Móvil Universidad',
      descripcion: 'Aplicación móvil multiplataforma que pone todos los servicios universitarios al alcance de tu dispositivo móvil.',
      caracteristicas: [
        'Notificaciones push en tiempo real',
        'Horarios y cronogramas personalizados',
        'Mapa interactivo del campus',
        'Noticias y comunicados universitarios',
        'Directorio de contactos'
      ],
      estado: 'En desarrollo',
      version: 'Beta v0.9.2',
      usuarios: '500+ (Beta)'
    },
    {
      nombre: 'Sistema de Biblioteca Digital',
      descripcion: 'Repositorio digital de recursos académicos con acceso remoto, búsqueda avanzada y gestión de préstamos virtuales.',
      caracteristicas: [
        'Catálogo digital completo',
        'Préstamos virtuales de libros',
        'Búsqueda avanzada por categorías',
        'Reservas de material en línea',
        'Acceso remoto 24/7'
      ],
      estado: 'Activo',
      version: 'v2.1.0',
      usuarios: '3,200+'
    },
    {
      nombre: 'Plataforma de Evaluaciones',
      descripcion: 'Sistema robusto para crear, administrar y calificar exámenes en línea de forma segura con análisis estadístico avanzado.',
      caracteristicas: [
        'Exámenes en línea seguros',
        'Banco de preguntas categorizado',
        'Calificación automática',
        'Análisis estadístico de resultados',
        'Detección de plagio'
      ],
      estado: 'En desarrollo',
      version: 'Alpha v0.5.1',
      usuarios: '200+ (Piloto)'
    }
  ];

  return (
    <div className="productos">
      <div className="productos__container">
        <h1 className="productos__title">Nuestros Productos</h1>
        <p className="productos__intro">
          Soluciones tecnológicas desarrolladas internamente para optimizar 
          los procesos académicos y administrativos de nuestra universidad.
        </p>
        
        <div className="productos__grid">
          {productos.map((producto, idx) => (
            <div key={idx} className="productos__card">
              <div className="productos__header">
                <div className="productos__icon"></div>
                <div className="productos__badges">
                  <span className={`productos__badge productos__badge--${producto.estado === 'Activo' ? 'active' : 'dev'}`}>
                    {producto.estado}
                  </span>
                  <span className="productos__version">{producto.version}</span>
                </div>
              </div>
              
              <h3 className="productos__name">{producto.nombre}</h3>
              <p className="productos__description">{producto.descripcion}</p>
              
              <div className="productos__stats">
                <div className="productos__stat">
                  <span className="productos__stat-icon">👥</span>
                  <span className="productos__stat-value">{producto.usuarios}</span>
                  <span className="productos__stat-label">Usuarios</span>
                </div>
              </div>
              
              <div className="productos__features">
                <h4 className="productos__features-title">Características principales:</h4>
                <ul className="productos__features-list">
                  {producto.caracteristicas.map((car, i) => (
                    <li key={i}>✓ {car}</li>
                  ))}
                </ul>
              </div>
              
              <button className="productos__button">
                Ver más detalles <ChevronRight size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="productos__cta">
          <h2 className="productos__cta-title">¿Tienes una idea?</h2>
          <p className="productos__cta-text">
            Si tienes una propuesta de proyecto o necesitas un desarrollo personalizado, 
            nuestro equipo está listo para ayudarte.
          </p>
          <button className="productos__cta-button">
            Proponer un Proyecto
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productos;