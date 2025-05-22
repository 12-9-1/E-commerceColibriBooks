import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext"; 
import "../styles/UserMessages.css";

const UserMessages = () => {
  const { user } = useUser(); 
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (!user?._id) return;
      const res = await fetch(`${API_URL}/api/message/user/${user._id}`);
      const data = await res.json();
      setMessages(data);
    };

    fetchUserMessages();
  }, [user]);

  return (
    <div className="user-messages">
      <h2>Mis mensajes</h2>
      {messages.length === 0 && <p>No has enviado mensajes aún.</p>}

      {messages.map((msg) => (
        <div key={msg._id} className="message-card">
          <p><strong>Mensaje:</strong> {msg.content}</p>
          <p><strong>Estado:</strong> {msg.status}</p>
          {msg.book && <p><strong>Libro:</strong> {msg.book.title}</p>}

          {msg.adminResponse ? (
            <div className="admin-response">
              <strong>Respuesta del administrador:</strong>
              <p>{msg.adminResponse}</p>
            </div>
          ) : (
            <em>El administrador aún no ha respondido.</em>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserMessages;
