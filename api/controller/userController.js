const userService = require("../services/userService");
const sent = require('../middleware/nodemailer');

const token = require('../middleware/token');
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