import { Router } from "express";
import { verificarToken } from "../middlewares/auth.js";
import { crearPedido, obtenerMisPedidos } from "../controllers/pedidosController.js";

const router = Router();

// GET /api/pedidos/mis-pedidos  — ruta fija ANTES de /:id
router.get("/mis-pedidos", verificarToken, obtenerMisPedidos);

// POST /api/pedidos
router.post("/", verificarToken, crearPedido);

export default router;
