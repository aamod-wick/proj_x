// models/Tweet.js
const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  repliesCount: { type: Number, default: 0 },
  edited: { type: Boolean, default: false },
  likes: { type: [String], default: [] },
  retweets: { type: [String], default: [] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Tweet', tweetSchema);
