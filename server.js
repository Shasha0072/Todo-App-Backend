/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then((con) => {
  console.log('Connected to database');
});

app.listen(3000, () => {
  console.log('Listening To Port');
});
