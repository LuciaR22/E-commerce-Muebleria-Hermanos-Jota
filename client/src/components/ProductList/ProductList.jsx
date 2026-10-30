import useApiResource from "../../hooks/useApiResource";
import productosService from "../../services/productosService";
import ApiState from "../ApiState";
import ProductCard from "../ProductCard";
import "./ProductList.css";

function ProductList({ seleccionarProducto }) {
    const { data: productosData, status, error, retry } = useApiResource(() => productosService.getProductos(), []);
    const productos = Array.isArray(productosData) ? productosData : [];

    if (status === "loading" || status === "refreshing") {
        return (
            <ApiState
                status={status}
                title="Cargando catálogo"
                message="Estamos trayendo los productos disponibles para que puedas explorarlos."
            />
        );
    }

    if (status === "error") {
        return (
            <ApiState
                status={status}
                title="No pudimos cargar el catálogo"
                message={error}
                actions={
                    <button type="button" className="product-detail__cta" onClick={retry}>
                        Reintentar
                    </button>
                }
            />
        );
    }

    if (productos.length === 0) {
        return (
            <ApiState
                status="empty"
                title="No hay productos disponibles"
                message="En cuanto el catálogo se actualice, vas a ver los muebles disponibles acá."
            />
        );
    }

    return (
        <section className="product-list">
            {productos.map(producto => (
                <ProductCard key={producto._id || producto.id} producto={producto} seleccionarProducto={seleccionarProducto} />
            ))}
        </section>
    );
}

export default ProductList;
