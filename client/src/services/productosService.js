import { obtenerHeadersAuth } from "../utils/authStorage";
import { request } from "./api";

const productosService = {
    async getProductos() {
        return request("/productos");
    },

    async getProductoById(id) {
        return request(`/productos/${id}`);
    },

    async actualizarProducto(id, datos) {
        return request(`/productos/${id}`, {
            method: "PUT",
            headers: obtenerHeadersAuth(),
            body: JSON.stringify(datos),
        });
    },

    async crearProducto(datos) {
        return request("/productos", {
            method: "POST",
            headers: obtenerHeadersAuth(),
            body: JSON.stringify(datos),
        });
    },

    async eliminarProducto(id) {
        return request(`/productos/${id}`, {
            method: "DELETE",
            headers: obtenerHeadersAuth(),
        });
    },
};

export default productosService;
