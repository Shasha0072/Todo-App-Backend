const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const todoRouter = require('./routes/todoRouter');
const userRouter = require('./routes/userRouter');

app.use('/api', todoRouter);
app.use('/api/user', userRouter);

module.exports = app;
