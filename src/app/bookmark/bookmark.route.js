import { Router } from "express";
import {
  createBookmark,
  deleteBookmarkById,
  getAllUserBookmarks,
  getBookmarkById,
} from "./bookmark.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/bookmarks", authMiddleware, getAllUserBookmarks);
router.get("/jobs/:jobId/bookmark/:id", authMiddleware, getBookmarkById);
router.post("/jobs/:jobId/bookmark", authMiddleware, createBookmark);
router.delete("/jobs/:jobId/bookmark", authMiddleware, deleteBookmarkById);

export default router;
