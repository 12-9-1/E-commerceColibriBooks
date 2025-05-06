// src/components/BookPreviewCard.jsx
import "../styles/BookPreviewCard.css";

const BookPreviewCard = ({ title, cover, price, onShowInfo, onShowCart }) => {
  return (
    <div className="book-card">
      <img src={cover} alt={`Portada de ${title}`} className="book-cover" />
      <div className="book-info">
        <h3>{title}</h3>
        <p>${price}</p>
        <div className="book-buttons">
          <button onClick={onShowCart} className="btn-cart">🛒</button>
          <button onClick={onShowInfo} className="btn-info">ℹ️</button>
        </div>
      </div>
    </div>
  );
};

export default BookPreviewCard;
