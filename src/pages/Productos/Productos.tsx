import React from 'react';
import { ChevronRight } from 'lucide-react';
import './Productos.scss';

const Productos: React.FC = () => {
  const productos = [
    {
      nombre: 'Sistema de Gestión de Hoarios de Laboratortio',
      descripcion: 'Sistema de gestion de horarios de laboratorio de computo de la facultad de Ingeniería',
      caracteristicas: [
        'Gestión horarios',
        'Generación de reportes del uso de laboratorio',
        'Panel administrativo completo'
      ],
      estado: 'Activo',
      version: 'v3.2.1',
      usuarios: ''
    },
    /* {
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
      usuarios: ''
    } */
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
              
              {/* <button className="productos__button">
                Ver más detalles <ChevronRight size={20} />
              </button> */}
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