import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// página de inicio
export default function HomePage() {
    // estado para los productos destacados
    const [destacados, setDestacados] = useState([]);

    useEffect(() => {
        // carga los primeros 4 productos desde la api
        fetch("/api/productos")
            .then(res => res.json())
            .then(datos => {
                setDestacados(datos.slice(0, 4));
            })
            .catch(() => {
                setDestacados([]);
            });
    }, []);

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
            {destacados.length > 0 && (
                <section id="destacados">
                    <h2>Productos destacados</h2>
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
                </section>
            )}
        </main>
    );
}
