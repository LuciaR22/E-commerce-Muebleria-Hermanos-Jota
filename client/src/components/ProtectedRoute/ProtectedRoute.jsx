import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const USER_STORAGE_KEYS = ["usuario", "user"];

const leerUsuarioDesdeStorage = () => {
    for (const key of USER_STORAGE_KEYS) {
        const valor = localStorage.getItem(key);

        if (!valor) {
            continue;
        }

        try {
            const parseado = JSON.parse(valor);

            if (parseado && typeof parseado === "object") {
                return parseado;
            }
        } catch {
            // Si el valor no es JSON válido, se ignora y se prueba otra clave.
        }
    }

    return null;
};

export default function ProtectedRoute() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        setUsuario(leerUsuarioDesdeStorage());
        setLoading(false);
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!usuario) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
