// context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

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
    const res = await fetch(`${API_URL}/api/user/${user._id}/favorites`);
    const data = await res.json();
    const ids = data.map(book => book._id);
    setFavorites(ids);
  };


  const fetchUserWishlist = async () => {
    if (!user) return;
    const res = await fetch(`${API_URL}/api/user/${user._id}/wishlist`);
    const data = await res.json();
    const ids = data.map(book => book._id);
    setWishlist(ids); 
  };

  const updateFavorites = async (bookId, action) => {
    if (!user) return;
    const method = action === "add" ? "POST" : "DELETE";
    await fetch(`${API_URL}/api/user/${user._id}/favorites/${bookId}`, {
      method,
    });
    fetchUserFavorites(); 
  };

  const updateWishlist = async (bookId, action) => {
    if (!user) return;
    const method = action === "add" ? "POST" : "DELETE";
    await fetch(`${API_URL}/api/user/${user._id}/wishlist/${bookId}`, {
      method,
    });
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

