
import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error("No se encontró MONGODB_URI en el archivo .env");
        }

        const conn = await mongoose.connect(MONGODB_URI);

        console.log(
            "Conectado a MongoDB:",
            conn.connection.name
        );

        return conn;
    } catch (error) {
        console.error("Error de conexión a MongoDB:", error.message);
        throw error;
    }
};

export default connectDB;
