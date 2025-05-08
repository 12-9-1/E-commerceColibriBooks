// src/pages/Wishlist.jsx
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import BookPreviewCard from "../components/BookPreviewCard";

const Wishlist = () => {
  const { wishlist, fetchUserWishlist, userLoaded } = useUser();

  useEffect(() => {
    fetchUserWishlist();
  }, []);

  if (!userLoaded) return null;

  return (
    <div className="wishlist-page">
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
