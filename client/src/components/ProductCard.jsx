function ProductCard({ producto, seleccionarProducto }) {
    return (
        <article>
            <img src={producto.imagen} alt={producto.nombre} />

            <h2>{producto.nombre}</h2>

            <p>${producto.precio}</p>

            <button onClick={() => seleccionarProducto(producto)}>Ver producto</button>
        </article>
    );
}

export default ProductCard;
