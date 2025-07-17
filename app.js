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


// /profesor/apellidoProfe/nombreProfe -> nombre, apellido, asignaturas
// {"nombre_profesor": "Rafael", "apellido_profesor": "Murcia", "asignaturas":["x","y","z",...]}
app.get("/profesor/:apellido/:nombre", (req,res)=>{
    const query4 = `SELECT p.nombre as "nombre_profesor", p.apellido1 as "apellido_profesor_1", p.apellido2 as "apellido_profesor_2"
FROM profesor p 
WHERE p.nombre ="${req.params.nombre}" and p.apellido1 ="${req.params.apellido}";`
    const query5 = `SELECT a.nombre 
FROM profesor p 
NATURAL JOIN impartir i 
JOIN asignatura a
ON i.idAsignatura = a.idAsignatura
WHERE p.nombre ="${req.params.nombre}" and p.apellido1 ="${req.params.apellido}";`

    let asignaturas = [] // array que tendra las asignaturas y a la que luego de daremos un nombre en el objeto y el array sera el valor 
    let profesor = {} // objeto final que tendra los datos que queremos

    connection.query(query4,(err,result1)=>{
        if(err) throw err
        if(result1.length == 0) { /*cuando no encuentra nada (datos)*/
            return res.status(404).json({"mensaje":"Alumno no encontrado"})
        }
        result1.forEach((a)=>{
            // console.log(a.nombre_profesor);
            // console.log(a.apellido_profesor_1);
            // console.log(a.apellido_profesor_2);
            profesor = a
        })
    })

    connection.query(query5,(err,result2)=>{
        if(err) throw err
        if(result2.length == 0) { /*cuando no encuentra nada (datos)*/
            return res.status(404).json({"mensaje":"Alumno no encontrado"})
        }
        result2.forEach((asignatura)=>{
            // console.log(asignatura.nombre);
            asignaturas.push(asignatura.nombre)
            
        })
        // console.log(asignaturas);
        profesor.asignaturas = asignaturas
        console.log(profesor);
    })

})



// ruta 404
app.use((req,res)=>{
    res.status(404).send("<h1>Página no encontrada</h1>")
})


app.listen(PORT, ()=>{
    console.log(`Servidor levantado en http://127.0.0.1:${PORT}`);
})