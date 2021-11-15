const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middelware/auth');
const multer = require('../middelware/multer-config');


// ------------------- Route User ------------------- 
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/:id', auth, userCtrl.findUser);
router.get('/:id', auth, userCtrl.findAllUsers);
router.put('/:id', auth, userCtrl.updateInfo);
router.put('/:id/updatepassword', auth, userCtrl.updatePassword);
router.post('/:id/savePhoto', auth, multer, userCtrl.savePhoto);
router.delete('/:id', auth, userCtrl.delete);

module.exports = router;