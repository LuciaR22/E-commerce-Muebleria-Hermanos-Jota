
import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import Categoria from "../models/Categoria.js";
import { obtenerProductos } from "../controllers/productoController.js";
import { soloAdmin, verificarToken } from "../middlewares/auth.js";

const router = Router();

const validarCategoria = async (categoriaId) => {
    if (!categoriaId && categoriaId !== 0) {
        return;
    }

    if (!mongoose.isValidObjectId(String(categoriaId))) {
        const error = new Error("ID de categoría inválido");
        error.status = 400;
        throw error;
    }

    const categoria = await Categoria.findById(categoriaId);

    if (!categoria) {
        const error = new Error("La categoría no existe");
        error.status = 400;
        throw error;
    }
};

/**
 * @route POST /api/productos
 * @desc Crea un nuevo producto
 */
router.post("/", verificarToken, soloAdmin, async (req, res, next) => {
    try {
        const { categoria, ...datosProducto } = req.body;

        if (categoria !== undefined) {
            await validarCategoria(categoria);
        }

        const nuevoProducto = await Product.create({
            ...datosProducto,
            categoria,
        });
        return res.status(201).json(nuevoProducto);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ error: error.message });
        }

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

        const producto = await Product.findById(id).populate("categoria", "nombre");

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
router.put("/:id", verificarToken, soloAdmin, async (req, res, next) => {
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

        if (Object.prototype.hasOwnProperty.call(datosActualizacion, "categoria")) {
            if (datosActualizacion.categoria === undefined || datosActualizacion.categoria === null || datosActualizacion.categoria === "") {
                delete datosActualizacion.categoria;
            } else {
                await validarCategoria(datosActualizacion.categoria);
            }
        }

        const productoActualizado = await Product.findByIdAndUpdate(
            id,
            datosActualizacion,
            {
                new: true,
                runValidators: true,
            }
        ).populate("categoria", "nombre");

        if (!productoActualizado) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }

        return res.status(200).json(productoActualizado);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ error: error.message });
        }

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
router.delete("/:id", verificarToken, soloAdmin, async (req, res, next) => {
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
