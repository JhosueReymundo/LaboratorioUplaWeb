
import React from 'react';
import './Home.scss';

const Home: React.FC = () => {
  const servicios = [
    {
      title: 'Mantenimiento de Laboratorios',
      description: 'Soporte técnico integral para todos los laboratorios de cómputo',
      icon: '💻'
    },
    {
      title: 'Soporte Administrativo',
      description: 'Asistencia técnica para oficinas administrativas',
      icon: '🏢'
    },
    {
      title: 'Restablecimiento de Contraseñas del correo Institucional',
      description: 'Restablecimiento de contraseña de correo institucional',
      icon: '🔐'
    },
    {
      title: 'Instalación de Software',
      description: 'Configuración de aplicaciones y herramientas',
      icon: '⚙️'
    }
  ];

  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-overlay"></div>
        <div className="home__hero-content">
          <h1 className="home__hero-title">Soporte TI</h1>
          <p className="home__hero-subtitle">Innovación y tecnología para tu universidad</p>
          <button className="home__hero-button">Conoce más</button>
        </div>
        <div className="home__hero-gradient"></div>
      </section>

      <section className="home__services">
        <div className="home__services-container">
          <h2 className="home__services-title">Nuestros Servicios</h2>
          <div className="home__services-grid">
            {servicios.map((servicio, idx) => (
              <div key={idx} className="home__service-card">
                <div className="home__service-icon">{servicio.icon}</div>
                <h3 className="home__service-title">{servicio.title}</h3>
                <p className="home__service-description">{servicio.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home__stats">
        <div className="home__stats-container">
          <div className="home__stat">
            <div className="home__stat-number">14 horas</div>
            <div className="home__stat-label">Soporte disponible</div>
          </div>
          <div className="home__stat">
            <div className="home__stat-number">9</div>
            <div className="home__stat-label">Laboratorios atendidos</div>
          </div>
          <div className="home__stat">
            <div className="home__stat-number">1000+</div>
            <div className="home__stat-label">Tickets resueltos</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;