import { Router } from "express";
import validate from "../../middleware/validate.middleware.js";
import { registerSchema } from "./user.schema.js";
import { getUserById, register, updateUserById } from "./user.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/", validate(registerSchema), register);
router.get("/:id", getUserById);
router.put("/:id", authMiddleware, updateUserById);

export default router;
