import Order from "../models/order.js";
import Product from "../models/Product.js";

/**
 * POST /api/pedidos
 * Crea un pedido a nombre del usuario autenticado.
 */
export const crearPedido = async (req, res, next) => {
    try {
        const { items } = req.body ?? {};
        const usuarioId = req.usuario.id;

        // validar que items sea un array no vacío
        if (!Array.isArray(items) || items.length === 0) {
            return res
                .status(400)
                .json({ error: "El carrito no puede estar vacío" });
        }

        // validar que cada ítem tenga productoId y cantidad entera > 0
        for (const item of items) {
            if (
                !item.productoId ||
                !Number.isInteger(item.cantidad) ||
                item.cantidad <= 0
            ) {
                return res.status(400).json({
                    error: "Cada ítem debe incluir un productoId válido y una cantidad entera mayor a 0",
                });
            }
        }

        // buscar productos en la BD, armar items con precios reales y calcular total
        const itemsProcesados = [];
        let total = 0;

        for (const item of items) {
            const productoBD = await Product.findById(item.productoId);

            if (!productoBD) {
                return res.status(400).json({
                    error: `El producto con ID ${item.productoId} no existe`,
                });
            }

            const subtotal = productoBD.precio * item.cantidad;
            total += subtotal;

            itemsProcesados.push({
                producto: productoBD._id,
                nombre: productoBD.nombre,
                precio: productoBD.precio,
                cantidad: item.cantidad,
            });
        }

        // crear el pedido
        const pedido = await Order.create({
            usuario: usuarioId,
            items: itemsProcesados,
            total,
        });

        return res.status(201).json({ pedido });
    } catch (error) {
        return next(error);
    }
};

/**
 * GET /api/pedidos/mis-pedidos
 * Devuelve solo los pedidos del usuario autenticado, del más reciente al más antiguo.
 */
export const obtenerMisPedidos = async (req, res, next) => {
    try {
        const usuarioId = req.usuario.id;

        const pedidos = await Order.find({ usuario: usuarioId }).sort({
            createdAt: -1,
        });

        return res.status(200).json(pedidos);
    } catch (error) {
        return next(error);
    }
};
