import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import { productos } from "../data/productos.js";

const router = Router();

/**
 * @route   GET /api/productos
 * @desc    Obtiene el listado completo de productos
 * @access  Público
 */
router.get("/", (req, res) => {
  // Retorna el listado completo de productos con código HTTP 200 (OK)
  res.status(200).json(productos);
});

/**
 * @route   GET /api/productos/:id
 * @desc    Obtener un producto por su ID desde MongoDB
 * @access  Público
 */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validar si el formato del ID es un ObjectId válido de MongoDB
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    // Buscar el producto por ID en la base de datos
    const producto = await Product.findById(id);

    // Si no se encuentra el producto, responder con 404
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Responder con código 200 y el producto encontrado
    return res.status(200).json(producto);
  } catch (error) {
    // Propagar el error al middleware errorHandler
    next(error);
  }
});

export default router;

