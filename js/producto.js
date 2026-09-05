document.addEventListener("DOMContentLoaded", () => {
    iniciarDetalleProducto();
});

async function iniciarDetalleProducto() {
    const productoId = obtenerIdProducto();

    if (!productoId) {
        mostrarProductoNoEncontrado();
        return;
    }

    mostrarEstadoProducto("loading");

    try {
        const producto = await cargarProducto(productoId);

        if (!producto) {
            mostrarProductoNoEncontrado();
            return;
        }

        renderizarDetalleProducto(producto);
        mostrarEstadoProducto("detail");
    } catch (error) {
        console.error("No se pudo cargar el detalle del producto:", error);
        mostrarProductoNoEncontrado();
    }
}

function mostrarEstadoProducto(estado) {
    const detalleProducto = document.querySelector(".product-detail");
    const especificaciones = document.querySelector(".product-specs");
    const estadoProducto = document.querySelector(".product-empty");
    const mensajeEstado = document.querySelector(".product-empty__message");

    if (detalleProducto) {
        detalleProducto.hidden = estado !== "detail";
    }

    if (especificaciones) {
        especificaciones.hidden = estado !== "detail";
    }

    if (!estadoProducto || !mensajeEstado) {
        return;
    }

    estadoProducto.hidden = estado === "detail";

    if (estado === "loading") {
        mensajeEstado.textContent = "Cargando producto...";
    }

    if (estado === "not-found") {
        mensajeEstado.textContent = "Producto no encontrado";
    }
}

function mostrarProductoNoEncontrado() {
    mostrarEstadoProducto("not-found");
}

function obtenerIdProducto() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get("id");
}

function obtenerProductos() {
    return Array.isArray(window.productos) ? window.productos : [];
}

function buscarProductoPorId(productos, productoId) {
    return productos.find(producto => producto.id === productoId);
}

function cargarProducto(productoId) {
    return new Promise(resolve => {
        setTimeout(() => {
            const productos = obtenerProductos();
            const productoEncontrado = buscarProductoPorId(productos, productoId);

            resolve(productoEncontrado);
        }, 500);
    });
}

function renderizarDetalleProducto(producto) {
    renderizarImagenProducto(producto);
    renderizarEncabezadoProducto(producto);
    renderizarDescripcionProducto(producto);
    renderizarPrecioProducto(producto);
    renderizarCaracteristicasProducto(producto);
    renderizarEspecificacionesProducto(producto);
    configurarBotonCarrito(producto);
}

function renderizarImagenProducto(producto) {
    const imagen = document.querySelector(".product-detail__image");

    if (!imagen) {
        return;
    }

    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
}

function renderizarEncabezadoProducto(producto) {
    const titulo = document.getElementById("product-title");

    if (titulo) {
        titulo.textContent = producto.nombre;
    }

    const categoria = document.querySelector(".product-detail__eyebrow");

    if (categoria) {
        categoria.textContent = obtenerCategoria(producto.nombre);
    }
}

function renderizarDescripcionProducto(producto) {
    const descripcion = document.querySelector(".product-detail__lead");

    if (descripcion) {
        descripcion.textContent = producto.descripcion;
    }

    const textoImagen = document.querySelector(".product-detail__caption");

    if (textoImagen) {
        textoImagen.textContent = `Imagen de ${producto.nombre}.`;
    }
}

function renderizarPrecioProducto(producto) {
    const precio = document.querySelector(".product-detail__price-note");

    if (!precio) {
        return;
    }

    const precioNumerico = Number(producto.precio || 0);

    if (!Number.isFinite(precioNumerico) || precioNumerico <= 0) {
        precio.textContent = "Precio a consultar";
        return;
    }

    precio.textContent = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
    }).format(precioNumerico);
}

function renderizarCaracteristicasProducto(producto) {
    const listaCaracteristicas = document.querySelector(
        ".product-detail__highlights"
    );

    if (!listaCaracteristicas) {
        return;
    }

    const camposExcluidos = new Set([
        "id",
        "nombre",
        "descripcion",
        "imagen",
        "medidas",
        "materiales",
        "acabado",
        "precio"
    ]);

    const caracteristicas = Object.entries(producto).filter(
        ([nombreCampo]) => !camposExcluidos.has(nombreCampo)
    );

    listaCaracteristicas.innerHTML = "";

    caracteristicas.forEach(([nombreCampo, valorCampo]) => {
        const caracteristica = document.createElement("div");
        caracteristica.className = "product-detail__highlight";

        const etiqueta = document.createElement("dt");
        etiqueta.textContent = formatearNombreCampo(nombreCampo);

        const valor = document.createElement("dd");
        valor.textContent = valorCampo;

        caracteristica.append(etiqueta, valor);
        listaCaracteristicas.appendChild(caracteristica);
    });
}

function renderizarEspecificacionesProducto(producto) {
    const listaEspecificaciones = document.querySelector(
        ".product-specs__list"
    );

    if (!listaEspecificaciones) {
        return;
    }

    const especificaciones = [
        ["Medidas", producto.medidas],
        ["Materiales", producto.materiales],
        ["Acabado", producto.acabado]
    ].filter(([, valor]) => Boolean(valor));

    listaEspecificaciones.innerHTML = "";

    especificaciones.forEach(([etiqueta, valor]) => {
        const elemento = document.createElement("li");
        elemento.className = "product-specs__item";

        const nombre = document.createElement("span");
        nombre.className = "product-specs__label";
        nombre.textContent = etiqueta;

        const contenido = document.createElement("span");
        contenido.className = "product-specs__value";
        contenido.textContent = valor;

        elemento.append(nombre, contenido);
        listaEspecificaciones.appendChild(elemento);
    });
}

function configurarBotonCarrito(producto) {
    const botonCarrito = document.getElementById("btn-agregar-carrito");

    if (!botonCarrito) {
        return;
    }

    const precioNumerico = Number(producto.precio || 0);

    botonCarrito.dataset.id = producto.id;
    botonCarrito.dataset.nombre = producto.nombre;
    botonCarrito.dataset.precio = String(
        Number.isFinite(precioNumerico) && precioNumerico > 0
            ? precioNumerico
            : 0
    );
}

function obtenerCategoria(nombreProducto) {
    const palabras = nombreProducto.trim().split(/\s+/);

    return palabras.slice(0, 2).join(" ") || "Producto";
}

function formatearNombreCampo(nombreCampo) {
    return nombreCampo
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, caracter => caracter.toUpperCase());
}
