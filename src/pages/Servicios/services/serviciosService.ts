import { getApiConfig} from '../../../config/api';


export interface ServicioDetalle {
  id: number;
  detalle: string;
  orden: number;
}

export interface Servicio {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  orden: number;
  esVisible: boolean;
  detalles: ServicioDetalle[];
  createdAt?: Date;
  updatedAt?: Date;
}

/* const API_URL = 'http://localhost:3000/api'; */
//const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
//const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';


class ServiciosService {

  private get apiUrl(): string {
    return getApiConfig().apiUrl;
  }
  /**
   * Obtener todos los servicios visibles (para público)
   */
  async getServiciosPublicos(): Promise<Servicio[]> {
    try {
      const response = await fetch(`${this.apiUrl}/servicios`);
      if (!response.ok) throw new Error('Error al obtener servicios');
      
      const data = await response.json();
      
      // Ya vienen filtrados por esVisible: true desde el backend
      // Solo asegurar el orden
      return data.sort((a: Servicio, b: Servicio) => a.orden - b.orden);
    } catch (error) {
      console.error('Error en getServiciosPublicos:', error);
      throw error;
    }
  }

  /**
   * Obtener un servicio por ID
   */
  async getServicioById(id: number): Promise<Servicio> {
    try {
      const response = await fetch(`${this.apiUrl}/servicios/${id}`);
      if (!response.ok) throw new Error('Servicio no encontrado');
      
      return await response.json();
    } catch (error) {
      console.error('Error en getServicioById:', error);
      throw error;
    }
  }

  /**
   * Obtener detalles de un servicio específico
   */
  async getDetallesByServicio(servicioId: number): Promise<ServicioDetalle[]> {
    try {
      const response = await fetch(`${this.apiUrl}/servicios/${servicioId}/detalles`);
      if (!response.ok) throw new Error('Error al obtener detalles');
      
      return await response.json();
    } catch (error) {
      console.error('Error en getDetallesByServicio:', error);
      throw error;
    }
  }
}

export const serviciosService = new ServiciosService();