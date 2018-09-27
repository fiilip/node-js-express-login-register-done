const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require("express-session");
const pass = require("./workers/passport");
const passport = require("passport");
const MySQLStore = require("express-mysql-session")(session);

const indexRouter = require('./routes/index');
const deleteUserRouter = require("./routes/deleteUser");
const registerUserRouter = require("./routes/registerUser");
const updateUserRouter = require("./routes/registerUser");
const loginRouter = require("./routes/loginUser");
const safeRouter = require("./routes/safe");
const logoutRouter = require("./routes/logoutUser");
const GoToRegister = require("./routes/Register");
const ShowTable = require("./routes/ShowTable");

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = require("./workers/dbConfig");
const sessionStore = new MySQLStore(dbConfig);

app.use(session({
    secret:"14e8wq98e4qw@4wq4",
    resave: false,
    store:sessionStore,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use("/delete",deleteUserRouter);
app.use("/register", registerUserRouter);
app.use("/update", updateUserRouter);
app.use("/login",loginRouter);
app.use("/safe", safeRouter);
app.use("/logout",logoutRouter);
app.use("/Register",GoToRegister);
app.use("/Table",ShowTable);

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
