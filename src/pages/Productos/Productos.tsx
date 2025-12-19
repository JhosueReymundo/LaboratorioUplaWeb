import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Package, CheckCircle2 } from 'lucide-react';
/* import { productosService, Producto, EstadoProducto } from '../../services/productosService'; */
import './Productos.scss';
import { productosService, type EstadoProducto, type Producto } from './services/productosService';

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await productosService.getProductosPublicos();
      setProductos(data);
    } catch (err) {
      setError('Error al cargar los productos. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoBadgeClass = (estado: EstadoProducto): string => {
    const classes = {
      'Activo': 'productos__badge--activo',
      'En Desarrollo': 'productos__badge--desarrollo',
      'En Mantenimiento': 'productos__badge--mantenimiento',
      'Descontinuado': 'productos__badge--descontinuado'
    };
    return classes[estado] || '';
  };

  const getEstadoIcon = (estado: EstadoProducto): string => {
    const icons = {
      'Activo': '✅',
      'En Desarrollo': '🚧',
      'En Mantenimiento': '⚙️',
      'Descontinuado': '🚫'
    };
    return icons[estado] || '📦';
  };

  if (loading) {
    return (
      <div className="productos">
        <div className="productos__container">
          <div className="productos__loading">
            <div className="productos__spinner"></div>
            <p>Cargando productos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="productos">
        <div className="productos__container">
          <div className="productos__error">
            <div className="productos__error-icon">⚠️</div>
            <p>{error}</p>
            <button onClick={cargarProductos} className="productos__retry-btn">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="productos">
        <div className="productos__container">
          <div className="productos__empty">
            <Package size={64} />
            <p>No hay productos disponibles en este momento</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="productos">
      <div className="productos__container">
        
        {/* Hero Section */}
        <div className="productos__hero">
          <h1 className="productos__title">Nuestros productos</h1>
          <p className="productos__intro">
            Soluciones tecnológicas desarrolladas internamente para optimizar 
            los procesos académicos y administrativos de nuestra universidad.
          </p>
        </div>

        {/* Grid de Productos */}
        <div className="productos__grid">
          {productos.map((producto) => (
            <div key={producto.id} className="productos__card">
              
              {/* Header con Icono y Badges */}
              <div className="productos__header">
                <div className="productos__icon-container">
                  <span className="productos__icon">{producto.icono}</span>
                </div>
                
                <div className="productos__badges">
                  <span className={`productos__badge ${getEstadoBadgeClass(producto.estado)}`}>
                    {getEstadoIcon(producto.estado)} {producto.estado}
                  </span>
                  <span className="productos__version">
                    {producto.version}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="productos__body">
                <h3 className="productos__name">{producto.nombre}</h3>
                <p className="productos__description">{producto.descripcion}</p>

                {/* Meta Info */}
                {producto.usuarios && (
                  <div className="productos__meta">
                    <Users size={18} />
                    <span>{producto.usuarios}</span>
                  </div>
                )}

                {/* Características */}
                {producto.caracteristicas && producto.caracteristicas.length > 0 && (
                  <div className="productos__features">
                    <h4 className="productos__features-title">
                      Características principales:
                    </h4>
                    <ul className="productos__features-list">
                      {producto.caracteristicas
                        .sort((a, b) => a.orden - b.orden)
                        .map((caracteristica) => (
                          <li key={caracteristica.id}>
                            <CheckCircle2 size={16} />
                            <span>{caracteristica.descripcion}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* <div className="productos__footer">
                <button className="productos__cta-btn">
                  Ver más detalles
                  <ChevronRight size={20} />
                </button>
              </div> */}
            </div>
          ))}
        </div>

        

      </div>
    </div>
  );
};

export default Productos;