const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const todoRouter = require('./routes/todoRouter');
const userRouter = require('./routes/userRouter');

app.use('/api', todoRouter);
app.use('/api/user', userRouter);

app.use(globalErrorHandler);

module.exports = app;
