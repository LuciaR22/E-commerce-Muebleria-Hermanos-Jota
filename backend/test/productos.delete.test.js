
import { test } from "node:test";
import assert from "node:assert/strict";

const API_URL = "http://localhost:5000/api/productos";

test("DELETE: elimina productos y valida los errores", async () => {
    // Creamos un producto temporal para probar.
    const creacion = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: "Producto de prueba DELETE",
            descripcion: "Producto temporal para pruebas",
            precio: 1000,
            stock: 1,
        }),
    });

    assert.equal(creacion.status, 201);

    const producto = await creacion.json();
    const id = producto._id;

    // Caso 1: eliminar un producto existente.
    const eliminacion = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    assert.equal(eliminacion.status, 200);

    const respuesta = await eliminacion.json();

    assert.equal(
        respuesta.mensaje,
        "Producto eliminado correctamente"
    );

    // Caso 2: intentar eliminarlo nuevamente.
    const segundaEliminacion = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    assert.equal(segundaEliminacion.status, 404);

    // Caso 3: enviar un ID inválido.
    const idInvalido = await fetch(`${API_URL}/123`, {
        method: "DELETE",
    });

    assert.equal(idInvalido.status, 400);
});
