// src/context/MessageContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const { user } = useUser(); 
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessages = async () => {
    if (!user) return;

    const endpoint = user.role === "admin"
      ? "${API_URL}/api/message"
      : `${API_URL}/api/message/user/${user._id}`;

    const res = await fetch(endpoint);
    const data = await res.json();
    setMessages(data);

    const unread = data.filter((m) => m.status === "pendiente").length;
    setUnreadCount(unread);
  };

  useEffect(() => {
    fetchMessages();
  }, [user]); 

  return (
    <MessageContext.Provider value={{ messages, unreadCount, fetchMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
