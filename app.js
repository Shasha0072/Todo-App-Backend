const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const todoRouter = require('./routes/todoRouter');
const userRouter = require('./routes/userRouter');

app.use('/api', todoRouter);
app.use('/api/user', userRouter);
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on the server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
