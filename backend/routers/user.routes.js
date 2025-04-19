const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  updateUserRole
} = require('../controllers/user.controller');

// GET todos los usuarios
router.get('/', getAllUsers);

// DELETE usuario por ID
router.delete('/:id', deleteUser);

// PUT cambiar rol
router.put('/:id/role', updateUserRole);

module.exports = router;
