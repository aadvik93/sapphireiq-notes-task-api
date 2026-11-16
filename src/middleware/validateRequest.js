import { validationResult } from 'express-validator';

export function validateRequest(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  res.status(400).json({
    success: false,
    error: {
      message: 'Request validation failed.',
      details: result.array().map(({ path, msg }) => ({ field: path || 'body', message: msg })),
    },
  });
}
