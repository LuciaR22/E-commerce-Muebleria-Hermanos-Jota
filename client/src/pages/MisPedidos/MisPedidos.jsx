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
                    <p className="mis-pedidos-estado__texto">Cargando pedidos...</p>
                </div>
            </main>
        );
    }

    // estado de error
    if (error) {
        return (
            <main className="mis-pedidos-page">
                <div className="mis-pedidos-estado">
                    <p className="mis-pedidos-estado__error" role="alert">{error}</p>
                    <Link to="/productos" className="mis-pedidos-estado__link">
                        Volver al catálogo
                    </Link>
                </div>
            </main>
        );
    }

    // estado vacio
    if (pedidos.length === 0) {
        return (
            <main className="mis-pedidos-page">
                <div className="mis-pedidos-estado">
                    <div className="mis-pedidos-estado__icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
            <div className="mis-pedidos-header">
                <h1 className="mis-pedidos-header__title">Mis Pedidos</h1>
                <p className="mis-pedidos-header__count">
                    {pedidos.length === 1
                        ? "1 pedido realizado"
                        : `${pedidos.length} pedidos realizados`}
                </p>
            </div>

            <div className="mis-pedidos-lista">
                {pedidos.map((pedido) => (
                    <article key={pedido._id} className="pedido-card">
                        <header className="pedido-card__header">
                            <div className="pedido-card__fecha">
                                {formatearFecha(pedido.createdAt)}
                            </div>
                            <div className="pedido-card__total">
                                {formatearPrecio(pedido.total)}
                            </div>
                        </header>

                        <ul className="pedido-card__items">
                            {pedido.items.map((item, i) => (
                                <li key={i} className="pedido-card__item">
                                    <span className="pedido-card__item-nombre">
                                        {item.nombre}
                                    </span>
                                    <span className="pedido-card__item-detalle">
                                        {item.cantidad} × {formatearPrecio(item.precio)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </main>
    );
}
