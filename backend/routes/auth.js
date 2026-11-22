import { Router } from "express";
import { registro } from "../controllers/authController.js";

const router = Router();

// POST /api/auth/registro
router.post("/registro", registro);

export default router;
