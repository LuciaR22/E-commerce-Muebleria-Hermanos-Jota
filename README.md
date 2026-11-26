# E-commerce Mueblería Hermanos Jota

## Enlaces de Despliegue
*   **Frontend (Vercel):** https://e-commerce-muebleria-hermanos-jota.vercel.app/
*   **Backend (Render):** https://e-commerce-muebleria-hermanos-jota.onrender.com

---

## Descripción del proyecto

Este proyecto consiste en la construcción completa de un e-commerce para la mueblería **Hermanos Jota**. A lo largo de los distintos Sprints, la aplicación evolucionó desde una interfaz estática hasta una plataforma **Full Stack MERN** (MongoDB, Express, React y Node.js) totalmente operativa.

El sistema cuenta con un catálogo dinámico de productos, gestión de inventario (CRUD administrativo), autenticación y autorización segura basada en JSON Web Tokens (JWT), roles de usuario (Cliente y Administrador), un carrito de compras global con React Context y un flujo de compra con persistencia de pedidos en base de datos.

---

## Funcionalidades principales

### Catálogo y Navegación
- **Página de inicio (Home):** Header con navegación condicional, banner Hero, productos destacados y footer informativo.
- **Catálogo de productos:** Listado responsivo obtenido dinámicamente desde la API REST.
- **Detalle de producto (`/productos/:id`):** Información detallada, precio, stock y acciones dinámicas según el rol de la sesión.
- **Formulario de contacto (`/contacto`):** Validación en tiempo real del lado del cliente.
- **Manejo de estados:** Componentes de carga (`loading`), error y estado vacío (`ApiState`).

### Autenticación y Autorización (Sprint 7)
- **Registro de usuarios (`/registro`):** Validación de datos, normalización de emails y almacenamiento seguro de contraseñas mediante hashing con **Bcrypt**.
- **Inicio de sesión (`/login`):** Validación de credenciales y generación de **JWT** (JSON Web Token) firmado. Manejo uniforme de errores (401) para prevenir la enumeración de usuarios.
- **Sesión persistente:** Manejo global mediante `AuthContext`, sincronización con `localStorage` y auto-deslogueo ante tokens expirados o inválidos.
- **Rutas protegidas (`<ProtectedRoute>`):** Acceso restringido a `/perfil` y `/mis-pedidos` para usuarios autenticados, y a `/admin/*` exclusivamente para administradores. Redirección automática con memoria de retorno (`location.state.from`).
- **UI condicional en Navbar:** Menús adaptados dinámicamente según si el usuario es invitado, cliente logueado o administrador.

### Carrito de Compras y Pedidos (Sprint 8)
- **Estado global (`CartContext`):** Manejo desacoplado sin *prop drilling*, permitiendo agregar, restar unidades, eliminar productos y vaciar el carrito.
- **Checkout seguro:** El cliente envía únicamente los identificadores y cantidades; el backend consulta los precios reales en la base de datos para calcular el total sin permitir manipulación.
- **Persistencia de órdenes (`Order`):** Creación del pedido vinculado al usuario autenticado en MongoDB Atlas.
- **Historial de pedidos (`/mis-pedidos`):** Consulta del listado de compras realizadas por el usuario con detalle de ítems, cantidades, fechas y totales.

### Panel de Administración (CRUD de Productos)
- Creación de nuevos productos (`/admin/crear-producto`).
- Edición de productos existentes (`/admin/editar-producto/:id`).
- Eliminación de productos con confirmación y guardia estricta de rol (`soloAdmin`).

---

## Requisitos del sistema
- **Node.js** >= 20.0.0
- **npm** >= 10.0.0

---

## Instalación

Clonar el repositorio e instalar todas las dependencias del monorepo desde la raíz:

```bash
git clone https://github.com/LuciaR22/E-commerce-Muebleria-Hermanos-Jota.git
cd E-commerce-Muebleria-Hermanos-Jota
npm install
```

---

## Variables de Entorno

### Backend (`backend/.env`)
Crear el archivo `backend/.env` tomando como base `backend/.env.example`:

```env
# Conexión a MongoDB Atlas
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<base-de-datos>

# Clave secreta para firmar tokens JWT
JWT_SECRET=tu_clave_secreta_super_segura

# Tiempo de expiración del token JWT
JWT_EXPIRES_IN=1h

# Puerto de escucha del servidor
PORT=5000

# URL del cliente frontend permitida en CORS
CLIENT_URL=http://localhost:5173
```

### Frontend (`client/.env`)
Opcionalmente, para configurar la conexión del cliente con la API en desarrollo o producción:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Ejecución del proyecto

### Ambos entornos en paralelo (recomendado)
```bash
npm run dev
```
Inicia simultáneamente el servidor backend en `http://localhost:5000` y el cliente Vite en `http://localhost:5173`.

### Solo backend
```bash
npm run dev:backend
```

