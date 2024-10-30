const mongoose = require('mongoose');


const naturalGemSchema = new mongoose.Schema({
  // YOU DO: Define properties of food schema
});


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hobby: naturalGemSchema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
