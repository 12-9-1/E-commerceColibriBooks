// File: backend/routers/book.routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImageController, 
    createBook, 
    getAllBooks, 
    deleteBook, 
    updateBook, 
    searchBooks, } = require('../controllers/book.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-file', upload.single('file'), uploadImageController); 
router.post('/', createBook);
router.get('/', getAllBooks);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);
router.get("/search", searchBooks);


module.exports = router;
