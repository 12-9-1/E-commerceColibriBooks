const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getUserProfile, 
  updateUserProfile
} = require('../controllers/user.controller');

// GET todos los usuarios
router.get('/', getAllUsers);

// DELETE usuario por ID
router.delete('/:id', deleteUser);

// PUT cambiar rol
router.put('/:id/role', updateUserRole);

// GET perfil del usuario por ID
router.get('/:id/profile', getUserProfile);

// PUT actualizar perfil del usuario
router.put('/:id/profile', updateUserProfile);

module.exports = router;
