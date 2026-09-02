document.addEventListener("DOMContentLoaded", () => {
    // lectura del id de producto desde la URL, por ejemplo: producto.html?id=mesa-comedor-pampa
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (productId) {
        console.log("ID del producto en la URL:", productId);
    } else {
        console.log("No se encontró un id de producto en la URL.");
    }
});
