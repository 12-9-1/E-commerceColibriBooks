// src/components/MessageModal.jsx
import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

const MessageModal = ({ isOpen, onRequestClose, userId, bookId }) => {
  const [mensaje, setMensaje] = useState("");

  const handleSend = async () => {
    if (!mensaje.trim()) return toast.error("Escribe un mensaje");
    await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userId, book: bookId, content: mensaje }),
    });
    toast.success("Mensaje enviado al administrador");
    setMensaje("");
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2>Enviar mensaje al administrador</h2>
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe tu mensaje aquí..."
      />
      <button onClick={handleSend}>Enviar</button>
    </Modal>
  );
};

export default MessageModal;
