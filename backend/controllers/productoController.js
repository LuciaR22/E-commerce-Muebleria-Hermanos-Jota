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

export { obtenerProductos };
