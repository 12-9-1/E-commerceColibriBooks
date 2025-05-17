// File: backend/appjs

const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // tu frontend
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});


const dotenv = require('dotenv');


const connectDB = require('./config/db');
connectDB(); // conecta a Mongo

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
