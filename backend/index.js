import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "muebleria-hermanos-jota-api" });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
