import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js"; // IMPORTANTE: Sin las llaves { }

const router = express.Router(); 

router.get("/products", getProducts);
router.get("/products/:id", getProductById);

// RUTAS PROTEGIDAS 

router.put("/products/:id", verifyToken, isAdmin, upload.single("image"), updateProduct);

router.delete("/products/:id", verifyToken, isAdmin, deleteProduct);

router.post("/products", verifyToken, isAdmin, upload.single("image"), createProduct);

export default router;