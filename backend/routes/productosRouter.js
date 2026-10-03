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

export default router;
