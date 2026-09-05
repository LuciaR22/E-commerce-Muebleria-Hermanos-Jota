document.addEventListener("DOMContentLoaded", () => {
    initializeProductDetailPage();
});

async function initializeProductDetailPage() {
    const productId = getProductIdFromUrl();

    if (!productId) {
        showProductNotFound();
        console.error("La URL no contiene un id de producto.");
        return;
    }

    setProductPageState("loading");

    try {
        const selectedProduct = await loadProductFromUrl(productId);

        if (!selectedProduct) {
            showProductNotFound();
            console.error("Producto no encontrado para el id:", productId);
            return;
        }

        renderProductDetail(selectedProduct);
        setProductPageState("detail");
    } catch (error) {
        console.error("No se pudo cargar el detalle del producto:", error);
        showProductNotFound();
    }
}

function setProductPageState(state) {
    const productDetail = document.querySelector(".product-detail");
    const productSpecs = document.querySelector(".product-specs");
    const productStatus = document.querySelector(".product-empty");
    const productStatusMessage = document.querySelector(".product-empty__message");

    if (productDetail) {
        productDetail.hidden = state !== "detail";
    }

    if (productSpecs) {
        productSpecs.hidden = state !== "detail";
    }

    if (!productStatus || !productStatusMessage) {
        return;
    }

    productStatus.hidden = state === "detail";

    if (state === "loading") {
        productStatusMessage.textContent = "Cargando producto...";
        return;
    }

    if (state === "not-found") {
        productStatusMessage.textContent = "Producto no encontrado";
    }
}

function showProductNotFound() {
    setProductPageState("not-found");
}

function getProductIdFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("id");
}

function getAvailableProducts() {
    return Array.isArray(window.productos) ? window.productos : [];
}

function findProductById(productList, productId) {
    return productList.find(product => product.id === productId);
}

function loadProductFromUrl(productId) {
    return new Promise(resolve => {
        window.setTimeout(() => {
            const productList = getAvailableProducts();
            resolve(findProductById(productList, productId));
        }, 500);
    });
}

function renderProductDetail(product) {
    renderProductImage(product);
    renderProductHeader(product);
    renderProductDescription(product);
    renderProductPrice(product);
    renderProductHighlights(product);
    renderProductSpecifications(product);
    configureAddToCartButton(product);
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
