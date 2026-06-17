import express from "express";

import { updateProfile } from "../controllers/users.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/profile", protect, updateProfile);

export default router;