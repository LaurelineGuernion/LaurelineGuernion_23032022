const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middelware/auth');
const multer = require('../middelware/multer-config');

//////////////////// ROUTES USER ////////////////////
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/:id', auth, userCtrl.findUser);
router.get('/', auth, userCtrl.findAllUsers);
router.put('/:id', auth, multer, userCtrl.updateInfo);
router.put('/:id/savephoto', auth, multer, userCtrl.savePhoto);
router.put('/:id/updateemail', auth, userCtrl.updateEmail);
router.put('/:id/updatepassword', auth, userCtrl.updatePassword);
router.delete('/:id', auth, userCtrl.delete);

module.exports = router;