
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import categoriasRouter from "./routes/categoriasRouter.js";
import productosRouter from "./routes/productosRouter.js";
import usuariosRouter from "./routes/usuarios.js";
import authRouter from "./routes/auth.js";
import pedidosRouter from "./routes/pedidos.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;

// lista de origenes permitidos para cors
const origenesPermitidos = [
    process.env.CLIENT_URL,
    "https://e-commerce-muebleria-hermanos-jota.vercel.app",
    "http://localhost:5173",
    "http://localhost:5000",
    "http://localhost:3000",
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // permitir solicitudes sin origin 
            if (!origin || origenesPermitidos.includes(origin) || process.env.NODE_ENV !== "production") {
                return callback(null, true);
            }
            return callback(new Error("Origen no permitido por CORS"), false);
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(logger);

app.get("/api/health", (_req, res) => {
    res.json({
        ok: true,
        service: "muebleria-hermanos-jota-api",
    });
});

// Rutas de la API
app.use("/api/auth", authRouter);
app.use("/api/pedidos", pedidosRouter);
app.use("/api/categorias", categoriasRouter);
app.use("/api/productos", productosRouter);

// Rutas de usuarios
app.use("/api/usuarios", usuariosRouter);
app.use("/api/usuario", usuariosRouter);

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
