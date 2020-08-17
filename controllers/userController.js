var Message = require('../models/message');
var User = require('../models/user');

// var async = require('async');
// var debug = require('debug')('author');

// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');

// Display list of all Users.
exports.get_user_list = function(req, res, next) {

    User.find()
      .populate('user')
      .sort([['user_name', 'ascending']])
      .exec(function (err, list_users) {
        if (err) { return next(err); }
        // Successful, so render
        res.render('user_list', { title: 'User List', user_list: list_users });
      }); 
  
};