const mongoose = require('mongoose');

const blogScehma = mongoose.Schema(
  {
    title: String,
    description: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('blogs', blogScehma);

