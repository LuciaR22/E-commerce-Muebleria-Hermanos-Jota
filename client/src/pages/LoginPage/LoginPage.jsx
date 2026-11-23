
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usuarioService from "../../services/usuarioService";
import "./LoginPage.css";

export default function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    // Mensaje recibido desde navigate('/login', { state: { mensaje: '...' } })
    const mensajeExito = location.state?.mensaje;

    const [credenciales, setCredenciales] = useState({
        email: "",
        password: "",
    });
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredenciales((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cargando) return;

        if (!credenciales.email.trim() || !credenciales.password) {
            setError("Completá email y contraseña.");
            return;
        }

        setCargando(true);
        setError("");

        try {
            const datos = await usuarioService.iniciarSesion({
                email: credenciales.email.trim(),
                password: credenciales.password,
            });

            if (datos?.token && datos?.usuario) {
                login(datos.usuario, datos.token);

                const destino = location.state?.from?.pathname || "/";
                navigate(destino, { replace: true });
            } else {
                setError("No se recibieron los datos necesarios para iniciar sesión.");
            }
        } catch (error) {
            setError(
                error.status === 401
                    ? "Credenciales inválidas."
                    : error.userMessage || "Error de conexión al servidor."
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <main className="login-page">
            <section className="login-container" aria-labelledby="login-titulo">
                <header className="login-header">
                    <span className="login-eyebrow">Bienvenido de nuevo</span>
                    <h1 id="login-titulo" className="login-title">
                        Iniciar sesión
                    </h1>
                    <p className="login-subtitle">Ingresá a tu cuenta para continuar.</p>
                </header>

                {mensajeExito && (
                    <div className="alert-success" role="status" aria-live="polite">
                        {mensajeExito}
                    </div>
                )}

                {error && (
                    <div className="server-error" role="alert">
                        {error}
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login-email">Correo electrónico</label>
                        <input
                            type="email"
                            id="login-email"
                            name="email"
                            placeholder="correo@ejemplo.com"
                            value={credenciales.email}
                            onChange={handleChange}
                            required
                            disabled={cargando}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="login-password">Contraseña</label>
                        <input
                            type="password"
                            id="login-password"
                            name="password"
                            placeholder="Tu contraseña"
                            value={credenciales.password}
                            onChange={handleChange}
                            required
                            disabled={cargando}
                        />
                    </div>

                    <button type="submit" className="btn-login" disabled={cargando}>
                        {cargando ? "Ingresando..." : "Iniciar sesión"}
                    </button>
                </form>

                <footer className="login-footer">
                    <p>
                        ¿No tenés una cuenta? <Link to="/registro">Crear cuenta</Link>
                    </p>
                </footer>
            </section>
        </main>
    );
}

