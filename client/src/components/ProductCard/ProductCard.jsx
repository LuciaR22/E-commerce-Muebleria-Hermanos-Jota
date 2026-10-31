import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ producto, seleccionarProducto }) {
    const id = producto._id || producto.id;
    const imagenSrc = producto.imagenUrl || producto.imagen;

    return (
        <article className="product-card">
            <img className="product-card__image" src={imagenSrc} alt={producto.nombre} />

            <h2 className="product-card__title">{producto.nombre}</h2>

            <p className="product-card__price">${producto.precio?.toLocaleString("es-AR")}</p>


            <Link to={`/productos/${producto._id || producto.id}`} className="boton-ver-detalle">
            Ver detalle
            </Link>
            
        </article>
    );
}

export default ProductCard;
