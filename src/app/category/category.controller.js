import { STATUS } from "../../utils/constants.js";
import { sendResponse } from "../../utils/response.js";
import * as categoryService from "./category.service.js";

export async function getCategory(req, res, next) {
  try {
    const categories = await categoryService.getCategory();

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Categories berhasil didapatkan",
      "data",
      {
        categories: categories,
      },
    );
  } catch (error) {
    next(error);
  }
}

export async function getCategoryById(req, res, next) {
  const { id } = req.params;

  try {
    const category = await categoryService.getCategoryById(id);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Category berhasil didapatkan",
      "data",
      category
    );
  } catch (error) {
    next(error);
  }
}

export async function createCategory(req, res, next) {
  const { name } = req.validated;

  try {
    const category = await categoryService.createCategory(name);

    sendResponse(
      res,
      201,
      STATUS.SUCCESS,
      "Category berhasil dibuat",
      "data",
      category,
    );
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  const { id } = req.params;
  const { name } = req.validated;

  try {
    const category = await categoryService.editCategory(id, name);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Category berhasil diubah",
      "data",
      category,
    );
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  const { id } = req.params;

  try {
    const category = await categoryService.deleteCategoryById(id);

    sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "Category berhasil dihapus",
      "data",
      category,
    );
  } catch (error) {
    next(error);
  }
}
