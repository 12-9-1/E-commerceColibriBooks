import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/AdminBookList.css'; 


const API_URL = import.meta.env.VITE_API_URL;

const AdminBookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBook, setEditBook] = useState(null);
  const [newCover, setNewCover] = useState(null);
  const [newPdf, setNewPdf] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    genre: '',
    preview: '',
    price: '',
    trailer: '',
  });

  const [showUploadModal, setShowUploadModal] = useState(false); 
  const [uploading, setUploading] = useState(false); 
  const [uploadForm, setUploadForm] = useState({
    author: '',
    title: '',
    genre: '',
    preview: '',
    price: '',
    trailer: '',
    cover: null,
    pdf: null,
  });

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/books`);
      setBooks(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener libros:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const confirmDeleteBook = (id) => {
    setBookToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/books/${bookToDelete}`);
      setBooks(books.filter(book => book._id !== bookToDelete));
      toast.success('📘 Libro eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar libro:', error);
      toast.error('Error al eliminar el libro');
    } finally {
      setShowDeleteModal(false);
      setBookToDelete(null);
    }
  };


  const openEditModal = (book) => {
    setEditBook(book);
    setFormData({
      author: book.author,
      title: book.title,
      genre: book.genre,
      preview: book.preview,
      price: book.price,
      trailer: book.trailer || '',
    });
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/api/books/upload-file`, formData);
    return response.data.secure_url;
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);

      let updatedData = { ...formData };

      if (newCover) {
        const coverUrl = await uploadToCloudinary(newCover);
        updatedData.cover = coverUrl;
      }

      if (newPdf) {
        const pdfUrl = await uploadToCloudinary(newPdf);
        updatedData.pdf = pdfUrl;
      }

      await axios.put(`${API_URL}/api/books/${editBook._id}`, updatedData);

      setEditBook(null);
      setNewCover(null);
      setNewPdf(null);
      fetchBooks();
    } catch (error) {
      console.error('Error al actualizar libro:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const uploadedCoverUrl = await uploadToCloudinary(uploadForm.cover);
    const uploadedPdfUrl = await uploadToCloudinary(uploadForm.pdf);

    if (!uploadedCoverUrl || !uploadedPdfUrl) {
      alert('Error al subir archivos.');
      setUploading(false);
      return;
    }

    const newBookData = {
      author: uploadForm.author,
      title: uploadForm.title,
      genre: uploadForm.genre,
      preview: uploadForm.preview,
      price: uploadForm.price,
      trailer: uploadForm.trailer,
      cover: uploadedCoverUrl,
      pdf: uploadedPdfUrl,
    };

    try {
      await axios.post(`${API_URL}/api/books`, newBookData);
      setShowUploadModal(false);
      fetchBooks();
      setUploadForm({
        author: '',
        title: '',
        genre: '',
        preview: '',
        price: '',
        trailer: '',
        cover: null,
        pdf: null,
      });
    } catch (error) {
      console.error('Error al guardar libro:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-book-list">
      <h2>Lista de Libros 📚</h2>
      
      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <div className="book-grid">
            <div className="add-new-book" onClick={() => setShowUploadModal(true)}>
            <div className="add-icon">+</div>
            <p>Añadir Libro</p>
          </div>

          {books.map(book => (
            <div key={book._id} className="book-item">
              <img src={book.cover} alt={book.title} />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>Precio: ${book.price}</p>
                <p>Autor: {book.author}</p>
                <p>Género: {book.genre}</p>
              </div>
              <div className="book-actions">
                <button onClick={() => openEditModal(book)} className="book-actions1">✏️ Editar</button>
                <button onClick={() => confirmDeleteBook(book._id)} className="book-actions2">🗑️ Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de editar libro */}
      {editBook && (
        <div className="modal-edit">
          <div className="modal-content">
            <h3>Editar Libro</h3>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Autor"
            />
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Título"
            />
            <input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              placeholder="Género"
            />
            <textarea
              value={formData.preview}
              onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
              placeholder="Vista previa"
            />
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Precio"
            />
            <input
              type="text"
              value={formData.trailer}
              onChange={(e) => setFormData({ ...formData, trailer: e.target.value })}
              placeholder="Trailer (opcional)"
            />
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setNewCover(e.target.files[0])} 
            />
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={(e) => setNewPdf(e.target.files[0])} 
            />
            <button onClick={handleUpdate} disabled={updating}>
              {updating ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button onClick={() => setEditBook(null)}>❌ Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal para subir nuevo libro */}
      {showUploadModal && (
        <div className="modal-upload">
          <div className="modal-content">
            <h3>Subir Nuevo Libro 📘</h3>
            <form onSubmit={handleUploadSubmit} className="upload-form">
            <input type="text" placeholder="Autor"value={uploadForm.author} onChange={(e) => setUploadForm({...uploadForm, author: e.target.value})}required/>
              <input type="text" placeholder="Título" value={uploadForm.title} onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})} required />
              <input type="text" placeholder="Género" value={uploadForm.genre} onChange={(e) => setUploadForm({...uploadForm, genre: e.target.value})} required />
              <textarea placeholder="Vista previa" value={uploadForm.preview} onChange={(e) => setUploadForm({...uploadForm, preview: e.target.value})} required />
              <input type="text" placeholder="Trailer (opcional)" value={uploadForm.trailer} onChange={(e) => setUploadForm({...uploadForm, trailer: e.target.value})} />
              <input type="number" placeholder="Precio $" value={uploadForm.price} onChange={(e) => setUploadForm({...uploadForm, price: e.target.value})} required />

              <label>Portada (imagen)</label>
              <input type="file" accept="image/*" onChange={(e) => setUploadForm({...uploadForm, cover: e.target.files[0]})} required />

              <label>Archivo PDF</label>
              <input  type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" onChange={(e) => setUploadForm({...uploadForm, pdf: e.target.files[0]})} required />

              <button type="submit" disabled={uploading}>
                {uploading ? 'Subiendo...' : '📤 Subir Libro'}
              </button>
            </form>
            {message && <p className="upload-message">{message}</p>}

      {loading && (
        <div className="modal-loading">
          <div className="spinner"></div>
          <p>📚 Subiendo libro, por favor espere...</p>
        </div>
      )}
            <button onClick={() => setShowUploadModal(false)}>❌ Cancelar</button>
          </div>
        </div>       
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="sad-crown">📘💧</div>
          <h3>¿Estás seguro?</h3>
          <p>
            Vas a <strong>eliminar este libro</strong>
          </p>
          <div className="modal-buttons">
            <button onClick={handleDelete} className="confirm">Sí</button>
            <button onClick={() => setShowDeleteModal(false)} className="cancel">Cancelar</button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default AdminBookList;
