import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import { verificarToken } from "../middlewares/auth.js";
import { registro } from "../controllers/authController.js";

const router = Router();

router.post("/registro", registro);

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
        }).select("+password +contrasenia");

        const hash = usuario?.password || usuario?.contrasenia;

        if (!usuario || !hash || !(await bcrypt.compare(password, hash))) {
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
