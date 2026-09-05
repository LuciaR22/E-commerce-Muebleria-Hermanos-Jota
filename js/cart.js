const STORAGE_KEY = "carrito";


function obtenerCarrito() {
    const datos = localStorage.getItem(STORAGE_KEY);

    return datos ? JSON.parse(datos) : [];
}


function guardarCarrito(carrito) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}


function obtenerCantidadTotal() {
    const carrito = obtenerCarrito();

    return carrito.reduce(
        (total, producto) => total + (producto.cantidad || 1),
        0
    );
}


function actualizarContador() {
    const contador = document.getElementById("cart-count");

    if (contador) {
        contador.textContent = obtenerCantidadTotal();
    }
}


function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();

    const indiceProducto = carrito.findIndex(
        item => item.id === producto.id
    );

    if (indiceProducto !== -1) {
        carrito[indiceProducto].cantidad =
            (carrito[indiceProducto].cantidad || 1) + 1;
    } else {
        carrito.push({
            id: producto.id || Date.now(),
            nombre: producto.nombre || "Producto",
            precio: producto.precio || 0,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    actualizarContador();
}


function vaciarCarrito() {
    localStorage.removeItem(STORAGE_KEY);
    actualizarContador();
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();

    const botonAgregar = document.getElementById("btn-agregar-carrito");

    if (botonAgregar) {
        botonAgregar.addEventListener("click", () => {
            const productoActual = {
                id: botonAgregar.dataset.id || 1,
                nombre: botonAgregar.dataset.nombre || "Mueble Hermanos Jota",
                precio: Number(botonAgregar.dataset.precio) || 15000
            };

            agregarAlCarrito(productoActual);
        });
    }
});