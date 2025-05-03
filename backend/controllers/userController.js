const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

exports.getUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(id,{$set: req.body},{ new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  };

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Usuario eliminado' });
};

exports.updatePassword = async (req, res) => {
    const { id } = req.params;
    const { contrasenaActual, nuevaContrasena } = req.body;
  
    if (!contrasenaActual || !nuevaContrasena) {
      return res.status(400).json({ message: 'Debes enviar la contraseña actual y la nueva' });
    }
  
    try {
      const user = await User.findById(id).select('+contrasena'); // ← Aquí el cambio
  
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  
      const match = await bcrypt.compare(contrasenaActual, user.contrasena);
      if (!match) return res.status(401).json({ message: 'La contraseña actual es incorrecta' });
  
      user.contrasena = nuevaContrasena; // ← se vuelve a hashear automáticamente por el middleware .pre('save')
      await user.save();
  
      res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };  