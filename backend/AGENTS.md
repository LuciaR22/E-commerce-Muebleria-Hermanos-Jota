# AGENTS.md — Backend de Mueblería Hermanos Jota

## Qué es este proyecto
API REST de un e-commerce de muebles. El backend usa Express y MongoDB con Mongoose.
El frontend React está en `client/` y consume esta API.

## Stack y convenciones
- Node.js 20 o superior · Express 4 · Mongoose 8.
- JavaScript con ES Modules (`import` / `export`) y comillas dobles.
- Variables de entorno: el proyecto usa `dotenv`; `index.js` carga `.env`.
- No cambiar versiones ni agregar librerías sin pedirlo.
- Las pruebas usan `node:test` y `node:assert`.

## Estructura
- `index.js`: configura Express, monta middlewares y routers, conecta la base e inicia el servidor.
- `config/db.js`: conexión a MongoDB.
- `models/`: esquemas de Mongoose, por ejemplo `Product.js`.
- `routes/`: routers de Express, por ejemplo `productosRouter.js`.
- `controllers/`: lógica de controladores, por ejemplo `productoController.js`.
- `middlewares/`: manejo central de errores, 404 y logging.
- `data/productos.js` y `seed.js`: datos y carga inicial.
- `test/`: pruebas existentes. `tests/contrato.test.js` contiene el contrato de esta práctica.

## Reglas de la API
- Las rutas se montan bajo `/api/<recurso-en-plural>`.
- El servidor usa el puerto de `PORT` o, por defecto, `5000`.
- Los errores se responden como JSON con una propiedad `error`. El middleware central también agrega `path` y `method`.
- El manejador central convierte errores `ValidationError` y `CastError` de Mongoose en HTTP 400. Los errores restantes usan su status o 500.
- Como el proyecto usa Express 4, las rutas async que puedan fallar deben reenviar los errores al middleware central con `next(error)`.
- Los campos existentes del producto son `nombre`, `descripcion`, `precio`, `stock` e `imagenUrl`.

## Límites
- No cambiar nombres de campos ni rutas existentes: el frontend depende de ellos.
- No escribir el connection string en el código ni modificar `.env`.
- No modificar archivos fuera de lo necesario para la fase solicitada.
- Seguir el estilo y los patrones existentes; no incorporar dependencias nuevas.

## Cómo trabajar
- Implementar una sola fase de `docs/spec-categorias.md` por pedido.
- Al terminar, indicar qué archivos se cambiaron y por qué.
- Con el servidor encendido, ejecutar `npm test` y revisar el diff antes de dar la tarea por terminada.


<!--
 nuevo
-->

## Reglas de trabajo (agregadas después de la práctica de Categorías)

- Si una regla de este archivo choca con el código que ya existe, avisá y preguntá antes de refactorizar código que no es parte de la tarea.
- Si la spec no define un caso, preguntá. No decidas.
- NO cambies los mensajes ni el formato de respuestas que ya existen.
- NO mates procesos, liberes puertos ni reinicies el servidor sin pedir permiso.
- NO corras comandos que escriban en la base (npm test, npm run test:auth, npm run seed) sin avisar antes.
- Si la misma lógica va en dos rutas, usá una función o un middleware compartido.
- Al terminar cada fase, listá TODOS los archivos que tocaste, incluso los cambios de formato.

## Seguridad (autenticación)

- NO leas, muestres ni copies el contenido de `.env`. Si necesitás una variable nueva, agregá la clave vacía a `.env.example` y avisá.
- NO escribas secretos en el código: el secreto del token se lee de `process.env.JWT_SECRET`.
- NUNCA devuelvas la contraseña ni su hash en una respuesta, ni la pongas en el payload del token.
- NO instales paquetes que no estén en la spec (`bcrypt` o `bcryptjs`, y `jsonwebtoken`).
- NO modifiques `tests/auth.test.cjs`. Si una prueba falla, se corrige el backend.
- NO crees archivos de prueba nuevos sin pedir permiso. Las pruebas del contrato son las de `tests/auth.test.cjs`.

