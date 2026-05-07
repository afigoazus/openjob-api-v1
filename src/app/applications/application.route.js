import { Router } from "express";
import {
  createApplication,
  deleteApplicationById,
  getAllApplications,
  getApplicationById,
  getApplicationByJobsId,
  getApplicationByUserId,
  updateApplicationStatusById,
} from "./applications.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import {
  createApplicationSchema,
  updateApplicationSchema,
} from "./applications.schema.js";

const router = Router();

router.get("/", authMiddleware, getAllApplications);
router.get("/:id", authMiddleware, getApplicationById);
router.get("/user/:userId", authMiddleware, getApplicationByUserId);
router.get("/job/:jobId", authMiddleware, getApplicationByJobsId);
router.post(
  "/",
  authMiddleware,
  validate(createApplicationSchema),
  createApplication,
);
router.put(
  "/:id",
  authMiddleware,
  validate(updateApplicationSchema),
  updateApplicationStatusById,
);
router.delete("/:id", authMiddleware, deleteApplicationById);

export default router;
