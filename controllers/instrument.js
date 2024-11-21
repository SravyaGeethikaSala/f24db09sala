// // // Import the Instrument model
// // var Instrument = require('../models/instrument');

// // // List all instrument (GET request)
// // exports.instrument = async function(req, res) {
// //     try {
// //       // Get all instrument from the database
// //       const instrument = await Instrument.find();
      
// //       // Pass the instrument to the pug view
// //       res.render('instrument', { instrument: instrument });  // Corrected here
// //     } catch (err) {
// //       // Catch any errors and send a failure response
// //       res.status(500).json({ message: 'Error retrieving instrument', error: err });
// //     }
// //   };
  
// // // VIEWS
// // // Handle a show all view
// // exports.instrument_view_all_Page = async function(req, res) {
// //     try{
// //     theinstrument = await Instrument.find();
// //     res.render('instrument', { title: 'instrument Search Results', results: theinstrument });
// //     }
// //     catch(err){
// //     res.status(500);
// //     res.send(`{"error": ${err}}`);
// //     } 
// //    };

// // // VIEWS
// // // Handle a show all view





// // // Get details for a specific instrument (GET request)
// // exports.instrument_detail = async function(req, res) {
// //   try {
// //     // Find the instrument by ID
// //     const instrument = await Instrument.findById(req.params.id);
    
// //     if (!instrument) {
// //       return res.status(404).json({ message: 'Instrument not found' });
// //     }

// //     // Send the instrument details as a JSON response
// //     res.json(instrument);
// //   } catch (err) {
// //     // Catch any errors and send a failure response
// //     res.status(500).json({ message: 'Error retrieving instrument', error: err });
// //   }
// // };

// // // Handle instrument create on POST request
// // exports.instrument_create_post = async function(req, res) {
// //   console.log(req.body)
// //   let document=new Instrument();
  
// //     // Create a new instrument with data from the request body
// //       document.instrument_name= req.body.instrument_name,
// //       document.instrument_material= req.body.instrument_material,
// //       document.instrument_price= req.body.instrument_price;
// //     try{
// //       let result = await document.save();
// //       res.send(result);
// //     }
// //     catch(err){
// //       res.status(500);
// //       res.send(`{"error": ${err}}`);

// //     }
// //   };

    

// // // Handle instrument delete on DELETE request
// // exports.instrument_delete = async function(req, res) {
// //   try {
// //     // Find and delete the instrument by ID
// //     const instrument = await Instrument.findByIdAndDelete(req.params.id);

// //     if (!instrument) {
// //       return res.status(404).json({ message: 'Instrument not found' });
// //     }

// //     // Send a success response
// //     res.status(200).json({ message: 'Instrument deleted successfully' });
// //   } catch (err) {
// //     // Catch any errors and send a failure response
// //     res.status(500).json({ message: 'Error deleting instrument', error: err });
// //   }
// // };

// // // Handle instrument update on PUT request
// // exports.instrument_update_put = async function(req, res) {
// //   try {
// //     // Find and update the instrument by ID
// //     const instrument = await Instrument.findByIdAndUpdate(
// //       req.params.id,
// //       {
// //         instrument_name: req.body.instrument_name,
// //         instrument_material: req.body.instrument_material,
// //         instrument_price: req.body.instrument_price,
// //       },
// //       { new: true } // Return the updated document
// //     );

// //     if (!instrument) {
// //       return res.status(404).json({ message: 'Instrument not found' });
// //     }

// //     // Send the updated instrument as a JSON response
// //     res.json(instrument);
// //   } catch (err) {
// //     // Catch any errors and send a failure response
// //     res.status(500).json({ message: 'Error updating instrument', error: err });
// //   }
// // };
// const Instrument = require('../models/instrument');

// exports.instrument_list = async function(req, res) {
//   try {
//       const instrument = await Instrument.find();
//       res.render('instrument', { results: instrument });
//   } catch (err) {
//       res.status(500).send(`Error: ${err}`);
//   }
// };
  
// // exports.instrument_detail = function(req, res) {
// //   res.send('NOT IMPLEMENTED: Instrument detail: ' + req.params.id);
// // };

// exports.instrument_create_post = async function(req, res) {
//   let document = new Instrument();
//   document.instrument_name = req.body.instrument_name;
//   document.instrument_material = req.body.instrument_material;
//   document.instrument_price = req.body.instrument_price;
//   try {
//     let result = await document.save();
//     res.send(result);
//   } catch (err) {
//     res.status(500);
//     res.send(`{"error": ${err}}`);
//   }
// };


