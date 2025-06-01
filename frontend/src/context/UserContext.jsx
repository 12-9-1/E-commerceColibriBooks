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
  const validateUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUserLoaded(true);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Token inválido");
      }

      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error("Error validando token:", error);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setUserLoaded(true);
    }
  };

  validateUser();
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

