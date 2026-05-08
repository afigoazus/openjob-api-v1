import AppError from "../../utils/error.js";
import documentRepository from "./document.repository.js";

export async function createDocument(user_id, name, url) {
  const document = await documentRepository.createDocument(user_id, name, url);

  if (!document) {
    throw new AppError(400, "Gagal mengupload documents");
  }

  return document;
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
