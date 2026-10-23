import { Router } from "express";
import { productos } from "../data/productos.js";
import { obtenerProductos } from "../controllers/productoController.js";

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
router.get("/:id", (req, res) => {
  const productoId = Number(req.params.id);
  const producto = productos.find((p) => p.id === productoId);

  // Validación de existencia
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  return res.status(200).json(producto);
});

export default router;
