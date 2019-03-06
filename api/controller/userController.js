/******************************************************************************
 *  @Purpose        : To create user controller to handle the incoming data. 
 *  @file           : userController.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @version        : v0.1
 *  @since          : 03-02-2019
 ******************************************************************************/
const userService = require("../services/userService");
const sent = require('../middleware/nodemailer');
const token = require('../middleware/token');
/**
 * @param {*} req 
 * @param {*} res 
 */
exports.login = (req, res) => {
    console.log("login ==>req",req);    
   try {
    req.checkBody('email', 'Invaild email').isEmail();
     req.checkBody('password', 'Invaild password').isLength({
        min: 8
    });
     var errors = req.validationErrors();
     var response = {};
     if (errors) {
         response.status = false;
         response.error = errors;
         return res.status(422).send(response);
     } else {
      var responseResult = {};
      userService.login(req.body, (err, result) => {
        console.log("responce in controller==>",result);
        if (err) {
          responseResult.status = false;
          responseResult.message = 'Login Failed';
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.message = 'Login Successful';          
          responseResult.result = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (err) {
     res.send(err);
   }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.registration = (req, res) => {
    try {
         req.checkBody('firstname', 'Invaild firstname').isLength({
             min: 3
         }).isAlpha();
         req.checkBody('lastname', 'Invaild lastname').isLength({
             min: 3
         }).isAlpha();
         req.checkBody('email', 'Invaild email').isEmail();
         req.checkBody('password', 'Invaild password').isLength({
             min: 6
         });
         var errors = req.validationErrors();
         var response = {};
         if (errors) {
             response.status = false;
             response.error = errors;
         return res.status(422).send(response);
         } else {
            var responseResult = {}
            userService.registration(req.body, (err, result) => {
                
                
                if (err) {
                    responseResult.status = false;
                    responseResult.message = 'Registration Failed';
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.message = 'Registration Successful';
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (err) {
         res.send(err);
     }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.forgotPassword = (req, res) => {
    console.log("request in controllert==>",req.body);    
    try {
        var responseResult = {};
        userService.forgotPassword(req.body, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                const payload = {
                    user_id: responseResult.result._id
                }
               // console.log(payload);
                const obj = token.GenerateToken(payload);
                const url = `http://localhost:3000/resetPassword/${obj.token}`;
                sent.sendEMailFunction(url);
                res.status(200).send(url);
            }
        })
    } catch (err) {
        res.send(err);
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setPassword = (req, res) => {
    try {
        var responseResult = {};
        console.log('in user ctrl send token is verified response');
        userService.resetpassword(req, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                console.log('in user ctrl token is verified giving response');
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (err) {
        res.send(err);
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.sendResponse = (req, res) => {
    try {
        var responseResult = {};
        console.log('In user control send token is the verified response');
        userService.redirect(req.decoded, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                console.log('In user control token is verified giving response');
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (err) {
        res.send(err);
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getUser = (req, res) => {
    try {
        var responseResult = {};
        userService.getUserEmail(req.body, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                const payload = {
                    user_id: responseResult.result._id
                }
                console.log(payload);
                const obj = token.GenerateToken(payload);
                const url = `http://localhost:1996/resetPassword/${obj.token}`;
                sent.sendEMailFunction(url);
                res.status(200).send(url);
            }
        })
    } catch (err) {
        res.send(err);
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllUsers = (req, res) => {
    try {
        var responseResult = {}
        userService.getAllUsers((err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (err) {
        res.send(err);
    }
}


