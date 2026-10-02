function ProductDetail({ producto, volverAlCatalogo }) {
  return (
    <section>
      <button onClick={volverAlCatalogo}>
        Volver al catálogo
      </button>

      <img src={producto.imagen} alt={producto.nombre} />

      <h1>{producto.nombre}</h1>

      <p>{producto.descripcion}</p>

      <p>{producto.fabricacion}</p>

      <p>${producto.precio}</p>
    </section>
  );
}

export default ProductDetail;