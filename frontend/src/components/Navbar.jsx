// src/components/NavBar/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { useMessages } from "../context/MessageContext";
import MessagesPreviewModal from "./MessagesPreviewModal";
import "../styles/Navbar.css"; 
import logoColibri from "../assets/logoColibri.png"; 
import AuthModal from "./AuthModal"; 
import { FaShoppingCart, FaBars, FaHeart, FaSearch } from "react-icons/fa";
import { IoMailUnread } from "react-icons/io5"; 
import HelpModal from "./HelpModal";



const Navbar = ({ onCartClick }) => {
  const { user, setUser, favorites } = useUser();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { cartItems } = useCart();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { unreadCount } = useMessages();

  const [showSearch, setShowSearch] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchGenre, setSearchGenre] = useState("");

  const [showMessageModal, setShowMessageModal] = useState(false);
  const location = useLocation();
  const [showHelp, setShowHelp] = useState(false);

  const toggleSearch = () => setShowSearch(!showSearch);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTitle) params.append("title", searchTitle);
    if (searchAuthor) params.append("author", searchAuthor);
    if (searchGenre) params.append("genre", searchGenre);
    navigate(`/library?${params.toString()}`);
    setShowSearch(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => setShowMenu(!showMenu);

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
      {location.pathname !== "/" && (
        <button className="back-button" onClick={() => navigate(-1)}>
          ⬅ Volver
        </button>
      )}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src={logoColibri} alt="Colibrí" className="logo1" />
      </div>
      
      <button onClick={() => setShowHelp(true)} className="hover:underline">
          Ayuda / Help
        </button>
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />


      <div className="navbar-icons">
        <FaSearch className="search-icon colored-icon" onClick={toggleSearch} />

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



        <div className="cart-icon" onClick={onCartClick}> 
          <FaShoppingCart />
          {Array.isArray(cartItems) && cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
        </div>

        {user && (
          <div className="favorites-icon" onClick={() => navigate("/favorites")}>
            <FaHeart />
            {Array.isArray(favorites) && favorites.length > 0 && (
              <span className="favorites-count">{favorites.length}</span>
            )}
          </div>
        )}

        {user && (
        <div className="message-icon" onClick={() => setShowMessageModal(true)}>
          <IoMailUnread/>
          {unreadCount > 0 && (
            <span className="icon-counter">{unreadCount}</span>
          )}
        </div>
        )}
        
        <MessagesPreviewModal
          isOpen={showMessageModal}
          onRequestClose={() => setShowMessageModal(false)}
          isAdmin={user?.role === "admin"}
        />


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

      {showSearch && (
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Título"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Autor"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
          />
          <select value={searchGenre} onChange={(e) => setSearchGenre(e.target.value)}>
            <option value="">Todos los géneros</option>
            <option value="fantasía">Fantasía</option>
            <option value="ciencia ficción">Ciencia ficción</option>
            <option value="romance">Romance</option>
            <option value="terror">Terror</option>
          </select>
          <button onClick={handleSearch}>Buscar</button>
        </div>
      )}

      {showMenu && (
        <div className="dropdown-menu" ref={menuRef}>
          <ul>
            {user && location.pathname !== "/library" &&(
              <li onClick={() => { navigate("/library"); setShowMenu(false); }}>📚 Biblioteca</li>
            )}
            {user && location.pathname !== "/favorites" && (
              <li onClick={() => { navigate("/favorites"); setShowMenu(false); }}>❤️ Favoritos</li>
            )}
            {user && location.pathname !== "/wishlist" &&(
              <li onClick={() => { navigate("/wishlist"); setShowMenu(false); }}>⭐ Lista de deseos</li>
            )}
            {user && location.pathname !== "/purchases" &&(
              <li onClick={() => { navigate("/purchases"); setShowMenu(false); }}>🛒 Mis Compras</li>
            )}
            
            <li onClick={() => { navigate("/aboutme"); setShowMenu(false); }}>ℹ️ Sobre Nosotros</li>
            {user && (
              <li onClick={() => { handleLogout(); setShowMenu(false); }}>🚪 Cerrar Sesión</li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
