import AppError from "../../utils/error.js";
import companyRepository from "./company.repository.js";
import cacheService from "../cache/redis.service.js";

export async function getCompany() {
  const company = await companyRepository.getCompany();

  return company;
}

export async function getCompanyById(id) {
  const cacheKey = `company:${id}`;
  const cached = await cacheService.get(cacheKey);

  if (cached) {
    return { data: JSON.parse(cached), fromCache: true };
  }

  const company = await companyRepository.getCompanyById(id);

  if (!company) {
    throw new AppError(404, "Company tidak ditemukan");
  }

  await cacheService.set(cacheKey, JSON.stringify(company));

  return { data: company, fromCache: false };
}

export async function createCompany(name, description, location) {
  const company = await companyRepository.createCompany({
    name,
    description,
    location,
  });

  if (!company) {
    throw new AppError(400, "Company gagal ditambahkan");
  }

  return company;
}

export async function editCompany(id, name, description, location) {
  const existing = await companyRepository.getCompanyById(id);

  if (!existing) {
    throw new AppError(404, "Company tidak ditemukan");
  }

  const company = await companyRepository.editCompany({
    id,
    name,
    description,
    location,
  });

  if (!company) {
    throw new AppError(400, "Company gagal diubah");
  }

  await cacheService.del(`company:${id}`);

  return company;
}

export async function deleteCompanyById(id) {
  const existing = await companyRepository.getCompanyById(id);

  if (!existing) {
    throw new AppError(404, "Company tidak ditemukan");
  }

  const company = await companyRepository.deleteCompanyById(id);

  if (!company) {
    throw new AppError(400, "Company gagal dihapus");
  }

  await cacheService.del(`company:${id}`);

  return company;
}
