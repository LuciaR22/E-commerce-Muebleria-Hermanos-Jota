// Importamos el hook useState de React para manejar el estado del carrito
import { useState } from "react";

// Importamos los componentes Navbar y Footer
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Importamos el componente ProductList para mostrar los productos
import ProductList from "./components/ProductList";

// Importamos el componente ContactForm para mostrar el formulario de contacto
import ContactForm from "./components/ContactForm";

// Importamos el componente ProductDetail para mostrar el detalle de un producto
import ProductDetail from "./components/ProductDetail";

export default function App() {
  // Estado del carrito: array que almacena los productos seleccionados (inicia vacío)
  const [carrito, setCarrito] = useState([]);

  // Estado del producto seleccionado: guarda el producto que el usuario eligió
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(null);

  // Función para agregar un producto al carrito usando el operador spread
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // Función para seleccionar un producto y mostrar su detalle
  const seleccionarProducto = (producto) => {
    setProductoSeleccionadoId(producto.id);
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

            <h1 className="hero__title">
              Diseño y confort para tu hogar
            </h1>

            <p className="hero__subtitle">
              Descubrí muebles hechos con dedicación, materiales seleccionados y
              estilo atemporal para cada ambiente.
            </p>

            <a
              href="#destacados"
              className="hero__cta boton-texto"
            >
              Ver productos
            </a>
          </div>
        </section>

        {/* Renderizado condicional: muestra el detalle o el catálogo */}
        {productoSeleccionadoId ? (
          <ProductDetail
            id={productoSeleccionadoId}
            volverAlCatalogo={() => setProductoSeleccionadoId(null)}
          />
        ) : (
          <section id="destacados">
            <h2>Productos destacados</h2>

            <ProductList
              seleccionarProducto={seleccionarProducto}
            />
          </section>
        )}

        <section id="contacto" className="contact-container">
          <h1>Contacto</h1>
          <p className="contact-info">
            Completa el siguiente formulario y te responderemos a la brevedad.
          </p>
          <ContactForm />
        </section>
      </main>

      {/* Footer en la parte inferior */}
      <Footer />
    </>
  );
}




