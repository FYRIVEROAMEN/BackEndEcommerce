import Product from "../models/product.model.js";


async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
  
        res.status(500).json({ message: error.message });
    }
}


async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function createProduct(req, res) {
    try {
        const { name, price, description, stock, category } = req.body;
        
      
        const imagePath = req.file ? `/uploads/products/${req.file.filename}` : null;

        if (!imagePath) {
            return res.status(400).json({ message: "La imagen es obligatoria para la entrega" });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            stock,
            category,
            image: imagePath
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


async function updateProduct(req, res) {
    try {
        const updatedData = { ...req.body };
        
       
        if (req.file) {
            updatedData.image = `/uploads/products/${req.file.filename}`;
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        
        res.status(200).json(product);
    } catch (error) {
        
        res.status(400).json({ message: error.message });
    }
}


async function deleteProduct(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Exportación al final, como a vos te gusta [cite: 49]
export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};