import { useState } from "react";

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

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setDatos({
      ...datos,
      [name]: value,
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!datos.nombre || !datos.email || !datos.mensaje) {
      setMensajeEstado({
        tipo: "error",
        texto: "Todos los campos son obligatorios.",
      });
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(datos.email)) {
      setMensajeEstado({
        tipo: "error",
        texto: "Ingresá un email válido.",
      });
      return;
    }

    setMensajeEstado({
      tipo: "exito",
      texto: "Mensaje enviado correctamente.",
    });

    setDatos({
      nombre: "",
      email: "",
      mensaje: "",
    });
  };

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
        />
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
        />
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
        ></textarea>
      </div>

      <button type="submit" className="btn-submit">
        Enviar mensaje
      </button>

      {mensajeEstado.texto && (
        <p className={mensajeEstado.tipo}>
          {mensajeEstado.texto}
        </p>
      )}
    </form>
  );
}

export default ContactForm;