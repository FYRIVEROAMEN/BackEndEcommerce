import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        // Capturamos todos los campos necesarios del body
        const { name, email, password, birthdate, province, role } = req.body;

        
        const passwordHash = await bcrypt.hash(password, 10);

        const nuevoUsuario = new User({
            name,
            email,
            password: passwordHash,
            birthdate,
            province,
            role: role || 'client' // Si no viene nada en el JSON, se guarda como 'client'
        });

        await nuevoUsuario.save();
        res.status(201).json({ message: "¡Usuario creado con éxito, mi rey!" });
    } catch (error) {
        res.status(400).json({ message: "Error al registrar", error: error.message });
    }
};

// 2. LOGIN: Devuelve el token y el rol para el Navbar
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(404).json({ message: "Email no encontrado" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        // Generamos el Token con el ID y el Rol
        const token = jwt.sign(
            { id: userFound._id, role: userFound.role },
            "CLAVE_SECRETA_DEL_KING", 
            { expiresIn: "1h" }
        );

        // Enviamos la pulsera VIP al Frontend
        res.json({
            token,
            name: userFound.name,
            role: userFound.role
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};