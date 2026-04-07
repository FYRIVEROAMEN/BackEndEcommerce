import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true // Requerido por el PDF para la carga de archivos
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String, // Opcional según requerimientos
        default: "General"
    }
}, { timestamps: true }); // Esto crea automáticamente createdAt y updatedAt

const Product = model("Product", productSchema);

export default Product;