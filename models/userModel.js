const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Cannot Be Empty'],
    },
    lastName: { type: String, required: [true, 'Cannot Be Empty'] },
    username: {
      type: String,
      required: [true, 'Cannot Be Empty'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'User must have a password.'],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please enter the same password.'],
      minlength: 8,
      validate: {
        // This Only Works on Create and Save.
        validator: function (el) {
          return this.password === el;
        },
        message: 'Password are not the same',
      },
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],
    adminId: { type: String, default: null },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
