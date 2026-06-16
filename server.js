import express from "express";
import cors from "cors";

import connectDB from "./src/config/db.js";
import { FRONTEND_URL, PORT } from "./src/config/env.js";
import routes from "./src/routes/index.js";

const app = express();

connectDB();

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Nexus Backend Running",
    });
});

app.use("/api/v1", routes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});