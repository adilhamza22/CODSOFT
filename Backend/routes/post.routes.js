const express = require('express');
const postController = require('../controllers/post.controller');
const authController = require('../auth/auth.js');

const router = express.Router();

router.get('/', postController.getAllPublihsedPosts);
router.get('/:postId', postController.getPostById);
//crud routes remaining
//create post route 
router.post("/create",postController.createPost);

module.exports = router;