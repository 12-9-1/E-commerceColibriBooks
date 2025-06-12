// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/AdminDashboard.css";
import { useUser } from "../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ action: '', userId: '', role: '' });

  const initialPermissions = {
    canUploadBooks: false,
    canAccessUsers: false,
    canEditUsers: false,
    canReplyMessages: false,
  };

  const [permissions, setPermissions] = useState(initialPermissions);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);      

  const confirmAction = (action, userId, role) => {
    setModalData({ action, userId, role });
    setShowModal(true);
  };

  const handleConfirmedAction = () => {
    const { action, userId, role } = modalData;

    if (action === 'delete') {
      deleteUser(userId);
      setShowModal(false);
    } else if (action === 'toggleRole' && role !== 'co-admin') {
      setShowModal(false);
      setPermissions(initialPermissions);
      setShowPermissionsModal(true);
    } else {
      toggleAdmin(userId, role);
      setShowModal(false);
    }
  };

  const handleAssignPermissions = async () => {
    try {
      setLoading(true);
      await axios.put(`${API_URL}/api/user/${modalData.userId}/role`, {
        role: 'co-admin'
      });

      await axios.put(`${API_URL}/api/user/${modalData.userId}/permissions`, permissions);

      fetchUsers();
      setShowPermissionsModal(false);
    } catch (error) {
      console.error('Error al asignar permisos:', error);
      setError("Error al asignar permisos.");
    } finally {
      setLoading(false);
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

  const deleteUser = async (id) => {
    const userToDelete = users.find(u => u._id === id);
    if (userToDelete?.email === 'admin@libros.com') return;

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/api/user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setError("Error al eliminar usuario.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAdmin = async (id, currentRole) => {
    const userToToggle = users.find(u => u._id === id);
    if (userToToggle?.email === 'admin@libros.com') return;

    const newRole = currentRole === 'co-admin' ? 'user' : 'co-admin';
    try {
      setLoading(true);
      await axios.put(`${API_URL}/api/user/${id}/role`, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error('Error al cambiar rol:', error);
      setError("Error al cambiar el rol.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const allSelected = Object.values(permissions).every(Boolean);

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
                user.email === 'admin@libros.com' ? 'superadmin-role' :
                user.role === 'co-admin' ? 'coadmin-role' : ''
              }`}>
                {user.email === 'admin@libros.com' ? '👑 admin principal' :
                 user.role === 'co-admin' ? '🛡️ co-admin' : 'user'}
              </span>
            </p>

            {user.email !== 'admin@libros.com' && (
              <button onClick={() => confirmAction('toggleRole', user._id, user.role)} disabled={loading}>
                {user.role === 'co-admin' ? 'Quitar co-admin' : 'Hacer co-admin'}
              </button>
            )}
            {user.email !== 'admin@libros.com' && (
              <button onClick={() => confirmAction('delete', user._id)} disabled={loading}>
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
            {modalData.action === 'toggleRole' && modalData.role === 'co-admin' && (
              <div className="sad-crown">👑💧</div>
            )}
            <h3>¿Estás seguro?</h3>
            <p>
              {modalData.action === 'delete'
                ? '¿Estás seguro de eliminar este usuario? Esta acción no se puede revertir.'
                : modalData.role === 'co-admin'
                ? '¿Seguro que quieres quitarle el rol de co-admin?'
                : '¿Quieres asignar el rol de co-admin a este usuario?'}
            </p>
            <div className="modal-buttons">
              <button onClick={handleConfirmedAction} className="confirm" disabled={loading}>
                {loading ? 'Procesando...' : 'Sí'}
              </button>
              <button onClick={() => setShowModal(false)} className="cancel">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PERMISOS */}
      {showPermissionsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Selecciona los permisos del co-admin</h3>

            <div className="checkbox-group">
              {Object.entries(permissions).map(([key, value]) => (
                <label key={key}>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      setPermissions(prev => ({ ...prev, [key]: !prev[key] }))
                    }
                  />
                  {key === 'canUploadBooks' && 'Puede subir libros'}
                  {key === 'canAccessUsers' && 'Puede ver usuarios'}
                  {key === 'canEditUsers' && 'Puede editar usuarios'}
                  {key === 'canReplyMessages' && 'Puede responder mensajes'}
                </label>
              ))}
            </div>

            <label>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setPermissions({
                    canUploadBooks: checked,
                    canAccessUsers: checked,
                    canEditUsers: checked,
                    canReplyMessages: checked
                  });
                }}
              />
              Seleccionar todo
            </label>

            <div className="modal-buttons">
              <button onClick={handleAssignPermissions} className="confirm" disabled={loading}>
                {loading ? 'Asignando...' : 'Asignar'}
              </button>
              <button onClick={() => setShowPermissionsModal(false)} className="cancel" disabled={loading}>
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
