
export interface Horario {
  id: number;
  nombre: string;
  archivoPdf: string | null;
  esVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/* const API_URL = 'http://localhost:3000/api';
const FILES_URL = 'http://localhost:3000'; */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

class HorariosService {
  /**
   * Obtener todos los horarios visibles (para público)
   */
  async getHorariosVisibles(): Promise<Horario[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/horarios`);
      if (!response.ok) throw new Error('Error al obtener horarios');
      
      const data = await response.json();
      
      // Filtrar solo los visibles
      return data
        .filter((horario: Horario) => horario.esVisible)
        .sort((a: Horario, b: Horario) => a.nombre.localeCompare(b.nombre));
    } catch (error) {
      console.error('Error en getHorariosVisibles:', error);
      throw error;
    }
  }

  /**
   * Obtener un horario por ID
   */
  async getHorarioById(id: number): Promise<Horario> {
    try {
      const response = await fetch(`${API_BASE_URL}/horarios/${id}`);
      if (!response.ok) throw new Error('Horario no encontrado');
      
      return await response.json();
    } catch (error) {
      console.error('Error en getHorarioById:', error);
      throw error;
    }
  }

  /**
   * Obtener URL del PDF para visualización
   */
  getPdfUrl(archivoPdf: string): string {
    return `${BASE_URL}/uploads/${archivoPdf}`;
  }

  /**
   * Obtener URL para descargar el PDF
   */
  getDownloadUrl(horarioId: number): string {
    return `${API_BASE_URL}/horarios/descargar/${horarioId}`;
  }

  /**
   * Descargar horario
   */
  async descargarHorario(horarioId: number, nombreLab: string): Promise<void> {
    try {
      const downloadUrl = this.getDownloadUrl(horarioId);
      
      // Crear un enlace temporal para la descarga
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `Horario-${nombreLab}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar horario:', error);
      throw error;
    }
  }
}

export const horariosService = new HorariosService();