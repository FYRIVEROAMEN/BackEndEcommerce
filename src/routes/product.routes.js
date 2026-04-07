import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import router from "./user.routes.js";


const Router = express.Router ();

//Ruta para obtener todos los productos

router.get ("/products", getProducts )


//ruta para obtener un producto por id
router.get("/products/:id", getProductById )   

//ruta para crear un nuevo producto
Router.post("/products", createProduct )

//ruta para actualizar un producto existente
Router.put("/products/:id", updateProduct )

//ruta para eliminar un producto
Router.delete("/products/:id", deleteProduct )

export default Router;