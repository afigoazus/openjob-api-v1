import { STATUS } from "../../utils/constants.js";
import { sendResponse } from "../../utils/response.js";
import * as jobsService from "./jobs.service.js";

export async function getAllJobs(req, res, next) {
  const {
    title,
    "company-name": company_name,
    "category-name": category_name,
  } = req.query;

  try {
    const jobs = await jobsService.getAllJobs({
      title,
      company_name,
      category_name,
    });

    sendResponse(res, 200, STATUS.SUCCESS, "Jobs berhasil didapatkan", "data", {
      jobs,
    });
  } catch (error) {
    next(error);
  }
}

export async function getJobsById(req, res, next) {
  const { id } = req.params;

  try {
    const job = await jobsService.getJobsById(id);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Job berhasil didapatkan",
      "data",
      job,
    );
  } catch (error) {
    next(error);
  }
}

export async function getJobsByCompanyId(req, res, next) {
  const { companyId } = req.params;

  try {
    const jobs = await jobsService.getJobsByCompanyId(companyId);

    sendResponse(res, 200, STATUS.SUCCESS, "Jobs berhasil didapatkan", "data", {
      jobs,
    });
  } catch (error) {
    next(error);
  }
}

export async function getJobsByCategoryId(req, res, next) {
  const { categoryId } = req.params;

  try {
    const jobs = await jobsService.getJobsByCategoryId(categoryId);

    sendResponse(res, 200, STATUS.SUCCESS, "Jobs berhasil didapatkan", "data", {
      jobs,
    });
  } catch (error) {
    next(error);
  }
}

export async function createJobs(req, res, next) {
  const {
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
  } = req.validated;

  try {
    const jobs = await jobsService.createJobs({
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

    sendResponse(
      res,
      201,
      STATUS.SUCCESS,
      "Jobs berhasil dibuat",
      "data",
      jobs,
    );
  } catch (error) {
    next(error);
  }
}

export async function updateJobsById(req, res, next) {
  const {
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
  } = req.validated;

  const { id } = req.params;

  try {
    const jobs = await jobsService.updateJobsById({
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

    sendResponse(res, 200, STATUS.SUCCESS, "Jobs berhasil diupdate", "data", {
      jobs,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteJobsById(req, res, next) {
  const { id } = req.params;

  try {
    const jobs = await jobsService.deleteJobsById(id);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Jobs berhasil dihapus",
      "data",
      jobs,
    );
  } catch (error) {
    next(error);
  }
}
