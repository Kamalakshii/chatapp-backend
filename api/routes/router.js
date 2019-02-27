
const express = require('express');
const router = express.Router();
const middle = require('../authentication/authentication')
const userController = require('../controller/userController')
router.post('/login',userController.login);
router.post('/register',userController.registration);
router.post('/forgotpassword', userController.forgotPassword);
router.post('/resetpassword/:token', middle.checkToken, userController.setPassword);
module.exports = router;
