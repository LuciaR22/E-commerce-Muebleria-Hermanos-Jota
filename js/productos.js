const productos = [
    {
        id: "aparador-uspallata",
        nombre: "Aparador Uspallata",
        descripcion:
            "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        imagen: "Imagenes/Aparador%20Uspallata.png",
        precio: 0,
        medidas: "180 × 45 × 75 cm",
        materiales: "Nogal macizo FSC®, herrajes de latón",
        acabado: "Aceite natural ecológico",
        peso: "68 kg",
        capacidad: "6 compartimentos interiores",
    },
    {
        id: "biblioteca-recoleta",
        nombre: "Biblioteca Recoleta",
        descripcion:
            "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
        imagen: "Imagenes/Biblioteca%20Recoleta.png",
        precio: 52000,
        medidas: "100 × 35 × 200 cm",
        materiales: "Estructura de acero, estantes de roble",
        acabado: "Laca mate ecológica",
        capacidad: "45 kg por estante",
        modulares: "5 estantes ajustables",
    },
    {
        id: "butaca-mendoza",
        nombre: "Butaca Mendoza",
        descripcion:
            "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
        imagen: "Imagenes/Butaca%20Mendoza.png",
        precio: 38000,
        medidas: "80 × 75 × 85 cm",
        materiales: "Guatambú macizo, tela bouclé",
        acabado: "Cera vegetal, tapizado premium",
        tapizado: "Repelente al agua y manchas",
        confort: "Espuma alta densidad",
    },
    {
        id: "mesa-noche-aconcagua",
        nombre: "Mesa de Noche Aconcagua",
        descripcion:
            "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Diseño limpio y funcional que ofrece almacenamiento discreto y elegante para objetos personales.",
        imagen: "Imagenes/Mesa%20de%20Noche%20Aconcagua.png",
        precio: 0,
        medidas: "45 × 35 × 60 cm",
        materiales: "Roble macizo FSC®, herrajes soft-close",
        acabado: "Barniz mate de poliuretano",
        almacenamiento: "1 cajón + repisa inferior",
        caracteristicas: "Cajón con cierre suave",
    },
    {
        id: "sofa-patagonia",
        nombre: "Sofá Patagonia",
        descripcion:
            "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Cojines con espuma de alta resiliencia y plumón reciclado para comodidad duradera y sostenible.",
        imagen: "Imagenes/Sof%C3%A1%20Patagonia.png",
        precio: 0,
        medidas: "220 × 90 × 80 cm",
        estructura: "Madera de eucalipto certificada FSC®",
        tapizado: "Lino 100% natural premium",
        relleno: "Espuma HR + plumón reciclado",
        sostenibilidad: "Materiales 100% reciclables",
    },
    {
        id: "mesa-pampa",
        nombre: "Mesa Comedor Pampa",
        descripcion:
            "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Diseño robusto y elegante que se adapta a reuniones íntimas o grandes celebraciones.",
        imagen: "Imagenes/Mesa%20Comedor%20Pampa.png",
        precio: 0,
        medidas: "160-240 × 90 × 75 cm",
        materiales: "Roble macizo FSC®, mecanismo alemán",
        acabado: "Aceite-cera natural",
        capacidad: "6-10 comensales",
        extension: "Sistema de mariposa central",
    },
    {
        id: "sillas-cordoba",
        nombre: "Sillas Córdoba (set de 4)",
        descripcion:
            "Set de cuatro sillas apilables en contrachapado moldeado de nogal con estructura tubular pintada en Sage Green. Diseño ergonómico y materiales de calidad para uso diario.",
        imagen: "Imagenes/Sillas%20C%C3%B3rdoba.png",
        precio: 0,
        medidas: "45 × 52 × 80 cm (cada una)",
        materiales: "Contrachapado nogal, tubo de acero",
        acabado: "Laca mate, pintura epoxi",
        apilables: "Hasta 6 sillas",
        incluye: "Set de 4 sillas",
    },
    {
        id: "escritorio-costa",
        nombre: "Escritorio Costa",
        descripcion:
            "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Funcionalidad moderna y estética minimalista ideal para trabajo remoto.",
        imagen: "Imagenes/Escritorio%20Costa.png",
        precio: 0,
        medidas: "120 × 60 × 75 cm",
        materiales: "Bambú laminado, herrajes ocultos",
        acabado: "Laca mate resistente",
        almacenamiento: "1 cajón con organizador",
        cables: "Pasacables integrado",
    },
    {
        id: "silla-belgrano",
        nombre: "Silla de Trabajo Belgrano",
        descripcion:
            "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con apoyo lumbar.",
        imagen: "Imagenes/Silla%20de%20Trabajo%20Belgrano.png",
        precio: 0,
        medidas: "60 × 60 × 90-100 cm",
        materiales: "Malla técnica, tejido reciclado",
        acabado: "Base cromada, tapizado premium",
        regulacion: "Altura + inclinación respaldo",
        certificacion: "Ergonomía europea EN 1335",
    },
];


if (typeof module !== "undefined") {
    module.exports = { productos };
}

if (typeof window !== "undefined") {
    window.productos = productos;
}

const catalogo = document.getElementById("catalogo");

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

const destacados = document.getElementById("productos-destacados");

if (destacados) {
    productos.slice(0, 4).forEach(producto => {
        const tarjeta = document.createElement("article");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <a href="producto.html?id=${producto.id}">Ver producto</a>
        `;

        destacados.appendChild(tarjeta);
    });
}
