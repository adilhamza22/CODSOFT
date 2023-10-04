const express = require('express');
const postController = require('../controllers/post.controller');
const authController = require('../auth/auth.js');

const router = express.Router();

router.get('/', postController.getAllPublihsedPosts);
router.get('/:postId', postController.getPostById);
//crud routes remaining

module.exports = router;