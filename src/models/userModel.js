const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add the user name'],
    },
    username: {
      type: String,
      unique: [true, 'Username already taken.'],
      required: [true, 'Please add the user username'],
    },
    email: {
      type: String,
      unique: [true, 'Email already taken.'],
      required: [true, 'Please add the user email'],
    },
    password: {
      type: String,
      required: [true, 'Please add the user password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
