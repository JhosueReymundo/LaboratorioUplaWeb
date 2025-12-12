/* import React, { useState, useEffect } from 'react';
import { X, Calendar, User, GraduationCap, Building2, Eye, FileText, ChevronRight } from 'lucide-react';
import './Home.scss';
import { comunicadosService, type Comunicado } from '../Comunicados/services/comunicadosService';

const Home: React.FC = () => {
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [ultimoComunicado, setUltimoComunicado] = useState<Comunicado | null>(null);
  const [loadingComunicado, setLoadingComunicado] = useState(true);

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

  useEffect(() => {
    cargarUltimoComunicado();
  }, []);

  const cargarUltimoComunicado = async () => {
    try {
      const comunicados = await comunicadosService.getPublicados();
      if (comunicados.length > 0) {
        setUltimoComunicado(comunicados[0]); // El más reciente
              
      setTimeout(() => {
        setMostrarNotificacion(true);
      }, 1000);

      }
    } catch (error) {
      console.error('Error al cargar comunicado:', error);
    } finally {
      setLoadingComunicado(false);
    }
  };

  const cerrarNotificacion = () => {
    setMostrarNotificacion(false);
    // Guardar que ya se vio hoy
    const hoy = new Date().toDateString();
    localStorage.setItem('ultimaVistaNotificacion', hoy);
  };

  const irAComunicados = () => {
    cerrarNotificacion();
    // Navegar a la página de comunicados
    window.location.href = '/comunicados';
  };

  const formatFecha = (fecha: string | null) => {
    if (!fecha) return 'Sin fecha';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getContenidoPreview = (contenido: string) => {
    const maxLength = 200;
    if (contenido.length <= maxLength) return contenido;
    return contenido.substring(0, maxLength) + '...';
  };

  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-overlay"></div>
        <div className="home__hero-content">
          <h1 className="home__hero-title">OFICINA DE INFRAESTRUCTURA TECNOLÓGICA Y DESARROLLO DE SOFTWARE</h1>
          <p className="home__hero-subtitle">(En Evaluación)</p>
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
            <div className="home__stat-number">9</div>
            <div className="home__stat-label">Laboratorios</div>
          </div>
        </div>
      </section>

      {mostrarNotificacion && ultimoComunicado && (
        <div className="notificacion-overlay" onClick={cerrarNotificacion}>
          <div className="notificacion-modal" onClick={(e) => e.stopPropagation()}>
           
            <button className="notificacion-close" onClick={cerrarNotificacion}>
              <X size={24} />
            </button>

            
            <div className="notificacion-badge">
              <span className="badge-pulse"></span>
              NUEVO COMUNICADO
            </div>

            {ultimoComunicado.imagenPortada && (
              <div className="notificacion-imagen">
                <img 
                  src={comunicadosService.getImagenUrl(ultimoComunicado.imagenPortada) || ''} 
                  alt={ultimoComunicado.titulo}
                />
              </div>
            )}

            <div className="notificacion-content">
              <h2 className="notificacion-titulo">{ultimoComunicado.titulo}</h2>

              <div className="notificacion-meta">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{formatFecha(ultimoComunicado.fechaPublicacion)}</span>
                </div>
                <div className="meta-item">
                  <Eye size={16} />
                  <span>{ultimoComunicado.vistas} vistas</span>
                </div>
              </div>

              <div className="notificacion-autor">
                <div className="autor-avatar">
                  <User size={20} />
                </div>
                <div className="autor-info">
                  <span className="autor-nombre">
                    {ultimoComunicado.autor.nombre} {ultimoComunicado.autor.apellido}
                  </span>
                  <div className="autor-detalles">
                    {ultimoComunicado.autor.escuela && (
                      <span className="detalle">
                        <GraduationCap size={14} />
                        {ultimoComunicado.autor.escuela.nombreEscuela}
                      </span>
                    )}
                    {ultimoComunicado.autor.dependencia && (
                      <span className="detalle">
                        <Building2 size={14} />
                        {ultimoComunicado.autor.dependencia.nombreDependencia}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="notificacion-texto">
                {getContenidoPreview(ultimoComunicado.contenido)}
              </p>

              {ultimoComunicado.archivosAdjuntos && ultimoComunicado.archivosAdjuntos.length > 0 && (
                <div className="notificacion-archivos">
                  <FileText size={16} />
                  <span>{ultimoComunicado.archivosAdjuntos.length} archivo(s) adjunto(s)</span>
                </div>
              )}

              <div className="notificacion-acciones">
                <button className="btn-secondary" onClick={cerrarNotificacion}>
                  Cerrar
                </button>
                <button className="btn-primary" onClick={irAComunicados}>
                  Ver más comunicados
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; */

