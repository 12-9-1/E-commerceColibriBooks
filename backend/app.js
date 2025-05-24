const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); 

const allowedOrigins = [
  'http://localhost:5173',
  'https://e-commerce-colibri-books.vercel.app',
  'https://e-commerce-colibri-books-git-develop-lias-projects-745cbed7.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS no permitido para origen: ${origin}`));
    }
  },
  credentials: true,
}));


app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});

// Base de datos
const connectDB = require('./config/db');
connectDB();

// Rutas
const authRoutes = require('./routers/auth.routes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routers/user.routes');
app.use('/api/user', userRoutes);

const bookRoutes = require('./routers/book.routes');
app.use('/api/books', bookRoutes);

const purchaseRoutes = require("./routers/purchase.routes");
app.use("/api/purchases", purchaseRoutes);

const messageRoutes = require("./routers/message.routes");
app.use("/api/message", messageRoutes);
