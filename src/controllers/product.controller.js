

async function getProducts(req, res) {
    try {
        res.status(200).send("Obteniendo productos de la selva... 🍌");
    } catch (error) {
        res.status(500).send("Error en el servidor");
        console.log(error);
    }
}

async function getProductById(req, res) {
    try {
        res.status(200).send("Obteniendo producto por ID... 🍌");
    } catch (error) {
        res.status(500).send("Error en el servidor");
        console.log(error);
    }
}

async function createProduct(req, res) {
    try {
        res.status(201).send("Creando un nuevo producto... 🍌");
    } catch (error) {
        res.status(500).send("Error en el servidor");
        console.log(error);
    }
}

async function updateProduct(req, res) {
    try {
        res.status(200).send("Actualizando producto... 🍌") ;
    } catch (error) {
        res.status(500).send("Error en el servidor");
        console.log(error);
    }
}

async function deleteProduct(req, res) {
    try {
        res.status(200).send("Eliminando producto... 🍌") ;
    } catch (error) {
        res.status(500).send("Error en el servidor");
        console.log(error);
    }
}

export {
     getProducts,
     getProductById,
     createProduct,
     updateProduct,
     deleteProduct
}