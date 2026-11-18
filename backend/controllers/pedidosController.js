const Order = require('../models/order');
const product = require('../models/Product');


// POST /api/pedidos
const crearPedido = async (req, res) => {
  try {
    // 1. Obtener los ítems enviados por el cliente y el ID del usuario autenticado
    const { items } = req.body;
    const usuarioId = req.user.id; // Asignado previamente por el middleware verificarToken

    // 2. Validación de entrada: verificar que items sea un array y no esté vacío
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        mensaje: 'El carrito no puede estar vacío y debe contener un listado de ítems.' 
      });
    }

    // 3. Validar las cantidades de cada ítem
    for (const item of items) {
      if (!item.productoId || !item.cantidad || !Number.isInteger(item.cantidad) || item.cantidad <= 0) {
        return res.status(400).json({ 
          mensaje: 'Cada ítem debe incluir un productoId válido y una cantidad entera mayor a 0.' 
        });
      }
    }

    // 4. Procesar los productos desde la Base de Datos para armar los ítems finales y calcular el total
    const itemsProcesados = [];
    let totalCalculado = 0;

    for (const item of items) {
      // Buscamos el producto real en la BD usando su ID
      const productoBD = await Product.findById(item.productoId);

      // Si algún producto enviado no existe en la BD, respondemos error 400
      if (!productoBD) {
        return res.status(400).json({ 
          mensaje: `El producto con ID ${item.productoId} no existe en nuestro catálogo.` 
        });
      }

      // Tomamos el precio real de la BD y calculamos el subtotal de este producto
      const precioReal = productoBD.precio;
      const subtotal = precioReal * item.cantidad;

      // Sumamos al total general del backend
      totalCalculado += subtotal;

      // Guardamos la estructura final del ítem como la requiere nuestro modelo Order
      itemsProcesados.push({
        producto: productoBD._id,
        nombre: productoBD.nombre,
        precio: precioReal,
        cantidad: item.cantidad
      });
    }

    // 5. Crear la nueva orden en la base de datos
    const nuevoPedido = new Order({
      usuario: usuarioId,
      items: itemsProcesados,
      total: totalCalculado
    });

    // Guardar en MongoDB
    await nuevoPedido.save();

    // 6. Responder con status 201 Created y la orden generada
    return res.status(201).json({
      mensaje: 'Pedido creado exitosamente',
      pedido: nuevoPedido
    });

  } catch (error) {
    // Si ocurre un error de ID mal formado (ej. cadena no válida para ObjectId de Mongo)
    if (error.name === 'CastError') {
      return res.status(400).json({ mensaje: 'ID de producto con formato inválido.' });
    }

    return res.status(500).json({ 
      mensaje: 'Error al procesar el pedido', 
      error: error.message 
    });
  }
};
// GET /api/pedidos/mis-pedidos
const obtenerMisPedidos = async (req, res) => {
  try {
    // 1. Obtener el ID del usuario autenticado (inyectado por verificarToken)
    const usuarioId = req.user.id;

    // 2. Buscar en la BD solo los pedidos creados por este usuario
    // .sort({ createdAt: -1 }) ordena los pedidos desde el más reciente al más antiguo
    const pedidos = await Order.find({ usuario: usuarioId }).sort({ createdAt: -1 });

    // 3. Responder con status 200 OK y el listado de pedidos
    return res.status(200).json(pedidos);

  } catch (error) {
    return res.status(500).json({ 
      mensaje: 'Error al obtener los pedidos del usuario', 
      error: error.message 
    });
  }
};