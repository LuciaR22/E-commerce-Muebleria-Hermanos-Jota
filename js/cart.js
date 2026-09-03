/*
  Logica del Carrito de Compras
*/

//guardar el carrito en el navegador
const STORAGE_KEY = 'carrito';

// obtiene los productos del carrito desde localstorage
function obtenerCarrito() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// guarda el estado del carrito en localstorage
function guardarCarrito(carrito) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}

// calcula la cantidad total de productos en el carrito
function obtenerCantidadTotal() {
    const carrito = obtenerCarrito();
    return carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
}

// actualiza el numero del contador en el header
function actualizarContador() {
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.textContent = obtenerCantidadTotal();
    }
}

// agrega un producto al carrito y actualiza localstorage
function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    
    // condicion: si el producto ya esta en el carrito, aumenta la cantidad
    const index = carrito.findIndex(item => item.id === producto.id);
    if (index !== -1) {
        carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
    } else {
        // si no esta, lo agregamos con cantidad 1
        carrito.push({
            id: producto.id || Date.now(),
            nombre: producto.nombre || 'Producto',
            precio: producto.precio || 0,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    actualizarContador();
}

// vacia el carrito por completo
function vaciarCarrito() {
    localStorage.removeItem(STORAGE_KEY);
    actualizarContador();
}

//dudas aca xd: inicializacion cuando carga cualquier pagina
document.addEventListener('DOMContentLoaded', () => {
    // actualizamos el contador al cargar la pagina
    actualizarContador();

    //conectamos el boton de agregar al carrito si existe en la pagina
    const btnAgregar = document.getElementById('btn-agregar-carrito');
    if (btnAgregar) {
        btnAgregar.addEventListener('click', () => {
            const productoActual = {
                id: btnAgregar.dataset.id || 1,
                nombre: btnAgregar.dataset.nombre || 'Mueble Hermanos Jota',
                precio: Number(btnAgregar.dataset.precio) || 15000
            };

            agregarAlCarrito(productoActual);
        });
    }
});