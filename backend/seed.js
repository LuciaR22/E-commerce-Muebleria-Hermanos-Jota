import dotenv from "dotenv";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

import connectDB from "./config/db.js";
import { productos } from "./data/productos.js";
import Categoria from "./models/Categoria.js";
import Product from "./models/Product.js";
import User from "./models/User.js";

dotenv.config();

const categoriasPorProducto = {
    "Aparador Uspallata": "Guardado",
    "Biblioteca Recoleta": "Guardado",
    "Butaca Mendoza": "Sillones",
    "Sillón Copacabana": "Sillones",
    "Mesa de Centro Araucaria": "Mesas",
    "Mesa de Noche Aconcagua": "Mesas",
    "Sofá Patagonia": "Sillones",
    "Mesa Comedor Pampa": "Mesas",
    "Sillas Córdoba": "Sillas",
    "Escritorio Costa": "Escritorios",
    "Silla de Trabajo Belgrano": "Sillas",
};

// funcion para sembrar usuarios de prueba (admin y cliente) en la coleccion 'usuarios'
const seedUsuarios = async () => {
    // 1. Usuario Administrador de pruebas
    const adminEmail = "admin@hermanosjota.com";
    const passAdmin = await bcryptjs.hash("Admin1234!", 10);

    const adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
        await User.create({
            nombre: "Admin Hermanos Jota",
            email: adminEmail,
            contrasenia: passAdmin,
            password: passAdmin,
            rol: "admin",
        });
        console.log(`Usuario admin creado en 'usuarios': ${adminEmail}`);
    } else {
        adminUser.rol = "admin";
        adminUser.contrasenia = passAdmin;
        adminUser.password = passAdmin;
        await adminUser.save();
        console.log(`Usuario admin actualizado en 'usuarios': ${adminEmail}`);
    }

    // 2. Usuario Cliente de pruebas
    const clienteEmail = "cliente@hermanosjota.com";
    const passCliente = await bcryptjs.hash("Cliente1234!", 10);

    const clienteUser = await User.findOne({ email: clienteEmail });
    if (!clienteUser) {
        await User.create({
            nombre: "Cliente Hermanos Jota",
            email: clienteEmail,
            contrasenia: passCliente,
            password: passCliente,
            rol: "cliente",
        });
        console.log(`Usuario cliente creado en 'usuarios': ${clienteEmail}`);
    } else {
        clienteUser.rol = "cliente";
        clienteUser.contrasenia = passCliente;
        clienteUser.password = passCliente;
        await clienteUser.save();
        console.log(`Usuario cliente actualizado en 'usuarios': ${clienteEmail}`);
    }
};

const seed = async () => {
    try {
        await connectDB();

        const categorias = Object.values(categoriasPorProducto).filter(
            (nombre, indice, arreglo) => arreglo.indexOf(nombre) === indice
        );

        const categoriasMap = new Map();

        for (const nombre of categorias) {
            const categoria = await Categoria.findOneAndUpdate(
                { nombre },
                { $setOnInsert: { nombre } },
                { upsert: true, new: true }
            );
            categoriasMap.set(nombre, categoria._id);
        }

        let insertados = 0;
        let actualizados = 0;

        for (const producto of productos) {
            const categoriaNombre = categoriasPorProducto[producto.nombre];
            const categoriaId = categoriaNombre ? categoriasMap.get(categoriaNombre) : undefined;
            const existente = await Product.findOne({ nombre: producto.nombre });

            if (!existente) {
                await Product.create({
                    ...producto,
                    categoria: categoriaId,
                });
                insertados++;
                continue;
            }

            if (categoriaId && String(existente.categoria ?? "") !== String(categoriaId)) {
                existente.categoria = categoriaId;
                await existente.save();
                actualizados++;
            }
        }

        console.log(
            `Seed completado: ${insertados} productos nuevos insertados y ${actualizados} productos actualizados con categoría.`
        );

        // ejecutamos la siembra de usuarios de prueba (admin y cliente)
        await seedUsuarios();
    } catch (error) {
        console.error("Error en el seed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seed();
