import express from "express";

import {
  register,
  login,
  getMe,
  forgotPasswordHandler,
  resetPasswordHandler,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPasswordHandler);
router.post("/reset-password", resetPasswordHandler);

// Protected route
router.get("/me", protect, getMe);

export default router;