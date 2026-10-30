import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import ContactPage from "./pages/ContactPage";
import CrearProducto from "./pages/CrearProducto";
import EditarProducto from "./pages/EditarProducto";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
    // Estado del carrito: array que almacena los productos seleccionados (inicia vacío)
    const [carrito, setCarrito] = useState([]);

    // Estado del producto seleccionado: guarda el producto que el usuario eligió
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const agregarAlCarrito = producto => {
        setCarrito(prevCarrito => [...prevCarrito, producto]);
    };

    return (
        <>
            {/* Navbar en la parte superior: recibe carrito.length para mostrar el contador */}
            <Navbar cartCount={carrito.length} />

            <Routes>
                <Route path="/" element={<HomePage setProductoSeleccionado={setProductoSeleccionado} />} />
                <Route
                    path="/productos"
                    element={
                        <ProductsPage
                            productoSeleccionado={productoSeleccionado}
                            setProductoSeleccionado={setProductoSeleccionado}
                            agregarAlCarrito={agregarAlCarrito}
                        />
                    }
                />
                {/* Ruta dinámica para detalle de producto por ID con useParams */}
                <Route
                    path="/productos/:id"
                    element={
                        <main className="product-page">
                            <section className="product-page__content">
                                <ProductDetail agregarAlCarrito={agregarAlCarrito} />
                            </section>
                        </main>
                    }
                />
                <Route path="/contacto" element={<ContactPage />} />
                {/* Ruta para crear un nuevo producto desde el panel de administración */}
                <Route path="/admin/crear-producto" element={<CrearProducto />} />
                {/* Ruta para editar un producto existente desde el panel de administración */}
                <Route path="/admin/editar-producto/:id" element={<EditarProducto />} />
                {/* Ruta comodín para páginas inexistentes (404) */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </>
    );
}
