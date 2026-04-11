import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
    try {
        const { user, products, totalPrice, status } = req.body;

        const newOrder = new Order({
            user,
            products,
            totalPrice,
            status: status || 'pending'
        });

        const savedOrder = await newOrder.save();
        
        res.status(201).json({
            message: "Orden creada con éxito",
            order: savedOrder
        });
    } catch (error) {
        res.status(400).json({ 
            message: "No se pudo procesar la orden", 
            error: error.message 
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('products.product', 'name price');
            
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ 
            message: "Error al obtener las órdenes", 
            error: error.message 
        });
    }
};