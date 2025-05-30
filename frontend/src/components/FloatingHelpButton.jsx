// src/components/FloatingHelpButton.jsx
import { FaQuestionCircle } from "react-icons/fa";
import HelpModal from "./HelpModal";
import { useState } from "react";
import "../styles/FloatingHelpButton.css";

const FloatingHelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="floating-help-btn"
        aria-label="Ayuda"
        title="Ayuda"
      >
        <FaQuestionCircle size={26} />
      </button>


    <HelpModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default FloatingHelpButton;
