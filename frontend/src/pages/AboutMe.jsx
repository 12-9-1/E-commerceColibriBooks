import React from "react";
import colibriImg from "../assets/logoColibri2.png"; 
import "../styles/AboutMe.css";

const AboutMe = () => {
  return (
    <section className="max-w-6xl mx-auto my-16 px-6">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center overflow-hidden fade-in-section">
        
        {/* Imagen */}
        <div className="w-full lg:w-1/2 transition-transform duration-500 hover:scale-105">
          <img
            src={colibriImg}
            alt="Colibrí representando la librería"
            className="w-full max-h-[400px] object-contain p-4"
          />
        </div>

        {/* Texto con fondo cálido */}
        <div className="w-full lg:w-1/2 px-10 py-12 text-gray-800 bg-gradient-to-br from-[#fff7ed] via-[#fff1e6] to-[#fffdf8]">
          <h2 className="text-4xl font-bold mb-6 text-orange-600">Sobre mí</h2>
          <p className="mb-4 text-lg">
            ¡Hola! Soy <strong>Lia Lisbet Costilla</strong> 💻📚
          </p>
          <p className="mb-4 text-base leading-relaxed">
            Empecé a estudiar programación por mi amor a la tecnología. Ingresé a <strong>RollingCode</strong>, donde aprendí muchísimo y desarrollé este sitio como parte de mi proyecto final.
          </p>
          <p className="mb-4 text-base leading-relaxed">
            <strong>Librería El Colibrí</strong> nació de mi experiencia como <strong>escritora de novelas</strong>. Al ver que muchos sitios de librerías eran funcionales pero poco atractivos, decidí crear una experiencia distinta.
          </p>
          <p className="mb-4 text-base leading-relaxed">
            Este e-commerce busca ir más allá: mostrar libros de forma cálida y profesional, permitir controlar tus gastos, descargar PDFs y explorar trailers literarios. Todo pensado con amor por la lectura.
          </p>
          <p className="italic text-orange-500 mt-6">
            “Los libros no solo se leen, también se viven. Y venderlos debería ser parte de esa experiencia.” — Lia
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
