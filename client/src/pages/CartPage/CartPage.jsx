import { Link } from "react-router-dom";
import "./CartPage.css";

export default function CartPage({ carrito, setCarrito, vaciarCarrito }) {
    // Agrupar productos iguales por _id y sumar cantidad
    const productosAgrupados = carrito.reduce((acc, prod) => {
        const existente = acc.find(item => item._id === prod._id);
        if (existente) {
            existente.cantidad += 1;
        } else {
            acc.push({ ...prod, cantidad: 1 });
        }
        return acc;
    }, []);

    // Calculamos el total a pagar
    const total = carrito.reduce((acc, prod) => acc + Number(prod.precio), 0);
    const cantidadTotal = carrito.length;

    // Eliminar UNA unidad de un producto
    const quitarUnidad = (productoId) => {
        const index = carrito.findIndex(p => p._id === productoId);
        if (index !== -1) {
            const nuevoCarrito = [...carrito];
            nuevoCarrito.splice(index, 1);
            setCarrito(nuevoCarrito);
        }
    };

    // Agregar una unidad más del producto
    const agregarUnidad = (producto) => {
        setCarrito(prev => [...prev, producto]);
    };

    // Eliminar TODAS las unidades de un producto
    const eliminarProducto = (productoId) => {
        setCarrito(prev => prev.filter(p => p._id !== productoId));
    };

    if (carrito.length === 0) {
        return (
            <main className="cart-page">
                <div className="cart-empty">
                    <div className="cart-empty__icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </div>
                    <h2 className="cart-empty__title">Tu carrito está vacío</h2>
                    <p className="cart-empty__text">¡Parece que todavía no agregaste ningún mueble!</p>
                    <Link to="/productos" className="cart-empty__cta">
                        Explorar catálogo
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="cart-page">
            <div className="cart-page__header">
                <h1 className="cart-page__title">Tu Carrito</h1>
            </div>

            <div className="cart-layout">
                {/* Lista de productos */}
                <section className="cart-list">
                    {productosAgrupados.map((producto) => (
                        <article key={producto._id} className="cart-item">
                            <div className="cart-item__image-wrapper">
                                <img
                                    src={producto.imagenUrl}
                                    alt={producto.nombre}
                                    className="cart-item__image"
                                />
                            </div>

                            <div className="cart-item__body">
                                <div className="cart-item__info">
                                    <h3 className="cart-item__name">{producto.nombre}</h3>
                                    <p className="cart-item__price-unit">
                                        ${Number(producto.precio).toLocaleString("es-AR")} c/u
                                    </p>
                                </div>

                                <div className="cart-item__controls">
                                    <div className="cart-item__quantity">
                                        <button
                                            className="cart-item__qty-btn"
                                            onClick={() => quitarUnidad(producto._id)}
                                            aria-label="Quitar una unidad"
                                        >
                                            −
                                        </button>
                                        <span className="cart-item__qty-value">{producto.cantidad}</span>
                                        <button
                                            className="cart-item__qty-btn"
                                            onClick={() => agregarUnidad(producto)}
                                            aria-label="Agregar una unidad"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className="cart-item__subtotal">
                                        ${(Number(producto.precio) * producto.cantidad).toLocaleString("es-AR")}
                                    </p>

                                    <button
                                        className="cart-item__remove"
                                        onClick={() => eliminarProducto(producto._id)}
                                        aria-label={`Eliminar ${producto.nombre}`}
                                        title="Eliminar del carrito"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>

                {/* Resumen del pedido */}
                <aside className="cart-summary">
                <h2 className="cart-summary__title">Resumen del pedido</h2>

                <div className="cart-summary__details">
                    <div className="cart-summary__row">
                        {/* Lógica para singular/plural */}
                        <span>Subtotal ({cantidadTotal === 1 ? "1 producto" : `${cantidadTotal} productos`})</span>
                        <span>${total.toLocaleString("es-AR")}</span>
                    </div>
                    <div className="cart-summary__row">
                        <span>Envío</span>
                        <span className="cart-summary__free">Gratis</span>
                    </div>
                </div>

                <div className="cart-summary__total">
                    <span>Total</span>
                    <span className="cart-summary__total-price">${total.toLocaleString("es-AR")}</span>
                </div>

                <button className="cart-summary__checkout" onClick={() => alert("Compra finalizada")}>
                    Finalizar compra
                </button>

                <button className="cart-summary__clear" onClick={vaciarCarrito}>
                    Vaciar carrito
                </button>

                <Link to="/productos" className="cart-summary__continue">
                    ← Seguir comprando
                </Link>
            </aside>
            </div>
        </main>
    );
}
