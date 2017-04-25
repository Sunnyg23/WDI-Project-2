const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  youtubeId: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true}
},  {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