// // exports.instrument_delete = function(req, res) {
// //   res.send('NOT IMPLEMENTED: Instrument delete DELETE ' + req.params.id);
// // };

// exports.instrument_update_put = function(req, res) {
//   res.send('NOT IMPLEMENTED: Instrument update PUT ' + req.params.id);
// };

// // Put one update
// // Instrument controller (controllers/Instrument.js)
// exports.instrument_update_put = async function(req, res) {
//   console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
//   try {
//       let toUpdate = await Instrument.findById(req.params.id);
//       // Update properties
//       if (req.body.instrument_name) toUpdate.instrument_name = req.body.instrument_name;
//       if (req.body.instrument_material) toUpdate.instrument_material = req.body.instrument_material;
//       if (req.body.instrument_price) toUpdate.instrument_price = req.body.instrument_price;
//       let result = await toUpdate.save();
//       console.log("Success " + result);
//       res.send(result);
//   } catch (err) {
//       res.status(500);
//       res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
//   }
// };

// //read one
// exports.instrument_detail = async function(req, res) {
//   console.log("detail" + req.params.id);
//   try {
//       let result = await Instrument.findById(req.params.id);
//       res.send(result);
//   } catch (error) {
//       res.status(500);
//       res.send(`{"error": document for id ${req.params.id} not found`);
//   }
// };

// exports.instrument_update_get = async function(req, res) {
//   try {
//       const instrument = await Instrument.findById(req.params.id);
//       if (!instrument) {
//           res.status(404).send('Instrument not found');
//           return;
//       }
//       res.render('instrument_update', { instrument });
//   } catch (err) {
//       res.status(500).send(`Error: ${err}`);
//   }
// };

// //delete one
// exports.instrument_delete = async function(req, res) {
//   try {
//       const result = await Instrument.findByIdAndDelete(req.params.id);
//       if (!result) {
//           res.status(404).send('Instrument not found');
//           return;
//       }
//       res.send(`Instrument with id ${req.params.id} was deleted.`);
//   } catch (err) {
//       res.status(500).send(`Error: ${err}`);
//   }
// };

 
// //  exports.instrument_delete_get = async function(req, res) {
// //   try {
// //       const instrument = await Instrument.findById(req.params.id);
// //       if (!Instrument) {
// //           res.status(404).send('Instrument not found');
// //           return;
// //       }
// //       res.render('Instrument_delete', { Instrument });
// //   } catch (err) {
// //       res.status(500).send(`Error: ${err}`);
// //   }
// // };



const Instrument = require('../models/instrument');

//Get all Read
exports.instrument_list = async function (req, res) {
    try {
        const instrument = await Instrument.find();
        res.render('instrument', { results: instrument });
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
};

//create one
exports.instrument_create_post = async function (req, res) {
    let document = new Instrument();
    document.instrument_name = req.body.instrument_name;
    document.instrument_material = req.body.instrument_material;
    document.instrument_price = req.body.instrument_price;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


exports.instrument_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Instrument delete DELETE ' + req.params.id);
};

//put one update
// Instrument controller (controllers/instrument.js)
exports.instrument_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Instrument.findById(req.params.id);
        // Update properties
        if (req.body.instrument_name) toUpdate.instrument_name = req.body.instrument_name;
        if (req.body.instrument_material) toUpdate.instrument_material = req.body.instrument_material;
        if (req.body.instrument_price) toUpdate.instrument_price = req.body.instrument_price;
        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

//read one
exports.instrument_detail = async function (req, res) {
    console.log("detail" + req.params.id);
    try {
        let result = await Instrument.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

//delete one
exports.instrument_delete = async function (req, res) {
    console.log("delete " + req.params.id);
    try {
        const result = await Instrument.findByIdAndDelete(req.params.id);
        console.log("Removed " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": Error deleting ${err}}`);
    }
};

//single view
exports.instrument_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id);
    try {
        result = await Instrument.findById(req.query.id);
        res.render('instrumentdetail',
            { title: 'Instrument Detail', toShow: result });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

exports.instrument_create_Page = function (req, res) {
    console.log("create view");
    try {
        res.render('instrumentcreate', { title: 'Instrument Create' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
}

exports.instrument_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Instrument.findById(req.query.id)
        res.render('instrumentupdate', { title: 'Instrument Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.instrument_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await Instrument.findById(req.query.id)
        res.render('instrumentdelete', {
            title: 'Instrument Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};