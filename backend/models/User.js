const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definición del esquema para el modelo User
const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio.']
  },
  correo: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Por favor, introduce un correo electrónico válido.'] // Valida el formato del correo
  },
  contrasena: {
    type: String,
    required: [true, 'La contraseña es obligatoria.'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres.'],
    select: false // Indica que este campo no se incluirá por defecto en las consultas
  },
  imagen: {
    type: String,
    default: null
  },
  telefono: {
    type: String,
    default: null,
    match: [/^\d{7,15}$/, 'Por favor, introduce un número de teléfono válido.'] // Valida el formato del teléfono (7 a 15 dígitos)
  },
  direccion: {
    type: String,
    default: null
  },
  ciudad: {
    type: String,
    default: null
  },
  pais: {
    type: String,
    default: null
  },
  tipoDocumento: {
    type: String,
    required: [true, 'El tipo de documento es obligatorio.'],
    enum: {
      values: ['CC', 'TI', 'CE', 'Pasaporte'],
      message: 'El tipo de documento debe ser CC, TI, CE o Pasaporte.'
    }
  },
  numeroDocumento: {
    type: String,
    required: [true, 'El número de documento es obligatorio.'],
    unique: true,
    trim: true,
    match: [/^[a-zA-Z0-9]+$/, 'El número de documento no debe contener espacios ni caracteres especiales.']
  },
  fechaNacimiento: {
    type: Date,
    default: null
  },
  estado: {
    type: Boolean,
    default: true,
    comment: 'Indica si el usuario está activo (true) o inactivo (false)'
  }
}, {
  timestamps: true // Habilita automáticamente los campos createdAt y updatedAt (reemplaza fechaCreacion y fechaActualizacion manuales)
});

// Middleware para encriptar la contraseña antes de guardar
UserSchema.pre('save', async function(next) {
  if (!this.isModified('contrasena')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar la contraseña ingresada con la contraseña encriptada
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.contrasena);
};

UserSchema.statics.getAll = async function() {
    return await this.find();
  };
  
  UserSchema.statics.getOne = async function(id) {
    return await this.findById(id);
  };

const User = mongoose.model('User', UserSchema);

module.exports = User;