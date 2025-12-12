# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copiar archivos de dependencias
COPY package*.json ./
# 2. Instalar dependencias (exactas para producción)
RUN npm ci --only=production

# 3. Copiar el resto del código
COPY . .

# 4. Variables de entorno para BUILD (¡importante!)
#    Puedes pasar --build-arg o usar .env.production
ARG VITE_API_URL=http://172.16.106.19:3000/api
ARG VITE_BASE_URL=http://172.16.106.19:3000

# 5. Exponer variables al entorno de construcción
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

# 6. Construir la aplicación
RUN npm run build

# 7. Etapa de producción con Nginx
FROM nginx:alpine

# 8. Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 9. Copiar los archivos construidos desde la etapa builder
COPY --from=builder /app/dist /usr/share/nginx/html

# 10. Exponer puerto 80
EXPOSE 80

# 11. Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]