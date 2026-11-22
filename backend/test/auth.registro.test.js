import { test, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";

const BASE_URL = process.env.API_URL || `http://localhost:${process.env.PORT || 5000}/api`;
const MARCA = Date.now();
const EMAIL_TEST = `registro.${MARCA}@test-muebleria.com`;
const PASSWORD_TEST = "segura123";

let usuarioCreadoId = null;

async function pedir(metodo, ruta, body) {
    const respuesta = await fetch(BASE_URL + ruta, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const datos = await respuesta.json().catch(() => null);
    return { status: respuesta.status, datos };
}

test("1. POST /api/auth/registro crea un usuario válido: 201 y sin password en la respuesta", async () => {
    const res = await pedir("POST", "/auth/registro", {
        nombre: "Juan Perez",
        email: EMAIL_TEST,
        password: PASSWORD_TEST,
    });

    assert.equal(res.status, 201, `Esperaba status 201, recibido ${res.status}`);
    assert.ok(res.datos, "La respuesta debe tener datos JSON");
    assert.ok(res.datos._id, "La respuesta debe incluir el _id del usuario");
    assert.equal(res.datos.nombre, "Juan Perez");
    assert.equal(res.datos.email, EMAIL_TEST.toLowerCase());
    assert.equal(res.datos.rol, "cliente");
    assert.equal(res.datos.password, undefined, "La respuesta NO debe incluir el campo password");
    assert.equal(res.datos.contrasenia, undefined, "La respuesta NO debe incluir el campo contrasenia");

    usuarioCreadoId = res.datos._id;
});

test("2. POST /api/auth/registro con email repetido responde 409", async () => {
    const res = await pedir("POST", "/auth/registro", {
        nombre: "Juan Perez Duplicado",
        email: EMAIL_TEST,
        password: "otraPassword456",
    });

    assert.equal(res.status, 409, `Esperaba status 409 por email duplicado, recibido ${res.status}`);
    assert.ok(res.datos && res.datos.error, "Debe incluir un mensaje de error claro");
});

test("3. POST /api/auth/registro con contraseña menor a 6 caracteres responde 400", async () => {
    const res = await pedir("POST", "/auth/registro", {
        nombre: "Test Corta",
        email: `corta.${Date.now()}@test-muebleria.com`,
        password: "123",
    });

    assert.equal(res.status, 400, `Esperaba status 400 por contraseña corta, recibido ${res.status}`);
    assert.ok(res.datos && res.datos.error, "Debe responder con un mensaje de error");
});

test("4. POST /api/auth/registro con campos faltantes responde 400", async () => {
    // Sin nombre
    const resSinNombre = await pedir("POST", "/auth/registro", {
        email: `sinnombre.${Date.now()}@test-muebleria.com`,
        password: "password123",
    });
    assert.equal(resSinNombre.status, 400, "Falta nombre debe responder 400");

    // Sin email
    const resSinEmail = await pedir("POST", "/auth/registro", {
        nombre: "Sin Email",
        password: "password123",
    });
    assert.equal(resSinEmail.status, 400, "Falta email debe responder 400");

    // Sin password
    const resSinPass = await pedir("POST", "/auth/registro", {
        nombre: "Sin Password",
        email: `sinpass.${Date.now()}@test-muebleria.com`,
    });
    assert.equal(resSinPass.status, 400, "Falta password debe responder 400");
});

after(async () => {
    try {
        if (process.env.MONGODB_URI) {
            if (mongoose.connection.readyState === 0) {
                await mongoose.connect(process.env.MONGODB_URI);
            }
            const db = mongoose.connection;
            if (usuarioCreadoId) {
                await db.collection("usuarios").deleteOne({ _id: new mongoose.Types.ObjectId(String(usuarioCreadoId)) });
            }
            await db.collection("usuarios").deleteMany({ email: /@test-muebleria\.com$/ });
            await mongoose.disconnect();
        }
    } catch {
        // Limpieza opcional silenciosa si no hay conexión en entorno aislado
    }
});
