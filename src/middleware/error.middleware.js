import { INVALID_FILE_TYPE_MESSAGE, STATUS } from "../utils/constants.js";
import AppError from "../utils/error.js";
import { sendResponse } from "../utils/response.js";
import { logger } from "../utils/logger.js";
import multer from "multer";

export function errorHandler(err, _req, res, _next) {
  if (err.isJoi || err.name === "ValidationError") {
    sendResponse(
      res,
      400,
      STATUS.FAIL,
      "Validation Error",
      undefined,
      undefined,
      err.details?.map((d) => d.message),
    );
    return;
  }

  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Ukuran file maksimal 5 MB"
        : err.message;
    sendResponse(res, 413, STATUS.FAIL, message);
    return;
  }

  if (err.message === INVALID_FILE_TYPE_MESSAGE) {
    sendResponse(res, 400, STATUS.FAIL, err.message);
  }

  if (err instanceof AppError) {
    const statusText =
      err.status >= 500
        ? STATUS.ERROR
        : err.status === 401
          ? STATUS.FAIL
          : err.status === 403
            ? STATUS.FORBIDDEN
            : err.status === 404
              ? STATUS.FAIL
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

  logger.error(`Unhandled error: ${err.message}\n${err.stack}`);
  sendResponse(res, 500, STATUS.ERROR, "Internal Server Error");
}
