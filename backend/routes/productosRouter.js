import { Router } from "express";
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
