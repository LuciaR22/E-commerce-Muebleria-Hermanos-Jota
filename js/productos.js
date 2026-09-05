const productos = [
    {
        id: "aparador-uspallata",
        nombre: "Aparador Uspallata",
        descripcion:
            "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el vetado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        imagen: "Imagenes/Aparador%20Uspallata.png",
        precio: 850000,
        medidas: "180 × 45 × 75 cm",
        materiales: "Nogal macizo FSC®, herrajes de latón",
        acabado: "Aceite natural ecológico",
        peso: "68 kg",
        capacidad: "6 compartimentos interiores"
    },

    {
        id: "biblioteca-recoleta",
        nombre: "Biblioteca Recoleta",
        descripcion:
            "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
        imagen: "Imagenes/Biblioteca%20Recoleta.png",
        precio: 620000,
        medidas: "100 × 35 × 200 cm",
        materiales: "Estructura de acero, estantes de roble",
        acabado: "Laca mate ecológica",
        capacidad: "45 kg por estante",
        modulares: "5 estantes ajustables"
    },

    {
        id: "butaca-mendoza",
        nombre: "Butaca Mendoza",
        descripcion:
            "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
        imagen: "Imagenes/Butaca%20Mendoza.png",
        precio: 280000,
        medidas: "80 × 75 × 85 cm",
        materiales: "Guatambú macizo, tela bouclé",
        acabado: "Cera vegetal, tapizado premium",
        tapizado: "Repelente al agua y manchas",
        confort: "Espuma alta densidad"
    },

    {
        id: "sillon-copacabana",
        nombre: "Sillón Copacabana",
        descripcion:
            "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
        imagen: "Imagenes/Sill%C3%B3n%20Copacabana.png",
        precio: 450000,
        medidas: "90 × 85 × 95 cm",
        materiales: "Cuero curtido vegetal, acero pintado",
        acabado: "Cuero anilina premium",
        rotacion: "360° silenciosa y suave",
        garantia: "10 años en estructura"
    },

    {
        id: "mesa-centro-araucaría",
        nombre: "Mesa de Centro Araucaria",
        descripcion:
            "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
        imagen: "Imagenes/Mesa%20de%20Centro%20Araucaria.png",
        precio: 320000,
        medidas: "90 × 90 × 45 cm",
        materiales: "Sobre de mármol Patagonia, patas de nogal",
        acabado: "Mármol pulido, aceite natural en madera",
        peso: "42 kg",
        carga: "25 kg distribuidos"
    },

    {
        id: "mesa-noche-aconcagua",
        nombre: "Mesa de Noche Aconcagua",
        descripcion:
            "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
        imagen: "Imagenes/Mesa%20de%20Noche%20Aconcagua.png",
        precio: 180000,
        medidas: "45 × 35 × 60 cm",
        materiales: "Roble macizo FSC®, herrajes soft-close",
        acabado: "Barniz mate de poliuretano",
        almacenamiento: "1 cajón + repisa inferior",
        caracteristicas: "Cajón con cierre suave"
    },

    {
        id: "sofa-patagonia",
        nombre: "Sofá Patagonia",
        descripcion:
            "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
        imagen: "Imagenes/Sof%C3%A1%20Patagonia.png",
        precio: 780000,
        medidas: "220 × 90 × 80 cm",
        estructura: "Madera de eucalipto certificada FSC®",
        tapizado: "Lino 100% natural premium",
        relleno: "Espuma HR + plumón reciclado",
        sostenibilidad: "Materiales 100% reciclables"
    },

    {
        id: "mesa-pampa",
        nombre: "Mesa Comedor Pampa",
        descripcion:
            "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
        imagen: "Imagenes/Mesa%20Comedor%20Pampa.png",
        precio: 690000,
        medidas: "160-240 × 90 × 75 cm",
        materiales: "Roble macizo FSC®, mecanismo alemán",
        acabado: "Aceite-cera natural",
        capacidad: "6-10 comensales",
        extension: "Sistema de mariposa central"
    },

    {
        id: "sillas-cordoba",
        nombre: "Sillas Córdoba",
        descripcion:
            "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
        imagen: "Imagenes/Sillas%20C%C3%B3rdoba.png",
        precio: 150000,
        medidas: "45 × 52 × 80 cm (cada una)",
        materiales: "Contrachapado nogal, tubo de acero",
        acabado: "Laca mate, pintura epoxi",
        apilables: "Hasta 6 sillas",
        incluye: "Set de 4 sillas"
    },

    {
        id: "escritorio-costa",
        nombre: "Escritorio Costa",
        descripcion:
            "Escritorio compacto con cajón organizador y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
        imagen: "Imagenes/Escritorio%20Costa.png",
        precio: 520000,
        medidas: "120 × 60 × 75 cm",
        materiales: "Bambú laminado, herrajes ocultos",
        acabado: "Laca mate resistente",
        almacenamiento: "1 cajón con organizador",
        cables: "Pasacables integrado"
    },

    {
        id: "silla-belgrano",
        nombre: "Silla de Trabajo Belgrano",
        descripcion:
            "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
        imagen: "Imagenes/Silla%20de%20Trabajo%20Belgrano.png",
        precio: 240000,
        medidas: "60 × 60 × 90-100 cm",
        materiales: "Malla técnica, tejido reciclado",
        acabado: "Base cromada, tapizado premium",
        regulacion: "Altura + inclinación respaldo",
        certificacion: "Ergonomía europea EN 1335"
    }
];

const catalogo = document.getElementById("catalogo");
const inputBusqueda = document.getElementById("input");
const mensajeSinResultados = document.getElementById("no-resultado");

function renderizarCatalogo(listaProductos) {
    if (!catalogo) return;

    catalogo.innerHTML = "";

    if (listaProductos.length === 0) {
        if (mensajeSinResultados) {
            mensajeSinResultados.style.display = "block";
        }
        return;
    }

    if (mensajeSinResultados) {
        mensajeSinResultados.style.display = "none";
    }

    listaProductos.forEach(producto => {
        const tarjeta = document.createElement("article");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <a href="producto.html?id=${producto.id}">Ver producto</a>
        `;

        catalogo.appendChild(tarjeta);
    });
}

function renderizarDestacados() {
    const destacados = document.getElementById("productos-destacados");

    if (!destacados) return;

    destacados.innerHTML = "";

    const productosDestacados = productos.slice(0, 4);

    if (productosDestacados.length === 0) {
        destacados.innerHTML = "<p>No hay productos destacados.</p>";
        return;
    }

    productosDestacados.forEach(producto => {
        const tarjeta = document.createElement("article");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <a href="producto.html?id=${producto.id}">Ver producto</a>
        `;

        destacados.appendChild(tarjeta);
    });
}

function cargarProductos() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(productos);
        }, 500);
    });
}

async function iniciarCatalogo() {
    const productosCargados = await cargarProductos();

    renderizarCatalogo(productosCargados);
    renderizarDestacados();
}

if (inputBusqueda) {
    inputBusqueda.addEventListener("input", event => {
        const normalizarTexto = texto =>
            texto
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();

        const textoBusqueda = normalizarTexto(event.target.value.trim());

        const productosFiltrados = productos.filter(producto =>
            normalizarTexto(producto.nombre).includes(textoBusqueda)
        );

        renderizarCatalogo(productosFiltrados);
    });
}

if (typeof module !== "undefined") {
    module.exports = { productos };
}

if (typeof window !== "undefined") {
    window.productos = productos;
}

iniciarCatalogo();
