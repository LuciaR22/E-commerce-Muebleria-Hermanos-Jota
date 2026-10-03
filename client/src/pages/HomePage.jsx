import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <main>
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
        </main>
    );
}
