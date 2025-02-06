# Etapa 1: Construcción
FROM node:18 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación Angular
RUN npm run build --prod

# Listar el contenido del directorio de construcción
RUN ls -la /app/dist
RUN ls -la /app/dist/front-order-test
RUN ls -la /app/dist/front-order-test/browser

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist/front-order-test/browser /usr/share/nginx/html

# Copiar nginx.conf personalizado para escuchar en el puerto 4200
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Exponer el puerto 4200
EXPOSE 4200

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
