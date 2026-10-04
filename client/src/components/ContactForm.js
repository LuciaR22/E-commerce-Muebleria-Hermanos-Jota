import { useState } from "react";

function ContactForm() {
  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [mensajeExito, setMensajeExito] = useState("");

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setDatos({
      ...datos,
      [name]: value,
    });

    // Limpiar el error del campo al escribir
    setErrores({
      ...errores,
      [name]: "",
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    setMensajeExito("");
    
    let tieneErrores = false;
    const nuevosErrores = { nombre: "", email: "", mensaje: "" };

    const nombreValor = datos.nombre.trim();
    const emailValor = datos.email.trim();
    const mensajeValor = datos.mensaje.trim();

    if (nombreValor === "") {
      nuevosErrores.nombre = "Por favor, ingresá tu nombre completo.";
      tieneErrores = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValor === "") {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
      tieneErrores = true;
    } else if (!emailRegex.test(emailValor)) {
      nuevosErrores.email = "Ingresá un correo electrónico con formato válido.";
      tieneErrores = true;
    }

    if (mensajeValor === "") {
      nuevosErrores.mensaje = "El mensaje no puede estar vacío.";
      tieneErrores = true;
    }

    if (tieneErrores) {
      setErrores(nuevosErrores);
      return;
    }

    setMensajeExito(`¡Gracias ${nombreValor}! Recibimos tu consulta con éxito. Te responderemos a la brevedad.`);
    
    setDatos({
      nombre: "",
      email: "",
      mensaje: "",
    });
  };

  return (
    <>
      {mensajeExito && (
        <div className="success-alert is-visible" aria-live="polite">
          {mensajeExito}
        </div>
      )}

      <form className="contact-form" onSubmit={manejarSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre"
            value={datos.nombre}
            onChange={manejarCambio}
            className={errores.nombre ? "error" : ""}
          />
          <span className="error-text">{errores.nombre}</span>
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
            className={errores.email ? "error" : ""}
          />
          <span className="error-text">{errores.email}</span>
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
            className={errores.mensaje ? "error" : ""}
          ></textarea>
          <span className="error-text">{errores.mensaje}</span>
        </div>

        <button type="submit" className="btn-submit">
          Enviar mensaje
        </button>
      </form>
    </>
  );
}

export default ContactForm;


