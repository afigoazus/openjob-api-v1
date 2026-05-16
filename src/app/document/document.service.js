import AppError from "../../utils/error.js";
import documentRepository from "./document.repository.js";

export async function createDocument(user_id, fileName, originalName, url, fileSize) {
  const document = await documentRepository.createDocument(
    user_id,
    originalName,
    url,
  );

  if (!document) {
    throw new AppError(400, "Gagal mengupload documents");
  }

  // return document;
  return {
    documentId: document.id,
    filename: fileName,
    originalName: originalName,
    size: fileSize
  };
}

export async function getAllDocuments() {
  return await documentRepository.getAllDocuments();
}

export async function getDocumentsById(id) {
  const document = await documentRepository.getDocumentsById(id);

  if (!document) {
    throw new AppError(404, "Document tidak ditemukan");
  }

  return document;
}

export async function deleteDocumentById(id) {
  const document = await documentRepository.deleteDocumentById(id);

  if (!document) {
    throw new AppError(404, "Document tidak ditemukan");
  }

  return document;
}
