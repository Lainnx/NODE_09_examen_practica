/*npm i express mysql2*/

// Importar las dependencias
import express from "express";
import {connection} from "./mysql/mysql.js"

// Obtener el puerto del servidor
process.loadEnvFile()
const PORT = process.env.PORT || 5000;
console.log(PORT);
// Crear la aplicación
const app = express();

// RUTAS

app.get("/",(req,res)=>{

})



app.listen(PORT, ()=>{
    console.log(`Servidor levantado en http://127.0.0.1:${PORT}`);
})