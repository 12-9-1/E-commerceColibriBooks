const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String, default: 'https://i.imgur.com/xyz123.png' },
  nickname: { type: String, default: 'Usuario' },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);
