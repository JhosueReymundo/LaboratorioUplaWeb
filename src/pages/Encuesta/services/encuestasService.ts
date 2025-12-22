import { getApiConfig} from '../../../config/api';

/* const API_BASE_URL = 'http://localhost:3000/api'; */
//const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
//const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

// ========== INTERFACES ==========
export interface Escuela {
  id: number;
  nombreEscuela: string;
}

export interface Encuesta {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  esVisible: boolean;
  estado: 'borrador' | 'activa' | 'cerrada';
}

export interface Opcion {
  id: number;
  pregunta_id: number;
  texto: string;
  valor: string | null;
  orden: number;
}

export interface Pregunta {
  id: number;
  encuesta_id: number;
  texto: string;
  tipo: 'abierta' | 'opcion' | 'numerica';
  orden: number;
  opciones: Opcion[];
}

export interface CreateRespuestaDto {
  encuesta_id: number;
  email: string;
  codigo_estudiante: string;
  escuelaId: number;
  ciclo: string;
}

export interface CreateRespuestaDetalleDto {
  respuesta_id: number;
  pregunta_id: number;
  opcion_id?: number;
  texto?: string;
  valor_numerico?: number;
}

class EncuestasService {


  private get apiUrl(): string {
    return getApiConfig().apiUrl;
  }
  
  // ========== ENCUESTAS ==========
  async getEncuestasPublicas(): Promise<Encuesta[]> {
    try {
      const response = await fetch(`${this.apiUrl}/encuestas/publicas`);
      if (!response.ok) throw new Error('Error al cargar encuestas');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getEncuestaById(id: number): Promise<Encuesta> {
    try {
      const response = await fetch(`${this.apiUrl}/encuestas/${id}`);
      if (!response.ok) throw new Error('Error al cargar encuesta');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // ========== PREGUNTAS ==========
  async getPreguntasByEncuesta(encuestaId: number): Promise<Pregunta[]> {
    try {
      const response = await fetch(`${this.apiUrl}/encuestas/${encuestaId}/preguntas`);
      if (!response.ok) throw new Error('Error al cargar preguntas');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // ========== ESCUELAS ==========
  async getEscuelas(): Promise<Escuela[]> {
    try {
      const response = await fetch(`${this.apiUrl}/escuela`);
      if (!response.ok) throw new Error('Error al cargar escuelas');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

 
async crearRespuesta(data: CreateRespuestaDto): Promise<{ id: number }> {
  try {
    const response = await fetch(`${this.apiUrl}/encuestas/respuestas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error('Error al crear respuesta');
    }
    
    const respuesta = await response.json();
    return { id: respuesta.id };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

  async crearRespuestaDetalle(data: CreateRespuestaDetalleDto): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/encuestas/respuestas/detalles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error al guardar respuesta');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async enviarRespuestasCompletas(_: number, detalles: CreateRespuestaDetalleDto[]): Promise<void> {
    try {
      // Enviar todas las respuestas
      for (const detalle of detalles) {
        await this.crearRespuestaDetalle(detalle);
      }
    } catch (error) {
      console.error('Error al enviar respuestas:', error);
      throw error;
    }
  }
}

export const encuestasService = new EncuestasService();