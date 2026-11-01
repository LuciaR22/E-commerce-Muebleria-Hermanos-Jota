import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm/ProductForm";
import productosService from "../services/productosService";
import "./EditarProducto.css";

/**
 * Página de administración para editar un producto existente.
 */
export default function EditarProducto() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estados para control de carga inicial, guardado y mensajes de error
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState(null);

    // Cargar los datos del producto a editar mediante GET /api/productos/:id
    useEffect(() => {
        let isMounted = true;
        setCargando(true);
        setError(null);

        productosService
            .getProductoById(id)
            .then(data => {
                if (isMounted) {
                    setProducto({
                        nombre: data.nombre || "",
                        descripcion: data.descripcion || "",
                        precio: data.precio !== undefined ? data.precio : "",
                        stock: data.stock !== undefined ? data.stock : "",
                        imagenUrl: data.imagenUrl || data.imagen || "",
                    });
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err.message || "Error al cargar los datos del producto.");
                }
            })
            .finally(() => {
                if (isMounted) {
                    setCargando(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [id]);

    // Manejador del submit para actualizar el producto mediante PUT /api/productos/:id
    const handleSubmit = async datosActualizados => {
        setGuardando(true);
        setError(null);

        try {
            await productosService.actualizarProducto(id, datosActualizados);
            navigate(`/productos/${id}`);
        } catch (err) {
            setError(err.message || "Ocurrió un error al actualizar el producto.");
        } finally {
            setGuardando(false);
        }
    };

    return (
        <main className="editar-producto-page">
            <div className="editar-producto-container">
                <Link to={id ? `/productos/${id}` : "/productos"} className="volver-link">
                    ← Volver al producto
                </Link>

                <header className="editar-producto-header">
                    <span className="editar-producto-eyebrow">Menú Administración</span>
                    <h1 className="editar-producto-title">Editar producto</h1>
                    <p className="editar-producto-subtitle">
                        Modificá los datos para mantener precios y stock al día.
                    </p>
                </header>

                {/* Banner de error si falla la carga o la actualización */}
                {error && (
                    <div className="form-error-banner" role="alert">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* Estado de carga inicial */}
                {cargando ? (
                    <div className="editar-producto-loading">
                        <div className="editar-producto-spinner" aria-hidden="true" />
                        <p>Cargando datos del producto...</p>
                    </div>
                ) : producto ? (
                    /* Formulario reutilizable precargado con initialValues */
                    <ProductForm
                        initialValues={producto}
                        onSubmit={handleSubmit}
                        submitLabel="Guardar cambios"
                        isSubmitting={guardando}
                    />
                ) : null}
            </div>
        </main>
    );
}
