// src/app/Auth/AuthRoute.js
import express from "express";
import { login } from "./AuthController.js";

const router = express.Router();

// POST /auth/login
router.post("/login", login);

export default router;
