import { useState } from "react";
import "./ContactForm.css";

function ContactForm() {
    const [datos, setDatos] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });

    const [mensajeEstado, setMensajeEstado] = useState({
        tipo: "",
        texto: "",
    });

    const [errores, setErrores] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });

    const [tocados, setTocados] = useState({
        nombre: false,
        email: false,
        mensaje: false,
    });

    const [enviando, setEnviando] = useState(false);

    const validarCampo = (nombreCampo, valor) => {
        const valorNormalizado = valor.trim();

        if (nombreCampo === "nombre") {
            if (!valorNormalizado) {
                return "Ingresá tu nombre completo.";
            }

            if (valorNormalizado.length < 3) {
                return "El nombre debe tener al menos 3 caracteres.";
            }

            return "";
        }

        if (nombreCampo === "email") {
            if (!valorNormalizado) {
                return "Ingresá tu correo electrónico.";
            }

            const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailValido.test(valorNormalizado)) {
                return "Ingresá un correo electrónico válido, por ejemplo nombre@dominio.com.";
            }

            return "";
        }

        if (nombreCampo === "mensaje") {
            if (!valorNormalizado) {
                return "Escribí un mensaje para poder responderte.";
            }

            if (valorNormalizado.length < 10) {
                return "Tu mensaje debe tener al menos 10 caracteres.";
            }

            return "";
        }

        return "";
    };

    const validarFormulario = datosActuales => {
        const nuevosErrores = {
            nombre: validarCampo("nombre", datosActuales.nombre),
            email: validarCampo("email", datosActuales.email),
            mensaje: validarCampo("mensaje", datosActuales.mensaje),
        };

        setErrores(nuevosErrores);

        return nuevosErrores;
    };

    const manejarCambio = e => {
        const { name, value } = e.target;

        setDatos({
            ...datos,
            [name]: value,
        });

        if (tocados[name]) {
            setErrores(prevErrores => ({
                ...prevErrores,
                [name]: validarCampo(name, value),
            }));
        }
    };

    const manejarBlur = e => {
        const { name, value } = e.target;

        setTocados(prevTocados => ({
            ...prevTocados,
            [name]: true,
        }));

        setErrores(prevErrores => ({
            ...prevErrores,
            [name]: validarCampo(name, value),
        }));
    };

    const manejarSubmit = async e => {
        e.preventDefault();

        const camposTocados = {
            nombre: true,
            email: true,
            mensaje: true,
        };

        setTocados(camposTocados);

        const erroresFormulario = validarFormulario(datos);
        const tieneErrores = Object.values(erroresFormulario).some(error => error);

        if (tieneErrores) {
            setMensajeEstado({
                tipo: "error",
                texto: "Revisá los campos marcados antes de enviar el mensaje.",
            });
            return;
        }

        setEnviando(true);
        setMensajeEstado({
            tipo: "",
            texto: "",
        });

        try {
            await new Promise(resolve => {
                setTimeout(resolve, 900);
            });

            setMensajeEstado({
                tipo: "exito",
                texto: "Tu mensaje fue enviado. Te vamos a responder a la brevedad.",
            });

            setDatos({
                nombre: "",
                email: "",
                mensaje: "",
            });

            setErrores({
                nombre: "",
                email: "",
                mensaje: "",
            });

            setTocados({
                nombre: false,
                email: false,
                mensaje: false,
            });
        } finally {
            setEnviando(false);
        }
    };

    const mostrarError = campo => tocados[campo] && errores[campo];

    return (
        <form className="contact-form" onSubmit={manejarSubmit}>
            <div className="form-group">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={datos.nombre}
                    onChange={manejarCambio}
                    onBlur={manejarBlur}
                    aria-invalid={Boolean(mostrarError("nombre"))}
                    aria-describedby="nombre-error"
                />
                <p className="error-text" id="nombre-error" aria-live="polite">
                    {mostrarError("nombre") || "\u00A0"}
                </p>
            </div>

            <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="correo@ejemplo.com"
                    value={datos.email}
                    onChange={manejarCambio}
                    onBlur={manejarBlur}
                    aria-invalid={Boolean(mostrarError("email"))}
                    aria-describedby="email-error"
                />
                <p className="error-text" id="email-error" aria-live="polite">
                    {mostrarError("email") || "\u00A0"}
                </p>
            </div>

            <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                    id="mensaje"
                    name="mensaje"
                    placeholder="Escribí tu mensaje..."
                    rows="5"
                    value={datos.mensaje}
                    onChange={manejarCambio}
                    onBlur={manejarBlur}
                    aria-invalid={Boolean(mostrarError("mensaje"))}
                    aria-describedby="mensaje-error"
                ></textarea>
                <p className="error-text" id="mensaje-error" aria-live="polite">
                    {mostrarError("mensaje") || "\u00A0"}
                </p>
            </div>

            <button type="submit" className="btn-submit" disabled={enviando}>
                {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>

            {mensajeEstado.texto && (
                <p className={`form-message ${mensajeEstado.tipo}`} aria-live="polite">
                    {mensajeEstado.texto}
                </p>
            )}
        </form>
    );
}

export default ContactForm;
