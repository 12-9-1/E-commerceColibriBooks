import Modal from "react-modal";
import { useMessages } from "../context/MessageContext";
import "../styles/UserMessages.css";
import { useNavigate } from "react-router-dom";


const MessagesPreviewModal = ({ isOpen, onRequestClose, isAdmin }) => {
  const { messages } = useMessages();
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Mensajes recientes</h2>
      {messages.length === 0 ? (
        <p>No hay mensajes aún.</p>
      ) : (
        <div className="messages-preview-list">
          {messages.slice(0, 5).map((msg) => (
  <div key={msg._id} className={`preview-message ${msg.status}`}>
    <div className="message-header">
      <strong>{msg.user?.nickname || "Usuario"}:</strong>
      <span className={`message-status ${msg.status}`}>
        {msg.status === "respondido" ? "✅ Respondido" : "✉️ Pendiente"}
      </span>
    </div>
    <p>{msg.content}</p>
    
    {msg.adminResponse && (
      <div className="admin-response">
        <strong>Respuesta:</strong>
        <p>{msg.adminResponse}</p>
      </div>
    )}
  </div>
))}
</div>
      )}

      <div className="modal-buttons">
        <button
          className="btn-confirm"
          onClick={() => {
            onRequestClose();
            navigate(isAdmin ? "/admininbox" : "/usermessages");
          }}
        >
          📬 Ver todos / Responder
        </button>
        <button className="btn-cancel" onClick={onRequestClose}>❌ Cerrar</button>
      </div>
    </Modal>
  );
};

export default MessagesPreviewModal;
