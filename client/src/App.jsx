
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
import CartPage from "./pages/CartPages/CartPage.jsx";

export default function App() {
    // 1. Estado del carrito
    const [carrito, setCarrito] = useState([]);

    // 2. Estado para simular el rol del usuario (cliente o admin)
    const [rolUsuario, setRolUsuario] = useState("cliente");

    // Función para agregar al carrito
    const agregarAlCarrito = producto => {
        setCarrito(prevCarrito => [...prevCarrito, producto]);
    };

    // Función para vaciar el carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    // Función para cambiar de rol (simulación)
    const cambiarRol = () => {
        setRolUsuario(prevRol => (prevRol === "cliente" ? "admin" : "cliente"));
    };

    return (
        <>
            {/* Le pasamos el rol y la función de cambiar rol al Navbar */}
            <Navbar 
                cartCount={carrito.length} 
                rolUsuario={rolUsuario} 
                cambiarRol={cambiarRol} 
            />

            <Routes>
                {/* HOME */}
                <Route path="/" element={<HomePage />} />
                
                {/* PRODUCTOS: pasando el rol */}
                <Route
                    path="/productos"
                    element={
                        <ProductsPage
                            agregarAlCarrito={agregarAlCarrito}
                            rolUsuario={rolUsuario} 
                        />
                    }
                />
                
                {/* DETALLE: Pasando agregarAlCarrito y el rol */}
                <Route
                    path="/productos/:id"
                    element={
                        <main className="product-page">
                            <section className="product-page__content">
                                <ProductDetail 
                                    agregarAlCarrito={agregarAlCarrito} 
                                    rolUsuario={rolUsuario}
                                />
                            </section>
                        </main>
                    }
                />

                {/* CARRITO: ahora recibe setCarrito para control granular */}
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
                
                {/* ADMIN: rutas protegidas por rol */}
                {rolUsuario === "admin" && (
                    <>
                        <Route path="/admin/crear-producto" element={<CrearProducto />} />
                        <Route path="/admin/editar-producto/:id" element={<EditarProducto />} />
                    </>
                )}
                
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </>
    );
}
