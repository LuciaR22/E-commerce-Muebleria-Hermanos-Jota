/**
 * Middleware que registra en consola el método HTTP y la URL de cada request.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}
