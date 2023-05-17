/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const app = require('./app');

const DB = `mongodb+srv://shashwatadhau3:mEvub7j9zj1QyFct@cluster0.cflrihj.mongodb.net/Todo?retryWrites=true&w=majority`;

mongoose.connect(DB, {}).then((con) => {
  console.log('Connected to database');
});

app.listen(3000, () => {
  console.log('Listening To Port');
});
