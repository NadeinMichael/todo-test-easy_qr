import express from 'express';

import {
  getTodo,
  createTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo.js';

const router = express.Router();

router.route('/').get(getAllTodo).post(createTodo);

router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo);

export default router;
