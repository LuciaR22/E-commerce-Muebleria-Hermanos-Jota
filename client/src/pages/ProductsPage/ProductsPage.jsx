import ProductDetail from "../../components/ProductDetail";
import ProductList from "../../components/ProductList";
import "./ProductsPage.css";

export default function ProductsPage({ productoSeleccionado, setProductoSeleccionado, agregarAlCarrito }) {
    return (
        <main className="product-page">
            <section className="product-page__content">
                <h1 className="product-page__title">Catálogo de productos</h1>

                {productoSeleccionado ? (
                    <ProductDetail
                        productoId={productoSeleccionado}
                        volverAlCatalogo={() => setProductoSeleccionado(null)}
                        agregarAlCarrito={agregarAlCarrito}
                    />
                ) : (
                    <ProductList seleccionarProducto={setProductoSeleccionado} />
                )}
            </section>
        </main>
    );
}
