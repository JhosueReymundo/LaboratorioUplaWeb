import axios from 'axios';

/* const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/nosotros'; */
/* const API_BASE_URL ='http://localhost:3000/api/nosotros'; */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

export interface Equipo {
  id: number;
  nombre: string;
  cargo: string;
  email: string;
  orden: number;
  esVisible: boolean;
  createdAt: Date;
  uptatedAt: Date;
}

export interface Mision {
  id: number;
  contenido: string;
  isActive: boolean;
  createdAt: Date;
  updateAt: Date;
}

export interface Vision {
  id: number;
  contenido: string;
  isActive: boolean;
  createdAt: Date;
  updateAt: Date;
}

export interface Valor {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  orden: number;
  isVisible: boolean;
  createdAt: Date;
  uptatedAt: Date;
}

class NosotrosService {
  // Obtener la misión activa
  async getMisionActiva(): Promise<Mision | null> {
    try {
      const response = await axios.get<Mision>(`${API_BASE_URL}/nosotros/mision/active`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener misión activa:', error);
      return null;
    }
  }

  // Obtener la visión activa
  async getVisionActiva(): Promise<Vision | null> {
    try {
      const response = await axios.get<Vision>(`${API_BASE_URL}/nosotros/vision/active`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener visión activa:', error);
      return null;
    }
  }

  // Obtener todos los valores visibles
  async getValoresVisibles(): Promise<Valor[]> {
    try {
      const response = await axios.get<Valor[]>(`${API_BASE_URL}/nosotros/valores`);
      return response.data
        .filter(valor => valor.isVisible)
        .sort((a, b) => a.orden - b.orden);
    } catch (error) {
      console.error('Error al obtener valores:', error);
      return [];
    }
  }

  // Obtener todos los miembros del equipo visibles
  async getEquipoVisible(): Promise<Equipo[]> {
    try {
      const response = await axios.get<Equipo[]>(`${API_BASE_URL}/nosotros/equipo`);
      return response.data
        .filter(miembro => miembro.esVisible)
        .sort((a, b) => a.orden - b.orden);
    } catch (error) {
      console.error('Error al obtener equipo:', error);
      return [];
    }
  }
}

export default new NosotrosService();