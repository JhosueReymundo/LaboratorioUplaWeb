import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) =>{

  const env = loadEnv(mode, process.cwd(), 'REACT_APP_')

  return {
    plugins: [react()],
    // Expone las variables de entorno al cliente
    define: {
      'process.env': env
    }
  }
})
