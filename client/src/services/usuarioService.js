import { request } from "./api";

const TOKEN_STORAGE_KEYS = ["token", "authToken", "accessToken", "jwt"];

function obtenerTokenDesdeStorage() {
    for (const key of TOKEN_STORAGE_KEYS) {
        const token = localStorage.getItem(key);

        if (typeof token === "string" && token.trim()) {
            return token.trim();
        }
    }

    return null;
}

const usuarioService = {
    async obtenerPerfil() {
        const token = obtenerTokenDesdeStorage();

        if (!token) {
            const error = new Error("No se encontró token de sesión");
            error.status = 401;
            throw error;
        }

        return request("/usuarios/perfil", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};

export default usuarioService;
