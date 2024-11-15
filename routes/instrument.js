// var express = require('express');
// var router = express.Router();
// var instrument_controller = require('../controllers/instrument');
// /* GET Instrument page. */
// router.get('/', function(req, res, next) {
//   res.render('instrument', { title: 'Search Results Instrument' });
// });
// router.get('/', instrument_controller.instrument);
// router.get('/', instrument_controller.instrument_view_all_Page );
// module.exports = router;
 
var express = require('express');

const instrument_controllers= require('../controllers/instrument');
 
var router = express.Router();
 
router.get('/', instrument_controllers.instrument_view_all_Page);
 
module.exports = router;
 