const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/comment');
const auth = require('../middelware/auth');

//////////////////// ROUTES POSTS ////////////////////
router.post('/', auth, postCtrl.createComment);
router.get('/:id', auth, postCtrl.AllCommentsPost);
router.get('/:id/comments', auth, postCtrl.CommentsProfil);
router.put('/:id', auth, postCtrl.modifyComment);
router.delete('/:id', auth, postCtrl.deleteComment);
router.delete('/', auth, postCtrl.adminDeleteComment);

module.exports = router;