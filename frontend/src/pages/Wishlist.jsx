// src/pages/Wishlist.jsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import { useMessages } from '../context/MessageContext';
import BookPreviewCard from "../components/BookPreviewCard";
import MessageModal from "../components/MessageModal";


const API_URL = import.meta.env.VITE_API_URL;

const Wishlist = () => {
  const { user } = useUser();
    const [wishlist, setwishlist] = useState([]);
  const { fetchMessages } = useMessages();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  useEffect(() => {
    const fetchwishlist = async () => {
      const res = await fetch(`${API_URL}/api/user/${user._id}/wishlist`);
      const data = await res.json();
      setwishlist(data);
    };
    if (user) fetchwishlist();
  }, [user]);

  const openModal = (bookId = null) => {
    setSelectedBookId(bookId); 
    setModalOpen(true);
  };


  if (!user) {
    return <p>Cargando...</p>;
  }

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
              onMessageRequest={() => openModal(book._id)} 
              onRemovedFromWishlist={() =>
              setwishlist(prev => prev.filter(b => b._id !== book._id))
            }
            />
          ))
        )}
      </div>

      <p>¿Deseas pedir un deseo a la Biblioteca el Colibrí?</p>
      <button className="buton-deseo" onClick={() => openModal()}>Pedir deseo</button>
      
      <MessageModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        userId={user?._id}  
        bookId={selectedBookId} 
      />
    </div>
  );
};


export default Wishlist;
