const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError('Please enter username and password'), 400);
  }

  const user = await User.findOne({ username }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // check if the token is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Please login again', 401));
  }
  // verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to the token no longer exists', 401)
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  // Get user with provided email
  const user = await User.findOne({ email });
  if (!user) return next(new AppError('User with this email doest exist', 401));
  // TODO:
  // 1. Generate a reset password token
  // 2. Encrypt the reset token and Save in user document in resetPasswordToken
  // 3. Also set Time till the token is valid in uer document as resetPasswordTokenTime (10 mins from now)
  // 4. send the email to the user with reset link reset token as parameter
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // TODO:
  // 1. Get the token from req.params.
  // 2. Hash the token and find the user where reset Password token is same.
  // 3. if not send error
  // 4. check if the tokenexpired or not
  // 5. change the password and passwordConfirm with the same from req.body
});
