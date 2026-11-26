import { obtenerHeadersAuth } from "../utils/authStorage";
import { request } from "./api";

const usuarioService = {
    // registro de nuevo usuario
    async registrar(datosUsuario) {
        return request("/usuarios/registro", {
            method: "POST",
            body: JSON.stringify(datosUsuario),
        });
    },

    // inicio de sesion
    async iniciarSesion(credenciales) {
        return request("/usuario/login", {
            method: "POST",
            body: JSON.stringify(credenciales),
        });
    },

    // consulta de perfil autenticado
    async obtenerPerfil() {
        return request("/usuarios/perfil", {
            method: "GET",
            headers: obtenerHeadersAuth(),
        });
    },
};

export default usuarioService;
