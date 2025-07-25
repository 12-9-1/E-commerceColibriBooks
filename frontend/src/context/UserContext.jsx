// context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("Usuario cargado desde localStorage:", parsedUser);
      }
    } catch (error) {
      console.error("Error al parsear el usuario del localStorage:", error);
      localStorage.removeItem("user");
    }
    setUserLoaded(true);
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserFavorites();
      fetchUserWishlist();
    }
  }, [user]);

  const fetchUserFavorites = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/api/user/${user._id}/favorites`);
      const data = await res.json();
      if (Array.isArray(data)) {
        const ids = data.map(book => book._id);
        setFavorites(ids);
      } else {
        console.warn("Respuesta inválida de favoritos:", data);
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      setFavorites([]);
    }
  };

  const fetchUserWishlist = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/api/user/${user._id}/wishlist`);
      const data = await res.json();
      if (Array.isArray(data)) {
        const ids = data.map(book => book._id);
        setWishlist(ids);
      } else {
        console.warn("Respuesta inválida de wishlist:", data);
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error al obtener wishlist:", error);
      setWishlist([]);
    }
  };

  const updateFavorites = async (bookId, action) => {
    if (!user) return;
    const method = action === "add" ? "POST" : "DELETE";
    await fetch(`${API_URL}/api/user/${user._id}/favorites/${bookId}`, { method });
    fetchUserFavorites();
  };

  const updateWishlist = async (bookId, action) => {
    if (!user) return;
    const method = action === "add" ? "POST" : "DELETE";
    await fetch(`${API_URL}/api/user/${user._id}/wishlist/${bookId}`, { method });
    fetchUserWishlist();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userLoaded,
        favorites,
        wishlist,
        updateFavorites,
        updateWishlist,
        fetchUserFavorites,
        fetchUserWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
