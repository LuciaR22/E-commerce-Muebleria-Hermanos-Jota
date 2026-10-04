import { Link } from "react-router-dom";
import ApiState from "../components/ApiState";
import useApiResource from "../hooks/useApiResource";
import productosService from "../services/productosService";

// página de inicio
export default function HomePage() {
    const { data: productosData, status, error, retry } = useApiResource(() => productosService.getProductos(), []);
    const productos = Array.isArray(productosData) ? productosData : [];
    const destacados = productos.slice(0, 4);

    return (
        <main>
            {/* banner principal */}
            <section className="hero" aria-label="Banner principal">
                <div className="hero__content">
                    <p className="hero__eyebrow">Mueblería Hermanos Jota</p>

                    <h1 className="hero__title">Diseño y confort para tu hogar</h1>

                    <p className="hero__subtitle">
                        Descubrí muebles hechos con dedicación, materiales seleccionados y estilo atemporal para cada
                        ambiente.
                    </p>

                    <Link to="/productos" className="hero__cta boton-texto">
                        Ver productos
                    </Link>
                </div>
            </section>

            {/* productos desrtacados */}
            <section id="destacados">
                <h2>Productos destacados</h2>

                {status === "loading" || status === "refreshing" ? (
                    <ApiState
                        status={status}
                        title="Cargando destacados"
                        message="Estamos buscando los productos más representativos para mostrarte."
                    />
                ) : null}

                {status === "error" ? (
                    <ApiState
                        status={status}
                        title="No pudimos cargar los destacados"
                        message={error}
                        actions={
                            <>
                                <button type="button" className="hero__cta boton-texto" onClick={retry}>
                                    Reintentar
                                </button>
                                <Link to="/productos" className="hero__cta boton-texto">
                                    Ver catálogo
                                </Link>
                            </>
                        }
                    />
                ) : null}

                {status === "success" && destacados.length > 0 ? (
                    <div id="productos-destacados">
                        {destacados.map(producto => (
                            <article key={producto.id}>
                                <img src={producto.imagen} alt={producto.nombre} />
                                <h3>{producto.nombre}</h3>
                                <p>${Number(producto.precio).toLocaleString("es-AR")}</p>
                                <Link to="/productos">Ver producto</Link>
                            </article>
                        ))}
                    </div>
                ) : null}

                {status === "success" && destacados.length === 0 ? (
                    <div className="home-featured-empty">
                        <p>Por ahora no hay productos destacados para mostrar.</p>
                        <Link to="/productos" className="hero__cta boton-texto">
                            Explorar catálogo
                        </Link>
                    </div>
                ) : null}
            </section>
        </main>
    );
}