### Solo cliente
```bash
npm run dev:client
```

### Compilación para producción (Frontend)
```bash
npm run build
```

---

## Arquitectura del Proyecto

Estructura organizada como monorepo con workspaces de npm:

```
├── backend/                # API REST (Express + Mongoose)
│   ├── config/             # Configuración de base de datos
│   ├── controllers/        # Controladores (auth, pedidos, productos)
│   ├── data/               # Datos iniciales para seed
│   ├── middlewares/        # auth, logger, notFound, errorHandler
│   ├── models/             # Modelos Mongoose (User, Product, Order, Categoria)
│   ├── routes/             # Definición de endpoints de Express
│   ├── test/               # Pruebas automatizadas (contrato y autenticación)
│   ├── index.js            # Punto de entrada de la API
│   └── seed.js             # Script de poblado inicial de datos
├── client/                 # Aplicación SPA (React 19 + Vite)
│   ├── public/             # Archivos estáticos y _redirects
│   ├── src/
│   │   ├── components/     # Componentes reutilizables (Navbar, Footer, etc.)
│   │   ├── context/        # Contextos globales (AuthContext, CartContext)
│   │   ├── hooks/          # Custom hooks (useAuth, useApiResource)
│   │   ├── pages/          # Vistas (Home, Products, Cart, Login, Registro, etc.)
│   │   ├── services/       # Clientes HTTP (api.js, usuarioService, etc.)
│   │   └── utils/          # Helpers y almacenamiento de tokens
│   └── index.html          # HTML principal
└── vercel.json             # Configuración de enrutamiento SPA para Vercel
```

---

## API REST — Endpoints Principales

### 1. Autenticación y Usuarios (`/api/usuarios`)
- `POST /api/usuarios/registro`: Registra un nuevo usuario con rol `cliente`. Devuelve `201 Created`.
- `POST /api/usuarios/login`: Valida credenciales y retorna `{ token, usuario }`. Devuelve `200 OK`.
- `GET /api/usuarios/perfil`: Retorna el perfil del usuario autenticado. Requiere `Authorization: Bearer <token>`.

### 2. Pedidos y Compras (`/api/pedidos`)
- `POST /api/pedidos`: Crea una orden de compra vinculada al usuario autenticado a partir de los ítems del carrito. Requiere `Authorization: Bearer <token>`. Devuelve `201 Created`.
- `GET /api/pedidos/mis-pedidos`: Lista el historial de pedidos del usuario autenticado ordenados del más reciente al más antiguo. Requiere `Authorization: Bearer <token>`. Devuelve `200 OK`.

### 3. Productos (`/api/productos`)
- `GET /api/productos`: Lista todos los productos disponibles (público).
- `GET /api/productos/:id`: Obtiene el detalle de un producto por su ID (público).
- `POST /api/productos`: Crea un nuevo producto (requiere rol `admin`). Devuelve `201 Created`.
- `PUT /api/productos/:id`: Modifica un producto existente (requiere rol `admin`). Devuelve `200 OK`.
- `DELETE /api/productos/:id`: Elimina un producto por ID (requiere rol `admin`). Devuelve `200 OK`.

---

## Pruebas automatizadas

El proyecto incluye suites completas de pruebas automáticas para verificar contratos y seguridad:

### Pruebas de contrato de productos
```bash
npm run test
```

### Pruebas de contrato de autenticación y roles (12 de 12)
Con el servidor backend iniciado en otra terminal:
```bash
npm run test:auth
```

---

## Datos de prueba y Cuentas de Acceso

Para poblar la base de datos con las categorías, el catálogo oficial de 11 muebles y los usuarios de prueba:

```bash
npm run seed -w @muebleria/backend
```

### Cuentas de prueba disponibles:

| Rol | Correo electrónico | Contraseña | Permisos |
|---|---|---|---|
| **Administrador** | `admin@hermanosjota.com` | `Admin1234!` | Acceso completo (CRUD de productos, compras, perfil y pedidos). |
| **Cliente** | `cliente@hermanosjota.com` | `Cliente1234!` | Acceso de cliente (navegación, carrito, checkout, perfil y mis pedidos). |

---

## Tecnologías utilizadas

- **Base de datos:** MongoDB Atlas, Mongoose
- **Backend:** Node.js, Express 4/5, JSON Web Token (jsonwebtoken), Bcrypt / Bcryptjs, CORS, Dotenv
- **Frontend:** React 19, React Router 7, Vite
- **Estilos:** CSS3 nativo con variables personalizadas y diseño responsive
- **Testing:** Test Runner nativo de Node.js (`node:test`, `node:assert`)
- **Despliegue:** Vercel (Frontend), Render (Backend)

---

## Integrantes del equipo

1. **Fernanda Arenas**
2. **Valentina Vargas**
3. **Ezequiel Zalazar**
4. **Santiago Bonanno**
5. **Lucia Rivero**
