import { createContext, useContext, useEffect, useState } from "react";
import {
    obtenerTokenDesdeStorage,
    obtenerUsuarioDesdeStorage,
} from "../utils/authStorage";

// creamos el contexto de autenticacion
const AuthContext = createContext(null);

// proveedor del contexto de autenticacion
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => obtenerUsuarioDesdeStorage());
    const [token, setToken] = useState(() => obtenerTokenDesdeStorage());
    const [loading, setLoading] = useState(false);

    // sincronizacion si cambia el almacenamiento en otra pestaña
    useEffect(() => {
        const sincronizarStorage = () => {
            setUser(obtenerUsuarioDesdeStorage());
            setToken(obtenerTokenDesdeStorage());
        };

        window.addEventListener("storage", sincronizarStorage);
        return () => {
            window.removeEventListener("storage", sincronizarStorage);
        };
    }, []);

    // funcion para iniciar sesion y persistir datos
    const login = (userData, tokenData) => {
        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("usuario", JSON.stringify(userData));
        }

        if (tokenData) {
            localStorage.setItem("token", tokenData);
        }

        setUser(userData);
        setToken(tokenData);
    };

    // funcion para cerrar sesion y limpiar datos
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("jwt");

        setUser(null);
        setToken(null);
    };

    // valores y metodos acordados
    const valor = {
        user,
        token,
        loading,
        login,
        logout,
        // compatibilidad adicional con codigo existente del equipo
        usuario: user,
        isAuthenticated: Boolean(user),
        isAdmin: user?.rol === "admin",
        rolUsuario: user?.rol || "cliente",
    };

    return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

// hook para consumir el contexto de autenticacion
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext debe ser utilizado dentro de un AuthProvider");
    }
    return context;
}

export default AuthContext;
