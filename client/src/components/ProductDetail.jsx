function ProductDetail({ producto, volverAlCatalogo, agregarAlCarrito }) {
    return (
        <section>
            <button onClick={volverAlCatalogo}>Volver al catálogo</button>

            <img src={producto.imagen} alt={producto.nombre} />

            <h1>{producto.nombre}</h1>

            <p>{producto.descripcion}</p>

            <p>{producto.fabricacion}</p>

            <p>${producto.precio}</p>

            <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
        </section>
    );
}

export default ProductDetail;
