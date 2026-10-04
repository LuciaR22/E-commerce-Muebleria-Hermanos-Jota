import "./ProductCard.css";

function ProductCard({ producto, seleccionarProducto }) {
    return (
        <article className="product-card">
            <img className="product-card__image" src={producto.imagen} alt={producto.nombre} />

            <h2 className="product-card__title">{producto.nombre}</h2>

            <p className="product-card__price">${producto.precio}</p>

            <button className="product-card__button" onClick={() => seleccionarProducto(producto.id)}>
                Ver producto
            </button>
        </article>
    );
}

export default ProductCard;
