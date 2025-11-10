/* import React, { useState } from 'react';
import { Download } from 'lucide-react';
import './Horarios.scss';

const Horarios: React.FC = () => {
  const [labSeleccionado, setLabSeleccionado] = useState<number | null>(null);

  const laboratorios = [
    { id: 1, nombre: 'Laboratorio 1', archivo: '/assets/horarios/lab1.pdf' },
    { id: 2, nombre: 'Laboratorio 2', archivo: '/assets/horarios/lab2.pdf' },
    { id: 3, nombre: 'Laboratorio 3', archivo: '/assets/horarios/lab3.pdf' },
    { id: 4, nombre: 'Laboratorio 4', archivo: '/assets/horarios/lab4.pdf' },
    { id: 5, nombre: 'Laboratorio 5', archivo: '/assets/horarios/lab5.pdf' },
    { id: 6, nombre: 'Laboratorio 6', archivo: '/assets/horarios/lab6.pdf' },
    { id: 7, nombre: 'Laboratorio 7', archivo: '/assets/horarios/lab1.pdf' },
    { id: 8, nombre: 'Laboratorio 8', archivo: '/assets/horarios/lab8.pdf' },
    { id: 9, nombre: 'Laboratorio de Redes', archivo: '/assets/horarios/LabRedes.pdf' }
  ];

  const handleSeleccionarLab = (id: number) => {
    setLabSeleccionado(id);
  };

  const handleDescargar = () => {
    if (labSeleccionado) {
      const lab = laboratorios.find(l => l.id === labSeleccionado);
      if (lab) {
        const link = document.createElement('a');
        link.href = lab.archivo;
        link.download = `Horario-${lab.nombre}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const labActual = laboratorios.find(l => l.id === labSeleccionado);

  return (
    <div className="horarios">
      <div className="horarios__container">
        <h1 className="horarios__title">Horarios de Laboratorios</h1>
        <p className="horarios__subtitle">
          Selecciona un laboratorio para ver su horario de atención
        </p>

        
        <div className="horarios__buttons">
          {laboratorios.map((lab) => (
            <button
              key={lab.id}
              onClick={() => handleSeleccionarLab(lab.id)}
              className={`horarios__lab-btn ${labSeleccionado === lab.id ? 'horarios__lab-btn--active' : ''}`}
            >
              {lab.nombre}
            </button>
          ))}
        </div>

        {labSeleccionado && labActual && (
          <div className="horarios__viewer">
            <div className="horarios__viewer-header">
              <h2 className="horarios__viewer-title">
                {labActual.nombre}
              </h2>
              <button 
                className="horarios__download-btn"
                onClick={handleDescargar}
              >
                <Download size={20} />
                Descargar Horario
              </button>
            </div>

            <div className="horarios__pdf-container">
              <iframe
                src={labActual.archivo}
                className="horarios__pdf-frame"
                title={`Horario ${labActual.nombre}`}
              />
            </div>
          </div>
        )}

     
        {!labSeleccionado && (
          <div className="horarios__empty">
            <div className="horarios__empty-icon">📅</div>
            <h3 className="horarios__empty-title">Selecciona un laboratorio</h3>
            <p className="horarios__empty-text">
              Haz click en cualquiera de los botones de arriba para ver el horario del laboratorio
            </p>
          </div>
        )}

       
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
      </div>
    </div>
  );
};

export default Horarios;
 */

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import './Horarios.scss';

const Horarios: React.FC = () => {
  const [labSeleccionado, setLabSeleccionado] = useState<number | null>(null);

  const laboratorios = [
    { id: 1, nombre: 'Laboratorio 1', archivo: '/assets/horarios/lab1.pdf' },
    { id: 2, nombre: 'Laboratorio 2', archivo: '/assets/horarios/lab2.pdf' },
    { id: 3, nombre: 'Laboratorio 3', archivo: '/assets/horarios/lab3.pdf' },
    { id: 4, nombre: 'Laboratorio 4', archivo: '/assets/horarios/lab4.pdf' },
    { id: 5, nombre: 'Laboratorio 5', archivo: '/assets/horarios/lab5.pdf' },
    { id: 6, nombre: 'Laboratorio 6', archivo: '/assets/horarios/lab6.pdf' },
    { id: 7, nombre: 'Laboratorio 7', archivo: '/assets/horarios/lab1.pdf' },
    { id: 8, nombre: 'Laboratorio 8', archivo: '/assets/horarios/lab8.pdf' },
    { id: 9, nombre: 'Laboratorio de Redes', archivo: '/assets/horarios/LabRedes.pdf' }
  ];

  const handleSeleccionarLab = (id: number) => {
    setLabSeleccionado(id);
  };

  const handleDescargar = () => {
    if (labSeleccionado) {
      const lab = laboratorios.find(l => l.id === labSeleccionado);
      if (lab) {
        const link = document.createElement('a');
        link.href = lab.archivo;
        link.download = `Horario-${lab.nombre}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const labActual = laboratorios.find(l => l.id === labSeleccionado);

  return (
    <div className="horarios">
      <div className="horarios__container">
        <h1 className="horarios__title">Horarios de Laboratorios</h1>
        <p className="horarios__subtitle">
          Selecciona un laboratorio para ver su horario de atención
        </p>

       
        <div className="horarios__buttons">
          {laboratorios.map((lab) => (
            <button
              key={lab.id}
              onClick={() => handleSeleccionarLab(lab.id)}
              className={`horarios__lab-btn ${labSeleccionado === lab.id ? 'horarios__lab-btn--active' : ''}`}
            >
              {lab.nombre}
            </button>
          ))}
        </div>

     
        {labSeleccionado && labActual && (
          <div className="horarios__viewer">
            <div className="horarios__viewer-header">
              <h2 className="horarios__viewer-title">
                {labActual.nombre}
              </h2>
              <button 
                className="horarios__download-btn"
                onClick={handleDescargar}
              >
                <Download size={20} />
                Descargar Horario
              </button>
            </div>

            <div className="horarios__pdf-container">
              <iframe
                src={`${labActual.archivo}#toolbar=0&navpanes=0&scrollbar=0`}
                className="horarios__pdf-frame"
                title={`Horario ${labActual.nombre}`}
              />
            </div>
          </div>
        )}

        {!labSeleccionado && (
          <div className="horarios__empty">
            <div className="horarios__empty-icon">📅</div>
            <h3 className="horarios__empty-title">Selecciona un laboratorio</h3>
            <p className="horarios__empty-text">
              Haz click en cualquiera de los botones de arriba para ver el horario del laboratorio
            </p>
          </div>
        )}

       {/* 
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
        </div> */}
      </div>
    </div>
  );
};

export default Horarios; 
