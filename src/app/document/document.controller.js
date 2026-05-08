import { STATUS } from "../../utils/constants.js";
import AppError from "../../utils/error.js";
import { sendResponse } from "../../utils/response.js";
import * as documentService from "./document.service.js";

export async function uploadDocument(req, res, next) {
  try {
    if (!req.file) {
      throw new AppError(400, "File harus diisi");
    }

    const user_id = req.user.id;
    const name = req.file.originalname;

    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const document = await documentService.createDocument(user_id, name, url);

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

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Document berhasil didapatkan",
      "data",
      document,
    );
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
