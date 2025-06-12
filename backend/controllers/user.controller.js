const User = require('../models/modelUser');
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};


const deleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }


    if (userToDelete.email === 'admin@libros.com') {
      return res.status(403).json({
        message: 'No se puede eliminar al administrador principal',
      });
    }

    await userToDelete.deleteOne();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Rol no válido. Solo se permite "user" o "admin"' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.email === 'admin@libros.com') {
      return res.status(403).json({
        message: 'No se puede modificar el rol del administrador principal',
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Rol actualizado correctamente', newRole: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el rol', error });
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


const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener favoritos', error });
  }
};


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


const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
  to: user.email,
  from: process.env.EMAIL_USER,
  subject: "Recuperación de contraseña - Colibrí Books",
  html: `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #e76f51;">Hola ${user.nickname || 'usuario'},</h2>
      <p>Recibimos una solicitud para cambiar tu contraseña en <strong>Colibrí Books</strong>.</p>
      <p>Hacé clic en el botón de abajo para continuar:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password/${token}" 
         style="display: inline-block; padding: 10px 20px; background-color: #2a9d8f; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
        Cambiar Contraseña
      </a>
      <p style="margin-top: 20px;">Si no solicitaste este cambio, podés ignorar este correo.</p>
      <hr style="margin-top: 30px;"/>
      <p style="font-size: 0.9em; color: #999;">© 2025 Colibrí Books</p>
    </div>
  `
};


    await transporter.sendMail(mailOptions);
    res.json({ message: "Correo enviado con instrucciones" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ message: "Error al enviar correo", error });
  }
};


const resetPassword = async (req, res) => {
  try {
    console.log("Token recibido:", req.params.token);
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.log("Token inválido o expirado");
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'No se recibió la nueva contraseña' });
    }

    if (!isPasswordSecure(password)) {
      return res.status(400).json({ message: 'La contraseña no es segura. Debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    res.status(500).json({ message: 'Error al cambiar contraseña', error });
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
  getWishlist,
  forgotPassword,
  resetPassword,
};
