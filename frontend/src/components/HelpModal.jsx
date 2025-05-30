import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/FloatingHelpButton.css";


const HelpModal = ({ isOpen, onClose }) => {
  const [language, setLanguage] = useState("es");
  const [openIndex, setOpenIndex] = useState(null);

  if (!isOpen) return null;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  const helpContent = {
    es: {
      title: "Ayuda",
      sections: [
        { title: "¿Qué es Colibrí Books?", content: "Colibrí Books es una librería en línea donde podés comprar libros digitales y físicos." },
        { title: "¿Cómo creo una cuenta?", content: "Hacé clic en 'Iniciar sesión / Registro' en la esquina superior derecha y completá tus datos." },
        { title: "¿Cómo agrego libros al carrito?", content: "Desde la biblioteca, hacé clic en el ícono del carrito en cada libro." },
        { title: "¿Dónde veo mis compras?", content: "Vas a 'Mis Compras' desde el menú para ver el historial y detalles." },
      ],
    },
    en: {
      title: "Help",
      sections: [
        { title: "What is Colibrí Books?", content: "Colibrí Books is an online bookstore where you can buy digital and physical books." },
        { title: "How do I create an account?", content: "Click on 'Login / Register' in the top right and fill in your details." },
        { title: "How do I add books to the cart?", content: "In the library, click the cart icon on any book to add it." },
        { title: "Where can I see my purchases?", content: "Go to 'My Purchases' in the menu to view your history and details." },
      ],
    },
  };

  return (
    <div className="modal-upload">
      <div className="modal-content">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <button onClick={onClose} className="buttonX">×</button>

          <h2 className="text-2xl font-bold mb-2">{helpContent[language].title}</h2>

          <div className="language-buttons">
            <button onClick={() => setLanguage("es")}>ES</button>
            <button onClick={() => setLanguage("en")}>EN</button>
          </div>

          <div>
            {helpContent[language].sections.map(({ title, content }, i) => (
              <div key={i} className="help-section">
                <button onClick={() => toggle(i)}>
                  {title}
                  <span>{openIndex === i ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="answer"
                    >
                      {content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpModal;
