import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { upload } from "../../config/upload.js";
import { deleteDocumentById, getAllDocuments, getDocumentsById, uploadDocument } from "./document.controller.js";

const router = Router();

router.post('/', authMiddleware, upload.single('document'), uploadDocument)
router.get('/', getAllDocuments)
router.get('/:id', getDocumentsById)
router.delete('/:id', authMiddleware, deleteDocumentById)

export default router;
