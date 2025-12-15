FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=http://172.16.106.19:3000/api
ARG VITE_BASE_URL=http://172.16.106.19:3000
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]