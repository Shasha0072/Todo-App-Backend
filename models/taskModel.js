const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task Must Have A Title'],
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['Easy', 'Medium', 'High'],
      default: 'Meduim',
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Completed'],
      default: 'To Do',
    },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    tags: [{ type: String }],
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
