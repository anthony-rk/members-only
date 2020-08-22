var Message = require('../models/message');
var User = require('../models/user');

var async = require('async');
// var debug = require('debug')('author');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Messages
exports.get_message_list = function(req, res, next) {

    Message.find()
      .populate('message')
      .sort([['date_of_post_formatted', 'descending']])
      .exec(function (err, list_message) {
        if (err) { return next(err); }
        // Successful, so render
        res.render('messages', { title: 'Message Board', message_list: list_message });
      }); 
};

// Display Message create form on GET.
exports.message_create_get = function(req, res) {
    res.render('new_post_form', { title: 'New Post'} );
};