import React, { useState, useEffect } from 'react';
import { X, Calendar, User, GraduationCap, Building2, Eye, FileText, ChevronRight } from 'lucide-react';
import './Home.scss';
import { comunicadosService, type Comunicado } from '../Comunicados/services/comunicadosService';
import { homeService, type Home } from './services/HomeService';
import { serviciosService, type Servicio } from '../Servicios/services/serviciosService';

const HomePage: React.FC = () => {
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [ultimoComunicado, setUltimoComunicado] = useState<Comunicado | null>(null);
  const [loadingComunicado, setLoadingComunicado] = useState(true);
  
  // Estados para Home Hero
  const [heroData, setHeroData] = useState<Home | null>(null);
  const [loadingHero, setLoadingHero] = useState(true);
  
  // Estados para Servicios
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loadingServicios, setLoadingServicios] = useState(true);

  useEffect(() => {
    cargarUltimoComunicado();
    cargarHeroData();
    cargarServicios();
  }, []);

  const cargarHeroData = async () => {
    try {
      const hero = await homeService.getHeroActivo();
      setHeroData(hero);
    } catch (error) {
      console.error('Error al cargar hero:', error);
    } finally {
      setLoadingHero(false);
    }
  };

  const cargarServicios = async () => {
    try {
      const data = await serviciosService.getServiciosPublicos();
      setServicios(data.slice(0, 4)); // Solo mostrar 4 servicios en home
    } catch (error) {
      console.error('Error al cargar servicios:', error);
    } finally {
      setLoadingServicios(false);
    }
  };

  const cargarUltimoComunicado = async () => {
    try {
      const comunicados = await comunicadosService.getPublicados();
      if (comunicados.length > 0) {
        setUltimoComunicado(comunicados[0]);
        
        setTimeout(() => {
          setMostrarNotificacion(true);
        }, 1000);
      }
    } catch (error) {
      console.error('Error al cargar comunicado:', error);
    } finally {
      setLoadingComunicado(false);
    }
  };

  const cerrarNotificacion = () => {
    setMostrarNotificacion(false);
    const hoy = new Date().toDateString();
    localStorage.setItem('ultimaVistaNotificacion', hoy);
  };

  const irAComunicados = () => {
    cerrarNotificacion();
    window.location.href = '/comunicados';
  };

  const formatFecha = (fecha: string | null) => {
    if (!fecha) return 'Sin fecha';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getContenidoPreview = (contenido: string) => {
    const maxLength = 200;
    if (contenido.length <= maxLength) return contenido;
    return contenido.substring(0, maxLength) + '...';
  };

  // Obtener imagen de fondo o usar default
  const getHeroBackground = () => {
    if (heroData?.imagenFondo) {
      return homeService.getImagenUrl(heroData.imagenFondo);
    }
    return '/assets/soft.jpg'; // Imagen por defecto
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section 
        className="home__hero"
        style={{
          backgroundImage: `url(${getHeroBackground()})`
        }}
      >
        <div className="home__hero-overlay"></div>
        <div className="home__hero-content">
          <h1 className="home__hero-title">
            {heroData?.titulo || 'OFICINA DE INFRAESTRUCTURA TECNOLÓGICA Y DESARROLLO DE SOFTWARE'}
          </h1>
          {heroData?.subtitulo && (
            <p className="home__hero-subtitle">{heroData.subtitulo}</p>
          )}
          {!heroData?.subtitulo && (
            <p className="home__hero-subtitle"></p>
          )}
        </div>
        <div className="home__hero-gradient"></div>
      </section>

      {/* Services Section */}
      <section className="home__services">
        <div className="home__services-container">
          <h2 className="home__services-title">Nuestros Servicios</h2>
          
          {loadingServicios ? (
            <div className="home__loading">
              <div className="home__spinner"></div>
              <p>Cargando servicios...</p>
            </div>
          ) : servicios.length === 0 ? (
            <div className="home__empty">
              <p>No hay servicios disponibles</p>
            </div>
          ) : (
            <div className="home__services-grid">
              {servicios.map((servicio) => (
                <div key={servicio.id} className="home__service-card">
                  <div className="home__service-icon">{servicio.icono}</div>
                  <h3 className="home__service-title">{servicio.titulo}</h3>
                  <p className="home__service-description">{servicio.descripcion}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="home__stats">
        <div className="home__stats-container">
          <div className="home__stat">
            <div className="home__stat-number">9</div>
            <div className="home__stat-label">Laboratorios</div>
          </div>
        </div>
      </section>

      {/* Ventana Flotante de Notificación */}
      {mostrarNotificacion && ultimoComunicado && (
        <div className="notificacion-overlay" onClick={cerrarNotificacion}>
          <div className="notificacion-modal" onClick={(e) => e.stopPropagation()}>
            <button className="notificacion-close" onClick={cerrarNotificacion}>
              <X size={24} />
            </button>

            <div className="notificacion-badge">
              <span className="badge-pulse"></span>
              NUEVO COMUNICADO
            </div>

            {ultimoComunicado.imagenPortada && (
              <div className="notificacion-imagen">
                <img 
                  src={comunicadosService.getImagenUrl(ultimoComunicado.imagenPortada) || ''} 
                  alt={ultimoComunicado.titulo}
                />
              </div>
            )}

            <div className="notificacion-content">
              <h2 className="notificacion-titulo">{ultimoComunicado.titulo}</h2>

              <div className="notificacion-meta">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{formatFecha(ultimoComunicado.fechaPublicacion)}</span>
                </div>
                <div className="meta-item">
                  <Eye size={16} />
                  <span>{ultimoComunicado.vistas} vistas</span>
                </div>
              </div>

              <div className="notificacion-autor">
                <div className="autor-avatar">
                  <User size={20} />
                </div>
                <div className="autor-info">
                  <span className="autor-nombre">
                    {ultimoComunicado.autor.nombre} {ultimoComunicado.autor.apellido}
                  </span>
                  <div className="autor-detalles">
                    {ultimoComunicado.autor.escuela && (
                      <span className="detalle">
                        <GraduationCap size={14} />
                        {ultimoComunicado.autor.escuela.nombreEscuela}
                      </span>
                    )}
                    {ultimoComunicado.autor.dependencia && (
                      <span className="detalle">
                        <Building2 size={14} />
                        {ultimoComunicado.autor.dependencia.nombreDependencia}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="notificacion-texto">
                {getContenidoPreview(ultimoComunicado.contenido)}
              </p>

              {ultimoComunicado.archivosAdjuntos && ultimoComunicado.archivosAdjuntos.length > 0 && (
                <div className="notificacion-archivos">
                  <FileText size={16} />
                  <span>{ultimoComunicado.archivosAdjuntos.length} archivo(s) adjunto(s)</span>
                </div>
              )}

              <div className="notificacion-acciones">
                <button className="btn-secondary" onClick={cerrarNotificacion}>
                  Cerrar
                </button>
                <button className="btn-primary" onClick={irAComunicados}>
                  Ver más comunicados
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;