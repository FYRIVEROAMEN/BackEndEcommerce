import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";


const PORT = process.env.PORT || 3000; 

console.log(" Intentando arrancar el motor...");


console.log(" La URI que estoy usando es:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log(" Conexión exitosa a MongoDB");

    app.listen(PORT, () => {
        
        console.log(` Servidor escuchando en el puerto: ${PORT}`);
    });
})
.catch((error) => {
    console.error("ERROR CRÍTICO AL CONECTAR:", error.message);
    process.exit(1); 
});