import { useEffect, useState } from "react";
import productosService from "../../services/productosService";
import ProductCard from "../ProductCard";
import "./ProductList.css";

function ProductList({ seleccionarProducto }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const datos = await productosService.getProductos();
                setProductos(datos);
            } catch (err) {
                setError(err.message || "No se pudieron cargar los productos");
            } finally {
                setCargando(false);
            }
        };

        cargarProductos();
    }, []);

    if (cargando) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="product-list">
            {productos.map(producto => (
                <ProductCard key={producto.id} producto={producto} seleccionarProducto={seleccionarProducto} />
            ))}
        </section>
    );
}

export default ProductList;
