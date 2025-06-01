import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logoColibri from "../assets/logoColibri.png";
import { useUser } from "../context/UserContext";
import AuthModal from "../components/AuthModal";


const Home = () => {
  const { user, userLoaded } = useUser();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (!userLoaded) return null;

  return (
    <div className="home-container">
      <div className="home-hero">
        <img src={logoColibri} alt="Colibrí de Letras" className="logo2" />
        <h1>¡Bienvenido a la Biblioteca El Colibrí!</h1>
        <p>Explora portales hacia mundos infinitos y vive historias que inspiran y transforman. 📚✨</p>
        <div className="home-buttons">
          {user ? (
            <button onClick={() => navigate("/libros")}>Ver mi biblioteca</button>
          ) : (
            <>
              <button onClick={() => setAuthModalOpen(true)}>Iniciar sesión</button>
              <button onClick={() => navigate("/libros")}>Explorar libros</button>
            </>
          )}
          <AuthModal
            isOpen={authModalOpen}
            onRequestClose={() => setAuthModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};



export default Home;
