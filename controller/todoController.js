const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.createNewTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { updateInfo } = req.body;
    const { id } = req.params;
    const filter = { _id: id };
    const update = updateInfo;
    const task = await Task.findOneAndUpdate(filter, update, { new: true });
    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const task = await Task.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
