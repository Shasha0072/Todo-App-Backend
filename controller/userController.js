/* eslint-disable no-empty */
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = (req, res) => {
  try {
  } catch (err) {}
};

exports.deleteUser = (req, res) => {
  try {
  } catch (err) {}
};
