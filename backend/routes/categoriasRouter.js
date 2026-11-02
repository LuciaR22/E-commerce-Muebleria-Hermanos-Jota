import { Router } from "express";
import Categoria from "../models/Categoria.js";

const router = Router();

router.get("/", async (_req, res, next) => {
    try {
        const categorias = await Categoria.find().sort({ nombre: 1 });
        return res.status(200).json(categorias);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { nombre } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({
                error: "El nombre de la categoría es obligatorio",
            });
        }

        const categoria = await Categoria.create({ nombre });
        return res.status(201).json(categoria);
    } catch (error) {
        next(error);
    }
});

export default router;
