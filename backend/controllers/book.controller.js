// controllers/book.controller.js
const Book = require('../models/modelBook'); 
const streamifier = require('streamifier');
const cloudinary = require('../utils/utilsCloudinary');

const createBook = async (req, res) => {
  try {
    const {  author, title, genre, preview, price, trailer, cover, pdf } = req.body;

    const newBook = new Book({
      author,
      title,
      genre,
      preview,
      price,
      trailer,
      cover,
      pdf,
    });

    await newBook.save();
    res.status(201).json({ message: 'Libro creado con éxito', book: newBook });
  } catch (error) {
    console.error('Error al crear el libro:', error);
    res.status(500).json({ message: 'Error al crear el libro' });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
};


const uploadImageController = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'No se encontró el archivo.' });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'colibri_books', resource_type: 'auto' },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();
    res.status(200).json({ secure_url: result.secure_url });

  } catch (err) {
    console.error('Error interno al subir archivo:', err);
    res.status(500).json({ message: 'Error interno al subir el archivo', error: err.message });
  }
};



const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

 
    if (book.cover) {
      const publicIdCover = book.cover.split('/').pop().split('.')[0]; 
      await cloudinary.uploader.destroy(`colibri_books/${publicIdCover}`);
    }


    if (book.pdf) {
      const publicIdPdf = book.pdf.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`colibri_books/${publicIdPdf}`, { resource_type: "raw" });
    }

    
    await book.deleteOne();

    res.json({ message: 'Libro eliminado correctamente' });

  } catch (error) {
    console.error('Error al eliminar el libro:', error);
    res.status(500).json({ message: 'Error al eliminar el libro' });
  }
};


const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.json({ message: 'Libro actualizado', book: updatedBook });

  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    res.status(500).json({ message: 'Error al actualizar el libro' });
  }
};

const searchBooks = async (req, res) => {

  const { title, author, genre } = req.query;
  const query = {};

  if (title) query.title = { $regex: title, $options: "i" };
  if (author) query.author = { $regex: author, $options: "i" };
   if (genre) query.genre = { $regex: genre, $options: "i" };

  try {
    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar libros" });
  }
};



module.exports = {
  createBook,
  getAllBooks,
  uploadImageController,
  deleteBook,
  updateBook,
  searchBooks,
};
