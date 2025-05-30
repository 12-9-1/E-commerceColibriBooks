import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import ContactOptionsModal from "./ContactOptionsModal";
import '../styles/Footer.css';
import logoColibri from "../assets/logoColibri.png";


const Footer = ({ userId }) => {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
        <div className="footer-logo">
          <img src={logoColibri} alt="Colibrí de Letras" />
        </div>

        <div className="footer-sections">
          <div className="footer-column">
            <h4>Links</h4>
            <ul>
              <li><a href="/aboutme">Sobre Mi</a></li>
              <li><button className="btn-link" onClick={() => setContactModalOpen(true)}>Contacto</button></li>
              <li><a href="/terms">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/support">Soporte</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Redes Sociales</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /> Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a>
            </div>
            <p>📧 contacto@web.com</p>
            <p>📄 Datos Fiscales</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
      </div>
    </footer>

      <ContactOptionsModal
        isOpen={contactModalOpen}
        onRequestClose={() => setContactModalOpen(false)}
        userId={userId}
      />
    </>
  );
};

export default Footer;
