import { Router } from "express";
import validate from "../../middleware/validate.middleware.js";
import {
  loginSchema,
  logoutSchema,
  putAuthPayloadSchema,
} from "./auth.schema.js";
import { login, logout, refreshToken } from "./auth.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/", validate(loginSchema), login);

router.put("/", validate(putAuthPayloadSchema), refreshToken);

router.delete("/", authMiddleware, validate(logoutSchema), logout);

export default router;
