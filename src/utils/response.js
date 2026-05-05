export function sendResponse(
  res,
  status,
  statusText,
  message,
  fieldName,
  data,
  errors,
) {
  res.status(status).json({
    status: statusText,
    message,
    ...(fieldName && data !== undefined ? { [fieldName]: data } : {}),
    ...(errors ? { errors } : {}),
  });
}
