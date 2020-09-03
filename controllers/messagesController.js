var Message = require('../models/message');
var User = require('../models/user');

var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Messages
exports.get_message_list = function(req, res, next) {

    Message.find()
      .populate('message')
      .sort([['message_title', 'ascending']])
      .exec(function (err, list_message) {
        if (err) { return next(err); }
        // Successful, so render
        res.render("messages", { title: 'Secret Message Board', user: req.user,  message_list: list_message, });
      }); 
};

// Display Message create form on GET.
exports.message_create_get = function(req, res) {
    res.render('new_post_form', { title: 'New Post'} );
};

// Handle Message create on POST.
exports.message_create_post = [
    
    // Validate fields.
    body('message_title').isLength({ min: 1, max: 150 }).trim().withMessage('Message must be <150 characters.'),
    body('message_text').isLength({ min: 1, max: 150 }).trim().withMessage('Message must be <150 characters.'),

    // Sanitize fields.
    sanitizeBody('message_text').escape(),
    sanitizeBody('message_title').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {


        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('new_post_form', { title: 'New Post', errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            const message = new Message({
                username: req.user.username,
                message_title: req.body.message_title,
                message_text: req.body.message_text,
            
            }).save(err => {
                if (err) { 
                    return next(err);
                };
                res.redirect("/messages");
            })
        };
}];

// Delete Message on GET
exports.message_delete_get = function (req, res, next) {
      Message.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
          return next(err);
        }
      });
    res.redirect("/messages");
};