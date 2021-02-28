//installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//MODULES FOR AUTHENTICATION
let session = require('express-session');
let passport = require('passport'), LocalStrategy = require('passport-local').Strategy;;
let passportlocal = require('passport-local');
let flash = require('connect-flash');

//database setup
let mongoose = require('mongoose');
let DB = require('./config/db');

mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
//route for top level sites

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => {
  console.log("Connected to Mongoose..");
});

let indexRouter = require('./routes/index');

//path or slah for URL ex. http://localhost:3000/users
let usersRouter = require('./routes/users');

//path or slah for URL ex. http://localhost:3000/auth
let authRouter = require('./routes/auth');

//path or slah for URL ex. http://localhost:3000/business-contact
let businessContactRouter = require('./routes/businessContact');

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

//setup express session
app.use(session({
  secret: "somesecret",
  saveUninitialized: false,
  resave: false
}));

//initialized flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//create user model instance
let usermodel = require('./models/user');
let User = usermodel.user

//serialize and deserialized user object
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log("logging in")
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log('Incorrect username.')
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        console.log('Incorrect password.')
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

function isAuthenticated(req, res, next) {
  if (req.session.passport != undefined) {
    res.locals.isAuthenticated = true
  } else {
    res.locals.isAuthenticated = false
  }
  console.log("Middleware")
  next();
}

app.use(isAuthenticated);

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/business-contact', loggedIn, businessContactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});





// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error', { title: 'Error' });
  res.render('error', { title: "Error" });
});

module.exports = app;
