import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/AdminDashboard.css";
import { useUser } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMakeAdminModal, setShowMakeAdminModal] = useState(false);
  const [showRemoveAdminModal, setShowRemoveAdminModal] = useState(false);
  const [modalData, setModalData] = useState({ userId: '', nickname: '', role: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const confirmDelete = (userId, nickname, role) => {
    setModalData({ userId, nickname, role });
    setShowDeleteModal(true);
  };

  const confirmMakeAdmin = (userId, nickname) => {
    setModalData({ userId, nickname });
    setShowMakeAdminModal(true);
  };

  const confirmRemoveAdmin = (userId, nickname) => {
    setModalData({ userId, nickname });
    setShowRemoveAdminModal(true);
  };

  const handleDelete = async () => {
    const { userId, nickname } = modalData;
    const userToDelete = users.find(u => u._id === userId);
    if (userToDelete?.email === 'admin@libros.com') return;

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/api/user/${userId}`);
      toast.success(`Eliminaste al usuario ${nickname}`);
      fetchUsers();
    } catch (error) {
      toast.error("Error al eliminar usuario.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const toggleAdminRole = async (userId, currentRole, nickname) => {
    if (users.find(u => u._id === userId)?.email === 'admin@libros.com') return;

    const newRole = currentRole === 'admin' ? 'user' : 'admin';

    try {
      setLoading(true);
      await axios.put(`${API_URL}/api/user/${userId}/role`, { role: newRole });

      if (newRole === 'admin') {
        toast.success(`Hiciste admin a ${nickname}`);
      } else {
        toast.info(`Quitaste rol admin a ${nickname}`);
      }

      fetchUsers();
    } catch (error) {
      toast.error("Error al cambiar el rol.");
    } finally {
      setLoading(false);
      setShowMakeAdminModal(false);
      setShowRemoveAdminModal(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user`);
      setUsers(res.data);
    } catch (error) {
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
              <strong>Rol:</strong>{" "}
              <span className={`user-role-badge ${
                user.email === 'admin@libros.com' ? 'superadmin-role' :
                user.role === 'admin' ? 'admin-role' : ''
              }`}>
                {user.email === 'admin@libros.com'
                  ? '👑 admin principal'
                  : user.role === 'admin'
                  ? '🛡️ admin'
                  : 'user'}
              </span>
            </p>
            {user.email !== 'admin@libros.com' && (
              <>
                {user.role === 'admin' ? (
                  <button onClick={() => confirmRemoveAdmin(user._id, user.nickname)} disabled={loading}>
                    Quitar admin
                  </button>
                ) : (
                  <button onClick={() => confirmMakeAdmin(user._id, user.nickname)} disabled={loading}>
                    Hacer admin
                  </button>
                )}
                <button onClick={() => confirmDelete(user._id, user.nickname, user.role)} disabled={loading}>
                  Eliminar
                </button>
              </>
            )}
          </div>
        ))}
      </div>


      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalData.role === 'admin' && <div className="sad-crown">🧚💧</div>}
            <h3>¿Estás seguro?</h3>
            <p>Vas a eliminar al usuario <strong>{modalData.nickname}</strong>.</p>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="confirm" disabled={loading}>
                {loading ? 'Eliminando...' : 'Sí'}
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="cancel">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}


      {showMakeAdminModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¿Hacer administrador?</h3>
            <p>Este usuario tendrá permisos de administrador.</p>
            <div className="modal-buttons">
              <button
                className="confirm"
                onClick={() => toggleAdminRole(modalData.userId, 'user', modalData.nickname)}
                disabled={loading}
              >
                Confirmar
              </button>
              <button className="cancel" onClick={() => setShowMakeAdminModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showRemoveAdminModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="sad-crown">🛡️💧</div>
            <h3>¿Quitar rol de admin?</h3>
            <p>Este usuario dejará de ser administrador.</p>
            <div className="modal-buttons">
              <button
                className="confirm"
                onClick={() => toggleAdminRole(modalData.userId, 'admin', modalData.nickname)}
                disabled={loading}
              >
                Confirmar
              </button>
              <button className="cancel" onClick={() => setShowRemoveAdminModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboard;
