
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    
    const errorNombre = document.getElementById('error-nombre');
    const errorEmail = document.getElementById('error-email');
    const errorMensaje = document.getElementById('error-mensaje');
    
    const successAlert = document.getElementById('success-alert');

    function mostrarError(input, errorSpan, mensaje) {
        input.classList.add('error');
        errorSpan.textContent = mensaje;
    }


    function limpiarError(input, errorSpan) {
        input.classList.remove('error');
        errorSpan.textContent = '';
    }


    nombreInput.addEventListener('input', () => limpiarError(nombreInput, errorNombre));
    emailInput.addEventListener('input', () => limpiarError(emailInput, errorEmail));
    mensajeInput.addEventListener('input', () => limpiarError(mensajeInput, errorMensaje));


    form.addEventListener('submit', (e) => {

        e.preventDefault();

        successAlert.style.display = 'none';
        successAlert.textContent = '';

        let tieneErrores = false;
        const nombreValor = nombreInput.value.trim();
        const emailValor = emailInput.value.trim();
        const mensajeValor = mensajeInput.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

       
        if (nombreValor === '') {
            mostrarError(nombreInput, errorNombre, 'Por favor, ingresá tu nombre completo.');
            tieneErrores = true;
        } else {
            limpiarError(nombreInput, errorNombre);
        }

       
        if (emailValor === '') {
            mostrarError(emailInput, errorEmail, 'El correo electrónico es obligatorio.');
            tieneErrores = true;
        } else if (!emailRegex.test(emailValor)) {
            mostrarError(emailInput, errorEmail, 'Ingresá un correo electrónico con formato válido.');
            tieneErrores = true;
        } else {
            limpiarError(emailInput, errorEmail);
        }

        
        if (mensajeValor === '') {
            mostrarError(mensajeInput, errorMensaje, 'El mensaje no puede estar vacío.');
            tieneErrores = true;
        } else {
            limpiarError(mensajeInput, errorMensaje);
        }

       
        if (!tieneErrores) {
            
            successAlert.textContent = `¡Gracias ${nombreValor}! Recibimos tu consulta con éxito. Te responderemos a la brevedad.`;
            successAlert.style.display = 'block';

            
            form.reset();

            
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});
