
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import useAuth from "../../hooks/useAuth";
import "./Navbar.css";

export default function Navbar({ cartCount: cartCountProp }) {
    const { isAuthenticated, isAdmin, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    // cantidad de productos en el carrito (desde el contexto)
    const contador = cartCountProp !== undefined ? cartCountProp : cartCount;

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__brand">
                    <Link to="/" className="header__logo">
                        <img src="/Imagenes/logo.svg" alt="Logo Hermanos Jota" className="logo-img" />
                        <span className="header__brand-name">Hermanos Jota</span>
                    </Link>
                </div>

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

                        {!isAuthenticated && (
                            <>
                                <li>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) => `nav__link${isActive ? " active" : ""}`}
                                    >
                                        Ingresar
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/registro"
                                        className={({ isActive }) => `nav__link${isActive ? " active" : ""}`}
                                    >
                                        Registrarse
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {isAuthenticated && (
                            <li>
                                <NavLink
                                    to="/perfil"
                                    className={({ isActive }) => `nav__link${isActive ? " active" : ""}`}
                                >
                                    Perfil
                                </NavLink>
                            </li>
                        )}

                        {/* Solo mostramos "Crear Producto" si el rol es admin */}
                        {isAdmin && (
                            <li>
                                <NavLink
                                    to="/admin/crear-producto"
                                    className={({ isActive }) => `nav__link${isActive ? " active" : ""}`}
                                >
                                    Crear Producto
                                </NavLink>
                            </li>
                        )}

                        {isAuthenticated && (
                            <li>
                                <button
                                    type="button"
                                    className="nav__link"
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* El carrito ahora es un Link a /carrito */}
                <Link to="/carrito" className="header__cart" title="Carrito de compras" aria-label="Carrito de compras">
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
                    <span id="cart-count" className="cart-count">
                        {contador}
                    </span>
                </Link>
            </div>
        </header>
    );
}
