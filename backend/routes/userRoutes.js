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

// Routes de crud
router.get('/users', auth, userController.getUsers);
router.get('/users/:id', userController.getUserId);
router.get('/users/documento/:documento', userController.buscarDocumento);
router.post('/users', upload.single('imagen'), userController.createUser);
router.put('/users/:id', upload.single('imagen'), auth, userController.updateUser);
router.delete('/users/:id', auth, userController.deleteUser);

// routes de usuario 
router.get('/users/:id', auth, userController.getUserId);
router.put('/users/:id/password', userController.updatePassword);
router.get('/perfil', auth, userController.getPerfil);

//route login
router.post('/login', loginController.login);

module.exports = router;