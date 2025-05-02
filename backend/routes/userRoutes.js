const express = require('express');
const router = express.Router();
const { updateUser } = require('../controllers/userController');

router.get('/', (req, res) => {
  res.send('');
});

router.put('/users/:id', updateUser);
router.put('/users/:id/password', updatePassword);

module.exports = router;