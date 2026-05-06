import { STATUS } from "../../utils/constants.js";
import { sendResponse } from "../../utils/response.js";
import * as authService from "./auth.service.js";

export async function login(req, res, next) {
  try {
    const { email, password } = req.validated;
    const data = await authService.login(email, password);
    sendResponse(res, 200, STATUS.SUCCESS, "Login berhasil", "data", data);
  } catch (err) {
    next(err);
  }
}

export async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.validated;
    const data = await authService.refresh(refreshToken);
    sendResponse(res, 200, STATUS.SUCCESS, "Token diperbarui", "data", data);
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const { refreshToken } = req.validated;
    await authService.logout(refreshToken);
    sendResponse(res, 200, STATUS.SUCCESS, "Logout berhasil");
  } catch (err) {
    next(err);
  }
}
