import { Navigate, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ContactPage from "./pages/ContactPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";

export default function App() {
    return (
        <>
            <Navbar cartCount={0} />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Footer />
        </>
    );
}
