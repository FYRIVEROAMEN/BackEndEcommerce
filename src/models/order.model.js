import mongoose from "mongoose";

const { Schema } = mongoose;

//lista de compras
const orderProductSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Referencia a tu modelo de productos
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1 
    },
    price: {
        type: Number,
        required: true // Guardamos el precio del momento por si cambia después
    }
});
//prueba//

const orderSchema = new Schema({
    totalPrice: {
        type: Number,
        required: true 
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [orderProductSchema], 
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'cancelled', 'refunded', 'delivered'], 
        default: 'pending' 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;