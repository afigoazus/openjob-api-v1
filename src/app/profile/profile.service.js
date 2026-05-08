import AppError from "../../utils/error.js";
import profileRepository from "./profile.repository.js";

export async function getUserProfile(userId) {
  const profile = await profileRepository.getUserProfile(userId);

  return profile;
}

export async function getUserApplicant(userId) {
  const applications = await profileRepository.getUserApplicant(userId);

  if (!applications) {
    throw new AppError(404, "Data Applicant Tidak Ditemukan");
  }

  return applications;
}

export async function getUserBookMarks(userId) {
  const bookmarks = await profileRepository.getUserBookMarks(userId);

  if (!bookmarks) {
    throw new AppError(404, "Data Bookmark Tidak Ditemukan");
  }

  return bookmarks;
}
