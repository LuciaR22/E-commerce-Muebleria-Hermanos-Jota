import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm/ProductForm";
import productosService from "../services/productosService";
import "./CrearProducto.css";

/**
 * página de administración para crear un nuevo producto
 */
export default function CrearProducto() {
    const navigate = useNavigate();

    // estados para controlar el envío y posibles errores del servidor
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async datosProducto => {
        setEnviando(true);
        setError(null);

        try {
            await productosService.crearProducto(datosProducto);
            navigate("/productos");
        } catch (err) {
            setError(err.message || "Ocurrió un error al intentar crear el producto.");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <main className="crear-producto-page">
            <div className="crear-producto-container">
                <Link to="/productos" className="volver-link">
                    ← Volver al catálogo
                </Link>

                <header className="crear-producto-header">
                    <span className="crear-producto-eyebrow">Menu Administracion</span>
                    <h1 className="crear-producto-title">Crear nuevo producto</h1>
                    <p className="crear-producto-subtitle">
                        Formulario para sumar una nueva pieza al catálogo de la mueblería.
                    </p>
                </header>

                {/* mensaje de error si falla la petición */}
                {error && (
                    <div className="form-error-banner" role="alert">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* formulario reutilizable de producto */}
                <ProductForm
                    onSubmit={handleSubmit}
                    submitLabel="Crear producto"
                    isSubmitting={enviando}
                />
            </div>
        </main>
    );
}
