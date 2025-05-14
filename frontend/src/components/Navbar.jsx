// src/components/NavBar/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { useMessages } from "../context/MessageContext";
import "../styles/Navbar.css"; 
import logoColibri from "../assets/logoColibri.png"; 
import AuthModal from "./AuthModal"; 
import { FaShoppingCart, FaBars, FaHeart } from "react-icons/fa";
import { IoMailUnread } from "react-icons/io5"; 

const Navbar = ({ onCartClick }) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { cartItems } = useCart();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { favorites } = useUser();
  const { unreadCount } = useMessages();
  
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
    navigate("/"); 
  };
  const menuRef = useRef();

useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };
  if (showMenu) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showMenu]);

  

  return (
<nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
 
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src={logoColibri} alt="Colibrí" className="logo1" />
      </div>

      <div className="navbar-icons">
      {!user && (
        <button className="auth-button" onClick={() => setAuthModalOpen(true)}>
          Iniciar sesión / Registro
        </button>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onRequestClose={() => setAuthModalOpen(false)}
      />
        <FaBars className="menu-icon" onClick={handleMenuToggle} />
   {user && (     
 <div className="favorites-icon" onClick={() => navigate("/favorites")}>
  
  <FaHeart />
  {Array.isArray(favorites) && favorites.length > 0 && (
    <span className="favorites-count">{favorites.length}</span>
  )}
</div>
   )}
        
      <div className="cart-icon" onClick={onCartClick}> 
        <FaShoppingCart />
        {Array.isArray(cartItems) && cartItems.length > 0 && (
          <span className="cart-count">{cartItems.length}</span>
        )}
      </div>

      {user?.role === "admin" && (
  <div className="message-icon" onClick={() => navigate("/admin/messages")}>
    <IoMailUnread />
    {unreadCount > 0 && <span className="message-count">{unreadCount}</span>}
  </div>
)}

      {user && (
        <div
          className={`avatar-wrapper ${user.role === "admin" ? "admin" : ""}`}
          onClick={() => navigate(user.role === "admin" ? "/admin" : "/profile")}
        >
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="avatar"
            className="user-avatar"
          />
          {user.role === "admin" && <span className="admin-crown">👑</span>}
          {user.nickname && (
            <span className="avatar-nickname">{user.nickname}</span>
          )}
        </div>
      )}

      </div>

    {showMenu && (
  <div className="dropdown-menu" ref={menuRef}>
    <ul>
      {user && (
        <li
          onClick={() => {
            navigate("/favorites");
            setShowMenu(false);
          }}
        >
          ❤️ Favoritos
        </li>
      )}
      {user && (
        <li
          onClick={() => {
            navigate("/wishlist");
            setShowMenu(false);
          }}
        >
          ⭐ Lista de deseos
        </li>
      )}
      {user && (
        <li
          onClick={() => {
            navigate("/purchases");
            setShowMenu(false);
          }}
        >
          🛒 Mis Compras
        </li>
      )}
      <li
        onClick={() => {
          navigate("/about");
          setShowMenu(false);
        }}
      >
        ℹ️ Sobre Nosotros
      </li>
      {user && (
        <li
          onClick={() => {
            handleLogout();
            setShowMenu(false);
          }}
        >
          🚪 Cerrar Sesión
        </li>
          )}
        </ul>
        </div>
    )}
    </nav>
  );
};

export default Navbar;
