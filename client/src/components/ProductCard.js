function ProductCard({ producto }) {
  return (
    <article>
      <img src={producto.imagen} alt={producto.nombre} />
      <h2>{producto.nombre}</h2>
      <p>${producto.precio}</p>
      <a href={`producto.html?id=${producto.id}`}>
        Ver producto
      </a>
    </article>
  );
}

export default ProductCard;