const User = require('../models/modelUser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function isPasswordSecure(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return re.test(password);
}

const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    if (!isPasswordSecure(password)) {
      return res.status(400).json({ message: 'La contraseña no es segura. Debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const role = email === 'admin@libros.com' ? 'admin' : 'user';

    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente', role });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro', error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });


    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      user: {
        _id: user._id,
      email: user.email,
      role: user.role,
      nickname: user.nickname || '',
      avatar: user.avatar || '',
      permissions: user.role === 'co-admin' ? user.permissions || {} : undefined
    },
      token 
    });

  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error });
  }
};

const validateToken = (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = {
  register,
  login,
  validateToken,
};

