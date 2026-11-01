
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
    const [carrito, setCarrito] = useState([]);

    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    // Agrega un producto al carrito.
    const agregarAlCarrito = producto => {
        setCarrito(prevCarrito => [...prevCarrito, producto]);
    };

    // Quita del carrito todas las unidades del producto eliminado.
    const quitarDelCarrito = idProducto => {
        setCarrito(prevCarrito =>
            prevCarrito.filter(producto => producto._id !== idProducto)
        );
    };

    return (
        <>
            <Navbar cartCount={carrito.length} />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/"
                    element={
                        <HomePage
                            setProductoSeleccionado={setProductoSeleccionado}
                        />
                    }
                />

                <Route
                    path="/productos"
                    element={
                        <ProductsPage
                            agregarAlCarrito={agregarAlCarrito}
                        />
                    }
                />

                <Route
                    path="/productos/:id"
                    element={
                        <main className="product-page">
                            <section className="product-page__content">
                                <ProductDetail
                                    agregarAlCarrito={agregarAlCarrito}
                                    quitarDelCarrito={quitarDelCarrito}
                                />
                            </section>
                        </main>
                    }
                />

                <Route
                    path="/contacto"
                    element={<ContactPage />}
                />

                <Route
                    path="/admin/crear-producto"
                    element={<CrearProducto />}
                />

                <Route
                    path="/admin/editar-producto/:id"
                    element={<EditarProducto />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>

            <Footer />
        </>
    );
}
