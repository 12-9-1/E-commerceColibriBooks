import { useState } from "react";
import Modal from "react-modal";
import MessageModal from "./MessageModal";

const ContactOptionsModal = ({ isOpen, onRequestClose, userId, bookId }) => {
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleCloseAll = () => {
    setShowMessageModal(false);
    onRequestClose();
  };

const openGmail = () => {
  const email = "lisbetcostilla@gmail.com";
  const subject = encodeURIComponent("Consulta desde Colibrí de Letras");
  const body = encodeURIComponent("Hola, quisiera hacer una consulta...");
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  window.open(gmailUrl, "_blank");
  onRequestClose();
};


  if (showMessageModal) {
    return (
      <MessageModal
        isOpen={showMessageModal}
        onRequestClose={() => setShowMessageModal(false)}
        userId={userId}
        bookId={bookId}
      />
    );
  }

  return (
    <Modal
      className="modal-upload"
      isOpen={isOpen}
      onRequestClose={handleCloseAll}
      ariaHideApp={false}
    >
      <div className="modal-content">
        <h2>¿Cómo quieres contactarnos?</h2>
        <button className="btn" onClick={() => setShowMessageModal(true)}>
          Enviar mensaje por el sitio
        </button>
        <button className="btn" onClick={openGmail}>
          Enviar email por Gmail
        </button>
        <button className="btn btn-close" onClick={handleCloseAll}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ContactOptionsModal;
