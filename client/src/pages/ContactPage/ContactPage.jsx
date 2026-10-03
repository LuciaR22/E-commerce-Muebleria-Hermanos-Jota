import ContactForm from "../../components/ContactForm";

import "./ContactPage.css";

export default function ContactPage() {
    return (
        <main>
            <section className="contact-main">
                <div className="contact-container">
                    <h1>Contacto</h1>

                    <p className="contact-info">
                        Casa Taller: Av. San Juan 2847, CABA | Email: info@hermanosjota.com.ar
                    </p>

                    <ContactForm />
                </div>
            </section>
        </main>
    );
}
