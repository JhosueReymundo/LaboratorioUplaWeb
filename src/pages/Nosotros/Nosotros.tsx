/* import React from 'react';
import './Nosotros.scss';

const Nosotros: React.FC = () => {
  const equipo = [
    { nombre: '', cargo: '', email: '' },
  ];

  return (
    <div className="nosotros">
      <div className="nosotros__container">
        <h1 className="nosotros__title">Sobre Nosotros</h1>
        <p className="nosotros__intro">
          Conoce más sobre nuestro departamento, misión, visión y el equipo que trabaja 
          día a día para brindarte el mejor soporte tecnológico.
        </p>
        
        <div className="nosotros__mission">
          <h2 className="nosotros__subtitle">Nuestra Misión</h2>
          <p className="nosotros__text">
            Proporcionar soporte tecnológico de excelencia que impulse la innovación educativa 
            y facilite el desarrollo académico de nuestra comunidad universitaria, garantizando 
            servicios de calidad, eficiencia y disponibilidad continua. Nos comprometemos a ser 
            un pilar fundamental en la transformación digital de la institución.
          </p>
        </div>

        <div className="nosotros__vision">
          <h2 className="nosotros__subtitle">Nuestra Visión</h2>
          <p className="nosotros__text">
            Ser el referente en soluciones tecnológicas educativas, estableciendo estándares 
            de calidad en el servicio y la innovación continua, formando parte integral del 
            éxito académico y administrativo de nuestra institución. Aspiramos a liderar la 
            implementación de tecnologías emergentes que potencien el aprendizaje y la gestión universitaria.
          </p>
        </div>

        <div className="nosotros__values">
          <h2 className="nosotros__subtitle">Nuestros Valores</h2>
          <div className="nosotros__values-grid">
            <div className="nosotros__value-card">
              <div className="nosotros__value-icon">🎯</div>
              <h3 className="nosotros__value-title">Excelencia</h3>
              <p className="nosotros__value-text">
                Buscamos la perfección en cada servicio que brindamos
              </p>
            </div>
            <div className="nosotros__value-card">
              <div className="nosotros__value-icon">🤝</div>
              <h3 className="nosotros__value-title">Compromiso</h3>
              <p className="nosotros__value-text">
                Dedicados al éxito de nuestra comunidad universitaria
              </p>
            </div>
            <div className="nosotros__value-card">
              <div className="nosotros__value-icon">💡</div>
              <h3 className="nosotros__value-title">Innovación</h3>
              <p className="nosotros__value-text">
                Implementamos soluciones tecnológicas de vanguardia
              </p>
            </div>
            <div className="nosotros__value-card">
              <div className="nosotros__value-icon">🔒</div>
              <h3 className="nosotros__value-title">Seguridad</h3>
              <p className="nosotros__value-text">
                Protegemos la información y recursos institucionales
              </p>
            </div>
          </div>
        </div>

        <div className="nosotros__team">
          <h2 className="nosotros__subtitle">Nuestro Equipo</h2>
          <p className="nosotros__team-intro">
            Conoce a los profesionales que hacen posible nuestros servicios
          </p>
          <div className="nosotros__team-grid">
            {equipo.map((miembro, idx) => (
              <div key={idx} className="nosotros__member">
                <div className="nosotros__member-avatar">
                  <span className="nosotros__member-initial">
                    {miembro.nombre.charAt(0)}
                  </span>
                </div>
                <h3 className="nosotros__member-name">{miembro.nombre}</h3>
                <p className="nosotros__member-role">{miembro.cargo}</p>
                <p className="nosotros__member-email">{miembro.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros; */

import React, { useState, useEffect } from 'react';
import './Nosotros.scss';
import nosotrosService, { type Equipo, type Mision, type Valor, type Vision } from './services/nosotrosService';
/* import nosotrosService, { Equipo, Mision, Vision, Valor } from './services/nosotrosService'; */

const Nosotros: React.FC = () => {
  const [mision, setMision] = useState<Mision | null>(null);
  const [vision, setVision] = useState<Vision | null>(null);
  const [valores, setValores] = useState<Valor[]>([]);
  const [equipo, setEquipo] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [misionData, visionData, valoresData, equipoData] = await Promise.all([
        nosotrosService.getMisionActiva(),
        nosotrosService.getVisionActiva(),
        nosotrosService.getValoresVisibles(),
        nosotrosService.getEquipoVisible(),
      ]);

      setMision(misionData);
      setVision(visionData);
      setValores(valoresData);
      setEquipo(equipoData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="nosotros">
        <div className="nosotros__container">
          <div className="nosotros__loading">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="nosotros">
      <div className="nosotros__container">
        <h1 className="nosotros__title">Sobre Nosotros</h1>
        <p className="nosotros__intro">
          Conoce más sobre nuestro departamento, misión, visión y el equipo que trabaja 
          día a día para brindarte el mejor soporte tecnológico.
        </p>
        
        {mision && (
          <div className="nosotros__mission">
            <h2 className="nosotros__subtitle">Nuestra Misión</h2>
            <p className="nosotros__text">{mision.contenido}</p>
          </div>
        )}

        {vision && (
          <div className="nosotros__vision">
            <h2 className="nosotros__subtitle">Nuestra Visión</h2>
            <p className="nosotros__text">{vision.contenido}</p>
          </div>
        )}

        {valores.length > 0 && (
          <div className="nosotros__values">
            <h2 className="nosotros__subtitle">Nuestros Valores</h2>
            <div className="nosotros__values-grid">
              {valores.map((valor) => (
                <div key={valor.id} className="nosotros__value-card">
                  <div className="nosotros__value-icon">{valor.icono}</div>
                  <h3 className="nosotros__value-title">{valor.titulo}</h3>
                  <p className="nosotros__value-text">{valor.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {equipo.length > 0 && (
          <div className="nosotros__team">
            <h2 className="nosotros__subtitle">Nuestro Equipo</h2>
            <p className="nosotros__team-intro">
              Conoce a los profesionales que hacen posible nuestros servicios
            </p>
            <div className="nosotros__team-grid">
              {equipo.map((miembro) => (
                <div key={miembro.id} className="nosotros__member">
                  <div className="nosotros__member-avatar">
                    <span className="nosotros__member-initial">
                      {miembro.nombre.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="nosotros__member-name">{miembro.nombre}</h3>
                  <p className="nosotros__member-role">{miembro.cargo}</p>
                  <p className="nosotros__member-email">{miembro.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nosotros;