import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || typeof authHeader !== "string") {
        return res.status(401).json({ error: "No autorizado" });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7).trim()
        : authHeader.trim();

    if (!token) {
        return res.status(401).json({ error: "No autorizado" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = payload;
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};

export const soloAdmin = (req, res, next) => {
    if (req.usuario?.rol === "admin") {
        return next();
    }

    return res.status(403).json({ error: "No autorizado" });
};
