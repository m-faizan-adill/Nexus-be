import express from "express";
import cors from "cors";

import connectDB from "./src/config/db.js";
import { FRONTEND_URL, PORT } from "./src/config/env.js";
import routes from "./src/routes/index.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import { throwError } from "./src/utils/apiError.util.js";
import { STATUS } from "./src/constants/statusCodes.js";

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

app.use((req, res, next) => {
    throwError(`Route ${req.method} ${req.originalUrl} not found`, STATUS.NOT_FOUND);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});