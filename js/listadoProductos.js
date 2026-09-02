// Mock up de datos para pruebas de la pagina de producto
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
];

// Permite usar el mock tanto en Node (para pruebas) como en el navegador (como variable global).
if (typeof module !== "undefined") {
    module.exports = { productos };
}

if (typeof window !== "undefined") {
    window.productos = productos;
}
