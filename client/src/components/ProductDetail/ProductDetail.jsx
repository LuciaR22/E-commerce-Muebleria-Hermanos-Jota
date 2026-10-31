
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useApiResource from "../../hooks/useApiResource";
import productosService from "../../services/productosService";
import ApiState from "../ApiState";
import "./ProductDetail.css";

function ProductDetail({ agregarAlCarrito, quitarDelCarrito }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [eliminando, setEliminando] = useState(false);
    const [errorEliminacion, setErrorEliminacion] = useState("");

    const {
        data: producto,
        status,
        error,
        retry,
    } = useApiResource(() => {
        if (!id) {
            const missingProductError = new Error(
                "No se indicó ningún producto para cargar."
            );
            missingProductError.status = 400;
            missingProductError.retryable = false;
            throw missingProductError;
        }

        return productosService.getProductoById(id);
    }, [id]);

    const manejarEliminacion = async () => {
        const confirmar = window.confirm(
            `¿Estás seguro de que querés eliminar "${producto.nombre}"?`
        );

        if (!confirmar) return;

        setEliminando(true);
        setErrorEliminacion("");

        try {
            await productosService.eliminarProducto(producto._id);

            if (quitarDelCarrito) {
                quitarDelCarrito(producto._id);
            }

            navigate("/productos");
        } catch (error) {
            setErrorEliminacion(
                error.userMessage ||
                error.message ||
                "No se pudo eliminar el producto. Intentá nuevamente."
            );
        } finally {
            setEliminando(false);
        }
    };

    if (status === "loading" || status === "refreshing") {
        return (
            <ApiState
                status={status}
                title="Cargando producto"
                message="Estamos trayendo la ficha, imágenes y detalles del catálogo."
            />
        );
    }

    if (status === "error") {
        return (
            <ApiState
                status={status}
                title="No pudimos cargar este producto"
                message={error}
                actions={
                    <>
                        <button
                            type="button"
                            className="product-detail__cta"
                            onClick={retry}
                        >
                            Reintentar
                        </button>

                        <Link
                            to="/productos"
                            className="product-detail__back"
                        >
                            Volver al catálogo
                        </Link>
                    </>
                }
            />
        );
    }

    if (!producto) {
        return null;
    }

    const precioFormateado = Number(
        producto.precio || 0
    ).toLocaleString("es-AR");

    const imagenSrc = producto.imagenUrl || producto.imagen;

    return (
        <div className="product-detail-container">
            <Link to="/productos" className="product-detail__back">
                ← Volver al catálogo
            </Link>

            <section className="product-detail">
                <figure className="product-detail__media">
                    <div className="product-detail__image-shell">
                        <img
                            src={imagenSrc}
                            alt={producto.nombre}
                            className="product-detail__image"
                        />
                    </div>
                </figure>

                <div className="product-detail__content">
                    <span className="product-detail__eyebrow">
                        Hermanos Jota
                    </span>

                    <h2 className="product-detail__title">
                        {producto.nombre}
                    </h2>

                    <p className="product-detail__lead">
                        {producto.descripcion}
                    </p>

                    <p className="product-detail__price-note">
                        ${precioFormateado}
                    </p>

                    <div className="product-detail__actions">
                        <button
                            type="button"
                            className="product-detail__cta"
                            onClick={() => agregarAlCarrito(producto)}
                        >
                            Agregar al carrito
                        </button>

                        <Link
                            to={`/admin/editar-producto/${producto._id}`}
                            className="product-detail__edit-btn"
                        >
                            Editar
                        </Link>

                        <button
                            type="button"
                            className="product-detail__edit-btn"
                            onClick={manejarEliminacion}
                            disabled={eliminando}
                        >
                            {eliminando ? "Eliminando..." : "Eliminar"}
                        </button>
                    </div>

                    {errorEliminacion && (
                        <p role="alert" className="form-message error">
                            {errorEliminacion}
                        </p>
                    )}
                </div>
            </section>

            <section className="product-specs">
                <article className="product-specs__card">
                    <h3 className="product-specs__kicker">
                        Ficha técnica
                    </h3>

                    <ul className="product-specs__list">
                        {producto.stock !== undefined && (
                            <li className="product-specs__item">
                                <span className="product-specs__label">
                                    Stock
                                </span>
                                <span className="product-specs__value">
                                    {producto.stock} unidades
                                </span>
                            </li>
                        )}

                        {producto.medidas && (
                            <li className="product-specs__item">
                                <span className="product-specs__label">
                                    Medidas
                                </span>
                                <span className="product-specs__value">
                                    {producto.medidas}
                                </span>
                            </li>
                        )}

                        {producto.materiales && (
                            <li className="product-specs__item">
                                <span className="product-specs__label">
                                    Materiales
                                </span>
                                <span className="product-specs__value">
                                    {producto.materiales}
                                </span>
                            </li>
                        )}

                        {producto.acabado && (
                            <li className="product-specs__item">
                                <span className="product-specs__label">
                                    Acabado
                                </span>
                                <span className="product-specs__value">
                                    {producto.acabado}
                                </span>
                            </li>
                        )}

                        {producto.fabricacion && (
                            <li className="product-specs__item">
                                <span className="product-specs__label">
                                    Fabricación
                                </span>
                                <span className="product-specs__value">
                                    {producto.fabricacion}
                                </span>
                            </li>
                        )}
                    </ul>
                </article>
            </section>
        </div>
    );
}

export default ProductDetail;
