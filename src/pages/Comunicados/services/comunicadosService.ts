// ============================================
// 📁 services/comunicadosService.ts
// ============================================
import { getApiConfig, getFileUrl } from '../../../config/api';

export interface Autor {
  id: number;
  nombre: string;
  apellido: string;
  oficina: string;
  escuela?: {
    id: number;
    nombreEscuela: string;
  };
  dependencia?: {
    id: number;
    nombreDependencia: string;
  };
}

export interface Comunicado {
  id: number;
  titulo: string;
  contenido: string;
  imagenPortada: string | null;
  archivosAdjuntos: string[];
  autor: Autor;
  autorId: number;
  fechaPublicacion: string | null;
  fechaExpiracion: string | null;
  estado: 'borrador' | 'publicado' | 'archivado';
  esVisible: boolean;
  vistas: number;
  createdAt: string;
  updatedAt: string;
}

//const API_BASE_URL = 'http://localhost:3000/api';
//const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
//const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

class ComunicadosService {

  private get apiUrl(): string {
    return getApiConfig().apiUrl;
  }
  
  // ========== OBTENER COMUNICADOS PUBLICADOS (PÚBLICO) ==========
  async getPublicados(): Promise<Comunicado[]> {
    try {
      const response = await fetch(`${this.apiUrl}/comunicados/publicados`);
      if (!response.ok) throw new Error('Error al cargar comunicados');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // ========== OBTENER UN COMUNICADO ==========
  async getById(id: number): Promise<Comunicado> {
    try {
      const response = await fetch(`${this.apiUrl}/comunicados/${id}`);
      if (!response.ok) throw new Error('Error al cargar comunicado');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // ========== INCREMENTAR VISTAS ==========
  async incrementarVistas(id: number): Promise<void> {
    try {
      await fetch(`${this.apiUrl}/comunicados/${id}/vistas`, {
        method: 'PATCH',
      });
    } catch (error) {
      console.error('Error al incrementar vistas:', error);
    }
  }

  // ========== OBTENER URL DE IMAGEN ==========
  getImagenUrl(imagenPortada: string | null): string | null {
    if (!imagenPortada) return null;
    //return `${BASE_URL}/uploads/${imagenPortada}`;
    return getFileUrl(imagenPortada);
  }

  // ========== OBTENER URL DE ARCHIVO ADJUNTO ==========
  getArchivoUrl(archivo: string): string {
    //return `${BASE_URL}/uploads/${archivo}`;
    return getFileUrl(archivo);
  }

  // ========== DESCARGAR ARCHIVO ==========
  getDownloadUrl(comunicadoId: number, archivoIndex: number): string {
    return `${this.apiUrl}/comunicados/${comunicadoId}/descargar-archivo/${archivoIndex}`;
  }
}

export const comunicadosService = new ComunicadosService();