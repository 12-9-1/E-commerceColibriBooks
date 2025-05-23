// src/pages/AboutMe.jsx
import React from "react";
import colibriImg from "../assets/logoColibri2.png"; 
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../styles/AboutMe.css"; 

const AboutMe = () => {
  return (
    <motion.section
      className="max-w-5xl mx-auto p-6 my-12 bg-white shadow-xl rounded-3xl flex flex-col md:flex-row items-center gap-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
<div className="about-me">
  <h2>Mi nombre es Lia Lisbet Costilla</h2>

  <div className="intro">
    <img src={colibriImg} alt="Lia Lisbet Costilla" />
    <p>
          Soy la única persona detrás de este proyecto. Empecé a estudiar
          programación porque siempre me interesó la tecnología. Así llegué a
          RollingCode, donde aprendí muchísimo y desarrollé esta web como parte
          de mi proyecto final.
          También soy escritora de novelas, y noté que muchas librerías online
          no ofrecían una experiencia completa. Por eso creé{" "}
          <strong>Librería El Colibrí</strong>: una plataforma con una mejor
          vista, más herramientas y una navegación clara y útil para lectores y
          autores.
        </p>
        </div>
         <p>
            “Ya que los libros no solo se leen, también se viven. Y venderlos debería ser parte de esa experiencia.” — Lia
          </p>
        {/* Redes sociales */}
         <div className="mt-6 flex justify-center md:justify-start gap-4">
          <a
            href="https://github.com/12-9-1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-black text-xl"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/tu-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 text-xl"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:tucorreo@example.com"
            className="text-red-500 hover:text-red-700 text-xl"
            title="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMe;
