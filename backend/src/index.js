import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

import todoRoutes from './routes/todo.js';
import userRoutes from './routes/users.js';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/todo', todoRoutes);
app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('server running on localhost:3000');
});
