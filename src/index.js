import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";

const PORT = 3000;

console.log("🐒 Intentando arrancar el motor del King...");

// Usamos la variable que cargamos desde el .env
console.log("🍌 La URI que estoy usando es:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conexión exitosa a MongoDB");

    // RECIÉN ACÁ, cuando la base de datos está lista, abrimos el local
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // Si llegamos acá, es que algo explotó en el camino
    console.error("❌ ERROR CRÍTICO AL CONECTAR:", error.message);
  });