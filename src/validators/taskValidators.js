import { body, param, query } from 'express-validator';

export const idValidator = [param('id').isMongoId().withMessage('id must be a valid MongoDB ID.')];

export const createTaskValidator = [
  body('title').isString().withMessage('title must be a string.').trim().notEmpty().withMessage('title is required.').isLength({ max: 120 }).withMessage('title must be 120 characters or fewer.'),
  body('description').optional().isString().withMessage('description must be a string.').trim().isLength({ max: 2000 }).withMessage('description must be 2000 characters or fewer.'),
  body('completed').optional().isBoolean().withMessage('completed must be true or false.').toBoolean(),
];

export const updateTaskValidator = [
  body().isObject().withMessage('Request body must be a JSON object.'),
  body('title').optional().isString().withMessage('title must be a string.').trim().notEmpty().withMessage('title cannot be empty.').isLength({ max: 120 }).withMessage('title must be 120 characters or fewer.'),
  body('description').optional().isString().withMessage('description must be a string.').trim().isLength({ max: 2000 }).withMessage('description must be 2000 characters or fewer.'),
  body('completed').optional().isBoolean().withMessage('completed must be true or false.').toBoolean(),
  body().custom((value) => Object.keys(value).length > 0).withMessage('Provide at least one field to update.'),
  body().custom((value) => Object.keys(value).every((key) => ['title', 'description', 'completed'].includes(key))).withMessage('Only title, description, and completed can be updated.'),
];

export const listTaskValidator = [
  query('completed').optional().isBoolean().withMessage('completed must be true or false.'),
  query('page').optional().isInt({ min: 1 }).withMessage('page must be an integer greater than or equal to 1.'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be an integer between 1 and 100.'),
  query('sortBy').optional().isIn(['createdAt', 'updatedAt', 'title', 'completed']).withMessage('sortBy must be createdAt, updatedAt, title, or completed.'),
  query('order').optional().isIn(['asc', 'desc']).withMessage('order must be asc or desc.'),
  query('search').optional().isString().trim().isLength({ max: 100 }).withMessage('search must be 100 characters or fewer.'),
];
