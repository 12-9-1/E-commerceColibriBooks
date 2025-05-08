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


const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil', error });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { nickname, avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { nickname, avatar },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar perfil', error });
  }
};



// Agregar libro a favoritos
const addToFavorites = async (req, res) => {
  try {
    const { id, bookId } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { $addToSet: { favorites: bookId } },
      { new: true }
    ).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar a favoritos', error });
  }
};

// Eliminar libro de favoritos
const removeFromFavorites = async (req, res) => {
  try {
    const { id, bookId } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { favorites: bookId } },
      { new: true }
    ).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar de favoritos', error });
  }
};

// Obtener favoritos
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener favoritos', error });
  }
};

// Lo mismo para wishlist
const addToWishlist = async (req, res) => {
  try {
    const { id, bookId } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { $addToSet: { wishlist: bookId } },
      { new: true }
    ).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar a lista de deseos', error });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { id, bookId } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { wishlist: bookId } },
      { new: true }
    ).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar de lista de deseos', error });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener lista de deseos', error });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getUserProfile,
  updateUserProfile,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  addToWishlist,
  removeFromWishlist,
  getWishlist
};
