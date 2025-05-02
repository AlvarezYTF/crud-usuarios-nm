const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/:id', userController.getOne); // ruta para traer un usuario individual
router.get('/', userController.getAll); // ruta para traer todos los usuarios

module.exports = router;