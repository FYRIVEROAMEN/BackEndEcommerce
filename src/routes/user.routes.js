import express from "express";
import { createUser, getUserById, getUsers ,updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken , isAdmin } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";

const router = express.Router ();

router.get ("/users", verifyToken, isAdmin , getUsers);
router.get("/users/:id", getUserById);
router.post("/users", upload.single("image"), createUser);
router.put("/users/:id", upload.single("image"), updateUser);
router.delete("/users/:id", verifyToken, isAdmin, deleteUser);

export default router;