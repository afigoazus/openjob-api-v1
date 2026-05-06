import express from "express";
import { notFoundHandler } from "../middleware/not-found.middleware.js";
import { errorHandler } from "../middleware/error.middleware.js";
import routes from "./route.js";
import { requestLogger } from "../middleware/logger.middleware.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
