const express = require('express');
const router = express.Router();
const upload = require("../middlewares/upload");
const aprendicesController = require("../controllers/aprendicesController");

// Ruta de prueba temporal
router.get('/', (req, res) => {
  res.send('');
});

router.put("/aprendices/:id", upload.single("imagen"), aprendicesController.update);

module.exports = router;