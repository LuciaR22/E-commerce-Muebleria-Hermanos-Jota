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

  const status =
    typeof err.status === "number"
      ? err.status
      : typeof err.statusCode === "number"
        ? err.statusCode
        : 500;

  const isProduction = process.env.NODE_ENV === "production";
  const message =
    status >= 500 && isProduction
      ? "Error interno del servidor"
      : err.message || "Error interno del servidor";

  const body = {
    error: message,
    path: req.originalUrl,
    method: req.method,
  };

  if (!isProduction && err.stack) {
    body.stack = err.stack;
  }

  res.status(status).json(body);
}
