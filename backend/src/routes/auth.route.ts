import express from "express";
import type { Router } from "express";
import { signUp, login, logout } from "../controllers/auth.controller.js";

const router: Router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
