// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  following: { type: [String], default: [] },
  followers: { type: [String], default: [] },
  likes: { type: [String], default: [] },
  retweets: { type: [String], default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  location: { type: String },
  website: { type: String },
  birthday: { type: Date },
  backgroundImage: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
