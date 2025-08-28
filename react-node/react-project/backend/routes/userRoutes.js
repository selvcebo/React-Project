const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Crear usuario
router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Usuario eliminado' });
});

module.exports = router;
