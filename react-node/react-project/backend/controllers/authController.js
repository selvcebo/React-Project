// controllers/authController.js
const User = require('../models/User');
const { enviarCorreoBienvenida } = require('./mailer');

async function register(req, res) {
  console.log('📥 Tipo de contenido recibido:', req.headers['content-type']);
  console.log("📥 Datos recibidos en /register:", req.body);
  try {
    const user = new User(req.body);
    await user.save();

    // Enviar correo de bienvenida
    try {
      await enviarCorreoBienvenida(user.email, user.nombre);
    } catch (correoError) {
      console.warn("⚠️ Usuario registrado, pero el correo falló:", correoError.message);
    }

    res.status(201).json({ mensaje: 'Registro exitoso' });
  } catch (err) {
    console.error("❌ Error en registro:", err);
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  console.log("🔐 Intento de login:", req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

  res.status(200).json({
    mensaje: "Login exitoso",
    role: user.role,
    username: user.username,
    email: user.email

  });
}


module.exports = { register, login };
