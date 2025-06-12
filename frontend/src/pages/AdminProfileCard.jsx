import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import '../styles/AdminBookDashboard.css';

const API_URL = import.meta.env.VITE_API_URL;

const AdminBookDashboard = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [bookOpen, setBookOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
      setAvatar(user.avatar || '');
    }
  }, [user]);

  const handleUpdate = () => {
    axios.put(`${API_URL}/api/user/${user._id}/profile`, { nickname, avatar })
      .then(res => {
        setMessage('Perfil actualizado con éxito 🎉');
        setEditMode(false);
        setUser(res.data);
      })
      .catch(err => {
        console.error('Error actualizando perfil:', err);
        setMessage('Ocurrió un error al actualizar.');
      });
  };

  const isAdmin = user?.role === 'admin';
  const isSuperAdmin = user?.email === 'admin@libros.com';

  const renderAdminBadge = () => {
    if (isSuperAdmin) return <span className="admin-badge">👑 Administrador principal</span>;
    if (isAdmin) return <span className="admin-badge">🛡️ Administrador</span>;
    return null;
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-profile-card">
        <img src={avatar || user?.avatar} alt="Avatar" className="avatar" />
        <h3>{nickname || user?.nickname}</h3>
        <p>{user?.email}</p>
        {renderAdminBadge()}

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
          {bookOpen && isAdmin && (
            <motion.div 
              className="book-pages"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <div className="book-page-column">
                <div className="book-page">
                  <h4>Usuarios</h4>
                  <p>Administra todos los usuarios registrados.</p>
                  <button onClick={() => navigate("/adminusers")}>Ver usuarios</button>
                </div>

                <div className="book-page">
                  <h4>Mensajes</h4>
                  <p>Revisa y responde los mensajes enviados por usuarios.</p>
                  <button onClick={() => navigate("/admininbox")}>Bandeja de mensajes</button>
                </div>
              </div>

              <div className="book-page-column">
                <div className="book-page">
                  <h4>Libros</h4>
                  <p>Gestiona los libros disponibles.</p>
                  <button onClick={() => navigate("/adminbooks")}>Ver libros</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminBookDashboard;
