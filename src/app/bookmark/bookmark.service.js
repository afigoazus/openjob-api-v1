import AppError from "../../utils/error.js";
import bookmarkRepository from "./bookmark.repository.js";
import cacheService from "../cache/redis.service.js";

export async function getAllUserBookmarks(user_id) {
  const cachekey = `bookmarks:${user_id}`;
  const cached = await cacheService.get(cachekey);

  if (cached) {
    return { data: JSON.parse(cached), fromCache: true };
  }

  const bookmarks = await bookmarkRepository.getAllUserBookmarks(user_id);

  await cacheService.set(cachekey, JSON.stringify(bookmarks));

  return { data: bookmarks, fromCache: false };
}

export async function getBookmarkById(id) {
  const bookmark = await bookmarkRepository.getBookmarkById(id);

  if (!bookmark) {
    throw new AppError(404, "Bookmark tidak ditemukan");
  }

  return bookmark;
}

export async function createBookmark(user_id, job_id) {
  const bookmark = await bookmarkRepository.createBookmark(user_id, job_id);

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

  await cacheService.del(`bookmarks:${jobId}`);

  return bookmark;
}
