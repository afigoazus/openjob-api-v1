import path from "path";
import { STATUS } from "../../utils/constants.js";
import AppError from "../../utils/error.js";
import { sendResponse } from "../../utils/response.js";
import * as documentService from "./document.service.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function uploadDocument(req, res, next) {
  try {
    if (!req.file) {
      throw new AppError(400, "File is required");
    }

    const user_id = req.user.id;
    const fileName = req.file.filename;
    const originalName = req.file.originalname;
    const fileSize = req.file.size;

    const url = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;

    const document = await documentService.createDocument(
      user_id,
      fileName,
      originalName,
      url,
      fileSize,
    );

    sendResponse(
      res,
      201,
      STATUS.SUCCESS,
      "Documents berhasil diupload",
      "data",
      document,
    );
  } catch (error) {
    next(error);
  }
}

export async function getAllDocuments(req, res, next) {
  try {
    const documents = await documentService.getAllDocuments();

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Documents berhasil didapatkan",
      "data",
      {
        documents,
      },
    );
  } catch (error) {
    next(error);
  }
}

export async function getDocumentsById(req, res, next) {
  const { id } = req.params;

  try {
    const document = await documentService.getDocumentsById(id);

    const fileName = document.url.split("/uploads/")[1];
    const filePath = path.join(process.cwd(), "uploads", fileName);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${document.name}"`);
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
}

export async function deleteDocumentById(req, res, next) {
  const { id } = req.params;

  try {
    const document = await documentService.deleteDocumentById(id);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Document berhasil dihapus",
      "data",
      document,
    );
  } catch (error) {
    next(error);
  }
}
