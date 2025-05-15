// models/modelMessage.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: false },
  content: { type: String, required: true },
  adminResponse: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pendiente', 'respondido'], default: 'pendiente' }
});



module.exports = mongoose.model('Message', messageSchema);
