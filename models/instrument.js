const mongoose = require('mongoose');

const instrumentSchema = new mongoose.Schema({
  instrument_name: { type: String, required: true },
  instrument_material: { type: String, required: true },
  instrument_price: { type: Number, required: true }
});

const Instrument = mongoose.model('Instrument', instrumentSchema);

module.exports = Instrument;
