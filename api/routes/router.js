/******************************************************************************
 *  @Purpose        : To provide routes to each webpages. 
 *  @file           : routes.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 02-03-2019
 ******************************************************************************/
const express = require('express');
const router = express.Router();
const middle = require('../authentication/authentication')
const userController = require('../controller/userController')
const chatControllers = require("../controller/chatController");
router.post('/login',userController.login);
router.post('/register',userController.registration);
router.post('/forgotpassword', userController.forgotPassword);
router.post('/resetPassword/:token', middle.checkToken, userController.setPassword);
router.post('/addMessage', chatControllers.addMessage);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getAllChats', chatControllers.getAllUserChats);
module.exports = router;