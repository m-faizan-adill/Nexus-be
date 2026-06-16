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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});