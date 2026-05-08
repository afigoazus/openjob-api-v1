import express from "express";
import { notFoundHandler } from "../middleware/not-found.middleware.js";
import { errorHandler } from "../middleware/error.middleware.js";
import routes from "./route.js";
import { requestLogger } from "../middleware/logger.middleware.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();

app.use(express.json());
app.use(requestLogger);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static("uploads"));
app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
