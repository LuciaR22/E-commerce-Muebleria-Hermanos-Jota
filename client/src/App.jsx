// Importamos el hook useState de React para manejar el estado del carrito
import { useState } from "react";

// Importamos los componentes Navbar y Footer
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  // Estado del carrito: array que almacena los productos seleccionados (inicia vacío)
  const [carrito, setCarrito] = useState([]);

  // Función para agregar un producto al carrito usando el operador spread
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <>
      {/* Navbar en la parte superior: recibe carrito.length para mostrar el contador */}
      <Navbar cartCount={carrito.length} />

      {/* Contenido principal: Banner Hero original del Sprint 2 */}
      <main>
        <section className="hero" aria-label="Banner principal">
          <div className="hero__content">
            <p className="hero__eyebrow">Mueblería Hermanos Jota</p>
            <h1 className="hero__title">Diseño y confort para tu hogar</h1>
            <p className="hero__subtitle">
              Descubrí muebles hechos con dedicación, materiales seleccionados y
              estilo atemporal para cada ambiente.
            </p>
            <a href="productos.html" className="hero__cta boton-texto">
              Ver productos
            </a>
          </div>
        </section>
      </main>

      {/* Footer en la parte inferior */}
      <Footer />
    </>
  );
}
