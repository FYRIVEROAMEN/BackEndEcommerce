import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

// Configuramos las rutas de archivos para que static no falle
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import user_Routes from "./routes/user.routes.js";
import products_Routes from "./routes/product.routes.js";
import authRoutes from "./auth/auth.routes.js";
import order_Routes from "./routes/order.routes.js";

dotenv.config();

const app = express(); 

// Middlewares 
app.use(cors());
app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Definición de rutas
app.use("/api/auth", authRoutes);
app.use("/api", [user_Routes, products_Routes, order_Routes]);

export default app;