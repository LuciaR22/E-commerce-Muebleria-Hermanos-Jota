
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
        const usuarioExistente = await Usuario.findOne({
            email: emailNormalizado,
        });

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

/**
 * Inicia sesión de un usuario y genera un token JWT.
 *
 * @param {import("express").Request} req - Objeto de solicitud HTTP.
 * @param {import("express").Response} res - Objeto de respuesta HTTP.
 * @param {import("express").NextFunction} next - Función para delegar errores a errorHandler.
 * @returns {Promise<void>}
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body ?? {};

        // 1. Validar que se hayan enviado email y contraseña
        if (
            typeof email !== "string" ||
            !email.trim() ||
            typeof password !== "string" ||
            !password
        ) {
            return res.status(401).json({
                error: "Credenciales inválidas",
            });
        }

        // 2. Buscar el usuario por email incluyendo los campos de contraseña
        const usuario = await Usuario.findOne({
            email: email.trim().toLowerCase(),
        }).select("+password +contrasenia");

        // 3. Obtener la contraseña hasheada del usuario
        const passwordGuardada =
            usuario?.password || usuario?.contrasenia;

        // 4. Comparar la contraseña ingresada con la contraseña guardada
        if (
            !usuario ||
            !passwordGuardada ||
            !(await bcrypt.compare(password, passwordGuardada))
        ) {
            return res.status(401).json({
                error: "Credenciales inválidas",
            });
        }

        // 5. Verificar que exista la clave secreta para firmar el JWT
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET no está configurado");
        }

        // 6. Firmar el token incluyendo el ID del usuario y su vencimiento
        const token = jwt.sign(
            {
                id: String(usuario._id),
                rol: usuario.rol,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1h",
            }
        );

        // 7. Responder 200 con el token y los datos del usuario sin contraseña
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
};
