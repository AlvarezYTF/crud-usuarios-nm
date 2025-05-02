const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  tipoDocumento: String,
  numeroDocumento: String,
  primerNombre: String,
  segundoNombre: String,
  primerApellido: String,
  segundoApellido: String,
  telefono: String,
  direccion: String,
  fechaNacimiento: Date,
  nacionalidad: String,
  lugarNacimiento: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);