import { useNavigate } from "react-router-dom";
import ProductList from "../../components/ProductList";
import "./ProductsPage.css";

export default function ProductsPage({ setProductoSeleccionado, agregarAlCarrito }) {
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
                <ProductList seleccionarProducto={handleSeleccionarProducto} />
            </section>
        </main>
    );
}

