const express = require('express');
const router = express.Router();
const User = require ("../models/User")
const {eliminarUsuario} = require('..//controllers//userController');

// Ruta de prueba temporal
router.get('/', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({error: 'Error al obtener los usuarios'})
  }
});

router.delete('/users/:id', eliminarUsuario);

module.exports = router;