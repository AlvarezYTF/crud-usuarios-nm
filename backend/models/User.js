const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  primerNombre: {
    type: String,
    required: [true, 'El primer nombre es obligatorio.']
  },
  segundoNombre: {
    type: String
  },
  primerApellido: {
    type: String,
    required: [true, 'El primer apellido es obligatorio.']
  },
  segundoApellido: {
    type: String
  },
  correo: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
  },
  contrasena: {
    type: String,
    required: [true, 'La contraseña es obligatoria.'],
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres.'],
    select: false
  },
  imagen: {
    type: String
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es obligatorio.'],
    match: [/^\d{7,15}$/, 'Por favor, introduce un número de teléfono válido.']
  },
  direccion: {
    type: String,
    required: [true, 'La dirección es obligatoria.']
  },
  ciudad: {
    type: String,
    required: [true, 'La ciudad es obligatoria.']
  },
  pais: {
    type: String,
    required: [true, 'El país es obligatorio.']
  },
  lugarNacimiento: {
    type: String,
    required: [true, 'El país es obligatorio.']
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
    required: [true, 'La fecha de nacimiento es obligatoria.']
  },
  estado: {
    type: Boolean,
    default: true
  },
  rol: {
    type: String,
    enum: ['admin', 'usuario'],
    default: 'usuario'
  },
  loginAttempts: {
    type: Number,
    default: 0,
    select: false
  },
  lockUntil: {
    type: Date,
    select: false
  }
}, {
  timestamps: true
});

// Middleware para convertir campos a mayúsculas al guardar
UserSchema.pre('save', function (next) {
  this.primerNombre = this.primerNombre.toUpperCase();
  this.segundoNombre = this.segundoNombre.toUpperCase();
  this.primerApellido = this.primerApellido.toUpperCase();
  this.segundoApellido = this.segundoApellido.toUpperCase();  
  this.ciudad = this.ciudad.toUpperCase();
  this.pais = this.pais.toUpperCase();
  this.lugarNacimiento = this.lugarNacimiento.toUpperCase();
  this.direccion = this.direccion.toUpperCase();
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();

  if (update && update.$set) {
    const fields = [
      'primerNombre',
      'segundoNombre',
      'primerApellido',
      'segundoApellido',
      'ciudad',
      'pais',
      'lugarNacimiento',
      'direccion'
    ];

    fields.forEach(field => {
      if (update.$set[field]) {
        update.$set[field] = update.$set[field].toUpperCase();
      }
    });
  }

  next();
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

const User = mongoose.model('User', UserSchema);

module.exports = User;

