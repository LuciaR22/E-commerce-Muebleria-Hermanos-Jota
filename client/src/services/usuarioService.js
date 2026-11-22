
import { obtenerHeadersAuth } from "../utils/authStorage";
import { request } from "./api";

const usuarioService = {
    async iniciarSesion(credenciales) {
        return request("/usuario/login", {
            method: "POST",
            body: JSON.stringify(credenciales),
        });
    },

    async obtenerPerfil() {
        return request("/usuarios/perfil", {
            method: "GET",
            headers: obtenerHeadersAuth(),
        });
    },
};

export default usuarioService;
