// src/pages/Library.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import '../styles/AdminBookDashboard.css';
import BookPreviewCard from "../components/BookPreviewCard";

const Library = () => {
  const { user, userLoaded } = useUser();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // para modal info
  const [cartBook, setCartBook] = useState(null);         // para modal carrito

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/books");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Error al traer libros:", error);
      }
    };

    fetchBooks();
  }, []);

  if (!userLoaded) return null;

  return (
    <div className="home-container">
      <div className="book-section">
        <h2>Libros destacados</h2>
        <div className="book-grid">
          {books.map((book) => (
            <BookPreviewCard
              key={book._id}
              title={book.title}
              cover={book.cover}
              price={book.price}
              pdf={book.pdf}
              trailer={book.trailer}
              preview={book.preview}
              onShowInfo={() => setSelectedBook(book)}
              onShowCart={() => setCartBook(book)}
            />
          ))}
        </div>
      </div>

      {/* Modal Info */}
      {selectedBook && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Información del libro</h3>
            <p><strong>Formato:</strong> {selectedBook.pdf ? "PDF y Papel" : "Solo Papel"}</p>
            <p>{selectedBook.preview}</p>
            {selectedBook.trailer && (
              <a href={selectedBook.trailer} target="_blank" rel="noreferrer">
                Ver vista previa del libro
              </a>
            )}
            <div className="modal-buttons">
              <button onClick={() => setSelectedBook(null)} className="btn-cancel">Cerrar</button>
            </div>
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
            <p>${cartBook.price}</p>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  console.log("Libro agregado al carrito:", cartBook.title);
                  setCartBook(null);
                }}
                className="btn-confirm"
              >
                Sí
              </button>
              <button onClick={() => setCartBook(null)} className="btn-cancel">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
