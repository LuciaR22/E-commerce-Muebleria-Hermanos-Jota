import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import { apiFetch } from "../../services/api";
import "./CartPage.css";

export default function CartPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const {
        carrito,
        productosAgrupados,
        total,
        cantidadTotal,
        quitarUnidad,
        agregarAlCarrito,
        eliminarProducto,
        vaciarCarrito,
    } = useCart();

    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState("");
    const [pedidoExitoso, setPedidoExitoso] = useState(null);

    const handleFinalizarCompra = async () => {
        // si no hay sesion, redirigir a /login conservando el destino
        if (!isAuthenticated) {
            navigate("/login", { state: { from: location } });
            return;
        }

        if (enviando) return;

        setEnviando(true);
        setError("");

        try {
            // armar el body con { items: [{ productoId, cantidad }] } (sin precios)
            const items = productosAgrupados.map((p) => ({
                productoId: p._id,
                cantidad: p.cantidad,
            }));

            const data = await apiFetch("/pedidos", {
                method: "POST",
                body: JSON.stringify({ items }),
            });

            // si sale bien, vaciar el carrito y mostrar confirmacion
            vaciarCarrito();
            setPedidoExitoso(data.pedido || data);
        } catch (err) {
            setError(
                err.userMessage || err.message || "Error al procesar el pedido."
            );
        } finally {
            setEnviando(false);
        }
    };

    // pantalla de confirmacion tras pedido exitoso
    if (pedidoExitoso) {
        return (
            <main className="cart-page">
                <div className="cart-confirmacion">
                    <div className="cart-confirmacion__icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <h2 className="cart-confirmacion__title">
                        ¡Pedido realizado con éxito!
                    </h2>
                    <p className="cart-confirmacion__text">
                        Tu pedido fue registrado correctamente.
                    </p>
                    {pedidoExitoso.total != null && (
                        <p className="cart-confirmacion__total">
                            Total: ${Number(pedidoExitoso.total).toLocaleString("es-AR")}
                        </p>
                    )}
                    <div className="cart-confirmacion__actions">
                        <Link to="/mis-pedidos" className="cart-confirmacion__btn cart-confirmacion__btn--primary">
                            Ver mis pedidos
                        </Link>
                        <Link to="/productos" className="cart-confirmacion__btn cart-confirmacion__btn--secondary">
                            Seguir comprando
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

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
                                            onClick={() => agregarAlCarrito(producto)}
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
                            {/* Logica para singular/plural */}
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

                    {error && (
                        <div className="cart-summary__error" role="alert">
                            {error}
                        </div>
                    )}

                    <button
                        className="cart-summary__checkout"
                        onClick={handleFinalizarCompra}
                        disabled={enviando}
                    >
                        {enviando ? "Procesando..." : "Finalizar compra"}
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
