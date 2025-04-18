// src/components/NavBar/Navbar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import "./Navbar.css";
import logoColibri from "../../assets/logoColibri.png"; // fijate que sea .png

const Navbar = ({ cartItems }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    
    // Añadir un pequeño retraso para garantizar la actualización
    setTimeout(() => {
      window.location.reload(); // Esto recargará la página y cargará el nuevo estado
    }, 200);
  };
  

  return (
<nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
  <div className="navbar-logo" onClick={() => navigate("/")}>
    <img src={logoColibri} alt="Colibrí de Letras" className="logo" />
  </div>

      <div className="navbar-icons">
        <FaBars className="menu-icon" onClick={handleMenuToggle} />
        
        <div className="cart-icon" onClick={() => navigate("/cart")}>
          <FaShoppingCart />
          {Array.isArray(cartItems) && cartItems.length > 0 && (
  <span className="cart-count">{cartItems.length}</span>
)}

        </div>

        {user && (
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="avatar"
            className="user-avatar"
            onClick={() => navigate("/profile")}
          />
        )}
      </div>

      {showMenu && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={() => navigate("/favorites")}>⭐ Favoritos</li>
            <li onClick={() => navigate("/purchases")}>🛒 Mis Compras</li>
            <li onClick={() => navigate("/about")}>ℹ️ Sobre Nosotros</li>
            {user && <li onClick={handleLogout}>🚪 Cerrar Sesión</li>}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
