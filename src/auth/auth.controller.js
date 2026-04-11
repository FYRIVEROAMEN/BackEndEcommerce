import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password, birthdate, province } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "el usuario ya existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imagePath = req.file ? `/uploads/users/${req.file.filename}` : "/uploads/users/default.png";

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            birthdate,
            province,
            image: imagePath
        });

        await newUser.save();

        res.status(201).json({ message: "usuario creado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "error al registrar usuario", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                image: user.image
            }
        });
    } catch (error) {
        res.status(500).json({ message: "error al iniciar sesión",error });
    }
};