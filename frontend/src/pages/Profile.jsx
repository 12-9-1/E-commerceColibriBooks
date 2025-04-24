import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import '../styles/Profile.css';


const Profile = () => {
  const { user, userLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });


  useEffect(() => {
    if (!userLoaded || !user?._id) return;

    axios.get(`http://localhost:3000/api/user/${user._id}/profile`)
      .then(res => {
        setUserData(res.data);
        setNickname(res.data.nickname || '');
        setAvatar(res.data.avatar || '');
      })
      .catch(err => console.error('Error cargando perfil:', err));
  }, [userLoaded, user]);

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/api/user/${user._id}/profile`, {
      nickname,
      avatar
    })
    .then(res => {
      setMessage({ text: 'Perfil actualizado con éxito 🎉', type: 'success' });
      setUserData(res.data);
      setEditMode(false);
  
      setTimeout(() => {
        setMessage({ text: '', type: '' }); // Borramos el mensaje luego de 3s
      }, 3000);
    })
    .catch(err => {
      console.error('Error actualizando perfil:', err);
      setMessage({ text: 'Ocurrió un error al actualizar.', type: 'error' });
    });
  };
  

  if (!userLoaded) return (
    <div className="profile-message loading">
      <FaSpinner className="icon spin" /> Cargando perfil...
    </div>
  );
  if (!user?._id) return (
    <div className="profile-message error">
      <FaExclamationTriangle className="icon" /> Usuario no identificado. Por favor, inicia sesión.
    </div>
  );
  
  return (
    <div className="profile-container">
    <h2>Mi Perfil</h2>
  
    <div className="profile-avatar">
      {avatar ? (
        <img src={avatar} alt="Avatar" />
      ) : (
        <p>Sin imagen de avatar</p>
      )}
    </div>
  
    <div className="profile-info">
      <label>Email:</label>
      <span>{userData.email}</span>
  
      {editMode ? (
        <>
          <label>Apodo:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <label>Avatar URL:</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </>
      ) : (
        <>
          <label>Apodo:</label>
          <span>{userData.nickname}</span>
        </>
      )}
    </div>
  
    <div className="profile-buttons">
      {editMode ? (
        <>
          <button onClick={handleUpdate}>Guardar</button>
          <button onClick={() => setEditMode(false)}>Cancelar</button>
        </>
      ) : (
        <button onClick={() => setEditMode(true)}>Editar</button>
      )}
    </div>
    {message.text && (
  <div className={`profile-message ${message.type}`}>
    {message.type === 'success' && <FaCheckCircle className="icon" />}
    {message.type === 'error' && <FaExclamationTriangle className="icon" />}
    {message.type === 'loading' && <FaSpinner className="icon spin" />}
    {message.text}
  </div>
)}

  </div>
  
  );
};

export default Profile;
