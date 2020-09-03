// Message Schema defined here
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    message_title: {type: String, required: true, maxlength: 150},
    message_text: {type: String, required: true, maxlength: 150},
    username: {type: String, required: true, maxlength: 100},
    timestamp: { type: Date, default: Date.now() },
  }
);

// Virtual for post date formatted
MessageSchema
  .virtual('date_of_post_formatted')
  .get(function () {
      if (this.timestamp) {
        var timestampFormatted = moment(this.timestamp).format('MMMM Do, YYYY');
        return timestampFormatted;
      }
      var now = moment();
      return moment(now).format('MMMM Do, YYYY');
});

// Export model
module.exports = mongoose.model('Message', MessageSchema);