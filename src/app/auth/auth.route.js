import { Router } from "express";
import validate from "../../middleware/validate.middleware.js";
import {
  loginSchema,
  logoutSchema,
  putAuthPayloadSchema,
} from "./auth.schema.js";
import { login, logout, refreshToken } from "./auth.controller.js";

const router = Router();

router.post("/", validate(loginSchema), login);

router.put("/", validate(putAuthPayloadSchema), refreshToken);

router.delete("/", validate(logoutSchema), logout);

export default router;
