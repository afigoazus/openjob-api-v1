import AppError from "../../utils/error.js";
import applicationsRepository from "./applications.repository.js";

export async function getAllApplications() {
  const applications = await applicationsRepository.getAllApplications();

  return applications;
}

export async function getApplicationById(id) {
  const applications = await applicationsRepository.getApplicationById(id);

  if (!applications) {
    throw new AppError(404, "Applications tidak ditemukan");
  }

  return applications;
}

export async function getApplicationByUserId(user_id) {
  const applications =
    await applicationsRepository.getApplicationByUserId(user_id);

  if (!applications) {
    throw new AppError(404, "Applications tidak ditemukan");
  }

  return applications;
}

export async function getApplicationByJobsId(jobs_id) {
  const applications =
    await applicationsRepository.getApplicationByJobsId(jobs_id);

  if (!applications) {
    throw new AppError(404, "Applications tidak ditemukan");
  }

  return applications;
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

  return applications;
}

export async function updateApplicationStatusById(id, status) {
  const applications =
    await applicationsRepository.updateApplicationStatusById(id, status);

  if (!applications) {
    throw new AppError(400, "Gagal Memperbarui Status Lamaran");
  }

  return applications;
}

export async function deleteApplicationById(id) {
  const applications = await applicationsRepository.deleteApplicationById(id);

  if (!applications) {
    throw new AppError(400, "Gagal Menghapus Data Lamaran");
  }

  return applications;
}
