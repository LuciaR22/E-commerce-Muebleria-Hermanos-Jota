import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usuarioService from "../services/usuarioService";
import "./Registro.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Registro() {
    const navigate = useNavigate();

    // 1. Estado controlado único para todos los campos
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Errores individuales por campo
    const [errores, setErrores] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Estado para error devuelto por el servidor
    const [errorServidor, setErrorServidor] = useState("");

    // Estado booleano de envío para bloquear el botón
    const [enviando, setEnviando] = useState(false);

    // 2. Un solo manejador de cambios usando el atributo name del input
    const handleChange = e => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        // Limpiar el error específico del campo al escribir
        if (errores[name]) {
            setErrores(prev => ({
                ...prev,
                [name]: "",
            }));
        }

        // Limpiar error global del servidor al modificar campos
        if (errorServidor) {
            setErrorServidor("");
        }
    };

    // 3. Validación de campos en cliente
    const validarCampos = () => {
        const nuevosErrores = {
            nombre: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        const nombreTrim = formData.nombre.trim();
        const emailTrim = formData.email.trim();

        if (!nombreTrim) {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        } else if (nombreTrim.length < 2) {
            nuevosErrores.nombre = "El nombre debe tener al menos 2 caracteres.";
        }

        if (!emailTrim) {
            nuevosErrores.email = "El correo electrónico es obligatorio.";
        } else if (!EMAIL_REGEX.test(emailTrim)) {
            nuevosErrores.email = "Ingresá un correo electrónico válido (ej. usuario@ejemplo.com).";
        }

        if (!formData.password) {
            nuevosErrores.password = "La contraseña es obligatoria.";
        } else if (formData.password.length < 6) {
            nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres.";
        }

        if (!formData.confirmPassword) {
            nuevosErrores.confirmPassword = "Debés confirmar tu contraseña.";
        } else if (formData.password !== formData.confirmPassword) {
            nuevosErrores.confirmPassword = "Las contraseñas no coinciden.";
        }

        setErrores(nuevosErrores);

        // Retorna true si no hay ningún mensaje de error
        return !Object.values(nuevosErrores).some(error => error !== "");
    };

    // 4. Manejador del envío del formulario
    const handleSubmit = async e => {
        e.preventDefault();
        setErrorServidor("");

        if (!validarCampos()) {
            return;
        }

        setEnviando(true);

        try {
            await usuarioService.registrar({
                nombre: formData.nombre.trim(),
                email: formData.email.trim(),
                password: formData.password,
            });

            // navegar a /login con mensaje de confirmacion
            navigate("/login", {
                state: {
                    mensaje: "¡Cuenta creada con éxito! Ya podés iniciar sesión con tus credenciales.",
                },
            });
        } catch (error) {
            // error de servidor: mostrar mensaje sin borrar los campos
            const mensajeError =
                error.details?.error ||
                error.userMessage ||
                error.message ||
                "Hubo un problema al crear la cuenta. Intentá nuevamente.";
            setErrorServidor(mensajeError);
        } finally {
            // liberar estado de enviando
            setEnviando(false);
        }
    };

    return (
        <main className="registro-page">
            <section className="registro-container" aria-labelledby="registro-titulo">
                <header className="registro-header">
                    <span className="registro-eyebrow">Únete a nosotros</span>
                    <h1 id="registro-titulo" className="registro-title">
                        Crear cuenta
                    </h1>
                    <p className="registro-subtitle">
                        Completá tus datos para comprar y hacer seguimiento de tus pedidos.
                    </p>
                </header>

                {errorServidor && (
                    <div className="server-error" role="alert" aria-live="polite">
                        {errorServidor}
                    </div>
                )}

                <form className="registro-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre completo</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Ej. Juan Pérez"
                            value={formData.nombre}
                            onChange={handleChange}
                            aria-invalid={Boolean(errores.nombre)}
                            aria-describedby={errores.nombre ? "nombre-error" : undefined}
                            disabled={enviando}
                        />
                        <p className="error-text" id="nombre-error" aria-live="polite">
                            {errores.nombre || "\u00A0"}
                        </p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="ejemplo@correo.com"
                            value={formData.email}
                            onChange={handleChange}
                            aria-invalid={Boolean(errores.email)}
                            aria-describedby={errores.email ? "email-error" : undefined}
                            disabled={enviando}
                        />
                        <p className="error-text" id="email-error" aria-live="polite">
                            {errores.email || "\u00A0"}
                        </p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Al menos 6 caracteres"
                            value={formData.password}
                            onChange={handleChange}
                            aria-invalid={Boolean(errores.password)}
                            aria-describedby={errores.password ? "password-error" : undefined}
                            disabled={enviando}
                        />
                        <p className="error-text" id="password-error" aria-live="polite">
                            {errores.password || "\u00A0"}
                        </p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Repetí tu contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            aria-invalid={Boolean(errores.confirmPassword)}
                            aria-describedby={errores.confirmPassword ? "confirmPassword-error" : undefined}
                            disabled={enviando}
                        />
                        <p className="error-text" id="confirmPassword-error" aria-live="polite">
                            {errores.confirmPassword || "\u00A0"}
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="btn-registro"
                        disabled={enviando}
                        aria-busy={enviando}
                    >
                        {enviando ? "Creando cuenta..." : "Crear cuenta"}
                    </button>
                </form>

                <footer className="registro-footer">
                    <p>
                        ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión acá</Link>
                    </p>
                </footer>
            </section>
        </main>
    );
}
