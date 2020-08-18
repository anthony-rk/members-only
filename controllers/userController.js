var Message = require('../models/message');
var User = require('../models/user');
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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

// Display User create form on GET.
exports.user_create_get = function(req, res) {
    res.render('new_user_sign_up_form', { title: 'New User Sign Up'} );
};

// Handle Author create on POST.
exports.user_create_post = [
    
    // Validate fields.
    body('user_name').isLength({ min: 1 }).trim().withMessage('User name must be specified.'),
    body('password').isLength({ min: 1 }).trim().withMessage('Password must be specified.'),
    body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),


    // Sanitize fields.
    sanitizeBody('user_name').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('first_name').escape(),
    sanitizeBody('family_name').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {


        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('new_user_sign_up_form', { title: 'New User Sign Up', errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create a User object with escaped and trimmed data.
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    // if err, do something
                    if (err) { 
                        return next(err);
                    };
                    // otherwise, store hashedPassword in DB
                    const user = new User({
                        user_name: req.body.user_name,
                        password: hash,
                        first_name: req.body.first_name,
                        family_name: req.body.family_name,
                        membership_status: 'Non-Member'
                    }).save(err => {
                        if (err) { 
                            return next(err);
                        };
                        res.redirect("/");
                    })
            });
        })
    }
}];