const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  role: String, // 'guest' or 'admin'
});

const userModel = mongoose.model('User', userSchema);

module.exports={userModel}
