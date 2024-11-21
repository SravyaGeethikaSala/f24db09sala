// // // var express = require('express');
// // // var router = express.Router();
// // // var instrument_controller = require('../controllers/instrument');
// // // /* GET Instrument page. */
// // // router.get('/', function(req, res, next) {
// // //   res.render('instrument', { title: 'Search Results Instrument' });
// // // });
// // // router.get('/', instrument_controller.instrument);
// // // router.get('/', instrument_controller.instrument_view_all_Page );
// // // module.exports = router;
 
// // var express = require('express');

// // const instrument_controllers= require('../controllers/instrument');
 
// // var router = express.Router();
 
// // router.get('/', instrument_controllers.instrument_view_all_Page);
 
// // module.exports = router;
 
// var express = require('express');
// var router = express.Router();
// var instrument_controller = require('../controllers/instrument');

// router.get('/', instrument_controller.instrument_list);

// router.post('/', instrument_controller.instrument_create_post);

// router.get('/:id', instrument_controller.instrument_detail);

// // router.get('/:id/', instrument_controller.instrument_update_get);

// router.put('/:id', instrument_controller.instrument_update_put); 

// router.delete('/:id', instrument_controller.instrument_delete); 

// router.get('/detail', instrument_controller.instrument_view_one_Page);

// // router.get('/:id/delete', instrument_controller.instrument_delete_get); 

// // router.post('/:id/update', instrument_controller.instrument_update_post);

// // router.post('/:id/delete', instrument_controller.instrument_delete_post);

// module.exports = router;


var express = require('express');
var router = express.Router();
var instrument_controller = require('../controllers/instrument');

router.get('/', instrument_controller.instrument_list);

router.post('/', instrument_controller.instrument_create_post);

//router.get('/:id', instrument_controller.instrument_update_get);

//router.get('/:id', instrument_controller.instrument_delete_get);

router.put('/instrument:id', instrument_controller.instrument_update_put);

router.delete('/instrument:id', instrument_controller.instrument_delete);

router.get('/instrument:id', instrument_controller.instrument_detail);

router.get('/detail', instrument_controller.instrument_view_one_Page);

router.get('/create', instrument_controller.instrument_create_Page);

router.get('/update', instrument_controller.instrument_update_Page);

router.get('/delete', instrument_controller.instrument_delete_Page);

module.exports = router;