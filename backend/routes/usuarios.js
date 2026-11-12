import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import { verificarToken } from "../middleware/auth.js";

const router = Router();

router.post("/registro", async (req, res, next) => {
    try {
        const { nombre, email, password } = req.body ?? {};

        if (
            typeof nombre !== "string" ||
            !nombre.trim() ||
            typeof email !== "string" ||
            !email.trim() ||
            typeof password !== "string" ||
            !password
        ) {
            return res.status(400).json({
                error: "Nombre, email y contraseña son obligatorios",
            });
        }

        const passwordHasheada = await bcrypt.hash(password, 10);
        const usuario = await Usuario.create({
            nombre: nombre.trim(),
            email: email.trim().toLowerCase(),
            password: passwordHasheada,
        });

        return res.status(201).json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
        });
    } catch (error) {
        return next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body ?? {};

        if (
            typeof email !== "string" ||
            !email.trim() ||
            typeof password !== "string" ||
            !password
        ) {
            return res.status(400).json({
                error: "Email y contraseña son obligatorios",
            });
        }

        const usuario = await Usuario.findOne({
            email: email.trim().toLowerCase(),
        });

        if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
            return res.status(401).json({
                error: "Credenciales inválidas",
            });
        }

        const token = jwt.sign(
            { id: String(usuario._id), rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            token,
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
            },
        });
    } catch (error) {
        return next(error);
    }
});

router.get("/perfil", verificarToken, async (req, res, next) => {
    try {
        const usuarioId = req.usuario?.id || req.usuario?._id;

        const usuario = await Usuario.findById(usuarioId).select("-password");

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.status(200).json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
        });
    } catch (error) {
        return next(error);
    }
});

export default router;
