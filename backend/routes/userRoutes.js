const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserId);
router.get('/users/documento/:documento', userController.buscarDocumento);
router.post('/users', upload.single('imagen'), userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.put('/users/:id/password', userController.updatePassword);
router.get('/perfil', auth, userController.getPerfil);

router.post('/login', loginController.login);

module.exports = router;