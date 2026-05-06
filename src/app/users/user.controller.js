import { STATUS } from "../../utils/constants.js";
import { sendResponse } from "../../utils/response.js";
import { getUserByIdService, registerUserService } from "./user.service.js";

export async function register(req, res, next) {
  const { name, email, password, role } = req.validated;

  try {
    const user = await registerUserService({ name, email, password, role });

    return sendResponse(
      res,
      201,
      STATUS.SUCCESS,
      "User berhasil di didaftarkan",
      "data",
      {
        id: user.id,
      },
    );
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req, res, next) {
  const { id } = req.params;

  try {
    const user = await getUserByIdService(id);

    return sendResponse(
      res,
      200,
      STATUS.SUCCESS,
      "User berhasil ditemukan",
      "data",
      user,
    );
  } catch (error) {
    next(error);
  }
}
