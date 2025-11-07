import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import './Comunicados.scss';

const Comunicados: React.FC = () => {
  const [filtroActivo, setFiltroActivo] = useState<string>('Todos');

  const comunicados = [
    {
      titulo: 'Mantenimiento Programado de Servidores',
      fecha: '05 Nov 2025',
      tipo: 'Importante',
      contenido: 'Se realizará mantenimiento preventivo a los servidores principales el próximo sábado de 2:00 AM a 6:00 AM. Durante este periodo algunos servicios podrían no estar disponibles. Se recomienda guardar todo el trabajo antes de la hora indicada.',
      categoria: 'Mantenimiento',
      autor: 'Equipo TI'
    },
    {
      titulo: 'Nueva Actualización de Sistema Académico',
      fecha: '03 Nov 2025',
      tipo: 'Información',
      contenido: 'El sistema de gestión académica ha sido actualizado con nuevas funcionalidades incluyendo exportación de reportes en múltiples formatos, mejoras en la interfaz de usuario y mayor velocidad de procesamiento.',
      categoria: 'Actualización',
      autor: 'Desarrollo'
    },
    {
      titulo: 'Horario Extendido - Período de Finales',
      fecha: '01 Nov 2025',
      tipo: 'Aviso',
      contenido: 'Durante el período de exámenes finales (del 10 al 20 de noviembre), los laboratorios extenderán su horario de atención hasta las 10:00 PM de lunes a viernes. Los sábados permanecerán con horario normal.',
      categoria: 'Horarios',
      autor: 'Administración'
    },
    {
      titulo: 'Nuevo Portal de Soporte Técnico',
      fecha: '28 Oct 2025',
      tipo: 'Información',
      contenido: 'Estamos orgullosos de anunciar el lanzamiento del nuevo portal de tickets para soporte técnico. Ahora podrás dar seguimiento en tiempo real a tus solicitudes, recibir notificaciones y consultar el historial completo.',
      categoria: 'Novedad',
      autor: 'Equipo TI'
    },
    {
      titulo: 'Actualización de Políticas de Seguridad',
      fecha: '25 Oct 2025',
      tipo: 'Importante',
      contenido: 'Se han actualizado las políticas de seguridad informática de acuerdo a las nuevas normativas internacionales. Todos los usuarios deben actualizar sus contraseñas en los próximos 15 días siguiendo los nuevos criterios de complejidad.',
      categoria: 'Seguridad',
      autor: 'Seguridad TI'
    },
    {
      titulo: 'Taller: Introducción a las Nuevas Herramientas',
      fecha: '22 Oct 2025',
      tipo: 'Evento',
      contenido: 'Se realizará un taller introductorio sobre las nuevas herramientas digitales implementadas. El taller será el viernes 25 de octubre a las 3:00 PM en el Lab 3. Inscripciones abiertas hasta el miércoles.',
      categoria: 'Capacitación',
      autor: 'Capacitación'
    },
    {
      titulo: 'Mejoras en la Red WiFi del Campus',
      fecha: '18 Oct 2025',
      tipo: 'Información',
      contenido: 'Se han instalado 15 nuevos puntos de acceso WiFi en áreas estratégicas del campus. Esto mejorará significativamente la cobertura y velocidad de conexión en bibliotecas, cafeterías y espacios comunes.',
      categoria: 'Infraestructura',
      autor: 'Redes'
    },
    {
      titulo: 'Encuesta de Satisfacción - Servicios TI',
      fecha: '15 Oct 2025',
      tipo: 'Aviso',
      contenido: 'Nos encantaría conocer tu opinión sobre nuestros servicios. Te invitamos a completar nuestra encuesta de satisfacción que te tomará solo 5 minutos. Tu feedback es muy importante para nosotros.',
      categoria: 'General',
      autor: 'Calidad'
    }
  ];

  const categorias = ['Todos', 'Mantenimiento', 'Actualización', 'Seguridad', 'Novedad', 'Capacitación', 'General'];

  const comunicadosFiltrados = filtroActivo === 'Todos' 
    ? comunicados 
    : comunicados.filter(c => c.categoria === filtroActivo);

  const getTipoClass = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      'Importante': 'importante',
      'Información': 'info',
      'Aviso': 'aviso',
      'Evento': 'evento'
    };
    return tipos[tipo] || 'info';
  };

  return (
    <div className="comunicados">
      <div className="comunicados__container">
        <h1 className="comunicados__title">Comunicados</h1>
        <p className="comunicados__subtitle">
          Mantente informado sobre las últimas novedades, actualizaciones y eventos del departamento TI
        </p>

        <div className="comunicados__filters">
          <h3 className="comunicados__filters-title">Filtrar por categoría:</h3>
          <div className="comunicados__filters-buttons">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroActivo(cat)}
                className={`comunicados__filter-btn ${filtroActivo === cat ? 'comunicados__filter-btn--active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="comunicados__grid">
          {comunicadosFiltrados.map((comunicado, idx) => (
            <div key={idx} className="comunicados__card">
              <div className="comunicados__header">
                <span className={`comunicados__tipo comunicados__tipo--${getTipoClass(comunicado.tipo)}`}>
                  {comunicado.tipo}
                </span>
                <span className="comunicados__fecha">{comunicado.fecha}</span>
              </div>
              
              <div className="comunicados__meta">
                <span className="comunicados__categoria">{comunicado.categoria}</span>
                <span className="comunicados__separator">•</span>
                <span className="comunicados__autor">{comunicado.autor}</span>
              </div>
              
              <h3 className="comunicados__titulo">{comunicado.titulo}</h3>
              <p className="comunicados__contenido">{comunicado.contenido}</p>
              
              <button className="comunicados__button">
                Leer más <ChevronRight size={20} />
              </button>
            </div>
          ))}
        </div>

        {comunicadosFiltrados.length === 0 && (
          <div className="comunicados__empty">
            <p>No hay comunicados en esta categoría.</p>
          </div>
        )}

        <div className="comunicados__subscribe">
          <h2 className="comunicados__subscribe-title">📬 Suscríbete a nuestras notificaciones</h2>
          <p className="comunicados__subscribe-text">
            Recibe los comunicados importantes directamente en tu correo electrónico
          </p>
          <div className="comunicados__subscribe-form">
            <input 
              type="email" 
              placeholder="tu.correo@universidad.edu"
              className="comunicados__subscribe-input"
            />
            <button className="comunicados__subscribe-button">Suscribirse</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comunicados;