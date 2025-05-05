const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 30 * 60 * 1000; // 30 minutos

// Controlador de inicio de sesión
exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // 1. Buscar el usuario por correo
    const user = await User.findOne({ correo }).select('+contrasena +loginAttempts +lockUntil');
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // 2. Verificar si la cuenta está bloqueada
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(423).json({ error: 'Cuenta bloqueada. Intenta más tarde.' });
    }

    // 3. Comparar la contraseña ingresada con la encriptada
    const esValida = await bcrypt.compare(contrasena, user.contrasena);
    if (!esValida) {
      user.loginAttempts += 1;

      // Bloquear cuenta si excede intentos fallidos
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = Date.now() + LOCK_TIME;
      }

      await user.save();
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // 4. Restablecer intentos fallidos si el inicio de sesión es exitoso
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    // 5. Generar JWT
    const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '2h' });

    // 6. Configurar cookie segura
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Login exitoso', rol: user.rol, token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor', detalles: error.message });
  }
};