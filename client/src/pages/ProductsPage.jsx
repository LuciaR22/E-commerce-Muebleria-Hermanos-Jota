import { useState } from "react";
import ProductDetail from "../components/ProductDetail.jsx";
import ProductList from "../components/ProductList.jsx";

export default function ProductsPage() {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    return (
        <main>
            <section id="catalogo">
                <h1>Catálogo de productos</h1>

                {productoSeleccionado ? (
                    <ProductDetail
                        producto={productoSeleccionado}
                        volverAlCatalogo={() => setProductoSeleccionado(null)}
                    />
                ) : (
                    <ProductList seleccionarProducto={setProductoSeleccionado} />
                )}
            </section>
        </main>
    );
}
