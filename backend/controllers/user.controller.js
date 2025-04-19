const User = require('../models/modelUser');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // excluye el campo 'password'
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// Eliminar usuario por ID
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};

// Cambiar rol de usuario
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar rol', error });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole
};
