document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id") || "aparador-uspallata";
    const productos = Array.isArray(window.productos) ? window.productos : [];
    const producto = productos.find(item => item.id === productId) || productos[0];

    if (!producto) {
        console.warn("No se encontró el producto para el id:", productId);
        return;
    }

    const imagen = document.querySelector(".product-detail__image");
    if (imagen) {
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
    }

    const titulo = document.getElementById("product-title");
    if (titulo) {
        titulo.textContent = producto.nombre;
    }

    const eyebrow = document.querySelector(".product-detail__eyebrow");
    if (eyebrow) {
        eyebrow.textContent = obtenerCategoria(producto.nombre);
    }

    const lead = document.querySelector(".product-detail__lead");
    if (lead) {
        lead.textContent = producto.descripcion;
    }

    const caption = document.querySelector(".product-detail__caption");
    if (caption) {
        caption.textContent = `Imagen de ${producto.nombre}.`;
    }

    const highlights = document.querySelector(".product-detail__highlights");
    if (highlights) {
        const propiedadesExtras = Object.entries(producto).filter(([clave]) => {
            const excluidas = new Set(["id", "nombre", "descripcion", "imagen", "medidas", "materiales", "acabado"]);
            return !excluidas.has(clave);
        });

        highlights.innerHTML = "";

        propiedadesExtras.forEach(([clave, valor]) => {
            const item = document.createElement("div");
            item.className = "product-detail__highlight";

            const label = document.createElement("dt");
            label.textContent = formatearEtiqueta(clave);

            const value = document.createElement("dd");
            value.textContent = valor;

            item.appendChild(label);
            item.appendChild(value);
            highlights.appendChild(item);
        });
    }

    const specsList = document.querySelector(".product-specs__list");
    if (specsList) {
        const entradasFicha = [
            ["Medidas", producto.medidas],
            ["Materiales", producto.materiales],
            ["Acabado", producto.acabado],
        ].filter(([, valor]) => Boolean(valor));

        specsList.innerHTML = "";

        entradasFicha.forEach(([label, valor]) => {
            const item = document.createElement("li");
            item.className = "product-specs__item";

            const spanLabel = document.createElement("span");
            spanLabel.className = "product-specs__label";
            spanLabel.textContent = label;

            const spanValue = document.createElement("span");
            spanValue.className = "product-specs__value";
            spanValue.textContent = valor;

            item.appendChild(spanLabel);
            item.appendChild(spanValue);
            specsList.appendChild(item);
        });
    }

    const btnAgregar = document.getElementById("btn-agregar-carrito");
    if (btnAgregar) {
        btnAgregar.dataset.id = producto.id;
        btnAgregar.dataset.nombre = producto.nombre;
        btnAgregar.dataset.precio = "0";
    }
});

function obtenerCategoria(nombre) {
    const palabras = nombre.trim().split(/\s+/);
    return palabras.slice(0, 2).join(" ") || "Producto";
}

function formatearEtiqueta(clave) {
    return clave
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, letra => letra.toUpperCase());
}
