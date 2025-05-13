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


  if (!userLoaded) return null; // o un loader si querés

  return (
    <div className="home-container">
    <div className="home-hero">
      <img src={logoColibri} alt="Colibrí de Letras" className="logo2" />
      <h1>¡Bienvenido a Estación El Colibrí!</h1>
      <p>Boletos para mundos infinitos y reconstrucción infinita. 📖✨</p>
      <div className="home-buttons">
        {user ? (
          <button onClick={() => navigate("/libros")}>Ver mis libros</button>
        ) : (
          <button onClick={() => setAuthModalOpen(true)}>Iniciar sesión</button>
        )}
      <AuthModal
        isOpen={authModalOpen}
        onRequestClose={() => setAuthModalOpen(false)}
      />

        <button onClick={() => navigate("library")}>Explorar libros</button>
      </div>
    </div>
  
  </div>  
  );
};


export default Home;
