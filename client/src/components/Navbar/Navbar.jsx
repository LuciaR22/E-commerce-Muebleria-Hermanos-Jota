import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import useAuth from "../../hooks/useAuth";
import "./Navbar.css";

export default function Navbar({ cartCount: cartCountProp }) {
    const { usuario, isAuthenticated, isAdmin, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    // estado para abrir y cerrar el menu desplegable de acciones
    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef(null);

    // cantidad de productos en el carrito (desde el contexto)
    const contador = cartCountProp !== undefined ? cartCountProp : cartCount;

    // cerrar el menu al hacer click afuera o presionar escape
    useEffect(() => {
        const handleClickFuera = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuAbierto(false);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setMenuAbierto(false);
            }
        };

        if (menuAbierto) {
            document.addEventListener("mousedown", handleClickFuera);
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickFuera);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [menuAbierto]);

    // cerrar el menu al navegar a otra ruta
    useEffect(() => {
        setMenuAbierto(false);
    }, [location.pathname]);

    // funcion para cerrar sesion
    const handleLogout = () => {
        setMenuAbierto(false);
        logout();
        navigate("/", { replace: true });
    };

    // helper para clase activa en react router
    const getLinkClass = ({ isActive }) =>
        `navbar__link${isActive ? " navbar__link--active" : ""}`;

    return (
        <header className="navbar">
            <div className="navbar__container">
                {/* Logo y nombre de la marca */}
                <div className="navbar__left">
                    <Link to="/" className="navbar__logo">
                        <img
                            src="/Imagenes/logo.svg"
                            alt="Logo Hermanos Jota"
                            className="navbar__logo-img"
                        />
                        <span className="navbar__brand">Hermanos Jota</span>
                    </Link>
                </div>

                {/* Navegacion central */}
                <nav className="navbar__center" aria-label="Navegación principal">
                    <ul className="navbar__list">
                        <li className="navbar__item">
                            <NavLink to="/" end className={getLinkClass}>
                                Inicio
                            </NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink to="/productos" className={getLinkClass}>
                                Productos
                            </NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink to="/contacto" className={getLinkClass}>
                                Contacto
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Area derecha: autenticacion, carrito y acciones */}
                <div className="navbar__right">
                    {!isAuthenticated ? (
                        <ul className="navbar__auth-list">
                            <li className="navbar__auth-item">
                                <NavLink to="/login" className={getLinkClass}>
                                    Ingresar
                                </NavLink>
                            </li>
                            <li className="navbar__auth-item">
                                <NavLink to="/registro" className={getLinkClass}>
                                    Registrarse
                                </NavLink>
                            </li>
                        </ul>
                    ) : null}

                    {/* Boton del carrito */}
                    <Link
                        to="/carrito"
                        className="navbar__cart"
                        title="Carrito de compras"
                        aria-label="Carrito de compras"
                    >
                        <svg
                            className="navbar__cart-icon"
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
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <span className="navbar__cart-label">Carrito</span>
                        <span className="navbar__cart-badge">{contador}</span>
                    </Link>

                    {/* Menu desplegable de Acciones (visible al estar logueado) */}
                    {isAuthenticated && (
                        <div className="navbar__acciones-wrapper" ref={menuRef}>
                            <button
                                type="button"
                                className={`navbar__acciones-btn ${
                                    menuAbierto ? "navbar__acciones-btn--active" : ""
                                }`}
                                onClick={() => setMenuAbierto((prev) => !prev)}
                                aria-expanded={menuAbierto}
                                aria-haspopup="true"
                                aria-label="Menú de acciones de usuario"
                            >
                                <span>Acciones</span>
                                <svg
                                    className={`navbar__acciones-chevron ${
                                        menuAbierto ? "navbar__acciones-chevron--open" : ""
                                    }`}
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>

                            {/* Dropdown flotante con animacion suave */}
                            <div
                                className={`navbar__dropdown ${
                                    menuAbierto ? "navbar__dropdown--open" : ""
                                }`}
                                role="menu"
                            >
                                {/* Header con usuario y rol */}
                                <div className="navbar__dropdown-header">
                                    <span className="navbar__dropdown-name">
                                        {usuario?.nombre || "Usuario"}
                                    </span>
                                    <span className="navbar__dropdown-role">
                                        {isAdmin ? "Administrador" : "Cliente"}
                                    </span>
                                </div>

                                <div className="navbar__dropdown-divider" />

                                {/* Opcion para admin: nuevo producto */}
                                {isAdmin && (
                                    <Link
                                        to="/admin/crear-producto"
                                        className="navbar__dropdown-item navbar__dropdown-item--highlight"
                                        role="menuitem"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                        Nuevo producto
                                    </Link>
                                )}

                                {/* Opciones para clientes y admins */}
                                <Link
                                    to="/perfil"
                                    className="navbar__dropdown-item"
                                    role="menuitem"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    Mi Perfil
                                </Link>

                                <Link
                                    to="/mis-pedidos"
                                    className="navbar__dropdown-item"
                                    role="menuitem"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="16" y1="13" x2="8" y2="13" />
                                        <line x1="16" y1="17" x2="8" y2="17" />
                                    </svg>
                                    Mis Pedidos
                                </Link>

                                <div className="navbar__dropdown-divider" />

                                {/* Boton de cerrar sesion */}
                                <button
                                    type="button"
                                    className="navbar__dropdown-item navbar__dropdown-item--logout"
                                    onClick={handleLogout}
                                    role="menuitem"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
