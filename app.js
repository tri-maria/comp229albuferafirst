//installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//route for top level sites
let indexRouter = require('./routes/index');

//path or slah for URL ex. http://localhost:3000/users
let usersRouter = require('./routes/users');
//instance of express app
let app = express();

// VIEWS engine setup path.join-->built in module for nodejs--views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //express -e configure view engine to ejs (directive to index.ejs)
//app.set("views", "path/to/views");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//anything that is put inside the publid  folder is path of a path available for everybody
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'views')));

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
 // res.render('error', { title: 'Error' });
    res.render('error', { title: "Error"});
});

module.exports = app;
