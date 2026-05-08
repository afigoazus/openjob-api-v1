import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import {
  getUserApplicant,
  getUserBookMarks,
  getUserProfile,
} from "./profile.controller.js";

const router = Router();

router.get("/", authMiddleware, getUserProfile);
router.get("/applications", authMiddleware, getUserApplicant);
router.get("/bookmarks", authMiddleware, getUserBookMarks);

export default router;
