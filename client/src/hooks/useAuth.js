import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const USER_STORAGE_KEYS = ["usuario", "user"];

function leerUsuarioDesdeStorage() {
    for (const key of USER_STORAGE_KEYS) {
        const valor = localStorage.getItem(key);

        if (!valor) {
            continue;
        }

        try {
            const usuario = JSON.parse(valor);

            if (usuario && typeof usuario === "object") {
                return usuario;
            }
        } catch {
            // Si el valor no es JSON válido, se ignora y se evalúa la siguiente clave.
        }
    }

    return null;
}

export default function useAuth() {
    const location = useLocation();
    const [usuario, setUsuario] = useState(() => leerUsuarioDesdeStorage());

    useEffect(() => {
        setUsuario(leerUsuarioDesdeStorage());
    }, [location.pathname]);

    useEffect(() => {
        const sincronizarAuth = () => {
            setUsuario(leerUsuarioDesdeStorage());
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
