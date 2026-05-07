import { STATUS } from "../../utils/constants.js";
import { sendResponse } from "../../utils/response.js";
import * as applicationsService from "./applications.service.js";

export async function getAllApplications(req, res, next) {
  try {
    const applications = await applicationsService.getAllApplications();

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Applications berhasil didapatkan",
      "data",
      {
        applications,
      },
    );
  } catch (error) {
    next(error);
  }
}

export async function getApplicationById(req, res, next) {
  const { id } = req.params;

  try {
    const applications = await applicationsService.getApplicationById(id);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Applications berhasil didapatkan",
      "data",
      applications,
    );
  } catch (error) {
    next(error);
  }
}

export async function getApplicationByUserId(req, res, next) {
  const { userId } = req.params;

  try {
    const applications =
      await applicationsService.getApplicationByUserId(userId);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Applications berhasil didapatkan",
      "data",
      {
        applications,
      },
    );
  } catch (error) {
    next(error);
  }
}

export async function getApplicationByJobsId(req, res, next) {
  const { jobId } = req.params;

  try {
    const applications =
      await applicationsService.getApplicationByJobsId(jobId);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Applications berhasil didapatkan",
      "data",
      {
        applications,
      },
    );
  } catch (error) {
    next(error);
  }
}

export async function createApplication(req, res, next) {
  const { user_id, job_id, status } = req.validated;

  try {
    const applications = await applicationsService.createApplication({
      user_id,
      job_id,
      status,
    });

    sendResponse(
      res,
      201,
      STATUS.SUCCESS,
      "Applications berhasil dibuat",
      "data",
      applications,
    );
  } catch (error) {
    next(error);
  }
}

export async function updateApplicationStatusById(req, res, next) {
  const { status } = req.validated;
  const { id } = req.params;

  try {
    const applications = await applicationsService.updateApplicationStatusById(
      id,
      status,
    );

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Applications berhasil diupdate",
      "data",
      applications,
    );
  } catch (error) {
    next(error);
  }
}

export async function deleteApplicationById(req, res, next) {
  const { id } = req.params;

  try {
    const applications = await applicationsService.deleteApplicationById(id);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Applications berhasil dihapus",
      "data",
      applications,
    );
  } catch (error) {
    next(error);
  }
}
