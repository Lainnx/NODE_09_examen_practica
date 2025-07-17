/*npm i express mysql2*/

// Importar las dependencias
import express from "express";
import {connection} from "./mysql/mysql.js"
import send from "send";
import { connect } from "http2";

// Obtener el puerto del servidor
process.loadEnvFile()
const PORT = process.env.PORT || 5000;
console.log(PORT);
// Crear la aplicación
const app = express();

//Donde esta la ruta de los ficheros estaticos/ public
app.use(express.static(process.cwd() + "/public"))

// RUTAS

app.get("/",(req,res)=>{
    // res.send("Aquí irá la página inicial")
    res.sendFile("/index.html")
})


app.get("/alumnos",(req,res)=>{
    const query ="SELECT * from alumno;"
    // es el connection que importamos de arriba, err obligatorio para manejar error, result lo que devolvera, field campo optativo
    connection.query(query,(err, result)=>{
        if(err) throw err /*levanta el mensaje de error y para el programa*/
        // console.log(result);
        res.json(result) // devuelve json con resultado del select
    })
})

app.get("/alumnos/:iniciales",(req,res)=>{
    const query2 = `SELECT * from alumno WHERE apellido1 LIKE "${req.params.iniciales}%" ORDER BY apellido1, apellido2;` /*IMPORTANTE COMILLAS*/
    
    connection.query(query2,(err,result)=>{
        // console.log(result);
        if(err) throw err 
        if(result.length == 0) { /*cuando no encuentra nada (datos)*/
            return res.status(404).json({"mensaje":"Alumno no encontrado"})
        }
        res.json(result)
    })
})

app.get("/alumnos/:iniciales1/:iniciales2",(req,res)=>{
    const query3 = `SELECT * FROM alumno WHERE apellido1 LIKE "${req.params.iniciales1}%" and apellido2 LIKE "${req.params.iniciales2}%";`

    connection.query(query3,(err,result)=>{
        // console.log(result);
        if(err) throw err
        if(result.length == 0) { /*cuando no encuentra nada (datos)*/
            return res.status(404).json({"mensaje":"Alumno no encontrado"})
        }
        res.json(result)
    })
})


// ruta 404
app.use((req,res)=>{
    res.status(404).send("<h1>Página no encontrada</h1>")
})


app.listen(PORT, ()=>{
    console.log(`Servidor levantado en http://127.0.0.1:${PORT}`);
})