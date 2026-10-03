import ProductList from "./components/ProductList";
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <div>
      <h1>Mueblería Hermanos Jota</h1>

      <ProductList />

      <h2>Contacto</h2>
      <ContactForm />
    </div>
  );
}

export default App;