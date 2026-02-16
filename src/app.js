import express from "express";

import user_Routes from "./routes/user.routes.js";

// crear la aplicacion de express
const app = express(); 

// middlewares para parsear el cuerpo de las solicitudes y manejar datos en formato JSON, esto es necesario para poder recibir datos en el cuerpo de las peticiones POST y PUT, por ejemplo cuando queremos crear o actualizar un usuario
app.use(express.json())

// definir las rutas de la aplicacion, en este caso vamos a usar las rutas definidas en el archivo user.routes.js para manejar las operaciones relacionadas con los usuarios
app.use(user_Routes)





// app.get("/users", async (req , res) => {

// })


// app.post("/users", async (req , res) => {
  

// })



export default app; 