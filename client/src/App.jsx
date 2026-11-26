import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage/CartPage.jsx";
import ContactPage from "./pages/ContactPage";
import CrearProducto from "./pages/CrearProducto";
import EditarProducto from "./pages/EditarProducto";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import PerfilPage from "./pages/PerfilPage/PerfilPage.jsx";
import ProductsPage from "./pages/ProductsPage";
import MisPedidos from "./pages/MisPedidos/MisPedidos.jsx";
import Registro from "./pages/Registro.jsx";

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Navbar />

                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/productos" element={<ProductsPage />} />

                    <Route
                        path="/productos/:id"
                        element={
                            <main className="product-page">
                                <section className="product-page__content">
                                    <ProductDetail />
                                </section>
                            </main>
                        }
                    />

                    <Route path="/carrito" element={<CartPage />} />

                    <Route path="/contacto" element={<ContactPage />} />

                    <Route path="/registro" element={<Registro />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/admin/crear-producto" element={<CrearProducto />} />
                        <Route path="/admin/editar-producto/:id" element={<EditarProducto />} />
                        <Route path="/perfil" element={<PerfilPage />} />
                        <Route path="/mis-pedidos" element={<MisPedidos />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
            </CartProvider>
        </AuthProvider>
    );
}
