// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/AdminDashboard.css";
import { useUser } from "../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ userId: '' });

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);      

  const confirmDelete = (userId) => {
    setModalData({ userId });
    setShowModal(true);
  };

  const handleDelete = async () => {
    const userId = modalData.userId;
    const userToDelete = users.find(u => u._id === userId);
    if (userToDelete?.email === 'admin@libros.com') return;

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/api/user/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setError("Error al eliminar usuario.");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user`);
      setUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setError("Error al obtener usuarios.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="user-list">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <img src={user.avatar} alt="Avatar" className="avatar" />
            <p><strong>Apodo:</strong> {user.nickname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p>
              <strong>Rol:</strong>{' '}
              <span className={`user-role-badge ${
                user.email === 'admin@libros.com' ? 'superadmin-role' : ''
              }`}>
                {user.email === 'admin@libros.com' ? '👑 admin principal' : 'user'}
              </span>
            </p>

            {user.email !== 'admin@libros.com' && (
              <button onClick={() => confirmDelete(user._id)} disabled={loading}>
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>

      {/* MODAL CONFIRMACIÓN */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¿Estás seguro?</h3>
            <p>¿Estás seguro de eliminar este usuario? Esta acción no se puede revertir.</p>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="confirm" disabled={loading}>
                {loading ? 'Eliminando...' : 'Sí'}
              </button>
              <button onClick={() => setShowModal(false)} className="cancel">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
