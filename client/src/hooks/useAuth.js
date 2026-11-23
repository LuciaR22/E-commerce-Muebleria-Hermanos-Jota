import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { obtenerUsuarioDesdeStorage } from "../utils/authStorage";

// hook useAuth conectado con AuthContext
export default function useAuth() {
    const authContext = useContext(AuthContext);

    // si estamos dentro del AuthProvider, usamos el contexto global
    if (authContext) {
        return authContext;
    }

    // fallback seguro si se consulta fuera del AuthProvider
    const usuario = obtenerUsuarioDesdeStorage();
    const rolUsuario = usuario?.rol || "cliente";

    return {
        user: usuario,
        usuario,
        token: null,
        loading: false,
        login: () => {},
        logout: () => {},
        rolUsuario,
        isAuthenticated: Boolean(usuario),
        isAdmin: rolUsuario === "admin",
    };
}
