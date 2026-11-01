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
import CartPage from "./pages/CartPage/CartPage.jsx";

export default function App() {
    const [carrito, setCarrito] = useState([]);
    
    // ✅ Estado para simular el rol del usuario (cliente o admin)
    const [rolUsuario, setRolUsuario] = useState("cliente");

    const agregarAlCarrito = producto => {
        setCarrito(prevCarrito => [...prevCarrito, producto]);
    };

    const quitarDelCarrito = idProducto => {
        setCarrito(prevCarrito =>
            prevCarrito.filter(producto => producto._id !== idProducto)
        );
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    // ✅ Función para cambiar de rol
    const cambiarRol = () => {
        setRolUsuario(prevRol => (prevRol === "cliente" ? "admin" : "cliente"));
    };

    return (
        <>
            {/* ✅ Le pasamos rolUsuario y cambiarRol al Navbar */}
            <Navbar 
                cartCount={carrito.length} 
                rolUsuario={rolUsuario} 
                cambiarRol={cambiarRol} 
            />

            <Routes>
                <Route path="/" element={<HomePage />} />
                
                <Route
                    path="/productos"
                    element={
                        <ProductsPage
                            agregarAlCarrito={agregarAlCarrito}
                            rolUsuario={rolUsuario}
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
                                    rolUsuario={rolUsuario}
                                />
                            </section>
                        </main>
                    }
                />

                {/* ✅ RUTA DEL CARRITO (Ahora con quitarDelCarrito) */}
                <Route 
                path="/carrito" 
                element={
                    <CartPage 
                        carrito={carrito} 
                        setCarrito={setCarrito} 
                        vaciarCarrito={vaciarCarrito} 
                    />
                } 
            />

                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/admin/crear-producto" element={<CrearProducto />} />
                <Route path="/admin/editar-producto/:id" element={<EditarProducto />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </>
    );
}