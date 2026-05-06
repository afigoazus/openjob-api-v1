import { Router } from "express";
import validate from "../../middleware/validate.middleware.js";
import { registerSchema } from "./user.schema.js";
import { getUserById, register } from "./user.controller.js";

const router = Router();

router.post("/", validate(registerSchema), register);
router.get("/:id", getUserById);

export default router;
