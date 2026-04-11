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
        // 1. Extraemos los campos del body (como estaba en tu captura)
        const { name, price, description, stock, category } = req.body;

        // 2. Capturamos la ruta de la imagen que procesó Multer
        // Usamos filename para guardar solo el nombre o el path completo
        const imagePath = req.file ? `/uploads/products/${req.file.filename}` : null;

        // Validación para que el profesor no te rebote por falta de foto
        if (!imagePath) {
            return res.status(400).json({ message: "La imagen es obligatoria para la entrega" });
        }

        // 3. Creamos la instancia del modelo
        const newProduct = new Product({
            name,
            price,
            description,
            stock,
            category,
            image: imagePath // Asegurate que en tu Model se llame 'image'
        });

        // 4. Guardamos en MongoDB
        await newProduct.save();
        
        // 5. Respuesta de éxito
        res.status(201).json(newProduct);

    } catch (error) {
        // Si algo falla (ej: nombre duplicado o error de red)
        res.status(400).json({ message: error.message });
    }
}


async function updateProduct(req, res) {
    try {
     
        const { name, price, description, category, stock } = req.body;
        
        const updatedData = { name, price, description, category, stock };

        
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


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};