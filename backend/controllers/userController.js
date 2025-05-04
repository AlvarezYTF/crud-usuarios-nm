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
    console.log('ID recibido:', req.params.id);
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
    try {
      const data = req.body;

      // Si se envió una imagen, guardar el nombre del archivo
      if (req.file) {
        data.imagen = req.file.filename; // O usar la ruta completa si quieres servirla
      }

      const { correo, numeroDocumento } = data;

      const existeCorreo = await User.findOne({ correo });
      if (existeCorreo) {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }

      const existeDocumento = await User.findOne({ numeroDocumento });
      if (existeDocumento) {
        return res.status(400).json({ error: 'El número de documento ya está registrado' });
      }

      const user = new User(data);
      await user.save();

      res.status(201).json(user);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error al registrar el usuario' });
    }
  };

  exports.updateUser = async (req, res) => {
    const { id } = req.params;

    try {
      const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
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
    try {
      const { id } = req.params;

      const usuarioEliminado = await User.findByIdAndDelete(id);

      if (!usuarioEliminado) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
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