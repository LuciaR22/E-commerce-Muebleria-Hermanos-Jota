import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ seleccionarProducto }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/productos")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al cargar los productos");
        }

        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
      })
      .catch((error) => {
        console.error(error); // Esto imprime el problema real en la consola
        setError("No se pudieron cargar los productos");
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div id="productos-destacados">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          seleccionarProducto={seleccionarProducto}
        />
      ))}
    </div>
  );
}

export default ProductList;
