// ============================================
// 📁 services/comunicadosService.ts
// ============================================

export interface Autor {
  id: number;
  nombre: string;
  apellido: string;
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
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

class ComunicadosService {
  
  // ========== OBTENER COMUNICADOS PUBLICADOS (PÚBLICO) ==========
  async getPublicados(): Promise<Comunicado[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/comunicados/publicados`);
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
      const response = await fetch(`${API_BASE_URL}/comunicados/${id}`);
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
      await fetch(`${API_BASE_URL}/comunicados/${id}/vistas`, {
        method: 'PATCH',
      });
    } catch (error) {
      console.error('Error al incrementar vistas:', error);
    }
  }

  // ========== OBTENER URL DE IMAGEN ==========
  getImagenUrl(imagenPortada: string | null): string | null {
    if (!imagenPortada) return null;
    return `${BASE_URL}/uploads/${imagenPortada}`;
  }

  // ========== OBTENER URL DE ARCHIVO ADJUNTO ==========
  getArchivoUrl(archivo: string): string {
    return `${BASE_URL}/uploads/${archivo}`;
  }

  // ========== DESCARGAR ARCHIVO ==========
  getDownloadUrl(comunicadoId: number, archivoIndex: number): string {
    return `${API_BASE_URL}/comunicados/${comunicadoId}/descargar-archivo/${archivoIndex}`;
  }
}

export const comunicadosService = new ComunicadosService();