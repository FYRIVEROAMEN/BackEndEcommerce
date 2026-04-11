import { Router } from "express";
import { createOrder, getOrders } from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js"; 

const router = Router();

// Protegemos la ruta: para comprar, hay que tener token
router.get("/orders", verifyToken, getOrders);   
router.post("/orders", verifyToken, createOrder); 

export default router;