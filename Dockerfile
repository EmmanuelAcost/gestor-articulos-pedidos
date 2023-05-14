# Imagen base
FROM node:14-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el código fuente de la aplicación
COPY . .

# Puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
