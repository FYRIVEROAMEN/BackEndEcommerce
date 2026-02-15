import mongoose from "mongoose";   
const schema = mongoose.Schema;


// el esquema de usuario va a definir la estructura de los documentos que se van a guardar en la colección de usuarios
const userSchema = new schema({
    name: String,
    email: String,
    password: String,
    role: String,
    bornDate: Date,
})


// crear el modelo de usuario a partir del esquema definido, el modelo es la interfaz que vamos a usar para interactuar con la colección de usuarios en la base de datos
const User= mongoose.model('User', userSchema);
 
    export default User;