// src/pages/AdminInbox.jsx
import { useMessages } from "../context/MessageContext";
import { useState } from "react";
import Modal from "react-modal";

const AdminInbox = () => {
  const { messages, fetchMessages } = useMessages();
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRespond = async () => {
    await fetch(`http://localhost:3000/api/messages/${selectedMsg._id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "respondido" }),
    });
    setModalOpen(false);
    fetchMessages();
  };

  return (
    <div className="admin-inbox">
      <h2>Bandeja de mensajes</h2>
      {messages.map((msg) => (
        <div key={msg._id} onClick={() => { setSelectedMsg(msg); setModalOpen(true); }}>
          <p><strong>{msg.user.nickname}</strong>: {msg.content}</p>
          <span className={`status ${msg.status}`}>{msg.status}</span>
        </div>
      ))}

      {selectedMsg && (
        <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
          <h3>Mensaje de {selectedMsg.user.nickname}</h3>
          <p>{selectedMsg.content}</p>
          <button onClick={handleRespond}>Marcar como respondido</button>
        </Modal>
      )}
    </div>
  );
};

export default AdminInbox;
