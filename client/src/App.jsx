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
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Función para agregar un producto al carrito usando el operador spread
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // Función para seleccionar un producto y mostrar su detalle
  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
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
              href="#catalogo"
              className="hero__cta boton-texto"
            >
              Ver productos
            </a>
          </div>
        </section>

        {/* Renderizado condicional: muestra el detalle o el catálogo */}
        {productoSeleccionado ? (
          <ProductDetail
            producto={productoSeleccionado}
            volverAlCatalogo={() => setProductoSeleccionado(null)}
          />
        ) : (
          <section id="catalogo">
            <h1>Catálogo de productos</h1>

            <ProductList
              seleccionarProducto={seleccionarProducto}
            />
          </section>
        )}

        {/* Formulario de contacto */}
        <h2>Contacto</h2>
        <ContactForm />
      </main>

      {/* Footer en la parte inferior */}
      <Footer />
    </>
  );
}