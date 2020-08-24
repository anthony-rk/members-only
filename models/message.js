// Message Schema defined here
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    message_title: {type: String, required: true, maxlength: 150},
    message_text: {type: String, required: true, maxlength: 150},
    username: {type: String, required: true, maxlength: 100},
    // date_of_post: {type: Date},
  }
);

// Virtual for post date formatted
MessageSchema
  .virtual('date_of_post_formatted')
  .get(function () {
      var now = moment();
      return moment(now).format('MMMM Do, YYYY');
});

// Export model
module.exports = mongoose.model('Message', MessageSchema);