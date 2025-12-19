import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__section">
            <h3 className="footer__title">Oficina de Infraestructura Tecnológica y Desarrollo de Software</h3>
            <p className="footer__text">Tecnología al servicio de la educación</p>
          </div>
          <div className="footer__section">
            <h3 className="footer__title">Contacto</h3>
            <p className="footer__text">Email: oitdes@upla.edu.pe</p>
            <p className="footer__text">Tel: 965053584</p>
          </div>
          <div className="footer__section">
            <h3 className="footer__title">Horario de atención</h3>
            <p className="footer__text">Lunes - Viernes: 7:45 AM - 21:15 PM</p>
           {/*  <p className="footer__text">Sábado: 9:00 AM - 2:00 PM</p> */}
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2025 Oficina de Infraestructura Tecnológica y Desarrollo de Software. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;