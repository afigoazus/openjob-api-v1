import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  updateCategory,
} from "./category.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.schema.js";

const router = Router();

router.get("/", getCategory);
router.get("/:id", getCategoryById);
router.post(
  "/",
  authMiddleware,
  validate(createCategorySchema),
  createCategory,
);
router.put("/:id", authMiddleware, validate(updateCategorySchema), updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
