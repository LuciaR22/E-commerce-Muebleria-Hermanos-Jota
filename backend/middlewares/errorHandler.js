
const MONGOOSE_CLIENT_ERRORS = new Set([
    "CastError",
    "ValidationError",
]);

/**
 * Extrae un mensaje legible del ValidationError de Mongoose.
 */
const buildValidationMessage = (err) =>
    Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");

/**
 * Resuelve el status HTTP y el mensaje según el error recibido.
 */
const resolveError = (err, isProduction) => {
    if (err.name === "CastError") {
        return {
            status: 400,
            message: `ID inválido: '${err.value}' no es un formato reconocido`,
        };
    }

    if (err.name === "ValidationError") {
        return {
            status: 400,
            message: buildValidationMessage(err),
        };
    }

    if (err.code === 11000) {
        const keys = Object.keys(err.keyValue || err.keyPattern || {});
        const field = keys[0];
        let message = "El recurso ya existe";

        if (field === "email") {
            message = "El email ya se encuentra registrado";
        } else if (field === "nombre") {
            message = "La categoría ya existe";
        }

        return {
            status: 409,
            message,
        };
    }

    const status =
        typeof err.status === "number"
            ? err.status
            : typeof err.statusCode === "number"
                ? err.statusCode
                : 500;

    const message =
        status >= 500 && isProduction
            ? "Error interno del servidor"
            : err.message || "Error interno del servidor";

    return { status, message };
};

/**
 * Middleware centralizado para manejar errores.
 */
export function errorHandler(err, req, res, _next) {
    console.error(err);

    const isProduction = process.env.NODE_ENV === "production";
    const { status, message } = resolveError(err, isProduction);

    const body = {
        error: message,
        path: req.originalUrl,
        method: req.method,
    };

    if (
        !isProduction &&
        !MONGOOSE_CLIENT_ERRORS.has(err.name) &&
        err.stack
    ) {
        body.stack = err.stack;
    }

    res.status(status).json(body);
}
