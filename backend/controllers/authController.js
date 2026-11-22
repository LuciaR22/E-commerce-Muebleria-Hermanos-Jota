import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";

/**
 * Registra un nuevo usuario en la base de datos.
 *
 * @param {import("express").Request} req - Objeto de solicitud HTTP.
 * @param {import("express").Response} res - Objeto de respuesta HTTP.
 * @param {import("express").NextFunction} next - Función para delegar errores a errorHandler.
 * @returns {Promise<void>}
 */
export const registro = async (req, res, next) => {
    try {
        const { nombre, email, password } = req.body ?? {};

        // 1. Validar que no falten campos obligatorios y que sean strings no vacíos
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

        // 2. Validar que la contraseña tenga al menos 6 caracteres
        if (password.length < 6) {
            return res.status(400).json({
                error: "La contraseña debe tener al menos 6 caracteres",
            });
        }

        const emailNormalizado = email.trim().toLowerCase();

        // 3. Verificar si el email ya existe de forma preventiva
        const usuarioExistente = await Usuario.findOne({ email: emailNormalizado });
        if (usuarioExistente) {
            return res.status(409).json({
                error: "El email ya se encuentra registrado",
            });
        }

        // 4. Hashear la contraseña con bcrypt.hash(password, 10)
        const passwordHasheada = await bcrypt.hash(password, 10);

        // 5. Crear el usuario en la base de datos (con rol 'cliente' por defecto)
        const nuevoUsuario = await Usuario.create({
            nombre: nombre.trim(),
            email: emailNormalizado,
            password: passwordHasheada,
            contrasenia: passwordHasheada,
            rol: "cliente",
        });

        // 6. Responder 201 devolviendo datos del usuario sin el campo password
        return res.status(201).json({
            _id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email,
            rol: nuevoUsuario.rol,
        });
    } catch (error) {
        return next(error);
    }
};
