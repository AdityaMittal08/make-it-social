const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const verifyJWT = require('../../middlewares/verifyJWT');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/refresh', authController.refresh);

router.get('/me', verifyJWT, authController.me);

module.exports = router;