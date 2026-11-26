import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import useAuth from "../../hooks/useAuth";
import "./Navbar.css";

export default function Navbar({ cartCount: cartCountProp }) {
  const { usuario, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const contador = cartCountProp !== undefined ? cartCountProp : cartCount;

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <Link to="/" className="navbar__logo">
            <img src="/Imagenes/logo.svg" alt="Logo Hermanos Jota" className="navbar__logo-img" />
            <span className="navbar__brand">Hermanos Jota</span>
          </Link>
        </div>

        <nav className="navbar__center" aria-label="Navegación principal">
          <ul className="navbar__list">
            <li className="navbar__item">
              <NavLink to="/" end className="navbar__link" activeClassName="navbar__link--active">
                Inicio
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to="/productos" className="navbar__link" activeClassName="navbar__link--active">
                Productos
              </NavLink>
            </li>

  
          {!isAdmin && (
  <li className="navbar__item">
    <NavLink to="/contacto" className="navbar__link" activeClassName="navbar__link--active">
      Contacto
    </NavLink>
  </li>
)}
          </ul>
        </nav>

        {/* Right: user area & cart */}
        <div className="navbar__right">
            

          {!isAuthenticated && (
            <ul className="navbar__auth-list">
              <li className="navbar__auth-item">
                <NavLink to="/login" className="navbar__link" activeClassName="navbar__link--active">
                  Ingresar
                </NavLink>
              </li>
              <li className="navbar__auth-item">
                <NavLink to="/registro" className="navbar__link" activeClassName="navbar__link--active">
                  Registrarse
                </NavLink>
              </li>
            
          </ul>
          )}

          {isAuthenticated && (
              <div className="navbar__user">
                {isAdmin && (
                  <Link to="/admin/crear-producto" className="navbar__admin-btn">
                    + Nuevo producto
                  </Link>
                )}
                <button type="button" className="navbar__logout" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            )}

          {/* Cart button */}
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
        </div>
      </div>
    </header>
  );
}
