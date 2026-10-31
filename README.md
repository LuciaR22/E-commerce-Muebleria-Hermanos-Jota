# E-commerce Muebleria Hermanos Jota

## Descripcion del proyecto

Este proyecto consiste en la construccion de la fachada completa de un e-commerce para la muebleria Hermanos Jota. La experiencia del usuario se desarrolla unicamente con tecnologias del lado del cliente, simulando la navegacion, consulta de productos y la interaccion con un carrito sin necesidad de backend.

El sitio busca ser visualmente atractivo, responsivo y facil de usar, con productos cargados dinamicamente desde JavaScript para representar una tienda en linea funcional a nivel front-end.

## Funcionalidades

- Pagina de inicio con header, navegacion, banner principal, productos destacados y footer.
- Catalogo de productos con tarjetas generadas dinamicamente desde un archivo JavaScript local.
- Detalle de producto con imagen, descripcion, caracteristicas, precio y boton de anadir al carrito.
- Formulario de contacto con validacion del lado del cliente y mensaje de confirmacion.
- Carrito simulado con contador en el header.
- Busqueda de productos como funcionalidad extra.

## Requisitos

- Node.js >= 20
- npm

## Instalacion

Desde la raiz del proyecto instalar todas las dependencias (backend, client y herramientas comunes):

```bash
npm install
```

Esto instala las dependencias de ambos paquetes gracias al monorepo con workspaces de npm.

## Ejecucion

### Ambos servidores (recomendado)

```bash
npm run dev
```

Levanta el backend y el cliente en paralelo con `concurrently`.

### Solo backend

```bash
npm run dev:backend
```

API de Express disponible en `http://localhost:5000`.

### Solo cliente

```bash
npm run dev:client
```

Cliente con Vite disponible en `http://localhost:5173`, con proxy de `/api` hacia el backend.

## Arquitectura

El proyecto usa un monorepo con workspaces de npm dividido en dos paquetes:

```
├── backend/                # API (Express + Mongoose)
│   ├── index.js            # Punto de entrada y montaje de middlewares
│   ├── config/             # Configuracion (variables de entorno)
│   ├── controllers/        # Logica de las rutas
│   ├── data/               # Datos de ejemplo (productos)
│   ├── middlewares/        # logger, notFound, errorHandler
│   ├── models/             # Modelos de Mongoose
│   ├── routes/             # Definicion de rutas
│   └── services/           # Logica de negocio
└── client/                 # Cliente (React + Vite)
    └── src/
        ├── components/     # Componentes reutilizables
        ├── pages/          # Vistas por ruta
        └── services/       # Comunicacion con la API
```

### Backend

- **Express** con `cors`, `express.json()` y un middleware de logs propio (`logger`).
- Los middlewares `notFound` y `errorHandler` se montan al final de la cadena para responder 404 en rutas inexistentes y errores propagados con `next(err)`, respectivamente.
- **Mongoose** como ODM para la futura conexion a MongoDB.
- Separa la logica en `routes`, `controllers`, `services` y `models` para mantener el codigo organizado y testeable.
- Usa ESM (`"type": "module"`) y variables de entorno con `dotenv`.

### Cliente

- **React 19** con React Router para la navegacion.
- **Vite** como build tool y dev server, con proxy de `/api` hacia el backend para evitar problemas de CORS en desarrollo.
- El estado actual incluye un scaffold basico que crece hacia las paginas y componentes del proyecto.

## Decisiones tomadas

- **Monorepo con workspaces de npm**: instalar y ejecutar ambos servidores desde la raiz con un solo comando.
- **Arquitectura en capas en el backend** (`routes` → `controllers` → `services` → `models`): separacion de responsabilidades para facilitar el mantenimiento.
- **Middlewares de errores al final de la cadena**: `notFound` responde 404 con formato JSON y `errorHandler` oculta el `stack` en produccion (`NODE_ENV=production`) pero lo muestra en desarrollo para facilitar el debugging.
- **CORS habilitado** en la API para permitir el consumo desde el cliente en desarrollo.
- **Proxy de Vite** (`/api` → `http://localhost:5000`) en lugar de configurar manualmente la URL del backend en cada request.
- **ESM en backend y cliente** como convencion moderna de Node.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- React
- Express

## Integrantes del proyecto

1. Fernanda Arenas
2. Vargas Valentina
3. Ezequiel Zalazar
4. Santiago Bonanno
5. Lucia Rivero


## API REST – Endpoints de productos

La API utiliza la ruta base `/api/productos` para administrar los productos.

### 1. Crear producto

**Método:** POST

**Ruta:** `/api/productos`

**Body (JSON):**
```json
{
  "nombre": "Mesa de centro",
  "descripcion": "Mesa de madera de nogal",
  "precio": 320000,
  "stock": 5,
  "imagenUrl": "/Imagenes/mesa.png"
}
```

**Respuestas:** `201 Created` producto creado; `400 Bad Request` datos inválidos.

### 2. Obtener todos los productos

**Método:** GET

**Ruta:** `/api/productos`

**Body:** No requiere.

**Respuestas:** `200 OK` devuelve el listado de productos.

### 3. Obtener un producto por ID

**Método:** GET

**Ruta:** `/api/productos/:id`

**Body:** No requiere.

**Respuestas:** `200 OK` producto encontrado; `400 Bad Request` ID inválido; `404 Not Found` producto inexistente.

### 4. Actualizar un producto

**Método:** PUT

**Ruta:** `/api/productos/:id`

**Body (JSON):**
```json
{
  "nombre": "Mesa de centro actualizada",
  "precio": 350000,
  "stock": 8
}
```

**Respuestas:** `200 OK` producto actualizado; `400 Bad Request` ID o datos inválidos; `404 Not Found` producto inexistente.

### 5. Eliminar un producto

**Método:** DELETE

**Ruta:** `/api/productos/:id`

**Body:** No requiere.

**Respuestas:**
- `200 OK`: producto eliminado correctamente.
- `400 Bad Request`: ID de producto inválido.
- `404 Not Found`: producto no encontrado.

## Pruebas automatizadas

Para ejecutar las pruebas del backend:

```bash
npm run test -w @muebleria/backend
```

Se verifican los siguientes casos:
- Eliminación de un producto existente: respuesta 200.
- Segundo intento de eliminación: respuesta 404.
- Envío de un ID inválido: respuesta 400.

## Carga de productos de prueba

Para cargar los productos de ejemplo en MongoDB:

```bash
npm run seed -w @muebleria/backend
```

El proceso agrega los productos que todavía no existen, evitando duplicados.