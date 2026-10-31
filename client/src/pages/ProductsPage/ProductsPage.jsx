import ProductList from "../../components/ProductList";
import "./ProductsPage.css";


export default function ProductsPage({ agregarAlCarrito }) {
    return (
        <main className="product-page">
            <section className="product-page__content">
                <h1 className="product-page__title">Catálogo de productos</h1>
                
                
                <ProductList agregarAlCarrito={agregarAlCarrito} />
                
            </section>
        </main>
    );
}