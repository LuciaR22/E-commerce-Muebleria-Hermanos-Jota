import { Link } from "react-router-dom";
import "./Footer.css";

// componente footer
export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__brand">
                    <Link to="/" aria-label="Inicio">
                        <img src="/Imagenes/logo.svg" alt="Logo Hermanos Jota" className="footer__logo-img" />
                    </Link>
                </div>

                <div className="footer__links">
                    <h4>Navegación</h4>
                    <ul>
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/productos">Productos</Link>
                        </li>
                        <li>
                            <Link to="/contacto">Contacto</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer__contact">
                    <h4>Contacto</h4>
                    <p>Av. San Juan 2847, CABA</p>
                    <p>info@hermanosjota.com.ar</p>
                    <p>WhatsApp: +54 11 4567-8900</p>
                    <p>Instagram: @hermanosjota_ba</p>
                </div>
            </div>

            <div className="footer__bottom">
                <p>&copy; 2026 Hermanos Jota. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
