import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 1. REGISTRO
export const register = async (req, res) => {
    try {
        const { name, email, password, birthdate, province } = req.body;

        // Encriptamos la clave (10 saltos de mono)
        const passwordHash = await bcrypt.hash(password, 10);

        const nuevoUsuario = new User({
            name,
            email,
            password: passwordHash,
            birthdate,
            province
        });

        await nuevoUsuario.save();
        res.status(201).json({ message: "¡Usuario creado con éxito, mi rey!" });
    } catch (error) {
        res.status(400).json({ message: "Error al registrar", error: error.message });
    }
};

// 2. LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscamos al mono en la base de datos
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(404).json({ message: "Email no encontrado" });

        // Comparamos la clave con Bcrypt
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        // Creamos la pulsera VIP (JWT)
        const token = jwt.sign(
            { id: userFound._id, role: userFound.role },
            "CLAVE_SECRETA_DEL_KING", // Esto debería ir en tu .env
            { expiresIn: "1h" }
        );

        res.json({
            token,
            name: userFound.name,
            role: userFound.role
        });
    } catch (error) {
        res.status(500).json({ error, message: "Error en el servidor" });
    }
};