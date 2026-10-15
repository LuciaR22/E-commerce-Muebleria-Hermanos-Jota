import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { productos } from "./data/productos.js";
import Product from "./models/Product.js";

dotenv.config();

const seed = async () => {
    try {
        await connectDB();

        await Product.deleteMany({});
        await Product.insertMany(productos);

        console.log(`Seed completado: ${productos.length} productos insertados`);
    } catch (error) {
        console.error("Error en el seed:", error.message);
    } finally {
        await mongoose.connection.close();
    }
};

seed();
