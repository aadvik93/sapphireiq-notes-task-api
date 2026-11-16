import { Router } from 'express';
import { createTask, deleteTask, getTask, listTasks, updateTask } from '../controllers/taskController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createTaskValidator, idValidator, listTaskValidator, updateTaskValidator } from '../validators/taskValidators.js';

const router = Router();

router.route('/')
  .get(listTaskValidator, validateRequest, listTasks)
  .post(createTaskValidator, validateRequest, createTask);

router.route('/:id')
  .get(idValidator, validateRequest, getTask)
  .patch(idValidator, updateTaskValidator, validateRequest, updateTask)
  .delete(idValidator, validateRequest, deleteTask);

export default router;
