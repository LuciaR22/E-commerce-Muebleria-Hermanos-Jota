import "./Footer.css";

// Componente Footer: pie de página reutilizable
export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                {/* Logo de la marca */}
                <div className="footer__brand">
                    <img src="/Imagenes/logo.svg" alt="Logo Hermanos Jota" className="footer__logo-img" />
                </div>

                {/* Enlaces de navegación del pie de página */}
                <div className="footer__links">
                    <h4>Navegación</h4>
                    <ul>
                        <li>
                            <a href="index.html">Inicio</a>
                        </li>
                        <li>
                            <a href="productos.html">Productos</a>
                        </li>
                        <li>
                            <a href="contacto.html">Contacto</a>
                        </li>
                    </ul>
                </div>

                {/* Información de contacto */}
                <div className="footer__contact">
                    <h4>Contacto</h4>
                    <p>Av. San Juan 2847, CABA</p>
                    <p>info@hermanosjota.com.ar</p>
                    <p>WhatsApp: +54 11 4567-8900</p>
                    <p>Instagram: @hermanosjota_ba</p>
                </div>
            </div>

            {/* Derechos reservados */}
            <div className="footer__bottom">
                <p>&copy; 2026 Hermanos Jota. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
