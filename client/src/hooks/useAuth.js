import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { obtenerUsuarioDesdeStorage } from "../utils/authStorage";

export default function useAuth() {
    const location = useLocation();
    const [usuario, setUsuario] = useState(() => obtenerUsuarioDesdeStorage());

    useEffect(() => {
        setUsuario(obtenerUsuarioDesdeStorage());
    }, [location.pathname]);

    useEffect(() => {
        const sincronizarAuth = () => {
            setUsuario(obtenerUsuarioDesdeStorage());
        };

        window.addEventListener("storage", sincronizarAuth);

        return () => {
            window.removeEventListener("storage", sincronizarAuth);
        };
    }, []);

    const rolUsuario = useMemo(() => usuario?.rol || "cliente", [usuario]);

    return {
        usuario,
        rolUsuario,
        isAuthenticated: Boolean(usuario),
        isAdmin: rolUsuario === "admin",
    };
}
