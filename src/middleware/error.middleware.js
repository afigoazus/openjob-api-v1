import { STATUS } from "../utils/constants.js";
import { AppError } from "../utils/error.js";
import { sendResponse } from "../utils/response.js";

export function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    const statusText =
      err.status >= 500
        ? STATUS.ERROR
        : err.status === 401
          ? STATUS.UNAUTHORIZED
          : err.status === 403
            ? STATUS.FORBIDDEN
            : err.status === 404
              ? STATUS.NOT_FOUND
              : err.status === 409
                ? STATUS.CONFLICT
                : STATUS.FAIL;
    sendResponse(
      res,
      err.status,
      statusText,
      err.message || "Internal Server Error",
      undefined,
      undefined,
      err.errors,
    );
    return;
  }
}
