var Message = require('../models/message');
var User = require('../models/user');
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

var async = require('async');

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

// Display User create form on GET.
exports.user_create_get = function(req, res) {
    res.render('new_user_sign_up_form', { title: 'New User Sign Up'} );
};

// Handle Author create on POST.
// exports.user_create_post = (req, res, next) => {
//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash(req.body.password, salt, function(err, hash) {
//             // if err, do something
//             if (err) { 
//                 return next(err);
//             };
//             // otherwise, store hashedPassword in DB
//             const user = new User({
//                 user_name: req.body.user_name,
//                 password: hash,
//                 first_name: req.body.first_name,
//                 family_name: req.body.family_name,
//                 membership_status: 'member'
//             }).save(err => {
//                 if (err) { 
//                     return next(err);
//                 };
//                 res.redirect("/");
//             });
//         });
//     });
// };

exports.user_create_post = (req, res, next) => {
     // Create an User object with escaped and trimmed data.
    const user = new User({
        user_name: req.body.user_name,
        password: req.body.password,
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        membership_status: 'Member'
    });
    console.log(user)
    user.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect 
        res.redirect('./');
    });
}

// exports.author_create_post = [

//     // Validate fields.
//     body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
//         .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
//     body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
//         .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
//     body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
//     body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

//     // Sanitize fields.
//     sanitizeBody('first_name').escape(),
//     sanitizeBody('family_name').escape(),
//     sanitizeBody('date_of_birth').toDate(),
//     sanitizeBody('date_of_death').toDate(),

//     // Process request after validation and sanitization.
//     (req, res, next) => {

//         // Extract the validation errors from a request.
//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             // There are errors. Render form again with sanitized values/errors messages.
//             res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
//             return;
//         }
//         else {
//             // Data from form is valid.

//             // Create an Author object with escaped and trimmed data.
//             var author = new Author(
//                 {
//                     first_name: req.body.first_name,
//                     family_name: req.body.family_name,
//                     date_of_birth: req.body.date_of_birth,
//                     date_of_death: req.body.date_of_death
//                 });
//             author.save(function (err) {
//                 if (err) { return next(err); }
//                 // Successful - redirect to new author record.
//                 res.redirect(author.url);
//             });
//         }
//     }
// ];