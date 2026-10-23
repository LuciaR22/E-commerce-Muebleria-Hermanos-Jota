import { Router } from "express";
import { obtenerProductos, obtenerProductoPorId } from "../controllers/productoController.js";

const router = Router();

/**
 * @route   GET /api/productos
 * @desc    Obtiene el listado completo de productos desde la base de datos
 * @access  Público
 */
router.get("/", obtenerProductos);

/**
 * @route   GET /api/productos/:id
 * @desc    Obtener un producto por su ID
 * @access  Público
 */
router.get("/:id", obtenerProductoPorId);

export default router;
