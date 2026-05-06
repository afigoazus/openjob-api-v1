import AppError from "../../utils/error.js";
import categoryRepository from "./category.repository.js";

export async function getCategory() {
  const categories = await categoryRepository.getCategory();

  return categories;
}

export async function getCategoryById(id) {
  const category = await categoryRepository.getCategoryById(id);

  if (!category) {
    throw new AppError(404, "Category tidak ditemukan");
  }

  return category;
}

export async function createCategory(name) {
  const category = await categoryRepository.createCategory(name);

  if (!category) {
    throw new AppError(400, "Category gagal ditambahkan");
  }

  return category;
}

export async function editCategory(id, name) {
  const existing = await categoryRepository.getCategoryById(id);

  if (!existing) {
    throw new AppError(404, "Category tidak ditemukan");
  }

  const category = await categoryRepository.editCategory({ id, name });

  if (!category) {
    throw new AppError(400, "Category gagal diubah");
  }

  return category;
}

export async function deleteCategoryById(id) {
  const existing = await categoryRepository.getCategoryById(id);

  if (!existing) {
    throw new AppError(404, "Category tidak ditemukan");
  }

  const category = await categoryRepository.deleteCategoryById(id);

  if (!category) {
    throw new AppError(400, "Category gagal dihapus");
  }

  return category;
}
