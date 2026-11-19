import { obtenerHeadersAuth } from "../utils/authStorage";
import { request } from "./api";

const usuarioService = {
    async obtenerPerfil() {
        return request("/usuarios/perfil", {
            method: "GET",
            headers: obtenerHeadersAuth(),
        });
    },
};

export default usuarioService;
