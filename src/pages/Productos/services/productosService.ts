// services/productosService.ts

import { getApiConfig} from '../../../config/api';

export type EstadoProducto = 'Activo' | 'En Desarrollo' | 'En Mantenimiento' | 'Descontinuado';

export interface ProductoCaracteristica {
  id: number;
  descripcion: string;
  orden: number;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  estado: EstadoProducto;
  version: string;
  usuarios: string;
  icono: string;
  orden: number;
  esVisible: boolean;
  caracteristicas: ProductoCaracteristica[];
  createdAt?: Date;
  updatedAt?: Date;
}

/* const API_URL = 'http://localhost:3000/api'; */
//const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
//const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

class ProductosService {

  private get apiUrl(): string {
    return getApiConfig().apiUrl;
  }



  /**
   * Obtener todos los productos visibles (para público)
   */
  async getProductosPublicos(): Promise<Producto[]> {
    try {
      const response = await fetch(`${this.apiUrl}/productos`);
      if (!response.ok) throw new Error('Error al obtener productos');
      
      const data = await response.json();
      
      // Filtrar solo los visibles y ordenar
      return data
        .filter((p: Producto) => p.esVisible)
        .sort((a: Producto, b: Producto) => a.orden - b.orden);
    } catch (error) {
      console.error('Error en getProductosPublicos:', error);
      throw error;
    }
  }

  /**
   * Obtener un producto por ID
   */
  async getProductoById(id: number): Promise<Producto> {
    try {
      const response = await fetch(`${this.apiUrl}/productos/${id}`);
      if (!response.ok) throw new Error('Producto no encontrado');
      
      return await response.json();
    } catch (error) {
      console.error('Error en getProductoById:', error);
      throw error;
    }
  }
}

export const productosService = new ProductosService();