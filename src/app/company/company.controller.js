import { STATUS } from "../../utils/constants.js";
import { sendResponse } from "../../utils/response.js";
import * as companyService from "./company.service.js";

export async function getCompany(req, res, next) {
  try {
    const company = await companyService.getCompany();

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Company berhasil didapatkan",
      "data",
      {
        companies: company,
      },
    );
  } catch (error) {
    next(error);
  }
}

export async function getCompanyById(req, res, next) {
  const { id } = req.params;
  try {
    const { data, fromCache } = await companyService.getCompanyById(id);

    if (fromCache) {
      res.setHeader("X-Data-Source", "cache");
    } else {
      res.setHeader("X-Data-Source", "database");
    }

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Company berhasil didapatkan",
      "data",
      data,
    );
  } catch (error) {
    next(error);
  }
}

export async function createCompany(req, res, next) {
  const { name, description, location } = req.validated;

  try {
    const company = await companyService.createCompany(
      name,
      description,
      location,
    );

    sendResponse(
      res,
      201,
      STATUS.SUCCESS,
      "Company berhasil dibuat",
      "data",
      company,
    );
  } catch (error) {
    next(error);
  }
}

export async function updateCompany(req, res, next) {
  const { id } = req.params;
  const { name, description, location } = req.validated;

  try {
    const company = await companyService.editCompany(
      id,
      name,
      description,
      location,
    );

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Company berhasil diubah",
      "data",
      company,
    );
  } catch (error) {
    next(error);
  }
}

export async function deleteCompany(req, res, next) {
  const { id } = req.params;

  try {
    const company = await companyService.deleteCompanyById(id);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Company berhasil dihapus",
      "data",
      company,
    );
  } catch (error) {
    next(error);
  }
}
