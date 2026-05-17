import { nanoid } from "nanoid";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";
import AppError from "../../utils/error.js";
import AuthRepository from "./auth.repository.js";

export async function login(email, password) {
  const user = await AuthRepository.verifyUserCredential(email, password);

  const accessToken = signAccessToken({ id: user.id });
  const refreshToken = signRefreshToken({ id: user.id });

  await AuthRepository.addRefreshToken(nanoid(16), refreshToken, user.id);

  return { accessToken, refreshToken };
}

export async function refresh(token) {
  const stored = await AuthRepository.verifyRefreshToken(token);
  if (!stored) throw new AppError(400, "Refresh token tidak valid");

  const payload = verifyRefreshToken(token);

  const newAccessToken = signAccessToken({ id: payload.id });
  // const newRefreshToken = signRefreshToken({ id: payload.id });

  // await AuthRepository.deleteRefreshToken(token);
  // await AuthRepository.addRefreshToken(nanoid(16), newRefreshToken, payload.id);

  // return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  return {accessToken: newAccessToken}
}

export async function logout(token) {
  const stored = await AuthRepository.verifyRefreshToken(token);
  if (!stored) throw new AppError(400, "Refresh token tidak valid");

  await AuthRepository.deleteRefreshToken(token);
}
