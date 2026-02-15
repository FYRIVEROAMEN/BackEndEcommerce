//importamos variables de entorno
import dotenv from "dotenv";
// las variables de entorno se cargan en process.env
dotenv.config();
import app from "./app.js";
import mongoose from "mongoose";

// import express from "express";
// const app = express();
const PORT = 3000;

// console.log("iniciando el servidor1...");

mongoose.connect(process.env.MONGO_URI)
                .then(() => {
                  console.log ("Conexión exitosa a MongoDB");

// como configuramos funcionalidades de nuestro servidor 
                  // app.get("/users", (peicion , respuesta) => {
//es fundamental enviar una respuesta al 
//                   respuesta.send ("lista de usuarios333");
    
// })
//                   app.post("/users", (peicion , respuesta) => {
//                   respuesta.send ("crear un nuevo usuario");
// })  //poniendolo a escuchar en la linea de abajo
                  app.listen(PORT, () => {
                  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


                })  // then final 
                .catch((error) => {
                    console.error("Error al conectar a MongoDB:", error);
                });

