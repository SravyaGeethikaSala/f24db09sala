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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/instrument', instrumentRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', randomItemRouter);
app.use('/resource', resourceRouter);

// Import the instrument model
const Instrument = require('./models/instrument');

// Connect to MongoDB
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
var db = mongoose.connection;
// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connection to DB succeeded');
});

// Seed data into MongoDB
async function seedData() {
  try {
    // Delete all existing instruments
    await Instrument.deleteMany({});
    console.log('All old instruments removed');

    // Seed new instruments
    const instrument = await Instrument.create([
      { instrument_name: 'Guitar', instrument_material: 'Wood', instrument_price: 15000 },
      { instrument_name: 'Piano', instrument_material: 'Felt', instrument_price: 20000 },
      { instrument_name: 'Violin', instrument_material: 'Steel', instrument_price: 10000 }
    ]);

    console.log('New instruments added:', instrument);
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Call the seedData function
seedData();

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
