import { STATUS } from "../utils/constants.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { sendResponse } from "../utils/response.js";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token =
    authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    sendResponse(res, 401, STATUS.FAIL, "Unauthorized");
    return;
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    sendResponse(res, 401, STATUS.FAIL, "Unauthorized");
  }
}
