// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === book._id);
      if (existing) {
        return prev.map((item) =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

const updateCartItemFormat = (bookId, newFormat) => {
  setCartItems(prev =>
    prev.map(item =>
      item._id === bookId ? { ...item, format: newFormat } : item
    )
  );
};

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, clearCart, removeFromCart, updateCartItemFormat }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
