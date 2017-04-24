const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  video: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true }
},  {
  timestamps: true
});

module.exports = mongoose.model('message', postSchema);
