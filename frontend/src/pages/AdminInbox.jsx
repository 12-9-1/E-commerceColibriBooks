// src/pages/AdminInbox.jsx
import { useMessages } from "../context/MessageContext";
import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "../styles/AdminInbox.css"; 


const API_URL = import.meta.env.VITE_API_URL;

Modal.setAppElement('#root'); 

const AdminInbox = () => {
  const { messages, fetchMessages } = useMessages();
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [respuesta, setRespuesta] = useState("");

  const handleSendResponse = async () => {
    if (!respuesta.trim()) return toast.error("Escribe una respuesta");
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/message/${selectedMsg._id}/respond`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: respuesta }),
      });

      if (!res.ok) throw new Error("Error al responder");

      toast.success("Respuesta enviada");
      setRespuesta("");
      setModalOpen(false);
      fetchMessages();
    } catch (error) {
      toast.error("Error al enviar respuesta");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await fetch(`${API_URL}/api/message/${selectedMsg._id}`, {
        method: "DELETE",
      });
      toast.success("Mensaje eliminado");
      setModalOpen(false);
      fetchMessages();
    } catch (error) {
      toast.error("Error al eliminar mensaje");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="admin-inbox">
      <h2>Bandeja de mensajes</h2>

      {messages.length === 0 && <p>No hay mensajes</p>}

      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`message-item ${msg.status}`}
          onClick={() => {
            setSelectedMsg(msg);
            setModalOpen(true);
          }}
        >
          <p><strong>{msg.user?.nickname || "Usuario"}</strong>: {msg.content}</p>
          <span className="status-label">{msg.status}</span>
        </div>
      ))}

      <Modal
  isOpen={modalOpen}
  onRequestClose={() => {
    setModalOpen(false);
    setRespuesta("");
  }}
  className="modal"
  overlayClassName="modal-upload"
>
  <div className="modal-content">
  <h3>Mensaje de: {selectedMsg?.user?.nickname}</h3>
  <p><strong>Libro:</strong> {selectedMsg?.book?.title || "General"}</p>
  <p>{selectedMsg?.content}</p>

  {selectedMsg?.status === "respondido" && selectedMsg?.adminResponse ? (
    <div className="admin-response">
      <strong>Respuesta enviada:</strong>
      <p>{selectedMsg.adminResponse}</p>
    </div>
  ) : (
    <div className="response-form">
      <textarea
        placeholder="Escribe tu respuesta aquí..."
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        rows={4}
      />
      <button onClick={handleSendResponse} disabled={loading}>
        📧 Enviar respuesta
      </button>
    </div>
  )}

  <div className="modal-actions">
    <button onClick={() => setShowConfirmDelete(true)} disabled={loading}>
  🗑️ Eliminar mensaje
  </button>
    <button onClick={() => setModalOpen(false)}>❌ Cerrar</button>
  </div>
</div>
</Modal>

<Modal
  isOpen={showConfirmDelete}
  onRequestClose={() => setShowConfirmDelete(false)}
  className="modal"
  overlayClassName="modal-upload"
>
  <div className="modal-content">
    <h3>¿Eliminar mensaje?</h3>
    <p style={{ fontSize: "2rem" }}>📜💧</p>
    <p>Esta acción no se puede deshacer.</p>

    <div className="modal-actions">
      <button
        onClick={async () => {
          try {
            setLoading(true);
            await fetch(`${API_URL}/api/message/${selectedMsg._id}`, {
              method: "DELETE",
            });
            toast.success("📜💧 Mensaje eliminado");
            setShowConfirmDelete(false);
            setModalOpen(false);
            fetchMessages();
          } catch (error) {
            toast.error("Error al eliminar mensaje");
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
      >
        ✅ Sí, eliminar
      </button>

      <button onClick={() => setShowConfirmDelete(false)}>❌ Cancelar</button>
    </div>
  </div>
</Modal>

    </div>
  );
};

export default AdminInbox;
