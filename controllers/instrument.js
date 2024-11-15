// Import the Instrument model
var Instrument = require('../models/instrument');

// List all instruments (GET request)
exports.instrument = async function(req, res) {
    try {
      // Get all instruments from the database
      const instruments = await Instrument.find();
      
      // Pass the instruments to the pug view
      res.render('instrument', { instruments: instruments });  // Corrected here
    } catch (err) {
      // Catch any errors and send a failure response
      res.status(500).json({ message: 'Error retrieving instruments', error: err });
    }
  };
  
// VIEWS
// Handle a show all view
exports.instrument_view_all_Page = async function(req, res) {
    try{
    theinstrument = await Instrument.find();
    res.render('instrument', { title: 'instrument Search Results', results: theinstrument });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
   };

// VIEWS
// Handle a show all view





// Get details for a specific instrument (GET request)
exports.instrument_detail = async function(req, res) {
  try {
    // Find the instrument by ID
    const instrument = await Instrument.findById(req.params.id);
    
    if (!instrument) {
      return res.status(404).json({ message: 'Instrument not found' });
    }

    // Send the instrument details as a JSON response
    res.json(instrument);
  } catch (err) {
    // Catch any errors and send a failure response
    res.status(500).json({ message: 'Error retrieving instrument', error: err });
  }
};

// Handle instrument create on POST request
exports.instrument_create_post = async function(req, res) {
  console.log(req.body)
  let document=new Instrument();
  
    // Create a new instrument with data from the request body
      document.instrument_name= req.body.instrument_name,
      document.instrument_material= req.body.instrument_material,
      document.instrument_price= req.body.instrument_price;
    try{
      let result = await document.save();
      res.send(result);
    }
    catch(err){
      res.status(500);
      res.send(`{"error": ${err}}`);

    }
  };

    

// Handle instrument delete on DELETE request
exports.instrument_delete = async function(req, res) {
  try {
    // Find and delete the instrument by ID
    const instrument = await Instrument.findByIdAndDelete(req.params.id);

    if (!instrument) {
      return res.status(404).json({ message: 'Instrument not found' });
    }

    // Send a success response
    res.status(200).json({ message: 'Instrument deleted successfully' });
  } catch (err) {
    // Catch any errors and send a failure response
    res.status(500).json({ message: 'Error deleting instrument', error: err });
  }
};

// Handle instrument update on PUT request
exports.instrument_update_put = async function(req, res) {
  try {
    // Find and update the instrument by ID
    const instrument = await Instrument.findByIdAndUpdate(
      req.params.id,
      {
        instrument_name: req.body.instrument_name,
        instrument_material: req.body.instrument_material,
        instrument_price: req.body.instrument_price,
      },
      { new: true } // Return the updated document
    );

    if (!instrument) {
      return res.status(404).json({ message: 'Instrument not found' });
    }

    // Send the updated instrument as a JSON response
    res.json(instrument);
  } catch (err) {
    // Catch any errors and send a failure response
    res.status(500).json({ message: 'Error updating instrument', error: err });
  }
};
