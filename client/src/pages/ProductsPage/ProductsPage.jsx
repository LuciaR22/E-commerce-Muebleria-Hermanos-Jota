import ProductList from "../../components/ProductList";
import "./ProductsPage.css";

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

export default function ProductsPage({ agregarAlCarrito }) {
    return (
        <main className="product-page">
            <section className="product-page__content">
                <h1 className="product-page__title">Catálogo de productos</h1>
                
                
                <ProductList agregarAlCarrito={agregarAlCarrito} />
                
                <ProductList seleccionarProducto={handleSeleccionarProducto} />
            </section>
        </main>
    );
}