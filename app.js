var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var instrumentRouter = require('./routes/instrument');
var gridRouter = require('./routes/grid');
var randomItemRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
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
app.use('/randomitem', randomItemRouter);
app.use('/resource', resourceRouter);

// MongoDB Connection
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import the instrument model
const Instrument = require('./models/instrument');

// Seed data function (only runs in development)
async function seedData() {
  if (process.env.NODE_ENV === 'development') {
    try {
      // Remove existing instruments
      await Instrument.deleteMany({});
      console.log('All old instruments removed');

      // Seed new instruments
      const instruments = await Instrument.create([
        { instrument_name: 'Guitar', instrument_material: 'Wood', instrument_price: 15000 },
        { instrument_name: 'Piano', instrument_material: 'Felt', instrument_price: 20000 },
        { instrument_name: 'Violin', instrument_material: 'Steel', instrument_price: 10000 }
      ]);

      console.log('New instruments added:', instruments);
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
}

// Call seed data function only in development environment
seedData();

// Catch 404 errors and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function (err, req, res, next) {
  // Set locals for error details
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
