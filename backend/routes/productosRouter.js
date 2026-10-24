import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import { obtenerProductos } from "../controllers/productoController.js";

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
 * @desc    Obtiene el listado completo de productos desde la base de datos
 * @access  Público
 */
router.get("/", obtenerProductos);

/**
 * @route   GET /api/productos/:id
 * @desc    Obtener un producto por su ID desde MongoDB
 * @access  Público
 */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // validar si el formato del ID es un ObjectId válido de MongoDB
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    // buscar el producto por ID en la base de datos
    const producto = await Product.findById(id);

    // si no se encuentra el producto, responder con 404
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // responder con código 200 y el producto encontrado
    return res.status(200).json(producto);
  } catch (error) {
    // propagar el error al middleware errorHandler
    next(error);
  }
});

/**
 * @route   PUT /api/productos/:id
 * @desc    Actualiza un producto existente por su ID
 * @access  Privado (Admin)
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // validar si el formato del ID es un ObjectId válido de MongoDB
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    // remover campos inmutables si vinieran en el body para prevenir errores de Mongoose
    const datosActualizacion = { ...req.body };
    delete datosActualizacion._id;
    delete datosActualizacion.__v;

    // actualizar el producto aplicando las validaciones del esquema y retornando el documento modificado
    const productoActualizado = await Product.findByIdAndUpdate(
      id,
      datosActualizacion,
      { new: true, runValidators: true }
    );

    // si devuelve null, el producto no existe en la base de datos
    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // responder 200 con el producto ya actualizado
    return res.status(200).json(productoActualizado);
  } catch (error) {
    // propagar el error al middleware errorHandler (validaciones del schema -> 400)
    next(error);
  }
});

export default router;
