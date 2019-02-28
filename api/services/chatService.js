const chatModel = require('../application/model/chat.model')

exports.addMessage = (req, callback) => {
    chatModel.addMessage(req, (err, result) => {
        if (err) {

            return callback(err);
        } else {

            return callback(null, result);
        }
    })
}