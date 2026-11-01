import { Link } from "react-router-dom";
import "./ProductCard.css"; // Si no lo tenés importado acá

export default function ProductCard({ producto }) {
    return (
        <article className="product-card">
            <figure className="product-card__media">
                <img 
                    src={producto.imagenUrl || producto.imagen} 
                    alt={producto.nombre} 
                    className="product-card__image" 
                />
            </figure>
            
            <div className="product-card__content">
                <h3 className="product-card__title">{producto.nombre}</h3>
                <p className="product-card__price">
                    ${Number(producto.precio || 0).toLocaleString("es-AR")}
                </p>
                
                <Link 
                    to={`/productos/${producto._id || producto.id}`} 
                    className="product-card__button"
                >
                    Ver detalle
                </Link>
            </div>
        </article>
    );
}