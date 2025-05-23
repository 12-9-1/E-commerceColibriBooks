import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const helpContent = {
  es: {
    title: "Ayuda",
    sections: [
      {
        title: "¿Qué es Colibrí Books?",
        content: "Colibrí Books es una librería en línea donde podés comprar libros digitales y físicos.",
      },
      {
        title: "¿Cómo creo una cuenta?",
        content: "Hacé clic en 'Iniciar sesión / Registro' en la esquina superior derecha y completá tus datos.",
      },
      {
        title: "¿Cómo agrego libros al carrito?",
        content: "Desde la biblioteca, hacé clic en el ícono del carrito en cada libro.",
      },
      {
        title: "¿Dónde veo mis compras?",
        content: "Vas a 'Mis Compras' desde el menú para ver el historial y detalles.",
      },
    ],
  },
  en: {
    title: "Help",
    sections: [
      {
        title: "What is Colibrí Books?",
        content: "Colibrí Books is an online bookstore where you can buy digital and physical books.",
      },
      {
        title: "How do I create an account?",
        content: "Click on 'Login / Register' in the top right and fill in your details.",
      },
      {
        title: "How do I add books to the cart?",
        content: "In the library, click the cart icon on any book to add it.",
      },
      {
        title: "Where can I see my purchases?",
        content: "Go to 'My Purchases' in the menu to view your history and details.",
      },
    ],
  },
};

const HelpModal = ({ isOpen, onClose }) => {
  const [language, setLanguage] = useState("es");
  const [openIndex, setOpenIndex] = useState(null); // índice del item abierto

  if (!isOpen) return null;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="modal-upload">
      <div className="modal-content">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-xl p-6 max-w-lg w-full shadow-xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-xl font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold mb-4 text-center">
            {helpContent[language].title}
          </h2>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setLanguage("es")}
              className="border px-3 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              ES
            </button>
            <button
              onClick={() => setLanguage("en")}
              className="border px-3 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              EN
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {helpContent[language].sections.map(({ title, content }, i) => (
              <div key={i} className="border-b border-zinc-300 dark:border-zinc-700 pb-3">
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left flex justify-between items-center font-semibold text-lg hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {title}
                  <span className="ml-2 text-xl">
                    {openIndex === i ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden", color: "#2C3E50" }}
                      className="mt-2 text-base"
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
