import React from 'react';
import './Horarios.scss';

const Horarios: React.FC = () => {
  const laboratorios = [
    { 
      nombre: 'Lab 1 - Computación Básica', 
      semana: '8:00 AM - 8:00 PM', 
      sabado: '9:00 AM - 2:00 PM',
      capacidad: '30 equipos',
      ubicacion: 'Edificio A - Piso 2'
    },
    { 
      nombre: 'Lab 2 - Redes y Comunicaciones', 
      semana: '8:00 AM - 8:00 PM', 
      sabado: '9:00 AM - 2:00 PM',
      capacidad: '25 equipos',
      ubicacion: 'Edificio A - Piso 3'
    },
    { 
      nombre: 'Lab 3 - Desarrollo de Software', 
      semana: '8:00 AM - 9:00 PM', 
      sabado: '9:00 AM - 3:00 PM',
      capacidad: '35 equipos',
      ubicacion: 'Edificio B - Piso 1'
    },
    { 
      nombre: 'Lab 4 - Multimedia y Diseño', 
      semana: '8:00 AM - 8:00 PM', 
      sabado: 'Cerrado',
      capacidad: '20 equipos',
      ubicacion: 'Edificio B - Piso 2'
    },
    { 
      nombre: 'Lab 5 - Inteligencia Artificial', 
      semana: '9:00 AM - 7:00 PM', 
      sabado: '9:00 AM - 1:00 PM',
      capacidad: '28 equipos',
      ubicacion: 'Edificio C - Piso 1'
    },
    { 
      nombre: 'Lab 6 - Ciberseguridad', 
      semana: '8:00 AM - 8:00 PM', 
      sabado: '9:00 AM - 2:00 PM',
      capacidad: '22 equipos',
      ubicacion: 'Edificio C - Piso 2'
    }
  ];

  return (
    <div className="horarios">
      <div className="horarios__container">
        <h1 className="horarios__title">Horarios de Laboratorios</h1>
        <p className="horarios__subtitle">
          Consulta los horarios de atención de nuestros laboratorios de cómputo. 
          Todos los laboratorios están cerrados los domingos.
        </p>
        
        <div className="horarios__table-wrapper">
          <table className="horarios__table">
            <thead>
              <tr>
                <th>Laboratorio</th>
                <th>Lunes - Viernes</th>
                <th>Sábado</th>
                <th>Capacidad</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {laboratorios.map((lab, idx) => (
                <tr key={idx}>
                  <td className="horarios__lab-name">{lab.nombre}</td>
                  <td>{lab.semana}</td>
                  <td className={lab.sabado === 'Cerrado' ? 'horarios__cerrado' : ''}>
                    {lab.sabado}
                  </td>
                  <td>{lab.capacidad}</td>
                  <td>{lab.ubicacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="horarios__info">
          <div className="horarios__info-card horarios__info-card--primary">
            <div className="horarios__info-icon">⏰</div>
            <h3 className="horarios__info-title">Horario de Soporte TI</h3>
            <div className="horarios__info-content">
              <p className="horarios__info-text">
                <strong>Lunes a Viernes:</strong> 8:00 AM - 8:00 PM
              </p>
              <p className="horarios__info-text">
                <strong>Sábados:</strong> 9:00 AM - 2:00 PM
              </p>
              <p className="horarios__info-text">
                <strong>Domingos:</strong> Cerrado
              </p>
            </div>
          </div>
          
          <div className="horarios__info-card horarios__info-card--secondary">
            <div className="horarios__info-icon">📞</div>
            <h3 className="horarios__info-title">Contacto de Emergencia</h3>
            <div className="horarios__info-content">
              <p className="horarios__info-text">
                Para asistencia urgente fuera de horario
              </p>
              <p className="horarios__info-text">
                <strong>Tel:</strong> (123) 456-7890 Ext. 100
              </p>
              <p className="horarios__info-text">
                <strong>Email:</strong> soporte@universidad.edu
              </p>
            </div>
          </div>

          <div className="horarios__info-card horarios__info-card--accent">
            <div className="horarios__info-icon">📋</div>
            <h3 className="horarios__info-title">Normas de Uso</h3>
            <div className="horarios__info-content">
              <p className="horarios__info-text">
                • Respetar los horarios establecidos
              </p>
              <p className="horarios__info-text">
                • Mantener el orden y limpieza
              </p>
              <p className="horarios__info-text">
                • Uso responsable de equipos
              </p>
            </div>
          </div>
        </div>

        <div className="horarios__notice">
          <h3 className="horarios__notice-title">⚠️ Avisos Importantes</h3>
          <ul className="horarios__notice-list">
            <li>Durante el período de exámenes finales, algunos laboratorios pueden extender su horario.</li>
            <li>Los horarios pueden variar en días festivos y períodos vacacionales.</li>
            <li>Se recomienda consultar la disponibilidad antes de acudir al laboratorio.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Horarios;