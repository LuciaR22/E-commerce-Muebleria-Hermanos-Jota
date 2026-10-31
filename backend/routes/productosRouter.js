
import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import { obtenerProductos } from "../controllers/productoController.js";

const router = Router();

/**
 * @route POST /api/productos
 * @desc Crea un nuevo producto
 */
router.post("/", async (req, res, next) => {
    try {
        const nuevoProducto = await Product.create(req.body);
        return res.status(201).json(nuevoProducto);
    } catch (error) {
        next(error);
    }
});

/**
 * @route GET /api/productos
 * @desc Obtiene todos los productos
 */
router.get("/", obtenerProductos);

/**
 * @route GET /api/productos/:id
 * @desc Obtiene un producto por su ID
 */
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "ID de producto inválido",
            });
        }

        const producto = await Product.findById(id);

        if (!producto) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }

        return res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
});

/**
 * @route PUT /api/productos/:id
 * @desc Actualiza un producto existente
 */
router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "ID de producto inválido",
            });
        }

        const datosActualizacion = { ...req.body };

        delete datosActualizacion._id;
        delete datosActualizacion.__v;

        const productoActualizado = await Product.findByIdAndUpdate(
            id,
            datosActualizacion,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!productoActualizado) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }

        return res.status(200).json(productoActualizado);
    } catch (error) {
        next(error);
    }
});

/**
 * @route DELETE /api/productos/:id
 * @desc Elimina un producto por su ID
 * @response 200 - Producto eliminado correctamente
 * @response 400 - ID inválido
 * @response 404 - Producto no encontrado
 */
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "ID de producto inválido",
            });
        }

        const productoEliminado = await Product.findByIdAndDelete(id);

        if (!productoEliminado) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }

        return res.status(200).json({
            mensaje: "Producto eliminado correctamente",
            producto: productoEliminado,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
