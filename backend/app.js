const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); 

const allowedOrigins = [
  'http://localhost:5173',
  'https://e-commerce-colibri-books.vercel.app',
  'https://e-commerce-colibri-books-git-develop-lias-projects-745cbed7.vercel.app'
];


function isOriginAllowed(origin) {
  if (allowedOrigins.includes(origin)) return true;

  const vercelPreviewRegex = /^https:\/\/e-commerce-colibri-books-git-[a-z0-9-]+-lias-projects-745cbed7\.vercel\.app$/;
  return vercelPreviewRegex.test(origin);
}

// 👉 Configuración del CORS
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 

    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS no permitido para origen: ${origin}`));
    }
  },
  credentials: true,
}));


// Middleware y rutas
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});

// DB y rutas
const connectDB = require('./config/db');
connectDB();

app.use('/api/auth', require('./routers/auth.routes'));
app.use('/api/user', require('./routers/user.routes'));
app.use('/api/books', require('./routers/book.routes'));
app.use('/api/purchases', require('./routers/purchase.routes'));
app.use('/api/message', require('./routers/message.routes'));
