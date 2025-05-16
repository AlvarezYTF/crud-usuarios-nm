const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

exports.getUserId = async (req, res) => {
  console.log("ID recibido:", req.params.id);
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

exports.buscarDocumento = async (req, res) => {
  try {
    const documento = req.params.documento;
    const usuario = await User.findOne({ numeroDocumento: documento });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar por documento' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const { correo, numeroDocumento } = data;

    // Verificar si el correo ya está registrado
    const existeCorreo = await User.findOne({ correo });
    if (existeCorreo) {
      // Eliminar la imagen si se subió
      if (req.file) {
        const fs = require("fs");
        const path = require("path");
        const filePath = path.join(__dirname, "../uploads", req.file.filename);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error al eliminar la imagen:", err);
          }
        });
      }
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Verificar si el número de documento ya está registrado
    const existeDocumento = await User.findOne({ numeroDocumento });
    if (existeDocumento) {
      // Eliminar la imagen si se subió
      if (req.file) {
        const fs = require("fs");
        const path = require("path");
        const filePath = path.join(__dirname, "../uploads", req.file.filename);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error al eliminar la imagen:", err);
          }
        });
      }
      return res.status(400).json({ error: "El número de documento ya está registrado" });
    }

    // Asignar la imagen si se subió
    if (req.file) {
      data.imagen = req.file.filename;
    }

    // Crear el nuevo usuario
    const user = new User(data);
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al registrar el usuario" });

    // Eliminar la imagen si se subió
    if (req.file) {
      const fs = require("fs");
      const path = require("path");
      const filePath = path.join(__dirname, "../uploads", req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error al eliminar la imagen:", err);
        }
      });
    }
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener el usuario actual
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar la imagen anterior si se subió una nueva
    if (req.file) {
      const fs = require("fs");
      const path = require("path");
      const oldImagePath = path.join(__dirname, "../uploads", user.imagen);

      // Eliminar la imagen anterior
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error al eliminar la imagen anterior:", err);
        }
      });

      // Actualizar la imagen con la nueva
      user.imagen = req.file.filename;
    }

    // Actualizar los demás campos del usuario
    Object.assign(user, req.body);
    const updatedUser = await user.save();

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error actualizando usuario:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Error de validación", errors: error.errors });
    }

    return res.status(500).json({ message: "Error del servidor" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioEliminado = await User.findByIdAndDelete(id);

    if (!usuarioEliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

exports.updatePassword = async (req, res) => {
  const { id } = req.params;
  const { contrasenaActual, nuevaContrasena } = req.body;

  if (!contrasenaActual || !nuevaContrasena) {
    return res
      .status(400)
      .json({ message: "Debes enviar la contraseña actual y la nueva" });
  }

  try {
    const user = await User.findById(id).select("+contrasena");

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const match = await bcrypt.compare(contrasenaActual, user.contrasena);
    if (!match)
      return res
        .status(401)
        .json({ message: "La contraseña actual es incorrecta" });

    user.contrasena = nuevaContrasena; // se vuelve a hashear automáticamente por el middleware .pre('save')
    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.getPerfil = async (req, res) => {
  try {
    const userId = req.user.id;
    const usuario = await User.findById(userId);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const nuevaImagen = req.file ? req.file.filename : null;

    if (!nuevaImagen)
      return res.status(400).json({ mensaje: "No se subió ninguna imagen" });

    const usuario = await Usuario.findByIdAndUpdate(
      userId,
      { imagen: nuevaImagen },
      { new: true }
    );
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.json({ mensaje: "Imagen actualizada correctamente", usuario });
  } catch (error) {
    console.error("Error al actualizar imagen:", error);
    res.status(500).json({ mensaje: "Error al actualizar la imagen" });
  }
};
