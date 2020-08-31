if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Added the following 
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const User = require('./models/user');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Setup MongoDB connection
const mongoDb = process.env.DB_HOST;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

// Create the Express application object
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// PassportJS Authentication below
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        };
        if (!user) {
          return done(null, false, { msg: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return done(null, user)
            } else {
              // passwords do not match!
              return done(null, false, {msg: "Incorrect password"})
            }
          })
        return done(null, user);
      });
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// Set up Route Handling
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

// Log in || Log out //
app.post(
  "/users/log-in",
  passport.authenticate("local", {
      successRedirect: "/messages",
      failureRedirect: "/users/log-in",
      failureFlash: true
  })
);

app.get("/users/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Remove this once working
// Remove this once working
// Remove this once working
// app.post("/users/become-member", (req, res, next) => {
//     console.log(req.user.username)
//     // Validate fields.
//     body('secret_password').isLength({ min: 1 }).trim().withMessage('Password must be specified.'),
    
//     // Sanitize fields.
//     sanitizeBody('secret_password').escape(),
    
//     // Check if input is equal to the secret word
//     // If so then set User membership status to Member
//     // Process request after validation and sanitization.
//     (req, res, next) => {
//         // Extract the validation errors from a request.
//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             // There are errors. Render form again with sanitized values/errors messages.
//             res.render('become_a_member', { title: 'Become a Member', user: req.user, errors: errors.array()});
//             return;
//         }
//         else {
//             // Data from form is valid.
//             User.findOneAndUpdate({username: req.user.username },  
//                 {membership_status:"Member"}, null, function (err) { 
//                 if (err) { 
//                     console.log(err)
//                     return next(err)
//                 } 
//                 res.redirect("/messages");
//             }); 
//           }
//     }
//   })
// Remove this once working
// Remove this once working
// Remove this once working

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
