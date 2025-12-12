# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copiar archivos de dependencias
COPY package*.json ./

# 2. Instalar TODAS las dependencias (incluyendo devDependencies para el build)
RUN npm ci  # ← QUITA --only=production

# 3. Copiar el resto del código
COPY . .

# 4. Variables de entorno para BUILD
ARG VITE_API_URL=http://172.16.106.19:3000/api
ARG VITE_BASE_URL=http://172.16.106.19:3000
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

# 5. Construir la aplicación
RUN npm run build

# 6. Etapa de producción con Nginx
FROM nginx:alpine

# 7. Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 8. Copiar los archivos construidos
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]