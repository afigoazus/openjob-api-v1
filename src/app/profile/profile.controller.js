import { STATUS } from "../../utils/constants.js";
import { sendResponse } from "../../utils/response.js";
import * as profileService from "./profile.service.js";

export async function getUserProfile(req, res, next) {
  const userId = req.user.id;

  try {
    const userProfile = await profileService.getUserProfile(userId);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Profile berhasil didapatkan",
      "data",
      userProfile,
    );
  } catch (error) {
    next(error);
  }
}

export async function getUserApplicant(req, res, next) {
  const userId = req.user.id;

  try {
    const userApplicant = await profileService.getUserApplicant(userId);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Data Applicant berhasil didapatkan",
      "data",
      {
        applications: userApplicant,
      },
    );
  } catch (error) {
    next(error);
  }
}

export async function getUserBookMarks(req, res, next) {
  const userId = req.user.id;

  try {
    const userBookMarks = await profileService.getUserBookMarks(userId);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Data BookMarks berhasil didapatkan",
      "data",
      {
        bookmarks: userBookMarks,
      },
    );
  } catch (error) {
    next(error);
  }
}
