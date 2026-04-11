import { Router } from "express";
// Cambiamos "../controllers/" por "./" porque están en la MISMA carpeta
import { register, login } from "./auth.controller.js"; 
import upload from "../config/multer.js";

const router = Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);

export default router;