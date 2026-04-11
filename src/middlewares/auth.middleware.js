import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ 
            message: "Acceso denegado. No se ha proporcionado un token de autenticación." 
        });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        
        req.user = decoded;
        
        
        next();
    } catch (error) {
        return res.status(401).json({ 
            message: "Token inválido o expirado. Autenticación fallida." , error
        });
    }
};

export const isAdmin = (req, res, next) => {
    // req.user viene cargado desde el middleware anterior (verifyToken)
    if (req.user && req.user.role === 'admin') {
        next(); // Si es admin, lo dejamos pasar al controlador
    } else {
        // Si no es admin, lo sacamos carpiendo con un error 403 (Forbidden)
        return res.status(403).json({ 
            message: "Acceso restringido. Se requieren permisos de administrador." 
        });
    }
};