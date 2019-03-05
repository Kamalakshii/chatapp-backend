const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
let saltRounds = 10;
/**
 * Creating user schema using mongoose
 **/
const UserSchema = mongoose.Schema({
    firstName: {
        type: String, require: [true, "FirstName require"]
    },
    lastName: {
        type: String, require: [true, "LastName require"]
    },
    email: {
        type: String, require: [true, "Email require"]
    },
    password: {
        type: String, require: [true, "Password require"]
    },
},
    {
        timestamps: true
    });
var user = mongoose.model('User', UserSchema);
function userModel() { }
/**
 * Saving data into database using the user schema
 **/
userModel.prototype.registration = (body, callback) => {
    /**
     * Find the user by Email in database if user with same Email exists
     **/
    console.log("before =>",body);
    
    user.find({ "email": body.email },(err, data) => {
        console.log("data===>",data);
        if (err) {
            console.log("Error in registration");
            callback(err);
        }
        else {
            if (data > 0) {
                console.log("Email already exists");
                callback("User already present");
            }
            else {
                /**
                 * Create hash value of user password
                 **/
                body.password1 = bcrypt.hashSync(body.password, saltRounds);
                var newUser = new user({
                    "firstname": body.firstname,
                    "lastname": body.lastname,
                    "email": body.email,
                    "password": body.password1,
                })
                newUser.save((err, result) => {
                    if (err) {
                        console.log("Model not found");
                        callback(err);
                    } else {
                        console.log("Registered Successfully");
                        callback(null,result);
                    }
                })
            }
        }
    });
}
/**
 * Finding user into database using the findOne()
 **/
userModel.prototype.login = (body, callback) => {
    console.log("model ", body);
    user.findOne({ "email": body.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else if (result != null) {
            bcrypt.compare(body.password, result.password).then(function (res) {
                if (res) {
                    console.log("Login Succesfully");
                    callback(null, res);
                } else {
                    console.log("Incorrect password");
                    callback("Incorrect password");
                }
            });
        } else {
            console.log("invalid user");
            callback("invalid user");
        }
    });
}
userModel.prototype.updateUserPassword = (req, callback) => {
    console.log("before...",req.body.password);
    let newPassword = bcrypt.hashSync(req.body.password, saltRounds);
    console.log('new pass bcrypt--', newPassword);
    user.updateOne({ _id: req.decoded.payload.user_id }, { password: newPassword }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    });
}
/**
 * Finding user email into database using the findOne()
 */
userModel.prototype.forgotPassword = (data, callback) => {
    user.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            if (result !== null && data.email == result.email) {
                callback(null, result);
            }
            else {
                callback("Incorect mail")
            }
        }
    });
}

userModel.prototype.findUserEmail = (data, callback) => {
    user.findOne({ "Email": data.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            if (result !== null && data.email == result.email) {
                callback(null, result);
            }
            else {
                callback("incorect mail")
            }
        }
    });
}

userModel.prototype.getAllUsers = (callback) => {
    user.find({}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}
module.exports = new userModel();