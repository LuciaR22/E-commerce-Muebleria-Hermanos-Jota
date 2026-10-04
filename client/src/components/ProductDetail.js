import { useState, useEffect } from "react";

function ProductDetail({ id, volverAlCatalogo }) {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/productos/" + id)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al cargar el producto");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProducto(datos);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar el producto");
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return null;

  return (
    <div className="product-page">
      <section className="product-detail" aria-labelledby="product-title">
        <figure className="product-detail__media">
          <div className="product-detail__image-shell">
            <img src={producto.imagen} alt={producto.nombre} className="product-detail__image" />
          </div>
        </figure>

        <div className="product-detail__content">
          <h1 className="product-detail__title" id="product-title">{producto.nombre}</h1>
          <p className="product-detail__lead">{producto.descripcion}</p>

          <p className="product-detail__price-note">$ {producto.precio}</p>
          <p>{producto.fabricacion || producto.materiales}</p>

          <button onClick={volverAlCatalogo} className="boton-texto product-detail__cta">
            Volver al catálogo
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
