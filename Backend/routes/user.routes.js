const express = require('express');
const authController = require('../auth/auth.js');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/author', authController.authenticate, userController.getAllPosts);

router.post('/auth/signup',authController.signup);
router.post('/auth/login',authController.login);

module.exports = router;