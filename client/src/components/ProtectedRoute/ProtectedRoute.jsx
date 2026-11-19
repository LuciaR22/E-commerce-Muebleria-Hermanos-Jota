import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute() {
    const location = useLocation();
    const { usuario, isAdmin } = useAuth();
    const [loading, setLoading] = useState(true);

    const esRutaAdmin = location.pathname.startsWith("/admin");

    useEffect(() => {
        setLoading(false);
    }, [usuario]);

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
