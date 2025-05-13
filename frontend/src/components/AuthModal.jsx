import { useState } from "react";
import Modal from "react-modal";
import Login from "../pages/Login";
import Register from "../pages/Register";

Modal.setAppElement("#root");

const AuthModal = ({ isOpen, onRequestClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Auth Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      {isLogin ? (
        <Login closeModal={onRequestClose} onToggleForm={toggleForm} />
      ) : (
        <Register closeModal={onRequestClose} onToggleForm={toggleForm} />
      )}
    </Modal>
  );
};

export default AuthModal;
