import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import '../styles/AdminBookDashboard.css';

const AdminBookDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [bookOpen, setBookOpen] = useState(false);

  // Estado para manejar los cambios del admin
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Cargar los datos del admin
    if (user) {
      setNickname(user.nickname || '');
      setAvatar(user.avatar || '');
    }
  }, [user]);

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/api/user/${user._id}/profile`, {
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

  return (
    <div className="admin-dashboard-container">
      {/* Perfil del admin en un cuadro al costado izquierdo */}
      <div className="admin-profile-card">
        <img src={avatar || user?.avatar} alt="Avatar" className="avatar" />
        <h3>{nickname || user?.nickname}</h3>
        <p>{user?.email}</p>
        <span className="admin-badge">👑 Administrador</span>

        {/* Mostrar modo de edición */}
        
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

      {/* Libro cerrado a la derecha */}
      <div className="admin-book-container">
        <motion.div 
          className={`book-cover-icon ${bookOpen ? 'open' : ''}`} 
          onClick={() => setBookOpen(!bookOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📕
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
              <div className="book-page">
                <h4>Usuarios</h4>
                <p>Administra todos los usuarios registrados.</p>
                <button onClick={() => navigate("/adminusers")}>Ver usuarios</button>
              </div>
              <div className="book-page">
                <h4>Libros</h4>
                <p>Gestiona los libros disponibles.</p>
                <button onClick={() => navigate("/adminbooks")}>Ver libros</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminBookDashboard;
