import { logger } from "../utils/logger.js";

const SENSITIVE_FIELDS = ["password", "confirmPassword", "token", "secret"];

function redactBody(body) {
  const redacted = { ...body };
  for (const field of SENSITIVE_FIELDS) {
    if (field in redacted) redacted[field] = "[REDACTED]";
  }
  return redacted;
}

export function requestLogger(req, res, next) {
  const start = Date.now();

  if (req.body && Object.keys(req.body).length > 0) {
    logger.debug(
      `[${req.method}] ${req.originalUrl} body: ${JSON.stringify(redactBody(req.body))}`,
    );
  }

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      `[${req.method}] ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
    );
  });

  next();
}
