import { request } from "./api";

const productosService = {
    async getProductos() {
        return request("/productos");
    },

    async getProductoById(id) {
        return request(`/productos/${id}`);
    },
};

export default productosService;
