
import { Router } from "express";
import Usuario from "../models/Usuario.js";
import { verificarToken } from "../middlewares/auth.js";
import { registro, login } from "../controllers/authController.js";

const router = Router();

// POST /api/usuarios/registro
router.post("/registro", registro);

// POST /api/usuarios/login
router.post("/login", login);

// GET /api/usuarios/perfil
router.get("/perfil", verificarToken, async (req, res, next) => {
    try {
        // 1. Obtener el ID del usuario desde el token
        const usuarioId = req.usuario?.id || req.usuario?._id;

        // 2. Buscar el usuario en la base de datos sin las contraseñas
        const usuario = await Usuario.findById(usuarioId).select(
            "-password -contrasenia"
        );

        // 3. Verificar que el usuario exista
        if (!usuario) {
            return res.status(404).json({
                error: "Usuario no encontrado",
            });
        }

        // 4. Responder con los datos del usuario
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
