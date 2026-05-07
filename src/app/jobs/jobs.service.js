import AppError from "../../utils/error.js";
import jobsRepository from "./jobs.repository.js";

export async function getAllJobs(filters = {}) {
  const jobs = await jobsRepository.getAllJobs(filters);

  return jobs;
}

export async function getJobsById(id) {
  const jobs = await jobsRepository.getJobsById(id);

  if (!jobs) {
    throw new AppError(404, "Jobs tidak ditemukan");
  }

  return jobs;
}

export async function getJobsByCompanyId(company_id) {
  const jobs = await jobsRepository.getJobsByCompanyId(company_id);

  if (!jobs) {
    throw new AppError(404, "Jobs tidak ditemukan");
  }

  return jobs;
}

export async function getJobsByCategoryId(category_id) {
  const jobs = await jobsRepository.getJobsByCategoryId(category_id);

  if (!jobs) {
    throw new AppError(404, "Jobs tidak ditemukan");
  }

  return jobs;
}

export async function createJobs({
  company_id,
  category_id,
  title,
  description,
  job_type,
  experience_level,
  location_type,
  location_city,
  salary_min,
  salary_max,
  is_salary_visible,
  status,
}) {
  const jobs = await jobsRepository.createJobs({
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  });

  if (!jobs) {
    throw new AppError(400, "Jobs gagal ditambahkan");
  }

  return jobs;
}

export async function updateJobsById({
  id,
  company_id,
  category_id,
  title,
  description,
  job_type,
  experience_level,
  location_type,
  location_city,
  salary_min,
  salary_max,
  is_salary_visible,
  status,
}) {
  const jobs = await jobsRepository.updateJobsById({
    id,
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  });

  if (!jobs) {
    throw new AppError(400, "Jobs gagal diupdate");
  }

  return jobs;
}

export async function deleteJobsById(id) {
  const jobs = await jobsRepository.deleteJobsById(id);

  if (!jobs) {
    throw new AppError(400, "Jobs gagal dihapus");
  }

  return jobs;
}
