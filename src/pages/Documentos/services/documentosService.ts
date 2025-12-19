// services/documentosService.ts

import { getApiConfig, getFileUrl } from '../../../config/api';

export interface DocumentoGestion {
  id: number;
  nombreDoc: string;
  descripcion: string;
  archivoPdf: string | null;
  orden: number;
  esActivo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/* const API_URL = 'http://localhost:3000/api';
const FILES_URL = 'http://localhost:3000'; */

//const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
//const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';


class DocumentosService {
  /**
   * Obtener todos los documentos activos (para público)
   */

  private get apiUrl(): string {
    return getApiConfig().apiUrl;
  }
  
  async getDocumentosActivos(): Promise<DocumentoGestion[]> {
    try {
      const response = await fetch(`${this.apiUrl}/documentogestion`);
      if (!response.ok) throw new Error('Error al obtener documentos');
      
      const data = await response.json();
      
      // Filtrar solo los activos y ordenar
      return data
        .filter((doc: DocumentoGestion) => doc.esActivo)
        .sort((a: DocumentoGestion, b: DocumentoGestion) => a.orden - b.orden);
    } catch (error) {
      console.error('Error en getDocumentosActivos:', error);
      throw error;
    }
  }

  /**
   * Obtener un documento por ID
   */
  async getDocumentoById(id: number): Promise<DocumentoGestion> {
    try {
      const response = await fetch(`${this.apiUrl}/documentogestion/${id}`);
      if (!response.ok) throw new Error('Documento no encontrado');
      
      return await response.json();
    } catch (error) {
      console.error('Error en getDocumentoById:', error);
      throw error;
    }
  }

  /**
   * Obtener URL del PDF para visualización
   */
  getPdfUrl(archivoPdf: string): string {
    //return `${BASE_URL}/uploads/${archivoPdf}`;
    return getFileUrl(archivoPdf);
  }

  /**
   * Obtener URL para descargar el PDF
   */
  getDownloadUrl(documentoId: number): string {
    return `${this.apiUrl}/documentogestion/descargar/${documentoId}`;
  }

  /**
   * Descargar documento
   */
  async descargarDocumento(documentoId: number, nombreDoc: string): Promise<void> {
    try {
      const downloadUrl = this.getDownloadUrl(documentoId);
      
      // Crear un enlace temporal para la descarga
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${nombreDoc}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar documento:', error);
      throw error;
    }
  }
}

export const documentosService = new DocumentosService();