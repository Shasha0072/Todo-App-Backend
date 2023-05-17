const express = require('express');
const todoController = require('../controller/todoController');

const router = express.Router();

router
  .route('/')
  .post(todoController.createNewUser)
  .get(todoController.getAllUsers);
router
  .route('/:id')
  .get(todoController.getUser)
  .patch(todoController.updateUser)
  .delete(todoController.deleteUser);

module.exports = router;
