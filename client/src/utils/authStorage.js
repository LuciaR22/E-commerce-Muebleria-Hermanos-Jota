const USER_STORAGE_KEYS = ["usuario", "user"];
const TOKEN_STORAGE_KEYS = ["token", "authToken", "accessToken", "jwt"];

function obtenerUsuarioDesdeStorage() {
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

function obtenerTokenDesdeStorage() {
    for (const key of TOKEN_STORAGE_KEYS) {
        const token = localStorage.getItem(key);

        if (typeof token === "string" && token.trim()) {
            return token.trim();
        }
    }

    return null;
}

function obtenerHeadersAuth() {
    const token = obtenerTokenDesdeStorage();

    if (!token) {
        const error = new Error("No se encontró token de sesión");
        error.status = 401;
        throw error;
    }

    return {
        Authorization: `Bearer ${token}`,
    };
}

export { obtenerHeadersAuth, obtenerTokenDesdeStorage, obtenerUsuarioDesdeStorage };
