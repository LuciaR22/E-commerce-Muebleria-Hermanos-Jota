import Product from "../models/Product.js";

/**
 * Obtiene todos los productos almacenados en la base de datos.
 *
 * @param {import("express").Request}  _req - Objeto de solicitud HTTP (no utilizado).
 * @param {import("express").Response} res  - Objeto de respuesta HTTP.
 * @param {import("express").NextFunction} next - Función para propagar errores al errorHandler.
 * @returns {Promise<void>} Responde con un array JSON de productos (200) o delega el error.
 */
const obtenerProductos = async (_req, res, next) => {
    try {
        const productos = await Product.find();
        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
};

/**
 * Obtiene un producto por su ID de MongoDB.
 *
 * @param {import("express").Request}  req  - Objeto de solicitud HTTP; se espera `req.params.id`.
 * @param {import("express").Response} res  - Objeto de respuesta HTTP.
 * @param {import("express").NextFunction} next - Función para propagar errores al errorHandler.
 * @returns {Promise<void>} Responde con el producto (200), not found (404), o delega el error.
 */
const obtenerProductoPorId = async (req, res, next) => {
    try {
        const producto = await Product.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        return res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
};

export { obtenerProductos, obtenerProductoPorId };
