import express from 'express';

import {
  getTodo,
  createTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo.js';

import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

router.use(requireAuth);

router.route('/').get(getAllTodo).post(createTodo);

router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo);

export default router;
