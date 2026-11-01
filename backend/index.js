
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import productosRouter from "./routes/productosRouter.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(logger);

app.get("/api/health", (_req, res) => {
    res.json({
        ok: true,
        service: "muebleria-hermanos-jota-api",
    });
});

// Rutas de la API
app.use("/api/productos", productosRouter);

app.use(notFound);
app.use(errorHandler);

// Inicia el servidor solamente cuando se ejecuta este archivo directamente.
const iniciarServidor = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`API listening on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
        process.exitCode = 1;
    }
};

iniciarServidor();

export default app;

