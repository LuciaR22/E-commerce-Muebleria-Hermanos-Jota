import "./PerfilPage.css";

const usuarioMock = {
    _id: "6737c15f6d5bb65a8cc957d2",
    nombre: "Lucia Perez",
    email: "lucia.perez@hermanosjota.com",
    rol: "cliente",
};

export default function PerfilPage() {
    return (
        <main className="perfil-page">
            <section className="perfil-card" aria-labelledby="perfil-titulo">
                <header className="perfil-header">
                    <h1 id="perfil-titulo">Mi perfil</h1>
                    <p className="perfil-subtitle">Estos datos usan un mock con el formato que entrega el backend.</p>
                </header>

                <dl className="perfil-data-list">
                    <div className="perfil-data-item">
                        <dt>ID</dt>
                        <dd>{usuarioMock._id}</dd>
                    </div>

                    <div className="perfil-data-item">
                        <dt>Nombre</dt>
                        <dd>{usuarioMock.nombre}</dd>
                    </div>

                    <div className="perfil-data-item">
                        <dt>Email</dt>
                        <dd>{usuarioMock.email}</dd>
                    </div>
                </dl>
            </section>
        </main>
    );
}
