// src/pages/Library.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import '../styles/AdminBookDashboard.css';
import BookPreviewCard from "../components/BookPreviewCard";

const Library = () => {
  const { user, userLoaded, favorites, wishlist } = useUser();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); 
  const [cartBook, setCartBook] = useState(null);         
  const { addToCart } = useCart();
  const [showPreview, setShowPreview] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchGenre, setSearchGenre] = useState("");

  const fetchBooks = async (query = "") => {
    try {
      const res = await fetch(`http://localhost:3000/api/books${query}`);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error al traer libros:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTitle) params.append("title", searchTitle);
    if (searchAuthor) params.append("author", searchAuthor);
    if (searchGenre) params.append("genre", searchGenre);
    const query = params.toString() ? `/search?${params}` : "";
    fetchBooks(query);
  };

  const isDataReady = userLoaded && Array.isArray(favorites) && Array.isArray(wishlist);

if (!isDataReady) return <div className="loading">Cargando libros...</div>;


  return (
    <div className="home">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por título"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por autor"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
        <select value={searchGenre} onChange={(e) => setSearchGenre(e.target.value)}>
          <option value="">Todos los géneros</option>
          <option value="fantasía">Fantasía</option>
          <option value="ciencia ficción">Ciencia ficción</option>
          <option value="romance">Romance</option>
          <option value="terror">Terror</option>
        </select>
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className="book-section">
        <h2>Libros</h2>
        <div className="book-grid">
          {books.map((book) => (
            <BookPreviewCard
              key={book._id}
              author={book.author}
              genre={book.genre}
              title={book.title}
              cover={book.cover}
              price={book.price}
              pdf={book.pdf}
              trailer={book.trailer}
              preview={book.preview}
              onShowInfo={() => setSelectedBook(book)}
              onShowCart={() => setCartBook(book)}
              _id={book._id}
              isFavorite={favorites.includes(book._id)}
              isWishlisted={wishlist.includes(book._id)}
            />
          ))}
        </div>
      </div>

     {/* Modal Info Mejorado */}
{selectedBook && (
  <div className="modal-overlay">
    <div className="modal horizontal-modal">
      <h3>Información del libro</h3>
      <div className="book-modal-content">
        {/* Columna izquierda - Portada */}
        <img
          src={selectedBook.cover}
          alt={selectedBook.title}
          className="book-cover-large"
        />

        {/* Columna derecha - Info */}
        <div className="book-info-side">
          <h2>{selectedBook.title}</h2>
          <p><strong>Autor:</strong> {selectedBook.author}</p>
          <p><strong>Género:</strong> {selectedBook.genre}</p>
          <p><strong>Formato:</strong> {selectedBook.pdf ? "PDF y Papel" : "Solo Papel"}</p>
          <p><strong>Precio:</strong> ${selectedBook.price}</p>
          <button className="btn-description" onClick={() => setShowDescription(true)}
          >
            Ver descripción
          </button>
          <div className="modal-buttons">
            <button className="btn-confirm" onClick={() => {
              addToCart(selectedBook);
              setSelectedBook(null);
              setShowPreview(false);
            }}>
              Agregar al carrito
            </button>

            {selectedBook.trailer && (
              <button className="btn-preview" onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? "Ocultar vista previa" : "Ver vista previa"}
              </button>
            )}

            <button onClick={() => {
              setSelectedBook(null);
              setShowPreview(false);
            }} className="btn-cancel">
              Cerrar
            </button>
          </div>
        </div>
      </div>

      
{showDescription && selectedBook && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Descripción de "{selectedBook.title}"</h3>
      <p className="book-description2" style={{ whiteSpace: 'pre-line' }}>
        {selectedBook.preview}
      </p>
      <div className="modal-buttons">
        <button className="btn-cancel" onClick={() => setShowDescription(false)}>
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}

      {/* Vista previa opcional */}
      {showPreview && selectedBook.trailer && (
        <iframe
          width="100%"
          height="300"
          src={selectedBook.trailer}
          title="Vista previa del libro"
          frameBorder="0"
          allowFullScreen
          style={{ marginTop: '1rem' }}
        />
      )}
    </div>
  </div>
)}

      {/* Modal Carrito */}
      {cartBook && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Agregar al carrito?</h3>
            <img src={cartBook.cover} alt={cartBook.title} />
            <p>{cartBook.title}</p>
            <p>{cartBook.author}</p>
            <p>{cartBook.genre}</p>
            <p>${cartBook.price}</p>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  addToCart(cartBook);
                  setCartBook(null);
                }}
                className="btn-confirm"
              >
                Sí
              </button>
              <button onClick={() => setCartBook(null)} className="btn-cancel">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
