// src/pages/Favorites.jsx
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import BookPreviewCard from "../components/BookPreviewCard";

const Favorites = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch(`${API_URL}/api/user/${user._id}/favorites`);
      const data = await res.json();
      setFavorites(data);
    };

    if (user) fetchFavorites();
  }, [user]);

  return (
    <div className="home">
      <h2>Mis Favoritos</h2>
      <div className="book-grid">
        {favorites.map(book => (
          <BookPreviewCard
          key={book._id}
          {...book}
          isFavorite={true}
          onRemovedFromFavorites={() =>
            setFavorites(prev => prev.filter(b => b._id !== book._id))
          }
        />        
        ))}
      </div>
    </div>
  );
};

export default Favorites;
