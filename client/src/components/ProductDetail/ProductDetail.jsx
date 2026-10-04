import "./ProductDetail.css";

// componente detalle de producto
function ProductDetail({ producto, volverAlCatalogo, agregarAlCarrito }) {
    if (!producto) {
        return null;
    }

    const precioFormateado = Number(producto.precio || 0).toLocaleString("es-AR");

    return (
        <div className="product-detail-container">
            <button
                type="button"
                className="product-detail__back"
                onClick={volverAlCatalogo}
            >
                ← Volver al catálogo
            </button>

            {/* vista principal del producto */}
            <section className="product-detail">
                <figure className="product-detail__media">
                    <div className="product-detail__image-shell">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="product-detail__image"
                        />
                    </div>
                </figure>

                <div className="product-detail__content">
                    <span className="product-detail__eyebrow">Hermanos Jota</span>
                    <h2 className="product-detail__title">{producto.nombre}</h2>
                    <p className="product-detail__lead">{producto.descripcion}</p>

                    {/* precio */}
                    <p className="product-detail__price-note">
                        ${precioFormateado}
                    </p>

                    {/* botón para agregar al carrito con estado onclick */}
                    <button
                        type="button"
                        className="product-detail__cta"
                        onClick={() => agregarAlCarrito(producto)}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </section>

            {/* ficha del producto */}
            <section className="product-specs">
                <article className="product-specs__card">
                    <h3 className="product-specs__kicker">Ficha técnica</h3>
                    <ul className="product-specs__list">
                        {producto.medidas && (
                            <li className="product-specs__item">
                                <span className="product-specs__label">Medidas</span>
                                <span className="product-specs__value">{producto.medidas}</span>
                            </li>
                        )}
                        {producto.materiales && (
                            <li className="product-specs__item">
                                <span className="product-specs__label">Materiales</span>
                                <span className="product-specs__value">{producto.materiales}</span>
                            </li>
                        )}
                        {producto.acabado && (
                            <li className="product-specs__item">
                                <span className="product-specs__label">Acabado</span>
                                <span className="product-specs__value">{producto.acabado}</span>
                            </li>
                        )}
                        {producto.fabricacion && (
                            <li className="product-specs__item">
                                <span className="product-specs__label">Fabricación</span>
                                <span className="product-specs__value">{producto.fabricacion}</span>
                            </li>
                        )}
                    </ul>
                </article>
            </section>
        </div>
    );
}

export default ProductDetail;
