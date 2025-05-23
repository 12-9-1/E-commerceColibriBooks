import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from '../context/UserContext';
import MessageModal from "../components/MessageModal";
import { useNavigate } from "react-router-dom";
import '../styles/AdminBookDashboard.css';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { user, userLoaded } = useUser();
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [bookOpen, setBookOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
      setAvatar(user.avatar || '');
    }
  }, [user]);

  const handleUpdate = () => {
    axios.put(`${API_URL}/api/user/${user._id}/profile`, {
      nickname,
      avatar
    })
    .then(res => {
      setMessage('Perfil actualizado con éxito 🎉');
      setEditMode(false);
    })
    .catch(err => {
      console.error('Error actualizando perfil:', err);
      setMessage('Ocurrió un error al actualizar.');
    });
  };

  if (!userLoaded) return <p className="profile-message">Cargando perfil...</p>;
  if (!user?._id) return <p className="profile-message error">Usuario no identificado.</p>;

  return (
    <div className="admin-dashboard-container">
      {/* Tarjeta de perfil */}
      <div className="admin-profile-card">
        <img src={avatar || user?.avatar} alt="Avatar" className="avatar" />
        <h3>{nickname || user?.nickname}</h3>
        <p>{user?.email}</p>
        <span className="user-badge">🧚 Usuario</span>

        {editMode ? (
          <div className="edit-mode">
            <input
              type="text"
              className="edit-input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Nuevo apodo"
            />
            <input
              type="text"
              className="edit-input"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Nueva URL de avatar"
            />
            <div className="profile-buttons">
              <button className="save-btn" onClick={handleUpdate}>Guardar</button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancelar</button>
            </div>
          </div>
        ) : (
          <div className="profile-buttons">
            <button className="edit-btn" onClick={() => setEditMode(true)}>Editar</button>
          </div>
        )}

        {message && <p>{message}</p>}
      </div>

      {/* Libro con secciones */}
      <div className="admin-book-container">
        <motion.div 
          className={`book-cover-icon ${bookOpen ? 'open' : ''}`} 
          onClick={() => setBookOpen(!bookOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {bookOpen ? '📖' : '📕'}
          <p>{bookOpen ? 'Cerrar libro' : 'Abrir libro'}</p>
        </motion.div>

        <AnimatePresence>
          {bookOpen && (
            <motion.div 
              className="book-pages"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              {/* Columna izquierda */}
              <div className="book-page-column">
                <div className="book-page">
                  <h4>Mis libros deseados</h4>
                  <p>Consulta los libros que agregaste a tu lista de deseos.</p>
                  <button onClick={() => navigate("/wishlist")}>Ver deseos</button>
                </div>
                <div className="book-page">
                  <h4>Correo</h4>
                  <p>Tu dirección de correo registrada.</p>
                  <span>{user.email}</span>
                </div>
              </div>

              {/* Columna derecha */}
              <div className="book-page-column">
                <div className="book-page">
                  <h4>Mis compras</h4>
                  <p>Revisa el historial de tus compras.</p>
                  <button onClick={() => navigate("/purchases")}>Ver compras</button>
                </div>
                <div className="book-page">
                  <h4>Pedir un deseo</h4>
                  <p>Envía una petición a la Biblioteca el Colibrí.</p>
                  <button onClick={() => setModalOpen(true)}>Pedir deseo</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de deseo */}
      <MessageModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        userId={user._id}
      />
    </div>
  );
};

export default Profile;
