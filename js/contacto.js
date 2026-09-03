/*
  Lógica de Validación del Formulario de Contacto
*/

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    
    const errorNombre = document.getElementById('error-nombre');
    const errorEmail = document.getElementById('error-email');
    const errorMensaje = document.getElementById('error-mensaje');
    
    const successAlert = document.getElementById('success-alert');

    // Función auxiliar para mostrar un error en un campo
    function mostrarError(input, errorSpan, mensaje) {
        input.classList.add('error');
        errorSpan.textContent = mensaje;
    }

    // Función auxiliar para limpiar el error de un campo
    function limpiarError(input, errorSpan) {
        input.classList.remove('error');
        errorSpan.textContent = '';
    }

    // Limpiar errores en tiempo real mientras el usuario escribe
    nombreInput.addEventListener('input', () => limpiarError(nombreInput, errorNombre));
    emailInput.addEventListener('input', () => limpiarError(emailInput, errorEmail));
    mensajeInput.addEventListener('input', () => limpiarError(mensajeInput, errorMensaje));

    // Interceptar evento de envío
    form.addEventListener('submit', (e) => {
        // Prevenir el envío real (evita la recarga de página)
        e.preventDefault();

        // Ocultar alerta de éxito anterior
        successAlert.style.display = 'none';
        successAlert.textContent = '';

        // Inicializar variables de estado
        let tieneErrores = false;
        const nombreValor = nombreInput.value.trim();
        const emailValor = emailInput.value.trim();
        const mensajeValor = mensajeInput.value.trim();

        // Expresión regular simple para validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validar Nombre (no vacío)
        if (nombreValor === '') {
            mostrarError(nombreInput, errorNombre, 'Por favor, ingresá tu nombre completo.');
            tieneErrores = true;
        } else {
            limpiarError(nombreInput, errorNombre);
        }

        // Validar Email (no vacío y formato correcto)
        if (emailValor === '') {
            mostrarError(emailInput, errorEmail, 'El correo electrónico es obligatorio.');
            tieneErrores = true;
        } else if (!emailRegex.test(emailValor)) {
            mostrarError(emailInput, errorEmail, 'Ingresá un correo electrónico con formato válido.');
            tieneErrores = true;
        } else {
            limpiarError(emailInput, errorEmail);
        }

        // Validar Mensaje (no vacío)
        if (mensajeValor === '') {
            mostrarError(mensajeInput, errorMensaje, 'El mensaje no puede estar vacío.');
            tieneErrores = true;
        } else {
            limpiarError(mensajeInput, errorMensaje);
        }

        // Si no hay errores, mostrar éxito y limpiar
        if (!tieneErrores) {
            // Mostrar mensaje de éxito en el DOM
            successAlert.textContent = `¡Gracias ${nombreValor}! Recibimos tu consulta con éxito. Te responderemos a la brevedad.`;
            successAlert.style.display = 'block';

            // Limpiar formulario
            form.reset();

            // Hacer scroll suave hacia la alerta de éxito
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});
