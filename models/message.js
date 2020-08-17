// Message Schema defined here
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    message_text: {type: String, required: true, maxlength: 150},
    user_name: {type: String, required: true, maxlength: 100},
    // date_of_post: {type: Date},
  }
);

// Virtual for post date formatted
MessageSchema
  .virtual('date_of_post_formatted')
  .get(function () {
      var now = moment();

    if (this.date_of_post) {
      return moment(now).format('MMMM Do, YYYY');
    }
    else return 'N/A';
});

// Virtual for author's URL
// MessageSchema
//   .virtual('url')
//   .get(function () {
//     return '/catalog/author/' + this._id;
// });

//Export model
module.exports = mongoose.model('Message', MessageSchema);