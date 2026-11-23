import { createContext, useContext, useMemo, useState } from "react";

// creamos el contexto del carrito
const CartContext = createContext(null);

// proveedor del contexto del carrito
export function CartProvider({ children }) {
    // estado principal para los items en el carrito
    const [carrito, setCarrito] = useState([]);

    // agregar un producto al carrito
    const agregarAlCarrito = producto => {
        if (!producto) return;
        setCarrito(prev => [...prev, producto]);
    };

    // quitar una sola unidad de un producto por su id
    const quitarUnidad = productoId => {
        setCarrito(prev => {
            const index = prev.findIndex(item => item._id === productoId);
            if (index === -1) return prev;
            const nuevoCarrito = [...prev];
            nuevoCarrito.splice(index, 1);
            return nuevoCarrito;
        });
    };

    // alias para quitar una unidad o eliminar por id
    const quitarDelCarrito = idProducto => {
        quitarUnidad(idProducto);
    };

    // eliminar todas las unidades de un producto
    const eliminarProducto = productoId => {
        setCarrito(prev => prev.filter(item => item._id !== productoId));
    };

    // vaciar completamente el carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    // agrupamos productos repetidos para la vista del carrito
    const productosAgrupados = useMemo(() => {
        return carrito.reduce((acc, prod) => {
            const existente = acc.find(item => item._id === prod._id);
            if (existente) {
                existente.cantidad += 1;
            } else {
                acc.push({ ...prod, cantidad: 1 });
            }
            return acc;
        }, []);
    }, [carrito]);

    // calculo del total y la cantidad de items
    const total = useMemo(() => {
        return carrito.reduce((acc, prod) => acc + Number(prod.precio || 0), 0);
    }, [carrito]);

    const cantidadTotal = carrito.length;

    const valor = {
        carrito,
        setCarrito,
        agregarAlCarrito,
        quitarDelCarrito,
        quitarUnidad,
        eliminarProducto,
        vaciarCarrito,
        productosAgrupados,
        total,
        cantidadTotal,
        cartCount: cantidadTotal,
    };

    return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}

// hook para consumir el contexto del carrito de forma sencilla
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser utilizado dentro de un CartProvider");
    }
    return context;
}

export default CartContext;
