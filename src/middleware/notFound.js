export function notFound(req, res, next) {
  res.status(404);
  next(Object.assign(new Error(`Route not found: ${req.method} ${req.originalUrl}`), { status: 404 }));
}
