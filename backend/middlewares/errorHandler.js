const MONGOOSE_CLIENT_ERRORS = new Set(["CastError", "ValidationError"]);

/**
 * Extrae un mensaje legible del ValidationError de Mongoose,
 * concatenando los mensajes de cada campo inválido.
 *
 * @param {import("mongoose").Error.ValidationError} err
 * @returns {string}
 */
const buildValidationMessage = (err) =>
  Object.values(err.errors)
    .map((e) => e.message)
    .join(", ");

/**
 * Resuelve el status HTTP y el mensaje de error según el tipo de error recibido.
 * - CastError (ej. ObjectId inválido) → 400
 * - ValidationError (ej. campo requerido) → 400
 * - err.status / err.statusCode explícito → ese valor
 * - cualquier otro → 500
 *
 * @param {Error & { status?: number; statusCode?: number; errors?: object }} err
 * @param {boolean} isProduction
 * @returns {{ status: number; message: string }}
 */
const resolveError = (err, isProduction) => {
  if (err.name === "CastError") {
    return { status: 400, message: `ID inválido: '${err.value}' no es un formato reconocido` };
  }

  if (err.name === "ValidationError") {
    return { status: 400, message: buildValidationMessage(err) };
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
 * Maneja errores propagados con `next(err)` desde rutas y middlewares.
 * Debe registrarse al final de la cadena, después de `notFound`.
 *
 * @param {Error & { status?: number; statusCode?: number }} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
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

  if (!isProduction && !MONGOOSE_CLIENT_ERRORS.has(err.name) && err.stack) {
    body.stack = err.stack;
  }

  res.status(status).json(body);
}
