// src/context/MessageContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/message");
      const data = await res.json();
      setMessages(data);
      setUnreadCount(data.filter(msg => msg.status === "pendiente").length);
    } catch (error) {
      console.error("Error al obtener mensajes", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <MessageContext.Provider value={{ messages, unreadCount, fetchMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
