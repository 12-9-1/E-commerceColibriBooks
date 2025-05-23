// src/pages/Library.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import '../styles/BookPreviewCard.css';
import BookPreviewCard from "../components/BookPreviewCard";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

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
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);



  const booksPerPage = 8;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);


  const fetchBooks = async (query = "") => {
    try {
      const res = await fetch(`${API_URL}/api/books${query}`);
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

  useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title") || "";
  const author = searchParams.get("author") || "";
  const genre = searchParams.get("genre") || "";

  setSearchTitle(title);
  setSearchAuthor(author);
  setSearchGenre(genre);

  const query = searchParams.toString() ? `/search?${searchParams}` : "";
  fetchBooks(query);
}, [location.search]);


  const isDataReady = userLoaded && Array.isArray(favorites) && Array.isArray(wishlist);

if (!isDataReady) return <div className="loading">Cargando libros...</div>;


  return (
    <div className="home">
      <div className="book-section">
        <h2>Libros</h2>
        <div className="book-grid">
          {currentBooks.map((book) => (
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
      <div className="pagination">
  <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
    ◀ Anterior
  </button>
  <span>Página {currentPage} de {totalPages}</span>
  <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
    Siguiente ▶
  </button>
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
