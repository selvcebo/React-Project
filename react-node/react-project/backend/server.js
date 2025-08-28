require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());



// Conexión a MongoDB local
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Conectado a MongoDB'))
  .catch(err => console.error('🔴 Error al conectar:', err));


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('✨ El servidor está vivo y conectado');
});

// Escucha
app.listen(4000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:4000');
});
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);