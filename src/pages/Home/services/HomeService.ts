import { getApiConfig, getFileUrl } from '../../../config/api';

export interface Home {
  id: number;
  titulo: string;
  subtitulo?: string;
  imagenFondo?: string;
  esVisible: boolean;
  updatedAt?: Date;
}

/* const API_URL = 'http://localhost:3000/api'; */
//const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
//const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';


class HomeService {

  private get apiUrl(): string {
    return getApiConfig().apiUrl;
  }
  /**
   * Obtener el hero visible activo
   */
  async getHeroActivo(): Promise<Home | null> {
    try {
      const response = await fetch(`${this.apiUrl}/home`);
      if (!response.ok) throw new Error('Error al obtener hero');
      
      const data: Home[] = await response.json();
      
      // Obtener el primero visible
      const heroActivo = data.find(h => h.esVisible);
      return heroActivo || null;
    } catch (error) {
      console.error('Error en getHeroActivo:', error);
      return null;
    }
  }

  /**
   * Obtener URL de la imagen
   */
  getImagenUrl(imagenFondo: string): string {
    //return `${API_BASE_URL.replace('/api', '')}/uploads/${imagenFondo}`;
    return getFileUrl(imagenFondo);
  }
}

export const homeService = new HomeService();