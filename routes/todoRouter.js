const express = require('express');
const todoController = require('../controller/todoController');

const router = express.Router();

router
  .route('/')
  .post(todoController.createNewTask)
  .get(todoController.getAllTasks);
router
  .route('/:id')
  .patch(todoController.updateTask)
  .delete(todoController.deleteTask);

module.exports = router;
