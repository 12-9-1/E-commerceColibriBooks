
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  coverUrl: String,   // URL de la imagen en Cloudinary
  pdfUrl: String,     // URL del PDF en Cloudinary
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
