const User = require('../models/modelUser')
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 👇 Lógica para detectar si es el email del admin
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

    res.status(200).json({
      message: 'Login exitoso',
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        nickname: user.nickname || '',
        avatar: user.avatar || ''
      }
    });
    
    
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error });
  }
};


module.exports = { register, login };
