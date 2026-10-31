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
            body: JSON.stringify(datos),
        });
    },

    async crearProducto(datos) {
        return request("/productos", {
            method: "POST",
            body: JSON.stringify(datos),
        });
    },
};

export default productosService;
