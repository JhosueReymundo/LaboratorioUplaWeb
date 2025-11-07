import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { routes } from '../../routes/routes';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          Laboratorio de Cómputo
        </Link>
        
        <div className="navbar__desktop">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`navbar__link ${isActive(route.path) ? 'navbar__link--active' : ''}`}
            >
              {route.label}
            </Link>
          ))}
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="navbar__mobile-toggle"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="navbar__mobile">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="navbar__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {route.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;