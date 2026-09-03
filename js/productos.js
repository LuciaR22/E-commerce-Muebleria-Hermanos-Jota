const productos = [
    {
        id: 1,
        nombre: "Aparador Uspallata",
        precio: 850000,
        imagen: "Imagenes/Aparador Uspallata.png",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el vetado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        detalles: "Medidas: 180 × 45 × 75 cm | Materiales: Nogal macizo FSC®, herrajes de latón | Acabado: Aceite natural ecológico | Peso: 68 kg | Capacidad: 6 compartimentos interiores"
    },
    {
        id: 2,
        nombre: "Biblioteca Recoleta",
        precio: 620000,
        imagen: "Imagenes/Biblioteca Recoleta.png",
        descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
        detalles: "Medidas: 100 × 35 × 200 cm | Materiales: Estructura de acero, estantes de roble | Acabado: Laca mate ecológica | Capacidad: 45 kg por estante | Modulares: 5 estantes ajustables"
    },
    {
        id: 3,
        nombre: "Butaca Mendoza",
        precio: 280000,
        imagen: "Imagenes/Butaca Mendoza.png",
        descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
        detalles: "Medidas: 80 × 75 × 85 cm | Materiales: Guatambú macizo, tela bouclé | Acabado: Cera vegetal, tapizado premium | Tapizado: Repelente al agua y manchas | Confort: Espuma alta densidad"
    },
    {
        id: 4,
        nombre: "Sillón Copacabana",
        precio: 450000,
        imagen: "Imagenes/Sillón Copacabana.png",
        descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
        detalles: "Medidas: 90 × 85 × 95 cm | Materiales: Cuero curtido vegetal, acero pintado | Acabado: Cuero anilina premium | Rotación: 360° silenciosa y suave | Garantía: 10 años en estructura"
    },
    {
        id: 5,
        nombre: "Mesa de Centro Araucaria",
        precio: 320000,
        imagen: "Imagenes/Mesa de Centro Araucaria.png",
        descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
        detalles: "Medidas: 90 × 90 × 45 cm | Materiales: Sobre de mármol Patagonia, patas de nogal | Acabado: Mármol pulido, aceite natural en madera | Peso: 42 kg | Carga máxima: 25 kg distribuidos"
    },
    {
        id: 6,
        nombre: "Mesa de Noche Aconcagua",
        precio: 180000,
        imagen: "Imagenes/Mesa de Noche Aconcagua.png",
        descripcion: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
        detalles: "Medidas: 45 × 35 × 60 cm | Materiales: Roble macizo FSC®, herrajes soft-close | Acabado: Barniz mate de poliuretano | Almacenamiento: 1 cajón + repisa inferior | Características: Cajón con cierre suave"
    },
    {
        id: 7,
        nombre: "Sofá Patagonia",
        precio: 780000,
        imagen: "Imagenes/Sofá Patagonia.png",
        descripcion: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
        detalles: "Medidas: 220 × 90 × 80 cm | Estructura: Madera de eucalipto certificada FSC® | Tapizado: Lino 100% natural premium | Relleno: Espuma HR + plumón reciclado | Sostenibilidad: Materiales 100% reciclables"
    },
    {
        id: 8,
        nombre: "Mesa Comedor Pampa",
        precio: 690000,
        imagen: "Imagenes/Mesa Comedor Pampa.png",
        descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
        detalles: "Medidas: 160-240 × 90 × 75 cm | Materiales: Roble macizo FSC®, mecanismo alemán | Acabado: Aceite-cera natural | Capacidad: 6-10 comensales | Extensión: Sistema de mariposa central"
    },
    {
        id: 9,
        nombre: "Sillas Córdoba",
        precio: 150000,
        imagen: "Imagenes/Sillas Córdoba.png",
        descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
        detalles: "Medidas: 45 × 52 × 80 cm (cada una) | Materiales: Contrachapado nogal, tubo de acero | Acabado: Laca mate, pintura epoxi | Apilables: Hasta 6 sillas | Incluye: Set de 4 sillas"
    },
    {
        id: 10,
        nombre: "Escritorio Costa",
        precio: 520000,
        imagen: "Imagenes/Escritorio Costa.png",
        descripcion: "Escritorio compacto con cajón organizador y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
        detalles: "Medidas: 120 × 60 × 75 cm | Materiales: Bambú laminado, herrajes ocultos | Acabado: Laca mate resistente | Almacenamiento: 1 cajón con organizador | Cables: Pasacables integrado"
    },
    {
        id: 11,
        nombre: "Silla de Trabajo Belgrano",
        precio: 240000,
        imagen: "Imagenes/Silla de Trabajo Belgrano.png",
        descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
        detalles: "Medidas: 60 × 60 × 90-100 cm | Materiales: Malla técnica, tejido reciclado | Acabado: Base cromada, tapizado premium | Regulación: Altura + inclinación respaldo | Certificación: Ergonomía europea EN 1335"
    }
];


function crearTarjeta(producto) {
    const tarjeta = document.createElement("article");

    tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>$${producto.precio}</p>
        <a href="producto.html?id=${producto.id}">Ver producto</a>
    `;

    return tarjeta;
}


function renderizarCatalogo() {
    const catalogo = document.getElementById("catalogo");

    if (!catalogo) {
        return;
    }

    if (productos.length === 0) {
        catalogo.innerHTML = "<p>No hay productos disponibles.</p>";
        return;
    }

    productos.forEach(producto => {
        catalogo.appendChild(crearTarjeta(producto));
    });
}


function renderizarDestacados() {
    const destacados = document.getElementById("productos-destacados");

    if (!destacados) {
        return;
    }

    const productosDestacados = productos.slice(0, 4);

    if (productosDestacados.length === 0) {
        destacados.innerHTML = "<p>No hay productos destacados.</p>";
        return;
    }

    productosDestacados.forEach(producto => {
        destacados.appendChild(crearTarjeta(producto));
    });
}


renderizarCatalogo();
renderizarDestacados();

const detalle = document.getElementById("detalle-producto");

if (detalle) {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    const producto = productos.find(producto => producto.id == id);

    if (producto) {
        detalle.innerHTML = `
            <div class="detalle-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>

            <div class="detalle-info">
                <h1>${producto.nombre}</h1>
                <p class="precio">$${producto.precio}</p>
                <p>${producto.descripcion}</p>
                <p>${producto.detalles}</p>
                <button>Añadir al carrito</button>
            </div>
        `;
    }
}