import { useEffect, useState } from "react";
import { normalizeErrorMessage } from "../../services/api";
import usuarioService from "../../services/usuarioService";
import "./PerfilPage.css";

const PERFIL_INICIAL = {
    _id: "-",
    nombre: "-",
    email: "-",
};

export default function PerfilPage() {
    const [perfil, setPerfil] = useState(PERFIL_INICIAL);
    const [mensajeEstado, setMensajeEstado] = useState("Cargando datos desde el backend...");

    useEffect(() => {
        let activo = true;

        const cargarPerfil = async () => {
            try {
                const data = await usuarioService.obtenerPerfil();

                if (!activo) {
                    return;
                }

                setPerfil({
                    _id: data?._id || "-",
                    nombre: data?.nombre || "-",
                    email: data?.email || "-",
                });
                setMensajeEstado("Usuario de Muebleria Hermano jota");
            } catch (error) {
                if (!activo) {
                    return;
                }

                const { userMessage } = normalizeErrorMessage(error);
                setMensajeEstado(userMessage || "No pudimos cargar tu perfil en este momento.");
            }
        };

        cargarPerfil();

        return () => {
            activo = false;
        };
    }, []);

    return (
        <main className="perfil-page">
            <section className="perfil-card" aria-labelledby="perfil-titulo">
                <header className="perfil-header">
                    <h1 id="perfil-titulo">Mi perfil</h1>
                    <p className="perfil-subtitle">{mensajeEstado}</p>
                </header>

                <dl className="perfil-data-list">
                    <div className="perfil-data-item">
                        <dt>Nombre</dt>
                        <dd>{perfil.nombre}</dd>
                    </div>

                    <div className="perfil-data-item">
                        <dt>Email</dt>
                        <dd>{perfil.email}</dd>
                    </div>
                </dl>
            </section>
        </main>
    );
}
