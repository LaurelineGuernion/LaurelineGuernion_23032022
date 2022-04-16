const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/comment');
const auth = require('../middelware/auth');
const multer = require('../middelware/multer-config');

//////////////////// ROUTES COMMENT ////////////////////
router.post('/', auth, multer, postCtrl.createComment);
router.get('/:id', auth, postCtrl.AllCommentsPost);
router.put('/:id', auth, multer, postCtrl.modifyComment);
router.delete('/:id', auth, postCtrl.deleteComment);

module.exports = router;