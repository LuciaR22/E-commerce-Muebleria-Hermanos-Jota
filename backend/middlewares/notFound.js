/**
 * Responde 404 para rutas que no coinciden con ningún handler registrado.
 * Debe montarse después de todas las rutas de la aplicación.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export function notFound(req, res) {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
    method: req.method,
  });
}
