import cors from "cors";

import express from "express";

import user_Routes from "./routes/user.routes.js";

import products_Routes from "./routes/product.routes.js";

import authRoutes from "./auth/auth.routes.js";

import order_Routes from "./routes/order.routes.js";

// crear la aplicacion de expresss
const app = express(); 

app.use(cors()) 
// middlewares para parsear el cuerpo de las solicitudes y manejar datos en formato JSON, esto es necesario para poder recibir datos en el cuerpo de las peticiones POST y PUT, por ejemplo cuando queremos crear o actualizar un usuario
app.use(express.json())

//autentificaciones y autorizaciones
app.use("/api/auth", authRoutes);

// definir las rutas de la aplicacion, en este caso vamos a usar las rutas definidas en el archivo user.routes.js para manejar las operaciones relacionadas con los usuarios
app.use("/api", [ user_Routes , products_Routes, order_Routes] )





export default app; 