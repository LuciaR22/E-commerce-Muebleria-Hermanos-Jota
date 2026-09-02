document.addEventListener("DOMContentLoaded", () => {
    const productId = getProductIdFromUrl();
    const productList = getAvailableProducts();
    const selectedProduct = findProductById(productList, productId);

    if (!selectedProduct) {
        showProductNotFound();
        console.error("Producto no encontrado para el id:", productId);
        return;
    }

    renderProductImage(selectedProduct);
    renderProductHeader(selectedProduct);
    renderProductDescription(selectedProduct);
    renderProductPrice(selectedProduct);
    renderProductHighlights(selectedProduct);
    renderProductSpecifications(selectedProduct);
    configureAddToCartButton(selectedProduct);
});

function showProductNotFound() {
    const productDetail = document.querySelector(".product-detail");
    const productSpecs = document.querySelector(".product-specs");
    const productEmpty = document.querySelector(".product-empty");
    const productEmptyMessage = document.querySelector(".product-empty__message");

    if (productDetail) {
        productDetail.hidden = true;
    }

    if (productSpecs) {
        productSpecs.hidden = true;
    }

    if (productEmpty) {
        productEmpty.hidden = false;
    }

    if (productEmptyMessage) {
        productEmptyMessage.textContent = "Producto no encontrado";
    }
}

function getProductIdFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("id") || "aparador-uspallata";
}

function getAvailableProducts() {
    return Array.isArray(window.productos) ? window.productos : [];
}

function findProductById(productList, productId) {
    return productList.find(product => product.id === productId);
}

function renderProductImage(product) {
    const productImage = document.querySelector(".product-detail__image");
    if (!productImage) return;

    productImage.src = product.imagen;
    productImage.alt = product.nombre;
}

function renderProductHeader(product) {
    const productTitle = document.getElementById("product-title");
    if (productTitle) {
        productTitle.textContent = product.nombre;
    }

    const eyebrow = document.querySelector(".product-detail__eyebrow");
    if (eyebrow) {
        eyebrow.textContent = getProductCategory(product.nombre);
    }
}

function renderProductDescription(product) {
    const productLead = document.querySelector(".product-detail__lead");
    if (productLead) {
        productLead.textContent = product.descripcion;
    }

    const imageCaption = document.querySelector(".product-detail__caption");
    if (imageCaption) {
        imageCaption.textContent = `Imagen de ${product.nombre}.`;
    }
}

function renderProductPrice(product) {
    const priceElement = document.querySelector(".product-detail__price-note");
    if (!priceElement) return;

    const numericPrice = Number(product.precio || 0);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
        priceElement.textContent = "Precio a consultar";
        return;
    }

    priceElement.textContent = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(numericPrice);
}

function renderProductHighlights(product) {
    const highlightList = document.querySelector(".product-detail__highlights");
    if (!highlightList) return;

    const excludedFields = new Set([
        "id",
        "nombre",
        "descripcion",
        "imagen",
        "medidas",
        "materiales",
        "acabado",
        "precio",
    ]);

    const extraFields = Object.entries(product).filter(([fieldName]) => !excludedFields.has(fieldName));
    highlightList.innerHTML = "";

    extraFields.forEach(([fieldName, fieldValue]) => {
        const highlightItem = document.createElement("div");
        highlightItem.className = "product-detail__highlight";

        const label = document.createElement("dt");
        label.textContent = formatFieldLabel(fieldName);

        const value = document.createElement("dd");
        value.textContent = fieldValue;

        highlightItem.append(label, value);
        highlightList.appendChild(highlightItem);
    });
}

function renderProductSpecifications(product) {
    const specsList = document.querySelector(".product-specs__list");
    if (!specsList) return;

    const technicalFields = [
        ["Medidas", product.medidas],
        ["Materiales", product.materiales],
        ["Acabado", product.acabado],
    ].filter(([, value]) => Boolean(value));

    specsList.innerHTML = "";

    technicalFields.forEach(([label, value]) => {
        const listItem = document.createElement("li");
        listItem.className = "product-specs__item";

        const labelElement = document.createElement("span");
        labelElement.className = "product-specs__label";
        labelElement.textContent = label;

        const valueElement = document.createElement("span");
        valueElement.className = "product-specs__value";
        valueElement.textContent = value;

        listItem.append(labelElement, valueElement);
        specsList.appendChild(listItem);
    });
}

function configureAddToCartButton(product) {
    const addToCartButton = document.getElementById("btn-agregar-carrito");
    if (!addToCartButton) return;

    const numericPrice = Number(product.precio || 0);
    addToCartButton.dataset.id = product.id;
    addToCartButton.dataset.nombre = product.nombre;
    addToCartButton.dataset.precio = String(Number.isFinite(numericPrice) && numericPrice > 0 ? numericPrice : 0);
}

function getProductCategory(productName) {
    const words = productName.trim().split(/\s+/);
    return words.slice(0, 2).join(" ") || "Producto";
}

function formatFieldLabel(fieldName) {
    return fieldName
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, character => character.toUpperCase());
}
