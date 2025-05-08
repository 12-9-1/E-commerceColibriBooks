// src/components/BookPreviewCard.jsx
import { useEffect, useState } from "react";
import "../styles/BookPreviewCard.css";
import { useUser } from "../context/UserContext";

const BookPreviewCard = ({
  title, cover, price, pdf, trailer, preview,
  onShowInfo, onShowCart, _id,
  isFavorite: propIsFavorite = false,
  isWishlisted: propIsWishlisted = false,
  onRemovedFromFavorites,
}) => {
  const { updateFavorites, updateWishlist } = useUser();

  const [isFavorite, setIsFavorite] = useState(propIsFavorite);
  const [isWishlisted, setIsWishlisted] = useState(propIsWishlisted);
  const [animateFav, setAnimateFav] = useState(false);
  const [animateWish, setAnimateWish] = useState(false);

  // 🧠 Esta parte es CLAVE para que se mantenga al recargar
  useEffect(() => {
    setIsFavorite(propIsFavorite);
  }, [propIsFavorite]);

  useEffect(() => {
    setIsWishlisted(propIsWishlisted);
  }, [propIsWishlisted]);

  const toggleFavorite = async () => {
    setAnimateFav(true);
    await updateFavorites(_id, isFavorite ? "remove" : "add");
    setIsFavorite(!isFavorite);
    setTimeout(() => setAnimateFav(false), 300);

    if (isFavorite && typeof onRemovedFromFavorites === "function") {
      onRemovedFromFavorites();
    }
  };

  const toggleWishlist = async () => {
    await updateWishlist(_id, isWishlisted ? "remove" : "add");
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="book-card">
      <div className="image-container">
        <img src={cover} alt={`Portada de ${title}`} className="book-cover" />
        <button
          onClick={toggleFavorite}
          className={`btn-fav ${isFavorite ? "favorited" : ""} ${animateFav ? "heartbeat" : ""}`}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="book-info">
        <h3>{title}</h3>
        <p>${price}</p>
        <div className="buttons-book">
          <button onClick={onShowCart} className="btn-cart">🛒</button>
          <button onClick={onShowInfo} className="btn-info">ℹ️</button>
          <button
            onClick={async () => {
              setAnimateWish(true);
              await toggleWishlist();
              setTimeout(() => setAnimateWish(false), 400);
            }}
            className={`btn-wishlist ${animateWish ? "glow" : ""}`}
          >
            {isWishlisted ? "⭐" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookPreviewCard;
