import { Link } from "react-router-dom";
import "./NotFound.css";

/**
 * Componente para mostrar página 404 cuando la ruta no existe
 */
export default function NotFound() {
    return (
        <main className="not-found-page">
            <section className="not-found-container">
                <span className="not-found-badge">Error 404</span>
                <h1 className="not-found-title">Página no encontrada</h1>
                <p className="not-found-description">
                    La página que estás buscando no existe, fue eliminada o su dirección cambió.
                </p>
                <div className="not-found-actions">
                    <Link to="/productos" className="hero__cta boton-texto">
                        Volver al catálogo
                    </Link>
                    <Link to="/" className="not-found-link">
                        Ir al inicio
                    </Link>
                </div>
            </section>
        </main>
    );
}
