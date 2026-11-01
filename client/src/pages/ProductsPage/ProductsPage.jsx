import ProductList from "../../components/ProductList";
import "./ProductsPage.css";

export default function ProductsPage({ agregarAlCarrito, rolUsuario }) {
    return (
        <main className="product-page">
            <section className="product-page__content">
                <h1 className="product-page__title">Catálogo de productos</h1>
                
                {/* Le pasamos el rol para que oculte/muestre cosas si es necesario */}
                <ProductList agregarAlCarrito={agregarAlCarrito} rolUsuario={rolUsuario} />
                
            </section>
        </main>
    );
}