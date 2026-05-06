import { Router } from "express";
import {
  createCompany,
  deleteCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} from "./company.controller.js";
import validate from "../../middleware/validate.middleware.js";
import { createCompanySchema, editCompanySchema } from "./company.schema.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getCompany);
router.get("/:id", getCompanyById);
router.post("/", authMiddleware, validate(createCompanySchema), createCompany);
router.put("/:id", authMiddleware, validate(editCompanySchema), updateCompany);
router.delete("/:id", authMiddleware, deleteCompany);

export default router;
