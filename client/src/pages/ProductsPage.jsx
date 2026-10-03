import ProductDetail from "../components/ProductDetail.jsx";
import ProductList from "../components/ProductList.jsx";

export default function ProductsPage({ productoSeleccionado, setProductoSeleccionado, agregarAlCarrito }) {
    return (
        <main>
            <section id="catalogo">
                <h1>Catálogo de productos</h1>

                {productoSeleccionado ? (
                    <ProductDetail
                        producto={productoSeleccionado}
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
