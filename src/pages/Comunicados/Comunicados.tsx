import React, { useState, useEffect } from 'react';
import { Calendar, User, Eye, Building2, GraduationCap, ChevronRight, Clock, FileText, Download } from 'lucide-react';
/* import { comunicadosService, Comunicado } from '../services/comunicadosService'; */
import './Comunicados.scss';
import { comunicadosService, type Comunicado } from './services/comunicadosService';

const Comunicados: React.FC = () => {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroActivo, setFiltroActivo] = useState<string>('Todos');
  const [comunicadoSeleccionado, setComunicadoSeleccionado] = useState<Comunicado | null>(null);

  useEffect(() => {
    loadComunicados();
  }, []);

  const loadComunicados = async () => {
    try {
      setLoading(true);
      const data = await comunicadosService.getPublicados();
      setComunicados(data);
    } catch (error) {
      console.error('Error al cargar comunicados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extraer filtros únicos
  const getFiltros = () => {
    const escuelas = new Set<string>();
    const dependencias = new Set<string>();

    comunicados.forEach(com => {
      if (com.autor.escuela) escuelas.add(com.autor.escuela.nombreEscuela);
      if (com.autor.dependencia) dependencias.add(com.autor.dependencia.nombreDependencia);
    });

    return {
      escuelas: Array.from(escuelas),
      dependencias: Array.from(dependencias),
    };
  };

  const filtros = getFiltros();

  // Filtrar comunicados
  const comunicadosFiltrados = comunicados.filter(com => {
    if (filtroActivo === 'Todos') return true;
    
    const esEscuela = com.autor.escuela?.nombreEscuela === filtroActivo;
    const esDependencia = com.autor.dependencia?.nombreDependencia === filtroActivo;
    
    return esEscuela || esDependencia;
  });

  const handleVerMas = async (comunicado: Comunicado) => {
    setComunicadoSeleccionado(comunicado);
    await comunicadosService.incrementarVistas(comunicado.id);
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

  const getTiempoRelativo = (fecha: string | null) => {
    if (!fecha) return 'Sin publicar';
    
    const now = new Date();
    const fechaPub = new Date(fecha);
    const diff = now.getTime() - fechaPub.getTime();
    
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);
    
    if (minutos < 1) return 'Ahora';
    if (minutos < 60) return `Hace ${minutos} min`;
    if (horas < 24) return `Hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    if (dias < 7) return `Hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
    
    return formatFecha(fecha);
  };

  const getContenidoPreview = (contenido: string) => {
    const maxLength = 180;
    if (contenido.length <= maxLength) return contenido;
    return contenido.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="comunicados-loading">
        <div className="spinner"></div>
        <p>Cargando comunicados...</p>
      </div>
    );
  }

  return (
    <div className="comunicados">
      <div className="comunicados__container">
        {/* Header */}
        <div className="comunicados__header">
          <div className="comunicados__header-content">
            <h1 className="comunicados__title">Comunicados oficiales</h1>
            <p className="comunicados__subtitle">
              Información importante de la Oficina de Infraestructura Tecnológica y Desarrollo de Software
            </p>
          </div>
          <div className="comunicados__stats">
            <div className="stat-card">
              <FileText size={24} />
              <div>
                <span className="stat-number">{comunicados.length}</span>
                <span className="stat-label">Publicaciones</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="comunicados__filters">
          <h3 className="comunicados__filters-title">
            <Building2 size={20} />
            Filtrar por área:
          </h3>
          <div className="comunicados__filters-buttons">
            <button
              onClick={() => setFiltroActivo('Todos')}
              className={`filter-btn ${filtroActivo === 'Todos' ? 'filter-btn--active' : ''}`}
            >
              Todos ({comunicados.length})
            </button>
            
            {filtros.escuelas.length > 0 && (
              <div className="filter-group">
                <span className="filter-group-label">Escuelas Profesionales:</span>
                {filtros.escuelas.map(escuela => (
                  <button
                    key={escuela}
                    onClick={() => setFiltroActivo(escuela)}
                    className={`filter-btn ${filtroActivo === escuela ? 'filter-btn--active' : ''}`}
                  >
                    <GraduationCap size={16} />
                    {escuela}
                  </button>
                ))}
              </div>
            )}

            {filtros.dependencias.length > 0 && (
              <div className="filter-group">
                <span className="filter-group-label">Dependencias:</span>
                {filtros.dependencias.map(dep => (
                  <button
                    key={dep}
                    onClick={() => setFiltroActivo(dep)}
                    className={`filter-btn ${filtroActivo === dep ? 'filter-btn--active' : ''}`}
                  >
                    <Building2 size={16} />
                    {dep}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grid de Comunicados */}
        <div className="comunicados__grid">
          {comunicadosFiltrados.map((comunicado) => (
            <article key={comunicado.id} className="comunicado-card">
              {/* Imagen de portada */}
              {comunicado.imagenPortada && (
                <div className="comunicado-card__imagen">
                  <img 
                    src={comunicadosService.getImagenUrl(comunicado.imagenPortada) || ''} 
                    alt={comunicado.titulo}
                  />
                </div>
              )}

              <div className="comunicado-card__content">
                {/* Meta info */}
                <div className="comunicado-card__meta">
                  <span className="meta-item">
                    <Clock size={14} />
                    {getTiempoRelativo(comunicado.fechaPublicacion)}
                  </span>
                  <span className="meta-item">
                    <Eye size={14} />
                    {comunicado.vistas} vistas
                  </span>
                </div>

                {/* Título */}
                <h2 className="comunicado-card__titulo">{comunicado.titulo}</h2>

                {/* Autor */}
                <div className="comunicado-card__autor">
                  <div className="autor-avatar">
                    <User size={18} />
                  </div>
                  <div className="autor-info">
                    <span className="autor-nombre">
                      {comunicado.autor.nombre} {comunicado.autor.apellido}
                    </span>
                    <div className="autor-detalles">
                      {comunicado.autor.escuela && (
                        <span className="detalle">
                          <GraduationCap size={12} />
                          {comunicado.autor.escuela.nombreEscuela}
                        </span>
                      )}
                      {comunicado.autor.dependencia && (
                        <span className="detalle">
                          <Building2 size={12} />
                          {comunicado.autor.dependencia.nombreDependencia}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contenido preview */}
                <p className="comunicado-card__contenido">
                  {getContenidoPreview(comunicado.contenido)}
                </p>

                {/* Archivos adjuntos */}
                {comunicado.archivosAdjuntos && comunicado.archivosAdjuntos.length > 0 && (
                  <div className="comunicado-card__archivos">
                    <span className="archivos-label">
                      <FileText size={14} />
                      {comunicado.archivosAdjuntos.length} archivo(s) adjunto(s)
                    </span>
                  </div>
                )}

                {/* Footer */}
                <div className="comunicado-card__footer">
                  {comunicado.fechaPublicacion && (
                    <span className="fecha-completa">
                      <Calendar size={14} />
                      Publicado: {formatFecha(comunicado.fechaPublicacion)}
                    </span>
                  )}
                  <button 
                    className="btn-ver-mas"
                    onClick={() => handleVerMas(comunicado)}
                  >
                    Leer más
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {comunicadosFiltrados.length === 0 && (
          <div className="comunicados__empty">
            <FileText size={64} />
            <h3>No hay comunicados disponibles</h3>
            <p>No se encontraron comunicados para este filtro.</p>
          </div>
        )}
      </div>

      {/* Modal de detalle (opcional - puedes implementarlo) */}
      {comunicadoSeleccionado && (
        <div className="comunicado-modal" onClick={() => setComunicadoSeleccionado(null)}>
          <div className="comunicado-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setComunicadoSeleccionado(null)}>
              ×
            </button>
            
            {comunicadoSeleccionado.imagenPortada && (
              <img 
                src={comunicadosService.getImagenUrl(comunicadoSeleccionado.imagenPortada) || ''} 
                alt={comunicadoSeleccionado.titulo}
                className="modal-imagen"
              />
            )}

            <h2>{comunicadoSeleccionado.titulo}</h2>
            <div className="modal-meta">
              <span>{comunicadoSeleccionado.autor.nombre} {comunicadoSeleccionado.autor.apellido}</span>
              <span>•</span>
              <span>{formatFecha(comunicadoSeleccionado.fechaPublicacion)}</span>
              <span>•</span>
              <span>{comunicadoSeleccionado.vistas} vistas</span>
            </div>
            
            <div className="modal-contenido">
              {comunicadoSeleccionado.contenido}
            </div>

            {comunicadoSeleccionado.archivosAdjuntos && comunicadoSeleccionado.archivosAdjuntos.length > 0 && (
              <div className="modal-archivos">
                <h3>Archivos adjuntos</h3>
                {comunicadoSeleccionado.archivosAdjuntos.map((archivo, index) => (
                  <a
                    key={index}
                    href={comunicadosService.getDownloadUrl(comunicadoSeleccionado.id, index)}
                    download
                    className="archivo-link"
                  >
                    <Download size={16} />
                    Descargar archivo {index + 1}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comunicados;