import AppError from "../../utils/error.js";
import applicationsRepository from "./applications.repository.js";
import cacheService from "../cache/redis.service.js";

export async function getAllApplications() {
  const applications = await applicationsRepository.getAllApplications();

  return applications;
}

export async function getApplicationById(id) {
  const cachekey = `applicatiions:${id}`;
  const cached = await cacheService.get(cachekey);

  if (cached) {
    return { data: JSON.parse(cached), fromCache: true };
  }

  const applications = await applicationsRepository.getApplicationById(id);

  if (!applications) {
    throw new AppError(404, "Applications tidak ditemukan");
  }

  await cacheService.set(cachekey, JSON.stringify(applications));

  return { data: applications, fromCache: false };
}

export async function getApplicationByUserId(user_id) {
  const cachekey = `applicationsByUser:${user_id}`;
  const cached = await cacheService.get(cachekey);

  if (cached) {
    return { data: JSON.parse(cached), fromCache: true };
  }

  const applications =
    await applicationsRepository.getApplicationByUserId(user_id);

  if (!applications) {
    throw new AppError(404, "Applications tidak ditemukan");
  }

  await cacheService.set(cachekey, JSON.stringify(applications));

  return { data: applications, fromCache: false };
}

export async function getApplicationByJobsId(jobs_id) {
  const cachekey = `applicationByJob:${jobs_id}`;
  const cached = await cacheService.get(cachekey);

  if (cached) {
    return { data: JSON.parse(cached), fromCache: true };
  }

  const applications =
    await applicationsRepository.getApplicationByJobsId(jobs_id);

  if (!applications) {
    throw new AppError(404, "Applications tidak ditemukan");
  }

  await cacheService.set(cachekey, JSON.stringify(applications));

  return { data: applications, fromCache: false };
}

export async function createApplication({ user_id, job_id, status }) {
  const applications = await applicationsRepository.createApplication({
    user_id,
    job_id,
    status,
  });

  if (!applications) {
    throw new AppError(400, "Gagal Melamar Pekerjaan");
  }

  await cacheService.del(`applicationsByUser:${user_id}`);

  return applications;
}

export async function updateApplicationStatusById(id, status) {
  const applications = await applicationsRepository.updateApplicationStatusById(
    id,
    status,
  );

  if (!applications) {
    throw new AppError(400, "Gagal Memperbarui Status Lamaran");
  }

  await cacheService.del(`applications:${id}`);

  return applications;
}

export async function deleteApplicationById(id) {
  const applications = await applicationsRepository.deleteApplicationById(id);

  if (!applications) {
    throw new AppError(400, "Gagal Menghapus Data Lamaran");
  }

  await cacheService.del(`applications:${id}`);

  return applications;
}
