import "./ProductCard.css";

function ProductCard({ producto, seleccionarProducto }) {
    const id = producto._id || producto.id;
    const imagenSrc = producto.imagenUrl || producto.imagen;

    return (
        <article className="product-card">
            <img className="product-card__image" src={imagenSrc} alt={producto.nombre} />

            <h2 className="product-card__title">{producto.nombre}</h2>

            <p className="product-card__price">${producto.precio?.toLocaleString("es-AR")}</p>

            <button className="product-card__button" onClick={() => seleccionarProducto(id)}>
                Ver producto
            </button>
        </article>
    );
}

export default ProductCard;
