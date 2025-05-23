// src/components/MessageModal.jsx
import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import BookPreviewCard from "../components/BookPreviewCard";


const API_URL = import.meta.env.VITE_API_URL;

const MessageModal = ({ isOpen, onRequestClose, userId, bookId }) => {
  const [mensaje, setMensaje] = useState("");

  const handleSend = async () => {
    if (!mensaje.trim()) return toast.error("Escribe un mensaje");
    await fetch(`${API_URL}/api/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userId, book: bookId, content: mensaje }),
    });
    toast.success("Mensaje enviado al administrador");
    setMensaje("");
    onRequestClose();
  };

  return (
    <Modal className="modal-upload" isOpen={isOpen} onRequestClose={onRequestClose} >
      <div className="modal-content">

      <h2>Enviar mensaje al administrador</h2>
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe tu mensaje aquí..."
      />
      <button onClick={handleSend} className="btn-close">Enviar</button>
        <button
          onClick={onRequestClose}
          className="btn-close"
        >
          Cerrar Ventana
        </button>
      </div>
    </Modal>
  );
};

export default MessageModal;
