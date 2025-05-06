//moldels/modelBook.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  preview: { type: String, required: true }, // descripción corta
  price: { type: Number, required: true },
  trailer: { type: String }, // puede ser un link a YouTube, opcional
  cover: { type: String, required: true }, // URL de Cloudinary
  pdf: { type: String }, // si decidís subirlo a Cloudinary o guardarlo en tu server
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', bookSchema);
