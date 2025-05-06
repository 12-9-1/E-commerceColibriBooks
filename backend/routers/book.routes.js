// File: backend/routers/book.routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImageController, createBook, getAllBooks, deleteBook, updateBook } = require('../controllers/book.controller');

const storage = multer.memoryStorage(); // usamos buffer, no guardamos en disco
const upload = multer({ storage });

router.post('/upload-file', upload.single('file'), uploadImageController); // Para imágenes y PDFs
router.post('/', createBook);
router.get('/', getAllBooks);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);

module.exports = router;
