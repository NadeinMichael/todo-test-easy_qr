import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'await',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Todo', todoSchema);
