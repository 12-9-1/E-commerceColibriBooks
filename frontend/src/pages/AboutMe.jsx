import React, { useState } from "react";
import colibriImg from "../assets/logoColibri2.png";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../styles/AboutMe.css";

const AboutMe = () => {
  const [lang, setLang] = useState("es");

  return (
    <motion.section
      className="max-w-5xl mx-auto p-6 my-12 bg-white shadow-xl rounded-3xl flex flex-col md:flex-row items-center gap-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="about-me">
        {/* Botón para cambiar idioma */}
        <div className="text-right w-full mb-4">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="buton-es-en"
          >
            {lang === "es" ? "Switch to English" : "Cambiar a Español"}
          </button>
        </div>

        <h2>{lang === "es" ? "Mi nombre es Lia Lisbet Costilla" : "My name is Lia Lisbet Costilla"}</h2>

        <div className="intro">
          <img src={colibriImg} alt="Lia Lisbet Costilla" />
          <p>
            {lang === "es" ? (
              <>
                Soy la única persona detrás de este proyecto. Empecé a estudiar programación porque siempre me interesó la tecnología. Así llegué a RollingCode, donde aprendí muchísimo y desarrollé esta web como parte de mi proyecto final.
                También soy escritora de novelas, y noté que muchas librerías online no ofrecían una experiencia completa. Por eso creé <strong>Librería El Colibrí</strong>: una plataforma con una mejor vista, más herramientas y una navegación clara y útil para lectores y autores.
              </>
            ) : (
              <>
                I'm the only person behind this project. I started learning programming because I've always been interested in technology. That led me to RollingCode, where I learned a lot and built this website as my final project.
                I'm also a novelist, and I noticed that many online bookstores didn’t offer a complete experience. That’s why I created <strong>Librería El Colibrí</strong>: a platform with a better view, more tools, and a clear and useful navigation for readers and authors.
              </>
            )}
          </p>
        </div>

        <p className="italic">
          {lang === "es"
            ? "“Ya que los libros no solo se leen, también se viven. Y venderlos debería ser parte de esa experiencia.” — Lia"
            : "“Books are not just read — they are lived. Selling them should be part of that experience.” — Lia"}
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
            href="https://www.linkedin.com/in/lia-liabet-costilla-a05146225?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 text-xl"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:lisbetcostilla@gmail.com?subject=Consulta%20sobre%20Librería%20El%20Colibrí&body=Hola%20Lia%2C%0AQuería%20consultarte%20sobre..."
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
