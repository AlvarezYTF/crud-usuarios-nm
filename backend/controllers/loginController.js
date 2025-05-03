const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // 1. Buscar el usuario por correo
    const user = await User.findOne({ correo }).select('+contrasena');
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // 2. Comparar la contraseña ingresada con la encriptada
    const esValida = await bcrypt.compare(contrasena, user.contrasena);
    if (!esValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // 3. Si todo está bien, puedes devolver los datos del usuario
    res.status(200).json({
      message: 'Login exitoso'
    });

  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor', detalles: error.message });
  }
};