import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm/ProductForm";
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

        fetch(`/api/productos/${id}`)
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "No se pudo obtener el producto");
                }
                return data;
            })
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
            const response = await fetch(`/api/productos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datosActualizados),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "No se pudo actualizar el producto.");
            }

            // Al guardar exitosamente, navegar al detalle del producto /productos/:id
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
