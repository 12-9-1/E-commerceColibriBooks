// src/pages/Wishlist.jsx
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import BookPreviewCard from "../components/BookPreviewCard";

const Wishlist = () => {
  const { user } = useUser();
  const [wishlist, setwishlist] = useState([]);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");



    useEffect(() => {
    const fetchwishlist = async () => {
      const res = await fetch(`http://localhost:3000/api/user/${user._id}/wishlist`);
      const data = await res.json();
      setwishlist(data);
    };
  

     if (user) fetchwishlist();
  }, [user]);

  return (
    <div className="home">
      <h2>Mi Lista de Deseos</h2>
      <div className="book-grid">
        {wishlist.length === 0 ? (
          <p>No hay libros en tu lista de deseos.</p>
        ) : (
          wishlist.map((book) => (
            <BookPreviewCard
            key={book._id}
            title={book.title}
            cover={book.cover}
            price={book.price}
            trailer={book.trailer}
            preview={book.preview}
            _id={book._id}
            isWishlisted={true}
          />          
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
