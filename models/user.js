const mongoose = require('mongoose');

const gemSchema = new mongoose.Schema({
  name: String,
  characteristic: String,
  description: String,
  pieces: Number,
  image: String,
});


const userSchema = mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true},
  gems: [gemSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
