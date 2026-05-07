import { STATUS } from "../../utils/constants.js";
import { sendResponse } from "../../utils/response.js";
import * as bookmarkService from "./bookmark.service.js";

export async function getAllUserBookmarks(req, res, next) {
  const user_id = req.user.id;

  try {
    const bookmarks = await bookmarkService.getAllUserBookmarks(user_id);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Bookmarks berhasil didapatkan",
      "data",
      {
        bookmarks,
      },
    );
  } catch (error) {
    next(error);
  }
}

export async function getBookmarkById(req, res, next) {
  const { id } = req.params;

  try {
    const bookmark = await bookmarkService.getBookmarkById(id);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Bookmarks berhasil didapatkan",
      "data",
      bookmark,
    );
  } catch (error) {
    next(error);
  }
}

export async function createBookmark(req, res, next) {
  const user_id = req.user.id;
  const { jobId } = req.params;

  try {
    const bookmark = await bookmarkService.createBookmark(user_id, jobId);

    sendResponse(
      res,
      201,
      STATUS.SUCCESS,
      "Bookmarks berhasil dibuat",
      "data",
      bookmark,
    );
  } catch (error) {
    next(error);
  }
}

export async function deleteBookmarkById(req, res, next) {
  const { jobId } = req.params;

  try {
    const bookmark = await bookmarkService.deleteBookmarkByJobId(jobId);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Bookmarks berhasil dihapus",
      "data",
      bookmark,
    );
  } catch (error) {
    next(error);
  }
}
