import { Task } from '../models/Task.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const listTasks = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const sortBy = req.query.sortBy || 'createdAt';
  const direction = req.query.order === 'asc' ? 1 : -1;
  const filter = {};

  if (req.query.completed !== undefined) filter.completed = req.query.completed === 'true';
  if (req.query.search) filter.$text = { $search: req.query.search };

  const [tasks, total] = await Promise.all([
    Task.find(filter).sort({ [sortBy]: direction, _id: 1 }).skip((page - 1) * limit).limit(limit).lean(),
    Task.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: tasks,
    pagination: { page, limit, total, pages: Math.ceil(total / limit), hasNextPage: page * limit < total, hasPreviousPage: page > 1 },
  });
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).lean();
  if (!task) return res.status(404).json({ success: false, error: { message: 'Task not found.' } });
  res.json({ success: true, data: task });
});

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ success: true, data: task });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  if (!task) return res.status(404).json({ success: false, error: { message: 'Task not found.' } });
  res.json({ success: true, data: task });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ success: false, error: { message: 'Task not found.' } });
  res.status(204).send();
});
