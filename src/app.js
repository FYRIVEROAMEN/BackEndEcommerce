import express from "express";

import User from "./models/users.model.js";
const app = express(); 


//obtener todos los usuarios
app.get("/user", async (peticion , respuesta) => {
   try {

    const usuarios = await User.find()
                                // .select({ password: 0, __v: 0 }) // otra forma de excluir campos, con un objeto
                                .select("-password -__v") // no queremos mostrar e password en la respuesta
  
                                 

    respuesta.send(usuarios);  


   } catch (error) {
    respuesta.send("no se pudo obtener los usuarios")
    console.log (error)
   }
})


app.post("/user", async (peticion , respuesta) => {
  
    try {
   const usuarioData = {
    name: "juan",
    email: "juan@example.com",
    password: "123456",
    role: "admin",
    bornDate: new Date("1990-01-01"),
   };

   const usuario = new User(usuarioData);

   await usuario.save()
    respuesta.send ("Usuario creado exitosamente");

   } catch (error) {
 respuesta.send("algo fallo")
 console.log (error)
   }
})



export default app; 