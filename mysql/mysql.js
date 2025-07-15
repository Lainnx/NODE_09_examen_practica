// aqui vamos a crear la conexión a la BD (para no ensuciar el app.js)

import mysql from "mysql2"

//cargar fichero con lod datos de acceso
process.loadEnvFile()

// Configurar la conexión a la base de datos, la clave aqui TIENE QUE SER la que espera mysql para la config, no nombres random
const configConnection = {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    port : process.env.DB_PORT,
    database : process.env.DB_NAME
}

// Exportamos la conexión
export const connection = mysql.createConnection(configConnection)