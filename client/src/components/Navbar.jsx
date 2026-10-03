// Importamos el logo directamente desde la carpeta de imágenes
import { Link, NavLink } from "react-router-dom";
import logo from "../../../Imagenes/logo.svg";

// Componente Navbar
export default function Navbar({ cartCount = 0 }) {
    return (
        <header className="header">
            <div className="header__container">
                {/* Logo y nombre de la marca */}
                <div className="header__brand">
                    <Link to="/" className="header__logo">
                        <img src={logo} alt="Logo Hermanos Jota" className="logo-img" />
                        <span className="header__brand-name">Hermanos Jota</span>
                    </Link>
                </div>

                {/* Navegación principal */}
                <nav className="nav" aria-label="Navegación principal">
                    <ul className="nav__list">
                        <li>
                            <NavLink to="/" end className={({ isActive }) => `nav__link${isActive ? " active" : ""}`}>
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/productos"
                                className={({ isActive }) => `nav__link${isActive ? " active" : ""}`}
                            >
                                Productos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contacto"
                                className={({ isActive }) => `nav__link${isActive ? " active" : ""}`}
                            >
                                Contacto
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="header__cart" title="Carrito de compras" aria-label="Carrito de compras">
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
