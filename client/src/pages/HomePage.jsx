import { Link, useNavigate } from "react-router-dom";
import ApiState from "../components/ApiState";
import ProductCard from "../components/ProductCard";
import useApiResource from "../hooks/useApiResource";
import productosService from "../services/productosService";

// ✅ Ya no recibe setProductoSeleccionado
export default function HomePage() {
    const navegar = useNavigate();
    const { data: productosData, status, error, retry } = useApiResource(() => productosService.getProductos(), []);
    const productos = Array.isArray(productosData) ? productosData : [];
    const destacados = productos.slice(0, 4);

    const verProducto = productoId => {
        // ✅ Solo navegamos, ya no tocamos ningún estado global
        navegar(`/productos/${productoId}`);
    };

    return (
        <main>
            {/* ... (el resto del banner queda igual) ... */}

            <section id="destacados">
                <h2>Productos destacados</h2>
                
                {/* ... (los ApiState quedan igual) ... */}

                {status === "success" && destacados.length > 0 ? (
                    <div id="productos-destacados">
                        {destacados.map(producto => (
                            <ProductCard
                                key={producto._id || producto.id}
                                producto={producto}
                                seleccionarProducto={verProducto} // 👈 Se sigue pasando, pero ahora verProducto no guarda estado
                            />
                        ))}
                    </div>
                ) : null}

                {/* ... (el resto queda igual) ... */}
            </section>
        </main>
    );
}