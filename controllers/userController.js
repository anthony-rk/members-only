// var Message = require('../models/message');
var User = require('../models/user');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("express-flash");

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Users.
exports.get_user_list = function(req, res, next) {

    User.find()
      .populate('user')
      .sort([['username', 'ascending']])
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
    body('username').isLength({ min: 1 }).trim().withMessage('User name must be specified.'),
    body('password').isLength({ min: 1 }).trim().withMessage('Password must be specified.'),
    body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),


    // Sanitize fields.
    sanitizeBody('username').escape(),
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
                        username: req.body.username,
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

// Display User log-in form on GET.
exports.user_login_get = function(req, res, next) {
    res.render('user_login_form', { title: 'User Log In'} );
};

// Handle User login.
// exports.user_login_post = function(req, res, next) {
//     // res.render('user_login_form', { title: 'User Log In'} );
//       passport.authenticate("local", {
//       successRedirect: "/",
//       failureRedirect: "/users/log-in",
//       failureFlash: true
//   })
// };

// Handle User logout.
// exports.user_logout_get = function(req, res, next) {
//     req.logout();
//     res.redirect("/");
// };

// app.post(
//   "/log-in",
//   passport.authenticate("local", {
//       successRedirect: "/",
//       failureRedirect: "/"
//   })
// );
// app.get("/log-out", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });