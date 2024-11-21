// const mongoose = require('mongoose');

// const instrumentSchema = new mongoose.Schema({
//   instrument_name: { type: String, required: true },
//   instrument_material: { type: String, required: true },
//   instrument_price: { type: Number, required: true }
// });

// const Instrument = mongoose.model('Instrument', instrumentSchema);

// module.exports = Instrument;
const mongoose = require("mongoose");

const instrumentSchema = mongoose.Schema({
  instrument_name: String,
  instrument_material: String,
  instrument_price: Number
});

module.exports = mongoose.model("Instrument", instrumentSchema);