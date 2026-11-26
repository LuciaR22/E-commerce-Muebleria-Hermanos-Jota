import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, normalizeErrorMessage } from "../../services/api";
import "./MisPedidos.css";

// helpers de formato
const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

const formatearHora = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatearPrecio = (precio) =>
    `$${Number(precio).toLocaleString("es-AR")}`;

export default function MisPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let activo = true;

        const cargarPedidos = async () => {
            try {
                const data = await apiFetch("/pedidos/mis-pedidos");

                if (!activo) return;

                setPedidos(Array.isArray(data) ? data : []);
            } catch (err) {
                if (!activo) return;

                const { userMessage } = normalizeErrorMessage(err);
                setError(userMessage || "No pudimos cargar tus pedidos.");
            } finally {
                if (activo) setCargando(false);
            }
        };

        cargarPedidos();

        return () => {
            activo = false;
        };
    }, []);

    // estado de carga
    if (cargando) {
        return (
            <main className="mis-pedidos-page">
                <div className="mis-pedidos-estado">
                    <div className="mis-pedidos-spinner" aria-hidden="true"></div>
                    <p className="mis-pedidos-estado__texto">Cargando tus pedidos...</p>
                </div>
            </main>
        );
    }

    // estado de error
    if (error) {
        return (
            <main className="mis-pedidos-page">
                <div className="mis-pedidos-estado">
                    <div className="mis-pedidos-estado__icon mis-pedidos-estado__icon--error">
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </div>
                    <h2 className="mis-pedidos-estado__titulo">Algo salió mal</h2>
                    <p className="mis-pedidos-estado__error" role="alert">{error}</p>
                    <Link to="/productos" className="mis-pedidos-estado__cta">
                        Volver al catálogo
                    </Link>
                </div>
            </main>
        );
    }

    // estado vacío
    if (pedidos.length === 0) {
        return (
            <main className="mis-pedidos-page">
                <div className="mis-pedidos-estado">
                    <div className="mis-pedidos-estado__icon">
                        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>
                    <h2 className="mis-pedidos-estado__titulo">No tenés pedidos todavía</h2>
                    <p className="mis-pedidos-estado__texto">
                        ¡Explorá nuestro catálogo y realizá tu primera compra!
                    </p>
                    <Link to="/productos" className="mis-pedidos-estado__cta">
                        Explorar catálogo
                    </Link>
                </div>
            </main>
        );
    }

    // lista de pedidos
    return (
        <main className="mis-pedidos-page">
            {/* Header */}
            <header className="mis-pedidos-hero">
                <span className="mis-pedidos-hero__eyebrow">Mi cuenta</span>
                <h1 className="mis-pedidos-hero__title">Mis Pedidos</h1>
                <p className="mis-pedidos-hero__subtitle">
                    {pedidos.length === 1
                        ? "Tenés 1 pedido realizado"
                        : `Tenés ${pedidos.length} pedidos realizados`}
                </p>
            </header>

            {/* Timeline de pedidos */}
            <section className="mis-pedidos-lista">
                {pedidos.map((pedido, index) => (
                    <article key={pedido._id} className="pedido-card">
                        {/* Badge de número de pedido */}
                        <div className="pedido-card__badge">
                            #{pedidos.length - index}
                        </div>

                        <header className="pedido-card__header">
                            <div className="pedido-card__meta">
                                <time className="pedido-card__fecha">
                                    {formatearFecha(pedido.createdAt)}
                                </time>
                                <span className="pedido-card__hora">
                                    {formatearHora(pedido.createdAt)}
                                </span>
                            </div>
                            <div className="pedido-card__total-wrapper">
                                <span className="pedido-card__total-label">Total</span>
                                <span className="pedido-card__total">
                                    {formatearPrecio(pedido.total)}
                                </span>
                            </div>
                        </header>

                        <ul className="pedido-card__items">
                            {pedido.items.map((item, i) => (
                                <li key={i} className="pedido-card__item">
                                    <div className="pedido-card__item-qty">
                                        {item.cantidad}×
                                    </div>
                                    <span className="pedido-card__item-nombre">
                                        {item.nombre}
                                    </span>
                                    <span className="pedido-card__item-precio">
                                        {formatearPrecio(item.precio * item.cantidad)}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <footer className="pedido-card__footer">
                            <div className="pedido-card__status">
                                <span className="pedido-card__status-dot"></span>
                                Confirmado
                            </div>
                            <span className="pedido-card__items-count">
                                {pedido.items.reduce((s, i) => s + i.cantidad, 0) === 1
                                    ? "1 producto"
                                    : `${pedido.items.reduce((s, i) => s + i.cantidad, 0)} productos`}
                            </span>
                        </footer>
                    </article>
                ))}
            </section>

            {/* CTA inferior */}
            <div className="mis-pedidos-bottom">
                <Link to="/productos" className="mis-pedidos-bottom__link">
                    ← Seguir comprando
                </Link>
            </div>
        </main>
    );
}
