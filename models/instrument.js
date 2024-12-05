// const mongoose = require('mongoose');

// const instrumentSchema = new mongoose.Schema({
//   instrument_name: { type: String, required: true },
//   instrument_material: { type: String, required: true },
//   instrument_price: { type: Number, required: true }
// });

// const Instrument = mongoose.model('Instrument', instrumentSchema);

// module.exports = Instrument;



// const mongoose = require("mongoose");

// const instrumentSchema = mongoose.Schema({
//   instrument_name: String,
//   instrument_material: String,
//   instrument_price: Number
// });

// module.exports = mongoose.model("Instrument", instrumentSchema); 

const mongoose = require("mongoose");

const instrumentSchema = mongoose.Schema({
  instrument_name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  instrument_material: {
    type: String,
    required: true,
    
  },
  instrument_price: {
    type: Number,
    required: true,
    min: [1000, 'Price should atleast be 1000'],
    max: [25000, 'Price must not exceed 25000']
  }
});

module.exports = mongoose.model("instrument", instrumentSchema);