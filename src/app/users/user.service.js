import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import AppError from "../../utils/error.js";
import UserRepository from "./user.repository.js";

export async function registerUserService(data) {
  const existing = await UserRepository.findUserByEmail(data.email);

  if (existing) {
    throw new AppError(409, "Email sudah didaftarkan");
  }

  const id = nanoid(16);
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return UserRepository.createUser({ ...data, id, password: hashedPassword });
}

export async function getUserByIdService(id) {
  const user = await UserRepository.findUserById(id);

  if (!user) {
    throw new AppError(404, "User tidak ditemukan");
  }

  return user;
}
