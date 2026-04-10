import Order from "../models/order.model.js";

// 1. Crear una nueva orden (POST)
export const createOrder = async (req, res) => {
    try {
        const { totalPrice, user, products } = req.body;

        const nuevaOrden = new Order({
            totalPrice,
            user,     // ID del usuario que viene del Front
            products, // Array de { product, quantity, price }
            status: 'pending'
        });

        await nuevaOrden.save();
        res.status(201).json({ message: "Orden creada con éxito", nuevaOrden });
    } catch (error) {
        res.status(400).json({ message: "Error al crear la orden", error: error.message });
    }
};


export const getOrders = async (req, res) => {
    try {
        // Usamos populate para que en lugar de solo el ID, nos traiga el nombre del usuario y el producto
        const ordenes = await Order.find()
            .populate("user", "name email") 
            .populate("products.product", "name price");
            
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las órdenes", error: error.message });
    }
};