const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('users', userSchema);

