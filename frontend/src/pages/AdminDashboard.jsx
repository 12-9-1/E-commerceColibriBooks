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


const confirmAction = (action, userId, role) => {
  setModalData({ action, userId, role });
  setShowModal(true);
};
const handleConfirmedAction = async () => {
  const { action, userId, role } = modalData;

  if (action === 'delete') {
    await deleteUser(userId);
  } else if (action === 'toggleRole') {
    await toggleAdmin(userId, role);
  }

  setShowModal(false);
};

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user`); 
      setUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/api/user/${id}`);
    fetchUsers();
  };

  const toggleAdmin = async (id, currentRole) => {
    const newRole = currentRole === 'co-admin' ? 'user' : 'co-admin';
    await axios.put(`${API_URL}/api/user/${id}/role`, { role: newRole });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>
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
                  user.role === 'co-admin' ? 'coadmin-role' :
                  ''
                }`}>
                  {user.email === 'admin@libros.com' ? '👑 admin principal' :
                  user.role === 'co-admin' ? '🛡️ co-admin' : 'user'}
                </span>
              </p>
              
              {user.email !== 'admin@libros.com' && (
                <button onClick={() => confirmAction('toggleRole', user._id, user.role)}>
                  {user.role === 'co-admin' ? 'Quitar co-admin' : 'Hacer co-admin'}
                </button>
              )}
            {user.email !== 'admin@libros.com' && (
              <button onClick={() => confirmAction('delete', user._id)}>Eliminar</button>
            )}
          </div>
        ))}
      </div>
  
      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalData.action === 'toggleRole' && modalData.role === 'admin' && (
              <div className="sad-crown">👑💧</div>
            )}
            <h3>¿Estás seguro?</h3>
            <p>
              Vas a{' '}
              <strong>
                {modalData.action === 'delete'
                  ? 'eliminar este usuario'
                : modalData.role === 'co-admin'
                  ? 'quitarle el rol de co-admin'
                  : 'hacerlo co-admin'
                }
              </strong>
            </p>
            <div className="modal-buttons">
              <button onClick={handleConfirmedAction} className="confirm">
                Sí
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
