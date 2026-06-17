import express from "express";

import authRoutes from "./auth.route.js";
import userRoutes from "./users.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
// router.use("/meetings", meetingRoutes);
// router.use("/documents", documentRoutes);
// router.use("/payments", paymentRoutes);

export default router;