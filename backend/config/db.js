import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(":white_check_mark: Conectado a MongoDB:", mongoose.connection.name);
        console.log(`MongoDB Conectado`);
    } catch (error) {
        console.error(`Error de conexión a MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
