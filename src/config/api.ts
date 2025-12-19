// src/config/api.ts

/**
 * Configuración dinámica de API para múltiples rangos
 * Detección automática del backend según el rango del cliente
 */

/**
 * Obtiene la configuración de backend
 * Prioridad:
 * 1. Config inyectada por Nginx (window.APP_CONFIG)
 * 2. Detección por hostname/URL actual
 * 3. Valores por defecto
 */

// Extender la interfaz Window para TS
export interface ApiConfig {
  apiUrl: string;
  baseUrl: string;
  backendHost: string;
  clientIp?: string;
  clientRange: string;
  isProduction: boolean;
  source?: string;
}



export const getApiConfig = () => {
  // Si estamos en servidor (SSR) o desarrollo
  if (typeof window === 'undefined') {
    return {
      apiUrl: 'http://localhost:3000/api',
      baseUrl: 'http://localhost:3000',
      backendHost: 'localhost',
      clientRange: 'local',
      isProduction: false
    };
  }
  
  // ===== PRIORIDAD 1: CONFIGURACIÓN INYECTADA POR NGINX =====
  if (window.APP_CONFIG && window.APP_CONFIG.API_URL) {
    console.log('🔧 Usando configuración detectada por Nginx:', window.APP_CONFIG);
    return {
      apiUrl: window.APP_CONFIG.API_URL,
      baseUrl: window.APP_CONFIG.BACKEND_URL,
      backendHost: window.APP_CONFIG.API_HOST,
      clientIp: window.APP_CONFIG.CLIENT_IP,
      clientRange: window.APP_CONFIG.CLIENT_RANGE,
      isProduction: true,
      source: 'nginx'
    };
  }
  
  // ===== PRIORIDAD 2: DETECCIÓN POR HOSTNAME =====
  const hostname = window.location.hostname;
  const currentUrl = window.location.href;
  
  // Desarrollo local
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return {
      apiUrl: 'http://localhost:3000/api',
      baseUrl: 'http://localhost:3000',
      backendHost: 'localhost',
      clientRange: 'local',
      isProduction: false,
      source: 'localhost'
    };
  }
  
  // Si acceden directamente por IP del rango 106
  if (hostname === '172.16.106.19' || currentUrl.includes('172.16.106.19')) {
    return {
      apiUrl: 'http://172.16.106.19:3000/api',
      baseUrl: 'http://172.16.106.19:3000',
      backendHost: '172.16.106.19',
      clientRange: '106',
      isProduction: true,
      source: 'ip-detection-106'
    };
  }
  
  // Si acceden directamente por IP del rango 50
  if (hostname === '172.16.50.11' || currentUrl.includes('172.16.50.11')) {
    return {
      apiUrl: 'http://172.16.50.11:3000/api',
      baseUrl: 'http://172.16.50.11:3000',
      backendHost: '172.16.50.11',
      clientRange: '50',
      isProduction: true,
      source: 'ip-detection-50'
    };
  }
  
  // ===== PRIORIDAD 3: VALORES POR DEFECTO (rango 50) =====
  console.warn('⚠️ No se pudo detectar el rango, usando rango 50 por defecto');
  return {
    apiUrl: 'http://172.16.50.11:3000/api',
    baseUrl: 'http://172.16.50.11:3000',
    backendHost: '172.16.50.11',
    clientRange: '50',
    isProduction: true,
    source: 'default'
  };
};

/**
 * Configuración exportada para usar en toda la app
 */
export const API_CONFIG = getApiConfig();
export const API_URL = API_CONFIG.apiUrl;
export const BASE_URL = API_CONFIG.baseUrl;
export const BACKEND_HOST = API_CONFIG.backendHost;
export const CLIENT_RANGE = API_CONFIG.clientRange;
export const IS_PRODUCTION = API_CONFIG.isProduction;

/**
 * Función de debug para ver la configuración detectada
 */
export const logApiConfig = () => {
  if (typeof window !== 'undefined') {
    const config = getApiConfig();
    console.group('📡 Configuración de Backend Detectada');
    console.log('🔧 Fuente:', config.source);
    console.log('🌐 API URL:', config.apiUrl);
    console.log('🏠 Backend Host:', config.backendHost);
    console.log('🎯 Rango:', config.clientRange);
    console.log('🖥️  URL actual:', window.location.href);
    console.log('🏷️  Hostname:', window.location.hostname);
    console.log('🚀 Producción:', config.isProduction);
    console.groupEnd();
  }
  return API_CONFIG;
};

/**
 * Función para obtener URL de archivos (PDFs, etc.)
 */
export const getFileUrl = (filePath:string):string  => {
  const config = getApiConfig();
  
  if (!filePath) return '';
  
  // Si el filePath ya es una URL completa
  if (filePath.startsWith('http')) return filePath;
  
  // Si tiene ruta relativa
  //const filename = filePath.includes('/') ? filePath.split('/').pop() : filePath;
  
  // Para archivos uploads
  if (filePath.includes('uploads/') || filePath.includes('horarios/')) {
    return `${config.baseUrl}/uploads/${filePath}`;
  }
  
  return `${config.baseUrl}/${filePath}`;
};