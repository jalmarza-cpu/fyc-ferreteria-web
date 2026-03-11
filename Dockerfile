# Construcción
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Producción
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

EXPOSE 80
CMD /bin/sh -c 'echo "SERVIDOR ACTIVO EN PUERTO 80" && serve -s dist -l 80'
