import { STATUS } from "../utils/constants.js";
import { sendResponse } from "../utils/response.js";

export function notFoundHandler(_req, res) {
  sendResponse(res, 404, STATUS.NOT_FOUND, "Route not found");
}
