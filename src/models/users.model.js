import mongoose from "mongoose";   
const Schema = mongoose.Schema;


// el esquema de usuario va a definir la estructura de los documentos que se van a guardar en la colección de usuarios
const userSchema = new Schema({

    name: { type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
            trim: true, // esto es para eliminar los espacios en blanco al inicio y al final del nombre, de esta forma nos aseguramos de que el nombre se guarda de forma limpia en la base de datos, sin espacios innecesarios que puedan causar problemas al buscar o mostrar los usuarios
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
         default: 'user', 
         enum: ['user', 'admin'] // esto es para definir un conjunto de valores permitidos para el campo de role, de esta forma solo se pueden asignar los valores 'user' o 'admin' al campo de role, lo que ayuda a mantener la integridad de los datos y evitar errores al asignar roles a los usuarios
        },

    bornDate: {type: Date},

    createdAt: {type: Date,
         default: Date.now
        }

})


// crear el modelo de usuario a partir del esquema definido, el modelo es la interfaz que vamos a usar para interactuar con la colección de usuarios en la base de datos
const User = mongoose.model('User', userSchema);
 
    export default User;


    