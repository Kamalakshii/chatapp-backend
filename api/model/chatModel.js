/******************************************************************************
 *  @Purpose        : To create a chat schema and store data into database.
 *  @file           : chatModel.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @version        : v0.1
 *  @since          : 03-03-2019
 ******************************************************************************/
mongoose = require('mongoose');
/**
 * to create instance of Schema
 **/
var mongoSchema = mongoose.Schema;
/**
 * to create schema
 **/
var chatSchema = new mongoSchema({
    'senderId': {
        type: String,
        required: [true, "Sender Id is required"]
    },
    'recieverId': {
        type: String,
        required: [true, "Reciever Id is required"]
    },
    'message': {
        type: String,
        required: [true, " Message is required "]
    }
}, {
        timestamps: true
    });
function chatModel() {}
var chat = mongoose.model('chatInfo', chatSchema);
chatModel.prototype.addMessage = (chatData, callback) => {
     console.log("chat models => ",chatData);
      console.log('chatData model-->', chatData);
      const newMsg = new chat({
          'senderId': chatData.senderId,
          'recieverId': chatData.recieverId,
          'message': chatData.message
      });
      newMsg.save((err, result) => {
          if (err) {
              console.log("message saved error");
              return callback(err);
          } else {
              console.log("message saved successfully ");
              return callback(null, result);
          }
      });
  }

chatModel.prototype.getAllUserChats = (callback) => {
    chat.find({}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

module.exports = new chatModel();

