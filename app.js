require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const cors = require('cors');
const app = express();

const users = require('./routes/users');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: false, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
require('./routes/auth')(app, passport);

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
