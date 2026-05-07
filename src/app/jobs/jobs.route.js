import { Router } from "express";
import {
  createJobs,
  deleteJobsById,
  getAllJobs,
  getJobsByCategoryId,
  getJobsByCompanyId,
  getJobsById,
  updateJobsById,
} from "./jobs.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import { createJobsSchema, updateJobsSchema } from "./jobs.schema.js";

const router = Router();

router.get("/", getAllJobs);
router.get("/:id", getJobsById);
router.get("/company/:companyId", getJobsByCompanyId);
router.get("/category/:categoryId", getJobsByCategoryId);
router.post("/", authMiddleware, validate(createJobsSchema), createJobs);
router.put("/:id", authMiddleware, validate(updateJobsSchema), updateJobsById);
router.delete("/:id", authMiddleware, deleteJobsById);

export default router;
