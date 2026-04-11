import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === "image" ? "products" : "users";
        cb(null, `uploads/${folder}`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error("Error: El archivo debe ser una imagen válida (jpeg, jpg, png o webp)"));
};

// Guardamos la configuración en una constante
const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } 
});

// ESTA ES LA LÍNEA CLAVE QUE FALTABA:
export default upload;