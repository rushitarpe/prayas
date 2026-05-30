import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
  imageUrl: { type: String, default: '' },
  difficulty: { type: String, enum: ['easy', 'easy+', 'medium', 'medium+', 'hard-', 'hard'], default: 'medium' },
  dayNumber: { type: Number, default: null },
  lastCompletedAt: { type: Date, default: null },
  activeSubDay: { type: Number, default: 0 },
  subDayLastCompletedAt: { type: Date, default: null },
  dueDate: { type: Date, default: null },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
