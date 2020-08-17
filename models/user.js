// User Schema defined here
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    membership_status: {type: String, required: true, enum: ['Non-Member', 'Member', 'Admin'], default: 'Non-Member'},
});

// Virtual for user's full name
UserSchema
  .virtual('name')
  .get(function () {

  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case

  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }

  return fullname;
});

//Export model
module.exports = mongoose.model('User', UserSchema);