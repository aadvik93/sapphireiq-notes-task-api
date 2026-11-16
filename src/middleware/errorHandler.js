export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  let status = err.status || 500;
  let message = err.message || 'An unexpected error occurred.';
  let details;

  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Validation failed.';
    details = Object.values(err.errors).map(({ path, message: errorMessage }) => ({ field: path, message: errorMessage }));
  } else if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid resource ID.';
  } else if (err.code === 11000) {
    status = 409;
    message = 'A resource with that value already exists.';
  }

  if (status >= 500) console.error(err);
  res.status(status).json({ success: false, error: { message, ...(details && { details }) } });
}
