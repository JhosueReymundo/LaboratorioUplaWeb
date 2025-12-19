#FROM node:18-alpine AS builder
#WORKDIR /app
#COPY package*.json ./
#RUN npm ci
#COPY . .
#ARG VITE_API_URL=http://172.16.106.19:3000/api
#ARG VITE_BASE_URL=http://172.16.106.19:3000
#ENV VITE_API_URL=$VITE_API_URL
#ENV VITE_BASE_URL=$VITE_BASE_URL
#RUN npm run build

#FROM nginx:alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=builder /app/dist /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]




FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copiar archivos de dependencias
COPY package*.json ./

# 2. Instalar dependencias
RUN npm ci

# 3. Copiar el resto del código
COPY . .

# 4. SIN VARIABLES DE ENTORNO FIJAS - ahora son dinámicas
# El build se hace con valores por defecto (localhost)
# Las IPs reales las inyecta Nginx en runtime

# 5. Construir la aplicación
RUN npm run build

# 6. Etapa de producción con Nginx
FROM nginx:alpine

# 7. Copiar configuración de nginx inteligente
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 8. Copiar los archivos construidos
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]