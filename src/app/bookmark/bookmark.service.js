import AppError from "../../utils/error.js";
import bookmarkRepository from "./bookmark.repository.js";

export async function getAllUserBookmarks(user_id) {
  const bookmarks = await bookmarkRepository.getAllUserBookmarks(user_id);

  return bookmarks;
}

export async function getBookmarkById(id) {
  const bookmark = await bookmarkRepository.getBookmarkById(id);

  if (!bookmark) {
    throw new AppError(404, "Bookmark tidak ditemukan");
  }

  return bookmark;
}

export async function createBookmark(user_id, job_id) {
  const bookmark = await bookmarkRepository.createBookmark( user_id, job_id );

  if (!bookmark) {
    throw new AppError(400, "Gagal Menyimpan Bookmark");
  }

  return bookmark;
}

export async function deleteBookmarkByJobId(jobId) {
  const bookmark = await bookmarkRepository.deleteBookmarkByJobId(jobId);

  if (!bookmark) {
    throw new AppError(400, "Gagal Menghapus Bookmark");
  }

  return bookmark;
}
