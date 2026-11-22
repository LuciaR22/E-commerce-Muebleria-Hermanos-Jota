
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./ProtectedRoute.css";

export default function ProtectedRoute() {
    const location = useLocation();
    const { usuario, isAdmin, loading } = useAuth();

    const esRutaAdmin = location.pathname.startsWith("/admin");

    if (loading) {
        return (
            <main className="protected-route-page">
                <section className="protected-route-container">
                    <span className="protected-route-badge">Un momento</span>
                    <h1 className="protected-route-title">Cargando...</h1>
                    <p className="protected-route-description">
                        Estamos verificando tu sesión para continuar.
                    </p>
                </section>
            </main>
        );
    }

    if (!usuario) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (esRutaAdmin && !isAdmin) {
        return (
            <main className="protected-route-page">
                <section className="protected-route-container">
                    <span className="protected-route-badge">Acceso denegado</span>
                    <h1 className="protected-route-title">Sin permiso</h1>
                    <p className="protected-route-description">
                        No tenés autorización para ver esta página.
                    </p>
                    <div className="protected-route-actions">
                        <Link to="/productos" className="hero__cta boton-texto">
                            Volver al catálogo
                        </Link>
                        <Link to="/" className="protected-route-link">
                            Ir al inicio
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    return <Outlet />;
}
