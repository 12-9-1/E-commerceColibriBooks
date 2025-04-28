// File: backend/appjs
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});


const dotenv = require('dotenv');
dotenv.config(); // esto carga el .env

const connectDB = require('./config/db');
connectDB(); // conecta a Mongo

const authRoutes = require('./routers/auth.routes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routers/user.routes');
app.use('/api/user', userRoutes); // 👈 esta línea

const bookRoutes = require('./routers/book.routes');
app.use('/api/books', bookRoutes);


