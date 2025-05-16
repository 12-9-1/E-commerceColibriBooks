// routes/user.routes.js
const express = require('express');
const router = express.Router();
const {
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
  getWishlist,
  forgotPassword,
  resetPassword
} = require('../controllers/user.controller');

// Rutas 
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.put('/:id/role', updateUserRole);
router.get('/:id/profile', getUserProfile);
router.put('/:id/profile', updateUserProfile);
router.post('/:id/favorites/:bookId', addToFavorites);
router.delete('/:id/favorites/:bookId', removeFromFavorites);
router.get('/:id/favorites', getFavorites);
router.post('/:id/wishlist/:bookId', addToWishlist);
router.delete('/:id/wishlist/:bookId', removeFromWishlist);
router.get('/:id/wishlist', getWishlist);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


module.exports = router;
