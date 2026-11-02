import mongoose from "mongoose";
import Product from "../models/Product.js";

/**
 * Obtiene todos los productos almacenados en la base de datos.
 *
 * @param {import("express").Request} req - Objeto de solicitud HTTP.
 * @param {import("express").Response} res  - Objeto de respuesta HTTP.
 * @param {import("express").NextFunction} next - Función para propagar errores al errorHandler.
 * @returns {Promise<void>} Responde con un array JSON de productos (200) o delega el error.
 */
const obtenerProductos = async (req, res, next) => {
    try {
        const { categoria } = req.query;
        const filtro = {};

        if (categoria) {
            if (!mongoose.isValidObjectId(String(categoria))) {
                return res.status(400).json({
                    error: "ID de categoría inválido",
                });
            }

            filtro.categoria = categoria;
        }

        const productos = await Product.find(filtro).populate("categoria", "nombre");
        return res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
};

export { obtenerProductos };
