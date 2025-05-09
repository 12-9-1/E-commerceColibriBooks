//moldels/modelBook.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  preview: { type: String, required: true }, 
  price: { type: Number, required: true },
  trailer: { type: String }, 
  cover: { type: String, required: true }, 
  pdf: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', bookSchema);
