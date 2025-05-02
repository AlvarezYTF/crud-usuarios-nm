const mongoose = require('mongoose');

const userEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre completo es un campo obligatorio'],
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no debe superar los 100 caracteres'],
        match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios']
    },
    correo: {
        type: String,
        required: [true, 'El correo es un campo obligatorio'],
        match: [/\S+@\S+\.\S+/, 'Correo electrónico inválido']
    },
    imagen: {
        type: String,
        default: ''
    },
    telefono: {
        type: String,
        required: [true, 'El número de teléfono es un campo obligatorio'],
        match: [/^\d{10}$/, 'El número telefónico debe contener 10 dígitos']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección de residencia es un campo obligatorio'],
        minlength: [5, 'La dirección debe contener al menos 5 caracteres'],
        maxlength: [100, 'La dirección no debe superar los 100 caracteres'],
        match: [/^[a-zA-Z0-9\s\#\-\.\,]+$/, 'La dirección contiene caracteres inválidos']
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es un campo obligatorio']
    },
    pais: {
        type: String,
        required: [true, 'El país es un campo obligatorio']
    },
    tipoDocumento: {
        type: String,
        required: [true, 'El tipo de documento es un campo obligatorio'],
        enum: ['CC', 'TI', 'CE', 'Pasaporte']
    },
    numeroDocumento: {
        type: String,
        required: [true, 'El número de documento es un campo obligatorio'],
        minlength: [6, 'El documento debe tener mínimo 6 caracteres'],
        maxlength: [15, 'El documento no debe superar los 15 caracteres'],
        match: [/^\d+$/, 'El documento solo debe contener números'],
        unique: true
    },
    fechaNacimiento: {
        type: Date, 
        required: [true, 'La fecha de nacimiento es un campo obligatorio'],
        validate: {
            validator: value => value < new Date(),
            message: 'La fecha de nacimiento no puede ser futura'
        }
    },
    estado: {
        type: Boolean,
        default: true
    }
});

userEsquema.pre('save' , function (next) {
    this.nombre = this.nombre.toUpperCase();
    this.ciudad = this.ciudad.toUpperCase();
    this.pais = this.pais.toUpperCase();
    this.direccion = this.direccion.toUpperCase();
    next();
});

userEsquema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.nombre) update.nombre = update.nombre.toUpperCase();
    if (update.ciudad) update.ciudad = update.ciudad.toUpperCase();
    if (update.pais) update.pais = update.pais.toUpperCase();
    if (update.direccion) update.direccion = update.direccion.toUpperCase();
});

module.exports = mongoose.model('User', userEsquema);