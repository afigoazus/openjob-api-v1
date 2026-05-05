import { STATUS } from "../utils/constants";
import { sendResponse } from "../utils/response";

export function notFoundHandler(_req, res) {
  sendResponse(res, 404, STATUS.NOT_FOUND, "Route not found");
}
