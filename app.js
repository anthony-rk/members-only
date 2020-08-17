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
const ejs = require("ejs");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv")
dotenv.config();

// Setup MongoDB connection
const mongoDb = process.env.DB_HOST;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// const User = mongoose.model(
//   "User",
//   new Schema({
//     user_name: { type: String, required: true },
//     password: { type: String, required: true },
//     first_name: { type: String, required: true },
//     last_name: { type: String, required: true }
//   })
// );

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

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

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
