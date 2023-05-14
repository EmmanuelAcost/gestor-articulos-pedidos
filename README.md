Gestor de pedidos y articulos 

en esta Aplicacion podremos gestionar toda la logista de creacion de articulos y la programacion de pedidos teniendo encuenta los articulos registrados.

Requisitos previos
Node.js (versión v18.15.0)
npm (versión 9.5.0)
json-server (versión 0.17.3)

pasos de configuracion del proyecto

1. Clona el repositorio en tu máquina local 
    git clone <URL_DEL_REPOSITORIO>

2. Navega al directorio del proyecto
    cd nombre-del-proyecto
3. Instala las dependencias del proyecto
    npm install
4. Inicia el servidor de desarrollo
    npm start 
    (tener encuenta que el servidor de desarrollo se ejecutara en el puerto 3000)
5. Iniciar servido de json-server
    json-server --watch ./src/db/db.json --port 3001
    (tener encuenta que el servidor de json-server se ejecutara en el puerto 3001 pero se puede cambiar por el de preferencia)
    