// Importamos el logo directamente desde la carpeta de imágenes
import logo from "../../../Imagenes/logo.svg";

// Componente Navbar
export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="header">
      <div className="header__container">
        {/* Logo y nombre de la marca */}
        <div className="header__brand">
          <a href="#" className="header__logo">
            <img
              src={logo}
              alt="Logo Hermanos Jota"
              className="logo-img"
            />
            <span className="header__brand-name">Hermanos Jota</span>
          </a>
        </div>

        {/* Navegación principal */}
        <nav className="nav" aria-label="Navegación principal">
          <ul className="nav__list">
            <li>
              <a href="#" className="nav__link active">
                Inicio
              </a>
            </li>
            <li>
              <a href="#destacados" className="nav__link">
                Productos
              </a>
            </li>
            <li>
              <a href="#contacto" className="nav__link">
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <div
          className="header__cart"
          title="Carrito de compras"
          aria-label="Carrito de compras"
        >
          <svg
            className="header__cart-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="header__cart-label">Carrito:</span>
          {/* El contador se actualiza con el largo del array carrito */}
          <span id="cart-count" className="cart-count">
            {cartCount}
          </span>
        </div>
      </div>
    </header>
  );
}

