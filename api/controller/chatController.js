/******************************************************************************
 *  @Purpose        : To create chat controller to handle the incoming data. 
 *  @file           : chatController.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @version        : v0.1
 *  @since          : 03-03-2019
 ******************************************************************************/

const chatServices = require('../services/chatService');
/**
 * 
 * @param {*} req 
 * @param {*} callback 
 */
module.exports.addMessage = (req, callback) => {
    chatServices.addMessage(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getAllUserChats = (req, res) => {
    var responseResult = {};
    chatServices.getAllUserChats((err, result) => {
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
}