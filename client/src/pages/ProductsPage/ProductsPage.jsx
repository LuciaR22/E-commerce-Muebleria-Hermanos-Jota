import { useNavigate } from "react-router-dom";
import ProductDetail from "../../components/ProductDetail";
import ProductList from "../../components/ProductList";
import "./ProductsPage.css";

export default function ProductsPage({ productoSeleccionado, setProductoSeleccionado, agregarAlCarrito }) {
    const navigate = useNavigate();

    const handleSeleccionarProducto = id => {
        if (setProductoSeleccionado) {
            setProductoSeleccionado(id);
        }
        navigate(`/productos/${id}`);
    };

    return (
        <main className="product-page">
            <section className="product-page__content">
                <h1 className="product-page__title">Catálogo de productos</h1>

                {productoSeleccionado ? (
                    <ProductDetail
                        productoId={productoSeleccionado}
                        volverAlCatalogo={() => setProductoSeleccionado && setProductoSeleccionado(null)}
                        agregarAlCarrito={agregarAlCarrito}
                    />
                ) : (
                    <ProductList seleccionarProducto={handleSeleccionarProducto} />
                )}
            </section>
        </main>
    );
}

