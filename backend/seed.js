
import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import { productos } from "./data/productos.js";
import Product from "./models/Product.js";

dotenv.config();

const seed = async () => {
    try {
        await connectDB();

        let insertados = 0;

        for (const producto of productos) {
            const existente = await Product.findOne({
                nombre: producto.nombre,
            });

            if (!existente) {
                await Product.create(producto);
                insertados++;
            }
        }

        console.log(`Seed completado: ${insertados} productos nuevos insertados.`);
    } catch (error) {
        console.error("Error en el seed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seed();

