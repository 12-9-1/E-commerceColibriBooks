// src/components/BookPreviewCard.jsx
import "../styles/BookPreviewCard.css"; // Importa el CSS para el componente

const BookPreviewCard = ({ title, cover, price }) => {
  return (
    <div className="book-card">
      <img src={cover} alt={`Portada de ${title}`} className="book-cover" />
      <div className="book-info">
        <h3>{title}</h3>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default BookPreviewCard;
