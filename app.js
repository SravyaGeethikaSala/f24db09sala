// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var mongoose = require('mongoose');
// require('dotenv').config();

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var instrumentRouter = require('./routes/instrument');
// var gridRouter = require('./routes/grid');
// var randomItemRouter = require('./routes/pick');
// var resourceRouter = require('./routes/resource');

// var app = express();

// // View engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// // Middlewares
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/instrument', instrumentRouter);
// app.use('/grid', gridRouter);
// app.use('/randomitem', randomItemRouter);
// app.use('/resource', resourceRouter);

// // MongoDB Connection
// const connectionString = process.env.MONGO_CON;
// mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB successfully'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Import the instrument model
// const Instrument = require('./models/instrument');

// // Seed data function (only runs in development)
// async function seedData() {
//   if (process.env.NODE_ENV === 'development') {
//     try {
//       // Remove existing instruments
//       await Instrument.deleteMany({});
//       console.log('All old instruments removed');

//       // Seed new instruments
//       const instruments = await Instrument.create([
//         { instrument_name: 'Guitar', instrument_material: 'Wood', instrument_price: 15000 },
//         { instrument_name: 'Piano', instrument_material: 'Felt', instrument_price: 20000 },
//         { instrument_name: 'Violin', instrument_material: 'Steel', instrument_price: 10000 }
//       ]);

//       console.log('New instruments added:', instruments);
//     } catch (error) {
//       console.error('Error seeding data:', error);
//     }
//   }
// }

// // Call seed data function only in development environment
// seedData();

// // Catch 404 errors and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // General error handler
// app.use(function (err, req, res, next) {
//   // Set locals for error details
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // Render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
  Account.findOne({ username: username }).then(function (user){
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }).catch(function(err){
    return done(err)
  })
}))
require('dotenv').config();

const connectionString = process.env.MONGO_CON;

const mongoose = require('mongoose');

mongoose.connect(connectionString);

var db = mongoose.connection;

//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded")
});

// Route imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource');
const instrumentRouter = require('./routes/instrument');

// Schema definition
const instrumentSchema = new mongoose.Schema({
  instrument_name: String,
  instrument_material: String,
  instrument_price: Number
});

const Instrument = mongoose.models.Instrument || mongoose.model('Instrument', instrumentSchema);

// Database seeding function
async function recreateDB() {
  await Instrument.deleteMany();
  let instance1 = new Instrument({ instrument_name: 'Guitar', instrument_material: 'Wood', instrument_price: 15000  });
  let instance2 = new Instrument({ instrument_name: 'Piano', instrument_material: 'Felt', instrument_price: 20000 });
  let instance3 = new Instrument({ instrument_name: 'Violin', instrument_material: 'Steel', instrument_price: 10000 });

  await instance1.save().then(doc => {
    console.log("First object saved:", doc);
  }).catch(err => {
    console.error(err);
  });

  await instance2.save().then(doc => {
    console.log("Second object saved:", doc);
  }).catch(err => {
    console.error(err);
  });

  await instance3.save().then(doc => {
    console.log("Third object saved:", doc);
  }).catch(err => {
    console.error(err);
  });
}

let reseed = true;
if (reseed) {
  recreateDB();
}

// Express app setup
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/instrument', instrumentRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);
app.use('/resource', resourceRouter);

// passport config
// Use the existing connection
// The Account model 
var Account =require('./models/account'));
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 

// Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;