import express from "express";
import { createUser, getUserById, getUsers ,updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router ();

// Aqui van las rutasas relaconadas con los usuarios

// leer todos los usuarios
router.get ("/users", getUsers);


// Leer un usuario especifico por id
router.get("/users/:id", getUserById); // "/users/:id{/:otro}" con parametro otro opcional.

// crear un nuevo usuario 
router.post("/users", createUser ) 

// actualizar un usuario existente
router.put("/users/:id", updateUser ) 

// eliminar un usuario
router.delete("/users/:id", deleteUser ) 

export default router;