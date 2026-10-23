import { Router } from "express";
import Product from "../models/Product.js";
import { productos } from "../data/productos.js";

const router = Router();

/**
 * @route   POST /api/productos
 * @desc    Crea un nuevo producto en la base de datos
 * @access  Privado (Admin)
 */
router.post("/", async (req, res, next) => {
  try {
    // crear el producto en mongodb con los datos del body
    const nuevoProducto = await Product.create(req.body);

    // responder 201 con el documento creado
    return res.status(201).json(nuevoProducto);
  } catch (err) {
    // pasar el error al middleware errorHandler
    next(err);
  }
});

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
