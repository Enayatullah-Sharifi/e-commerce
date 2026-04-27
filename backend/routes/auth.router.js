import express from "express";
const router = express.Router();

import { login, register, logout, validateUser, forgotPassword, resetPassword } from "../controllers/auth.controller.js";

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/forgotpassword/:resetToken", resetPassword);
router.get("/user/:userId/verify/:token", validateUser);
router.get("/logout", logout);

export default router;
