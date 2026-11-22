
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute() {
    const location = useLocation();
    const { usuario, isAdmin, loading } = useAuth();

    const esRutaAdmin = location.pathname.startsWith("/admin");

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!usuario) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (esRutaAdmin && !isAdmin) {
        return <p>Sin permiso</p>;
    }

    return <Outlet />;
}
