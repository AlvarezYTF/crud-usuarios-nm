const express = require('express');
const router = express.Router();

// Ruta de prueba temporal
router.get('/', (req, res) => {
  res.send('');
});

module.exports = router;