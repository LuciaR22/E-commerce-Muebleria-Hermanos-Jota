import { useState } from "react";

function ContactForm() {
  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    
    setDatos({
      ...datos,
      [name]: value,
    });
  };

  return (
    <form className="contact-form">
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
    </form>
  );
}

export default ContactForm;