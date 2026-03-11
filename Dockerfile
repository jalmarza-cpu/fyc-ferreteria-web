# Construcción
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Resolver bug the npm / rollup en Alpine Linux
RUN npm install @rollup/rollup-linux-x64-musl
RUN npm ci
COPY . .
RUN npm run build

# Producción
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar Nginx Configuration
# Log de Éxito en Build
RUN echo "🚀 [BUILD] F Y C ACTUALIZADO EXITOSAMENTE - Listo para Vender!"

# Copiar la configuración de Nginx limpia externa
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Custom startup script that prints the message and starts Nginx
CMD sh -c 'echo "🚀 [F Y C SOLUCIONES FERRETERAS] CONTAINED ACTUALIZADO EXITOSAMENTE - Listo para Vender!" && nginx -g "daemon off;"'
