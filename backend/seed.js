
import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import { productos } from "./data/productos.js";
import Categoria from "./models/Categoria.js";
import Product from "./models/Product.js";

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
    } catch (error) {
        console.error("Error en el seed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seed();

