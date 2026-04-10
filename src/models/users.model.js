import mongoose from "mongoose"; 

const Schema = mongoose.Schema;

// Definición del esquema de usuario
const userSchema = new Schema({
    name: { 
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
        match: /^[a-zA-Z\s]+$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 70,
        lowercase: true,
        trim: true,
        match: /^\S+@\S+\.\S+$/ 
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
        trim: true
    },
    role: {
        type: String,
        default: 'client', // Cambiado de 'user' a 'client' según requerimientos
        enum: ['client', 'admin'] // Solo permite estos dos valores
    },
    birthdate: { 
        type: Date 
    },
    province: { 
        type: String 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
export default User;