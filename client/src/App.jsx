import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage.jsx";
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
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Footer />
        </>
    );
}
