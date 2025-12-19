// src/types/window.d.ts

export {};

declare global {
  interface Window {
    APP_CONFIG?: {
      API_HOST: string;
      API_URL: string;
      BACKEND_URL: string;
      CLIENT_IP: string;
      CLIENT_RANGE: string;
    };
  }
}