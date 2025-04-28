import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logoColibri from "../assets/logoColibri.png"; // fijate que sea .png
import { useUser } from "../context/UserContext";
import BookPreviewCard from "../components/BookPreviewCard"; // ruta correcta


const Home = () => {
  const { user, userLoaded } = useUser();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

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


  if (!userLoaded) return null; // o un loader si querés

  return (
    <div className="home-container">
    <div className="home-hero">
      <img src={logoColibri} alt="Colibrí de Letras" className="logo" />
      <h1>¡Bienvenido a Estación El Colibrí!</h1>
      <p>Boletos para mundos infinitos y reconstrucción infinita. 📖✨</p>
      <div className="home-buttons">
        {user ? (
          <button onClick={() => navigate("/libros")}>Ver mis libros</button>
        ) : (
          <button onClick={() => navigate("/login")}>Iniciar sesión</button>
        )}
        <button onClick={() => alert("Explorar libros aún no implementado 😅")}>Explorar libros</button>
      </div>
    </div>
  
    <div className="book-section">
      <h2>Libros destacados</h2>
      <div className="book-grid">
        {books.map((book) => (
          <BookPreviewCard key={book._id} title={book.title} cover={book.cover} price={book.price} />
        ))}
      </div>
    </div>
  </div>  
  );
};


export default Home;
