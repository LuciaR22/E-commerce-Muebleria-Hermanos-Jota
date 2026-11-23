const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

try {
    process.loadEnvFile();
} catch {
    // Si no hay .env, se usan variables del entorno actual.
}

const BASE = process.env.API_URL || `http://localhost:${process.env.PORT || 5000}`;
const MARCA = Date.now();
const PASSWORD = "clave-prueba-rutas-123";

const EMAIL_CLIENTE = `cliente.${MARCA}@rutas.test`;
const EMAIL_ADMIN = `admin.${MARCA}@rutas.test`;

let tokenCliente = null;
let tokenAdmin = null;
let productoCreadoId = null;
let conectado = false;

async function pedir(metodo, ruta, { body, token } = {}) {
    const headers = {};

    if (body !== undefined) {
        headers["Content-Type"] = "application/json";
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let respuesta;
    try {
        respuesta = await fetch(BASE + ruta, {
            method: metodo,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
    } catch {
        assert.fail(
            `No pude conectarme a ${BASE}. Levanta el backend con npm run dev en otra terminal o define API_URL.`,
        );
    }

    const texto = await respuesta.text();
    let datos = null;

    try {
        datos = JSON.parse(texto);
    } catch {
        // Puede devolver HTML en errores no controlados.
    }

    return { status: respuesta.status, datos, texto };
}

async function registrarUsuario({ nombre, email, password }) {
    return pedir("POST", "/api/usuarios/registro", {
        body: { nombre, email, password },
    });
}

async function login({ email, password }) {
    return pedir("POST", "/api/usuarios/login", {
        body: { email, password },
    });
}

async function conectarDB() {
    if (conectado) return;

    if (!process.env.MONGODB_URI) {
        throw new Error("Falta MONGODB_URI para preparar datos de prueba");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    conectado = true;
}

async function hacerAdmin(email) {
    await conectarDB();

    const coleccion = mongoose.connection.collection("usuarios");
    await coleccion.updateOne({ email }, { $set: { rol: "admin" } });
}

before(async () => {
    const registroCliente = await registrarUsuario({
        nombre: "Cliente Test",
        email: EMAIL_CLIENTE,
        password: PASSWORD,
    });

    assert.equal(
        registroCliente.status,
        201,
        `No se pudo registrar usuario cliente. Status ${registroCliente.status}.`,
    );

    const loginCliente = await login({
        email: EMAIL_CLIENTE,
        password: PASSWORD,
    });

    assert.equal(loginCliente.status, 200, `No se pudo loguear usuario cliente. Status ${loginCliente.status}.`);

    tokenCliente = loginCliente.datos?.token;
    assert.ok(tokenCliente, "El login cliente no devolvió token");

    const registroAdmin = await registrarUsuario({
        nombre: "Admin Test",
        email: EMAIL_ADMIN,
        password: PASSWORD,
    });

    assert.equal(registroAdmin.status, 201, `No se pudo registrar usuario admin. Status ${registroAdmin.status}.`);

    await hacerAdmin(EMAIL_ADMIN);

    const loginAdmin = await login({
        email: EMAIL_ADMIN,
        password: PASSWORD,
    });

    assert.equal(loginAdmin.status, 200, `No se pudo loguear usuario admin. Status ${loginAdmin.status}.`);

    tokenAdmin = loginAdmin.datos?.token;
    assert.ok(tokenAdmin, "El login admin no devolvió token");
});

after(async () => {
    try {
        await conectarDB();

        const db = mongoose.connection;

        await db.collection("usuarios").deleteMany({
            email: { $in: [EMAIL_CLIENTE, EMAIL_ADMIN] },
        });

        if (productoCreadoId && mongoose.isValidObjectId(productoCreadoId)) {
            await db.collection("products").deleteOne({
                _id: new mongoose.Types.ObjectId(String(productoCreadoId)),
            });
        }

        await db.collection("products").deleteMany({
            nombre: `Producto test rutas ${MARCA}`,
        });
    } finally {
        if (conectado) {
            await mongoose.disconnect();
            conectado = false;
        }
    }
});

test("Ruta protegida sin token responde 401", async () => {
    const r = await pedir("GET", "/api/usuarios/perfil");

    assert.equal(r.status, 401);
    assert.ok(r.datos?.error, "Debe responder { error }");
});

test("Ruta protegida con token falso responde 401", async () => {
    const r = await pedir("GET", "/api/usuarios/perfil", {
        token: "token.falso.valor",
    });

    assert.equal(r.status, 401);
    assert.ok(r.datos?.error, "Debe responder { error }");
});

test("Ruta protegida con token vencido responde 401", async () => {
    assert.ok(process.env.JWT_SECRET, "Falta JWT_SECRET para firmar token vencido");

    const tokenVencido = jwt.sign({ id: "507f1f77bcf86cd799439011", rol: "cliente" }, process.env.JWT_SECRET, {
        expiresIn: "-1s",
    });

    const r = await pedir("GET", "/api/usuarios/perfil", {
        token: tokenVencido,
    });

    assert.equal(r.status, 401);
    assert.ok(r.datos?.error, "Debe responder { error }");
});

test("Cliente normal no puede crear productos (403)", async () => {
    assert.ok(tokenCliente, "No hay token de cliente");

    const r = await pedir("POST", "/api/productos", {
        token: tokenCliente,
        body: {
            nombre: `Producto test rutas ${MARCA}`,
            descripcion: "Intento de crear producto con rol cliente",
            precio: 1000,
            stock: 2,
            imagenUrl: "https://example.com/producto-test.jpg",
        },
    });

    assert.equal(r.status, 403);
    assert.ok(r.datos?.error, "Debe responder { error }");
});

test("Admin puede crear productos", async () => {
    assert.ok(tokenAdmin, "No hay token de admin");

    const r = await pedir("POST", "/api/productos", {
        token: tokenAdmin,
        body: {
            nombre: `Producto test rutas ${MARCA}`,
            descripcion: "Creación válida con rol admin",
            precio: 1000,
            stock: 2,
            imagenUrl: "https://example.com/producto-test.jpg",
        },
    });

    assert.equal(r.status, 201, `El admin debería poder crear. Status ${r.status}`);
    assert.ok(r.datos?._id, "La respuesta de creación debe incluir _id");

    productoCreadoId = r.datos._id;
});
